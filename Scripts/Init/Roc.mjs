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
*   along with program.  If not, see <http://www.gnu.org/licenses/>.  *
*                                                                          *
*                                                                          *
|**************************************************************************|
*                                                                          *
*   Author(s)     : Neo-Mind                                               *
*   Created Date  : 2021-08-21                                             *
*   Last Modified : 2022-09-24                                             *
*                                                                          *
\**************************************************************************/

//
// Stores various data from the RO client
// ======================================
//
// MODULE_NAME => ROC
// -----------------------

///
/// \brief Exported data members
///
export var RGrfPhy;   //will contain PHYSICAL address of rdata.grf
export var IsRenewal; //true for RE clients
export var IsZero;    //true for Zero clients
export var IsMain;    //true for main clients (essentially neither RE nor Zero)
export var Post2010;  //true for 2010+ dated clients

export var HasFP;  //true if client uses Frame Pointers (i.e. FPO is not ON)
export var StkReg; //will contain the primary stack access register based on whether FPO is ON or not

export var HasLWhidden; //true if the client has a hidden login
export var HasPktKeys;  //true if the client has keys

export var CashShopAddr; //will contain VIRTUAL address of the cash shop string
export var RouletteAddr; //will contain VIRTUAL address of the roulette string
export var AdvAgencyAddr; //will contain VIRTUAL address of 'adventurerAgency';

export var GetModHandle; //will contain VIRTUAL address of 'GetModuleHandleA' imported function
export var GetProcAddr;  //will contain VIRTUAL address of 'GetProcAddress' imported function
export var OutDbgStrA;   //will contain VIRTUAL address of 'OutputDebugStringA' imported function
export var MsgBoxA;      //will contain VIRTUAL address of 'MessageBoxA' imported function
export var SprintF;      //will contain VIRTUAL address of either 'sprintf' or 'wsprintfA' imported function
export var CreateWin;    //will contain VIRTUAL address of 'CreateWindowExA'

export var Kernel32;     //will contain VIRTUAL address of 'KERNEL32.dll'
export var BaseName;     //will contain the basename of the loaded client. Can be useful in reports and such.

export const ClrSettings = {format: 'BGR'}; //common constraint for D_Color type

///
/// \brief Local data members
///
const self = 'ROC';

///
/// \brief Initialization/Loading function
///
export function load()
{
	const _ = Log.dive(self, 'load');

	$$(_ + '1.1 - Get the PHYSICAL address of "rdata.grf" & if present its a renewal client.')
	RGrfPhy = Exe.FindText("rdata.grf", PHYSICAL);
	IsRenewal = (RGrfPhy > 0);

	$$(_ + '1.2 - Zero clients will have the RenewSetup Zero string')
	IsZero = (Exe.FindText("Software\\Gravity Soft\\RenewSetup Zero", PHYSICAL, false) > 0);

	$$(_ + '1.3 - If neither then it is a main client')
	IsMain = !IsRenewal && !IsZero;

	$$(_ + '1.4 - Check for clients with 2010+ build date')
	Post2010 = Exe.BuildDate > 20100000;

	$$(_ + '1.5 - Check for Frame Pointer by searching for the characteristic PUSH EBP & MOV EBP, ESP as the first statement of a function')
	$$(_ + '      To avoid false match we will prefix sequence of INTs (some clients have NOPs instead)')
	const fromAddr = Exe.GetSectBegin(CODE) + (Exe.BuildDate > 20220000 && 0x3000);
	const toAddr = fromAddr + 0x500;

	let addr = Exe.FindHex(INT3.repeat(5) + FP_START, fromAddr, toAddr); //int3 x5 times
	                                                                     //push ebp
																		 //mov ebp, esp
	if (addr < 0)
		addr = Exe.FindHex(NOP.repeat(5) + FP_START, fromAddr, toAddr); //change each 'int3' to 'nop'

	HasFP = (addr > 0);
	StkReg = HasFP ? EBP : ESP;

	$$(_ + '1.6 - Check the build date & Zero status for Hidden Login Window')
	HasLWhidden = Exe.BuildDate > 20100803 && (Exe.BuildDate < 20171018 || (Exe.BuildDate < 20181114 && !IsZero));

	$$(_ + '1.7 - Check for packet key presence')
	HasPktKeys = Exe.BuildDate >= 20110817;

	$$(_ + '2.1 - Get the address of "NC_CashShop", Roulette bmp string & "adventurerAgency"')
	CashShopAddr = Exe.FindText("NC_CashShop");
	RouletteAddr = Exe.FindText("\xC0\xAF\xC0\xFA\xC0\xCE\xC5\xCD\xC6\xE4\xC0\xCC\xBD\xBA\\basic_interface\\roullette\\RoulletteIcon.bmp", CASE_INSENSITIVE);
	AdvAgencyAddr = Exe.FindText("adventurerAgency");

	$$(_ + '2.2 - Get the address of "KERNEL32.dll"')
	Kernel32 = Exe.FindText("KERNEL32.dll", CASE_INSENSITIVE);
	if (Kernel32 < 0)
		Kernel32 = Exe.FindText("KERNEL32.dll", CASE_INSENSITIVE, false); // new clients have it in small letters (but we will search insensitively)
			                                                                          // and not necessarily seperated from previous string with a NULL
	$$(_ + '2.3 - Set the base name')
	BaseName = System.BaseName(Exe.FilePath);

	$$(_ + '2.4 - Reset the import addresses')
	GetModHandle = -1;
	GetProcAddr  = -1;
	OutDbgStrA   = -1;
	MsgBoxA      = -1;
	SprintF      = -1;
	CreateWin    = -1;

	IdentifyObj(self, [
		'RGrfPhy', 'IsRenewal', 'IsZero', 'IsMain', 'Post2010',
		'HasFP', 'StkReg', 'HasLWhidden', 'HasPktKeys',
		'CashShopAddr', 'RouletteAddr', 'AdvAgencyAddr',
		'GetModHandle', 'GetProcAddr', 'OutDbgStrA', 'MsgBoxA',
		'Kernel32', 'BaseName'
	]);

	Log.rise();
}

///
/// \brief Function for getting the imported addresses when required
///
export function findImports()
{
	if (GetModHandle < 0)
	{
		const addr = Exe.FindFunc("GetModuleHandleA", "KERNEL32.dll");
		if (addr < 0)
			throw Error("GetModuleHandleA not found");

		GetModHandle = addr;
	}

	if (GetProcAddr < 0)
	{
		const addr = Exe.FindFunc("GetProcAddress", "KERNEL32.dll");
		if (addr < 0)
			throw Error("GetProcAddress not found");

		GetProcAddr = addr;
	}

	if (OutDbgStrA < 0)
	{
		const addr = Exe.FindFunc("OutputDebugStringA");
		if (addr < 0)
			throw Error("'OutputDebugStringA' function missing");

		OutDbgStrA = addr;
	}

	if (MsgBoxA < 0)
	{
		const addr = Exe.FindFunc("MessageBoxA", "USER32.dll");
		if (addr < 0)
			throw Error("'MessageBoxA' function missing");

		MsgBoxA = addr;
	}

	if (SprintF < 0)
	{
		let addr = Exe.FindFunc("sprintf");
		if (addr < 0)
			addr = Exe.FindFunc("wsprintfA", "USER32.dll");

		if (addr < 0)
			throw Error("No print functions found");

		SprintF = addr;
	}

	if (CreateWin < 0)
	{
		let addr = Exe.FindFunc("CreateWindowExA", "USER32.dll");
		if (addr < 0)
			throw Error("'CreateWindowExA' function missing");

		CreateWin = addr;
	}
}

///
/// \brief Function for getting the resource tree
///
export function getRsrcTree()
{
	const key = 'RsrcTree';
	if (!CACHE.has(key))
		CACHE.put(key, new RsrcEntry(0, Exe.GetDirAddr(D_Res, PHYSICAL)));

	return CACHE.get(key);
}
