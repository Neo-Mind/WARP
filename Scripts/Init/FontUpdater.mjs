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
*   Created Date  : 2021-09-28                                             *
*   Last Modified : 2022-08-23                                             *
*                                                                          *
\**************************************************************************/

//
// Handles modification of arguments to Font creation call
// =======================================================
//
// MODULE_NAME => FONTAIN
// -----------------------

///
/// \brief Local data members
///
const self = 'FONTAIN';

const WeightMap = new Map();
const Users = new Set();

var CreateFontA;
var HookAddrs;

var ErrMsg;
var Valid;

///
/// \brief Initialization Function
///
export function init()
{
	WeightMap.clear();
	Users.clear();

	CreateFontA = null;
	HookAddrs = null;

	ErrMsg = null;
	Valid = null;
}

///
/// \brief Loads the HookAddrs and CreateFontA function address
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

	$$(_ + '2.1 - Find the CreateFontA function')
	let addr = Exe.FindFunc("CreateFontA", "GDI32.dll");
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`${self} - CreateFontA missing`));

	CreateFontA = addr;

	$$(_ + '2.2 - Find it\'s references')
	let addrs = Exe.FindHexN( CALL([CreateFontA]) );
	if (addrs.isEmpty())
		throw Log.rise(ErrMsg = new Error(`${self} - CreateFontA not called`));

	addr = Exe.FindHex( PUSH([CreateFontA]) );
	if (addr > 0)
		addrs.push(addr);

	HookAddrs = addrs;

	$$(_ + '2.3 - Set validity to true')
	return Log.rise(Valid = true);
}

///
/// \brief Function to add a patchName to the user list & stage the changes
///
export function stage(patchName)
{
	if (Users.has(patchName))
		return false;

	Users.add(patchName);
	setup();

	return true;
}

///
/// \brief Function to remove a patchName and unstage the changes for it
///        (meant to be used in cleanup functions)
///
export function unstage(patchName)
{
	if (!Users.has(patchName))
		return false;

	Users.delete(patchName);
	if (Users.size > 0)
	{
		Exe.ActivePatch = Users.get(0);
		setup();
	}

	return true;
}

///
/// \brief Local function to setup the changes
///
function setup()
{
	const _ = `${self}.setup - `;

	$$(_ + '1.1 - Prepare the code')
	let parts = [];
	if (CACHE.has('FONT_Height'))
	{
		parts.push(
			MOV([ESP, 4], CACHE.get('FONT_Height'))  //mov dword ptr [ARG.1], <FONT_Height>
		);
	}
	else if (CACHE.has('FONT_HgtOffset'))
	{
		parts.push(
			MOV(EAX, [ESP, 4])                       //mov eax, dword ptr [ARG.1]
		+	ADD(EAX, CACHE.get('FONT_HgtOffset'))    //add eax, <FONT_HgtOffset>
		+	MOV([ESP, 4], EAX)                       //mov dword ptr [ARG.1], eax
		);
	}
	else if (CACHE.has('FONT_MinHeight') ?? CACHE.has('FONT_MaxHeight'))
	{
		let prefix =
			MOV(EAX, [ESP, 4])   //mov eax, dword ptr [ARG.1]
		+	CMP(EAX, 0)          //cmp eax, 0
		+	JS(Filler(1,1))      //js _skip
		;
		if (CACHE.has('FONT_MinHeight'))
		{
			const MinHgt = CACHE.get('FONT_MinHeight');
			prefix +=
				CMP(EAX, MinHgt) //cmp eax, <FONT_MinHeight>
			+	JGE(5)           //jge short _next/_skip
			+	MOV(EAX, MinHgt) //mov eax, <FONT_MinHeight>
			;
		}
		if (CACHE.has('FONT_MaxHeight'))
		{
			const MaxHgt = CACHE.get('FONT_MaxHeight');
			prefix +=
				CMP(EAX, MaxHgt) //cmp eax, <FONT_MaxHeight> ; _next
			+	JLE(5)           //jle short _skip
			+	MOV(EAX, MaxHgt) //mov eax, <FONT_MaxHeight>
			;
		}
		prefix = SetFillTargets(prefix, 1, {'1,1' : prefix.byteCount()});

		parts.push(
			prefix
		+	MOV([ESP, 4], EAX)   //mov dword ptr [ARG.1], eax ; _skip
		);
	}

	if (CACHE.has('FONT_Weight'))
	{
		parts.push(
			MOV([ESP, 0x14], CACHE.get('FONT_Weight')) //mov dword ptr [ARG.5], <FONT_Weight>
		);
	}
	else if (CACHE.has('FONT_WgtOffset'))
	{
		parts.push(
			MOV(EAX, [ESP, 0x14])                 //mov eax, dword ptr [ARG.5]
		+	ADD(EAX, CACHE.get('FONT_WgtOffset')) //add eax, <FONT_WgtOffset>
		+	CMP(EAX, 0)                           //cmp eax, 0
		+	JGE(5)                                //jge short _skip1
		+	XOR(EAX, EAX)                         //xor eax, eax
		+	CMP(EAX, 1000)                        //cmp eax, 1000 ; _skip1
		+	JG(5)                                 //jg short _skip2
		+	MOV(EAX, 1000)                        //mov eax, 1000
		+	MOV([ESP, 0x14], EAX)                 //mov dword ptr [ARG.5], eax ; _skip2
		);
	}
	else if (WeightMap.size > 0)
	{
		let prefix =
			MOV(EAX, [ESP, 0x14])                 //mov eax, dword ptr [ARG.5]
		;
		for (const [key, val] of WeightMap)
		{
			prefix +=
				CMP(EAX, key)                     //cmp eax, <key>
			+	JNE(7)                            //jne short _next
			+	MOV(EAX, val)                     //mov eax, <val>
			+	JMP(Filler(1,1))                  //jmp _end
			;
		}
		prefix = SetFillTargets( prefix, {'1,1' : prefix.byteCount()} );

		parts.push(
			prefix
		+	MOV([ESP, 0x14], EAX)                 //mov dword ptr [ARG.5], eax
		);
	}

	if (CACHE.has('FONT_Charset'))
	{
		parts.push(
			MOV([ESP, 0x24], CACHE.get('FONT_Charset')) //mov dword ptr [ARG.9], <FONT_Charset>
		);
	}

	if (CACHE.has('FONT_NameAddr'))
	{
		parts.push(
			MOV([ESP, 0x38], CACHE.get('FONT_NameAddr')) //mov dword ptr [ARG.14], <FONT_NameAddr>
		);
	}

	parts.push(
		JMP([CreateFontA])                               //jmp dword ptr [<&GDI32.CreateFontA>]
	);

	$$(_ + '1.2 - Clean & begin the tag')
	Exe.BeginTag("Fontain", true);

	$$(_ + '2.1 - Find space for the code')
	const [free, freeVir] = Exe.Allocate(4 + parts.byteCount());

	$$(_ + '2.2 - Add at allocated address')
	Exe.SetHex(free, (freeVir + 4).toHex() + parts.join(''));

	$$(_ + '2.3 - Change the references')
	for (const addr of HookAddrs)
		Exe.SetInt32(addr + 2, freeVir);

	$$(_ + '2.4 - End the tag')
	Exe.EndTag();
}

///
/// \brief Setters for cached data
///
function setVal(suf, val)
{
	if (val == undefined)
		CACHE.del('FONT_' + suf);
	else
		CACHE.put('FONT_' + suf, val);
}

export const setHeight = val =>
	setVal('Height', val);

export const setHgtOff = val =>
	setVal('HgtOffset', val);

export const setMinHgt = val =>
	setVal('MinHeight', val);

export const setMaxHgt = val =>
	setVal('MaxHeight', val);

export const setWeight = val =>
	setVal('Weight', val);

export const setWgtOff = val =>
	setVal('WgtOffset', val);

export function changeWeight(oldVal, newVal)
{
	if (newVal == undefined)
		WeightMap.delete(oldVal);
	else
		WeightMap.set(oldVal, newVal)
}

export const setCharset = val =>
	setVal('Charset', val);

export const setNameAddr = val =>
	setVal('NameAddr', val);
