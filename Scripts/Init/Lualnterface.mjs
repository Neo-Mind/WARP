/**************************************************************************\
*                                                                          *
*   Copyright (C) 2021-2022 Neo-Mind                                       *
*                                                                          *
*   This file is a part of WARP project                                    *
*                                                                          *
*   WARP is free software: you can redistribute it and/or modify           *
*   it under the terms of the GNU General Public License as published by   *
*   the Free Software Foundation, either version 3 of the License, or      *
*   (at your option) any later version.                                    *
*                                                                          *
*   This program is distributed in the hope that it will be useful,        *
*   but WITHOUT ANY WARRANTY; without even the implied warranty of         *
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the          *
*   GNU General Public License for more details.                           *
*                                                                          *
*   You should have received a copy of the GNU General Public License      *
*   along with program.  If not, see <http://www.gnu.org/licenses/>.       *
*                                                                          *
*                                                                          *
|**************************************************************************|
*                                                                          *
*   Author(s)     : Neo-Mind                                               *
*   Created Date  : 2021-08-20                                             *
*   Last Modified : 2022-09-29                                             *
*                                                                          *
\**************************************************************************/

//
// Stores the necessary data and provides access to the Lua interface in the client
// ================================================================================
//
// MODULE_NAME => LUA
// -----------------------

///
/// \brief Exported data members
///
export var ReqJN;      //The VIRTUAL address of "ReqJobName"
export var FnInvoker;  //The VIRTUAL address of the function which invokes the "Lua function" already PUSHed as argument
export var FLRefAddr;  //The VIRTUAL address of the reference string used in the last call of addLoaders function below.

///
/// \brief Local data members
///
const self = 'LUA';

const NormFn = 0; //CALL <addr> type
const PtrFn  = 1; //CALL DWORD PTR [addr] type
const ZInit  = 2; //NormFn with zero initialization before it
const UnknFn = 3; //Unknown type

var Valid;      //Will be true or false indicating extraction status
var ErrMsg;     //Error Object containing a message about the issue encountered during extraction if any

var PushState;  //The code for PUSH dword ptr [GlobLuaState]
var StkConst;   //The constant value used in SUB ESP, const which gets executed before Lua Function name is PUSHed

var Pushers;    //Map of various PUSH codes for formats like "d>s"
var Al_Type;    //The type of the allocator function above
var Allocator;  //The VIRTUAL address of the function which allocates space to store the Lua function name

var FileLoader; //The VIRTUAL address of the function which loads the Lua file already PUSHed as argument
var FL_movECX;  //The code for MOV ECX, dword ptr [addr] ; where addr evaluates to GlobLuaState
                //Used before CALLs to FileLoader

///
/// \brief Initialization Function
///
export function init()
{
	ReqJN      = -1;
	PushState  = '';
	StkConst   = 0;
	Pushers    = null;
	Al_Type    = UnknFn;
	Allocator  = -1;
	FnInvoker  = -1;
	FLRefAddr  = -1;
	FileLoader = -1;
	FL_movECX  = '';

	Valid      = null;
	ErrMsg     = null;

	Identify(self, ['ReqJN', 'FnInvoker', 'init', 'load', 'createCaller', 'finalize', 'addLoaders']);
}

///
/// \brief Function to extract data from loaded exe and set the members
///
export function load()
{
	const _ = Log.dive(self, 'load');

	$$(_ + '1.1 - Check if load was already called')
	if (Valid != null)
	{
		$$(_ + '1.2 - Check for errors and report them again if present otherwise simply return')
		Log.rise();

		if (Valid)
			return Valid;
		else
			throw ErrMsg;
	}

	$$(_ + '1.3 - Initialize \'Valid\' to false')
	Valid = false;

	$$(_ + '1.4 - Find \'ReqJobName\'')
	ReqJN = Exe.FindText("ReqJobName", CASE_INSENSITIVE);
	if (ReqJN < 0)
		throw Log.rise(ErrMsg = new Error(`{self} - 'ReqJobName' not found`));

	$$(_ + '1.5 - Find where \'ReqJobName\' is used in a PUSH')
	let addr = Exe.FindHex(PUSH(ReqJN));
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`{self} - 'ReqJobName' not used`));

	$$(_ + '2.1 - Find the ESP allocation before the PUSH')
	let code =
		SUB(ESP, WC)	//sub esp, immA
	+	MOV(ECX, ESP)   //mov ecx, esp
	;
	let movAddr = Exe.FindHex(code, addr - 0x28, addr);
	if (movAddr < 0)
		throw Log.rise(ErrMsg = new Error(`{self} - ESP allocation not found`));

	$$(_ + '2.2 - Save the constant used in SUB ESP')
	StkConst = Exe.GetInt8(movAddr + 2);

	$$(_ + '2.3 - Retrieve the instruction after the PUSH')
	let ins = Instr.FromAddr(addr + 5);

	$$(_ + '3 - Extract & assign based on the opcode')
	switch (ins.Codes[0])
	{
		case 0xE8:
			$$(_ + '3.1 - For DIRECT call (seen in VC6). Save the target address as \'Allocator\' & set the type to NormFn')

			Allocator = Exe.GetTgtAddr(ins.NextAddr - 4);
			Al_Type = NormFn;
			break;

		case 0xFF:
			$$(_ + '3.2 - For INDIRECT call (seen in VC9). Save the pointer address as \'Allocator\' & set the type to PtrFn')

			if (ins.MRM.RegO !== 2) //ensuring its a CALL dword ptr
				throw Log.rise(ErrMsg = new Error(`{self} - 0xFF seen after PUSH 'ReqJobName', but not a CALL`));

			Allocator = ins.Disp;
			Al_Type = PtrFn;
			break;

		case 0xC6:
			$$(_ + '3.3 - For Zero Init DIRECT call (seen in VC10+). Save the target address as \'Allocator\' & set the type to ZInit')

			ins.moveToNext();
			if (ins.Codes[0] !== 0xE8) // Ensure the next instruction is a direct CALL
				throw Log.rise(ErrMsg = new Error(`{self} - No direct call found after Zero Init`));

			Allocator = Exe.GetTgtAddr(ins.NextAddr - 4);
			Al_Type = ZInit;
			break;

		default:
			throw Log.rise(ErrMsg = new Error(`${self} - Unexpected instruction after PUSH 'ReqJobName'`));
	}

	$$(_ + '4.1 - Find the GlobLuaState assignment (different code for different linker) after the instruction')
	code =
		Exe.BuildDate < 20100300 ? MOV(EAX, [POS3WC]) :
		Exe.Version < 11.0       ? MOV(R32, [POS3WC]) :
		                           PUSH([POS4WC]) ;

	addr = Exe.FindHex(code, ins.NextAddr, ins.NextAddr + 0x10);
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`{self} - global state assignment missing`));

	$$(_ + '4.2 - Extract the GlobLuaState address & save it as a PUSH dword ptr')
	ins = Instr.FromAddr(addr);
	PushState = PUSH( [ins.Disp] );

	$$(_ + '4.3 - Find the CALL after the assignment (is lua function invoker)')
	addr = Exe.FindHex( CALL(NEG3WC), ins.NextAddr, ins.NextAddr + 0x10 );
	if (addr < 0 && Exe.BuildDate > 20190000)
	{
		addr = Exe.FindHex( CALL(POS3WC), ins.NextAddr, ins.NextAddr + 0x10 );
	}
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`{self} - function invoker missing`));

	$$(_ + '4.4 - Save the function address.')
	FnInvoker = Exe.GetTgtAddr(addr + 1);

	$$(_ + '5.1 - Find the string "Lua Files\\DataInfo\\jobName"')
	addr = Exe.FindText("Lua Files\\DataInfo\\jobName", CASE_INSENSITIVE);
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`{self} - jobName string missing`));

	$$(_ + '5.2 - Find where it is used in a PUSH. Should be followed by a CALL')
	addr = Exe.FindHex( PUSH(addr) + CALL() );
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`{self} - jobName not used`));

	$$(_ + '5.3 - Find the GlobLuaState movement to ECX before the PUSH')
	movAddr = Exe.FindHex( MOV(ECX, [ESI, POS2WC]), addr - 10, addr); //mov ecx, dword ptr [esi + dispA]
	if (movAddr < 0)
		movAddr = Exe.FindHex( MOV(ECX, [POS3WC]), addr - 10, addr);  //mov ecx, dword ptr [dispA]

	if (movAddr < 0)
		throw Log.rise(ErrMsg = new Error(`{self} - global state movement missing for FileLoader`));

	$$(_ + '5.4 - Extract the function address')
	FileLoader = Exe.GetTgtAddr(addr + 6);

	$$(_ + '5.5 - Extract the MOV ECX')
	FL_movECX = Instr.FromAddr(movAddr).toString();

	Pushers = new Map();
	for (const fmt of ["d>s", "d>d", "dd>d", "dd>s"])
	{
		$$(_ + `6.1 - Find '${fmt}' & save it's PUSH instruction`)
		const addr = Exe.FindText(fmt, false);
		if (addr > 0)
			Pushers.set(fmt, PUSH(addr));
	}

	$$(_ + '6.2 - Set validity to true')
	return Log.rise(Valid = true);
}

///
/// \brief Creates and returns code for calling a Lua function inside the loaded executable
///
export function createCaller(name, format)
{
	const _ = Log.dive(self, 'createCaller');

	$$(_ + '1.1 - Sanity Check (Ensure we have a valid object)')
	if (Valid === null)
		throw Log.rise(Error("LUA not loaded"));

	if (!Valid)
		throw Log.rise(ErrMsg);

	$$(_ + '1.2 - Select the appropriate PUSH instruction based on the format')
	let PUSH_fmt;
	if (IsArr(format)) //format is provided as [string, stringAddr]
	{
		PUSH_fmt = PUSH(format[1]);
		format = format[0];
	}
	else if (Pushers.has(format))
	{
		PUSH_fmt = Pushers.get(format);
	}
	else //not a pre-existing one so use a CALL to PUSH the next few bytes as the string
	{
		PUSH_fmt = PUSH_STR(format);
	}

	$$(_ + '1.3 - Calculate the number of arguments for input & output')
	const [icnt, ocnt] = format.split(">").map(e => e.length);

	$$(_ + '1.4 - Split up the inputs & outputs')
	const inputs = Array.prototype.slice.call(arguments, 2, 2 + icnt).reverse();
	const outputs = Array.prototype.slice.call(arguments, 2 + icnt, 2 + icnt + ocnt);

	$$(_ + '1.5 - Prepare the PUSH instruction for the function name')
	let PUSH_name;
	if (IsArr(name)) //[name, nameAddr] form
	{
		PUSH_name = PUSH(name[1]);
		name = name[0];
	}
	else
	{
		const addr = Exe.FindText(name, CASE_INSENSITIVE, false);
		if (addr > 0)
			PUSH_name = PUSH(addr);
		else
			PUSH_name = PUSH_STR(name);
	}

	$$(_ + '2 - Now we construct the code in stages')
	let pre = Al_Type === NormFn ? PUSH(name.length) : '';
	let code = '', suf = '';

	$$(_ + '2.1 - First we prepare stack locations for the outputs & PUSH them')
	if (ocnt > 0)
	{
		pre += SUB(ESP, 4 * ocnt);         //sub esp, immA ; enough for all the outputs

		code +=
			ocnt === 1
		?
			PUSH(ESP)                       //push esp; for 1 output
		:                                   //  OR
			MOV(ECX, ESP)                   //mov ecx, esp
		+	(PUSH(ECX)                      //push ecx     ; repeated n-1 times
		+	ADD(ECX, 4)).repeat(ocnt - 1)   //add ecx, 4   ; repeated n-1 times
		+	PUSH(ECX)                       //push ecx
		;
	}

	$$(_ + '2.2 - PUSH all the inputs in reverse order')
	for (const arg of inputs)
		code += PUSH(arg); //PUSH input_arg

	$$(_ + '2.3 - PUSH the format, and prepare ECX for the allocator')
	code +=
		PUSH_fmt                         //push offset <argFormat>
	+	SUB(ESP, StkConst)               //sub esp, <StkConst>
	+	MOV(ECX, ESP)                    //mov ecx, esp
	;

	$$(_ + '2.4 - PUSH the function name along with additional argument and CALL the Allocator')
	switch (Al_Type)
	{
		case ZInit :
			code +=
				PUSH(name.length)        //push <funcNameLength>
			+	PUSH_name                //push offset <funcName>
			+	MOV([ECX, 0x14], 0xF)    //mov dword ptr [ecx + 14h], 0f
			+	MOV([ECX, 0x10], 0x0)    //MOV dword ptr [ecx + 10h], 0
			+	MOV(BYTE_PTR, [ECX], 0)  //mov byte ptr [ecx], 0
			+	CALL(Filler(50))         //call Allocator
			;
			break;

		case PtrFn :
			code +=
				PUSH_name                //push offset <funcName>
			+	CALL([Allocator])        //call dword ptr [Allocator]
			;
			break;

		case NormFn :
			code +=
				LEA(EAX, [ESP, StkConst + 4 * (icnt + ocnt + 2)]) //lea eax, [esp + StkConst + constL]; contains funcName length
			+	PUSH_EAX                 //push eax
			+	PUSH_name                //push offset <funcName>
			+	CALL(Filler(50))         //call Allocator
			;
			break;
	}

	$$(_ + '2.5 - PUSH the state and Call the FnInvoker')
	code +=
		PushState                        //push dword ptr [GlobLuaState]
	+	CALL(Filler(51))                 //call FnInvoker
	+	ADD(ESP, StkConst + 8 + 4*icnt)  //add esp, StkConst + 8 + constI
	;

	$$(_ + '2.6 - Retrieve the outputs')
	if (ocnt > 0)
	{
		for (const arg of outputs)
		{
			code +=
				POP(ECX)                 //pop ecx
			+	(IsArr(arg)
			?
				MOV(ECX, [ECX])          //mov ecx, dword ptr [ecx]
			+	MOV(arg, ECX)            //mov outputPtr, ecx
			:                            //  OR
				MOV(arg, [ECX])          //mov outputReg, dword ptr [ecx]
			)
			;
		}

		$$(_ + '2.7 - Restore the stack')
		suf = ADD(ESP, 4 * ocnt +                     //add esp, (immA + 4)  for Regular CALL
			(Al_Type === NormFn ? 4 : 0)
		);
	}

	$$(_ + '3 - Return the codes created')
	return Log.rise(pre, code, suf);
}

///
/// \brief Replace all the known fillers to finalize the code created with createCaller function
///
export function finalize(code, at, tgtMap = {})
{
	if (IsArr(code))
		code = code.join('');

	Object.assign(tgtMap, {
		start : at,
		   50 : Allocator,
		   51 : FnInvoker
	});

	return SetFillTargets(code, tgtMap);
}

///
/// \brief Adds code for loading lua files at specified target address
///
export function addLoaders(arg1, arg2, arg3, arg4)
{
	/// 0 - Parse the arguments
	let files, refName, tgt, skipOrig = false;

	const loadNewFirst = IsArr(arg1);
	if (loadNewFirst)
	{
		files = arg1;
		refName = arg2;
	}
	else
	{
		files = arg2;
		refName = arg1;
	}

	if (IsBool(arg3))
	{
		skipOrig = arg3;
		tgt = arg4;
	}
	else
	{
		tgt = arg3;
	}
	if (!IsNum(tgt))
		tgt = -1;

	const _ = Log.dive(self, 'addLoaders');

	$$(_ + '1.1 - Sanity Check (Ensure we have a valid object)')
	if (Valid === null)
		throw Log.rise(Error("LUA not loaded"));

	if (!Valid)
		throw Log.rise(ErrMsg);

	$$(_ + '1.2 - Find the string inside refName')
	FLRefAddr = Exe.FindText(refName, CASE_INSENSITIVE);
	if (FLRefAddr < 0)
		throw Log.rise(Error(`${self} - Reference file ( ${refName} ) missing`));

	$$(_ + '1.3 - Find where its used in a PUSH (it should be immediately followed by a CALL)')
	let addr = Exe.FindHex( PUSH(FLRefAddr) + CALL() );
	if (addr < 0)
		throw Log.rise(Error(`${self} - Reference file not used`));

	$$(_ + '1.4 - Find the ECX movement right before it')
	let hookAddr = Exe.FindHex(FL_movECX, addr - 10, addr);
	if (hookAddr < 0)
		hookAddr = Exe.FindHex(MOV(ECX, [POS4WC]), addr - 10, addr); //mov ecx, dword ptr [GlobLuaState]

	if (hookAddr < 0)
		throw Log.rise(Error(`${self} - ECX assignment missing`));

	$$(_ + '1.5 - Save the location after the CALL')
	const retnPhy = addr + 10;
	const retnVir = Exe.Phy2Vir(retnPhy, CODE);

	$$(_ + '2.1 - Prepare the template to use for each file & save its size')
	const template =
		Exe.GetHex(hookAddr, addr - hookAddr)  //prep code
	+	PUSH(Filler(1))                        //push offset <filePrefix>
	+	CALL(Filler(2))                        //call CLua::Load
	;
	const tsize = template.byteCount();

	$$(_ + '2.2 - Calculate total code size')
	const csize = tsize * (files.length + (skipOrig ? 0 : 1)) + 7; //5 for the JMP at the end and 2 NULL bytes for seperation between code and strings

	$$(_ + '2.3 - Prepare the strings to be appended at the end of the code')
	const strings = files.join('\x00').toHex() + ' 00';
	const ssize = strings.byteCount();

	$$(_ + '2.4 - Save the VIRTUAL address (If no address is specified then allocate space for it)')
	let tgtVir;
	if (tgt > 0)
		tgtVir = Exe.Phy2Vir(tgt);
	else
		[tgt, tgtVir] = Exe.Allocate(csize + ssize, 0x10); //snapping to 0x10 since its going to be like a function

	$$(_ + '3.1 - Initialize the code variable, set the initial CALL distance and address of first string')
	let code = "";
	let dist = FileLoader - (tgtVir + tsize);
	let strAddr = tgtVir + csize;

	$$(_ + '3.2 - If the original file needs to be loaded first then first add the entry for that using the template')
	if (!skipOrig && !loadNewFirst)
	{
		code += SwapFillers( template, 1,
		{
			1 : FLRefAddr,
			2 : dist,
		});

		dist -= tsize;
	}

	for (const file of files)
	{
		$$(_ + '3.3 - Fill the template with the string address & distance and append to the code (' + file + ')')
		code += SwapFillers( template, 1,
		{
			1 : strAddr,
			2 : dist,
		});

		$$(_ + '3.4 - Update the strAddr to the next string location')
		strAddr += file.length + 1;

		$$(_ + '3.5 - Update the distance for the next CALL')
		dist -= tsize;
	}

	$$(_ + '3.6 - If the original file needs to be loaded last then add the entry for that using the template')
	if (!skipOrig && loadNewFirst)
	{
		code += SwapFillers( template, 1, {
			1 : FLRefAddr,
			2 : dist,
		});
	}

	$$(_ + '3.7 - Append the JMP at the end along with the 2 NULLs')
	code += JMP(retnVir, tgtVir + csize - 7) + " 00 00";

	$$(_ + '4.1 - Add the code & strings to the executable')
	Exe.SetHex(tgt, code + strings, csize + ssize);

	$$(_ + '4.2 - Enforce a JMP from hookAddr to target (NOP out all code in between)')
	Exe.SetJMP(hookAddr, tgtVir, retnPhy - (hookAddr + 5));

	$$(_ + '4.3 - Return the target address')
	return Log.rise(tgt);
}

///
/// \brief Specific form of above function needed for some strings in recent clients (used in AddLuaOverrides patch)
///
export function loadLuaAfter(hookAddr, newFiles, movECX, testAL)
{
	/// 0 - Sanity check
	if (Exe.GetUint8(hookAddr) !== 0xE8)
		return -1;
	
	const _ = Log.dive(self, 'loadLuaAfter');
	
	$$(_ + '1.1 - Prepare the template to use for each file & save its size')
	let template =
		(testAL
	?
		TEST(AL, AL)
	+	JZ(Filler(3,1))
	:
		''
	)
	+	movECX                                 //mov ecx, <src> ; src could be a register or memory pointer
	+	PUSH_0                                 //push 0
	+	PUSH_1                                 //push 1
	+	PUSH(Filler(1))                        //push offset <filePrefix>
	+	CALL(Filler(2))                        //call CLua::Load
	;
	
	const tsize = template.byteCount();
	if (testAL)
		template = SetFillTargets(template, {'3,1' : tsize});

	$$(_ + '1.2 - Calculate total code size')
	const csize = tsize * newFiles.length + 12; //5 for the CALL at the beginning, 5 for JMP at the end and 2 NULL bytes for seperation between code and strings
	
	$$(_ + '1.3 - Prepare the strings to be appended at the end of the code')
	const strings = newFiles.join('\x00').toHex() + ' 00';
	const ssize = strings.byteCount();
	
	$$(_ + '1.4 - Allocate space for both')
	const [tgt, tgtVir] = Exe.Allocate(csize + ssize, 0x10); //snapping to 0x10 since its going to be like a function
	
	$$(_ + '2.1 - Initialize the code variable, set the initial CALL distance and address of first string')
	let dist = FileLoader - (tgtVir + 5);
	let code = CALL(dist);
	let strAddr = tgtVir + csize;
	
	for (const file of newFiles)
	{
		$$(_ + '2.2 - Update the distance for the next CALL')
		dist -= tsize;

		$$(_ + '2.3 - Fill the template with the string address & distance and append to the code (' + file + ')')
		code += SwapFillers( template, 1,
		{
			1 : strAddr,
			2 : dist,
		});

		$$(_ + '2.4 - Update the strAddr to the next string location')
		strAddr += file.length + 1;
	}
	
	$$(_ + '2.5 - Append the JMP at the end along with the 2 NULLs')
	code += JMP(Exe.Phy2Vir(hookAddr + 5, CODE), tgtVir + csize - 7) + " 00 00";
	
	$$(_ + '3.1 - Add the code & strings to the executable')
	Exe.SetHex(tgt, code + strings, csize + ssize);

	$$(_ + '3.2 - JMP to our code from the hookAddr')
	Exe.SetJMP(hookAddr, tgtVir);
	
	$$(_ + '3.3 - Return the target address')
	return Log.rise(tgt);
}