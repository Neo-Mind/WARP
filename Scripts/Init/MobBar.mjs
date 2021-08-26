/**************************************************************************\
*                                                                          *
*   Copyright (C) 2021 Neo-Mind                                            *
*                                                                          *
*   This file is a part of WARP project (specific to RO clients)           *
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
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.  *
*                                                                          *
*                                                                          *
|**************************************************************************|
*                                                                          *
*   Author(s)     : Neo-Mind                                               *
*   Created Date  : 2021-08-22                                             *
*   Last Modified : 2021-08-26                                             *
*                                                                          *
\**************************************************************************/

//
// Stores information about monster bars (for use by ResizeMobBar group)
// =====================================================================
//
// MODULE_NAME => MBAR
// -------------------
//

///
/// \brief Exported data members
///
export var Mode;
export var Sizes;
export var HookAddr;
export var OvrdSize;
export var RetnAddr;
export var MobType;
export var MovECX;

export const Tag = 'MobBar';

///
/// \brief Local data members
///
const self = 'MBAR';

var Valid;
var ErrMsg;

///
/// \brief Initialization function
///
export function init()
{
	Mode = 0;
	Sizes = null;
	HookAddr = -1;
	OvrdSize = 0;
	RetnAddr = -1;
	MobType = null;
	MovECX = '';

	Valid = null;
	ErrMsg = null;
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

	$$(_ + '1.3 - Initialize \'Valid\' to false && the \'KS_Type\' to Unknown')
	Valid = false;

	if (Exe.BuildDate < 20160000)
	{
		$$(_ + '2.1 - Set the mode & the default widths & heights')

		Mode = 1; //older style
		Sizes = [
			[0x3C, 0x5],
			[0x64, 0xB],
			[0x8C, 0x11]
		];

		$$(_ + '2.2 - Find the size calculation & PUSHes')
		const parts =
		[//0
			LEA(R32, [2, R32, R32])                         //lea regA, [regB*2 + regB]
		+	LEA(R32, [Exe.Version < 11 ? R32 : 2, R32, 5])  //lea regA, [regA*2 + 5] OR lea regA, [regA + regA + 5]
		+	PUSH_R                                          //push regA ; height
		+	LEA(R32, [4, R32, R32])                         //lea regA, [regB*4 + regB]

		,//1
			(Exe.Version >= 11 ? MOV(ECX, R32) : "")        //mov ecx, regC ; only there in old clients
		+	LEA(R32, [8, R32, 0x3C])                        //lea regA, [regA*8 + 3Ch]
		+	PUSH_R                                          //push regA ; width
		];
		const addr = Exe.FindHex(parts);
		if (addr < 0)
			throw Log.rise(ErrMsg = new Error(`${self} - Size assignment missing`));

		$$(_ + '2.3 - Save the MOV ECX instruction if applicable')
		const preSize = parts.byteCount(0);
		MovECX = Exe.Version >= 11 ? Instr.FromAddr(addr + preSize) : '';

		$$(_ + '2.4 - Save the addresses and the code size')
		HookAddr = addr;
		OvrdSize = preSize + parts.byteCount(1);
		RetnAddr = Exe.Phy2Vir(HookAddr + OvrdSize, CODE);

		$$(_ + '2.5 - Extract the register being used in the multiplication which contains the mob type flag')
		const ins = Instr.FromAddr(addr);
		MobType = ins.SIB.getReg('B');
	}
	else
	{
		$$(_ + '3.1 - Set the mode & the default widths & heights')
		Mode = 2; //newer style
		Sizes = [
			[0x3C, 0x5],
			[0x3C, 0x5],
			[0x3C, 0x5]
		];

		$$(_ + '3.2 - Save the ECX assignment')
		MovECX = MOV(ECX, EAX);

		$$(_ + '3.3 - Find the size PUSHes (the pattern matches multiple times)')
		let parts =
		[//0
			PUSH(5)                  //push 5
		+	PUSH(60)                 //push 3Ch

		,//1
			MovECX          //mov ecx, eax

		,//2
			MOV([R32, POS2WC], EAX)  //mov dword ptr [regC + dispC], eax
		+	CALL()                   //call func#1
		];

		let addrs = Exe.FindHexN(parts);
		if (addrs.isEmpty())
		{
			[parts[1], parts[0]] = [parts[0], parts[1]]; //swap the first 2 parts (MOV need to be before PUSHes)

			addrs = Exe.FindHexN(parts);
		}
		if (addrs.isEmpty())
			throw Log.rise(ErrMsg = new Error(`${self} - PUSH pattern missing`));

		$$(_ + '3.4 - Filter out the correct PUSH based on the code before it')
		const hookAddr = addrs.find(memAddr =>
		{
			let code2 =
				CMP(EBX, -1)			//cmp ebx, -1
			+	JE(POS2WC)				//je _skip
			+	MOV(ESI, [EBP, WCp])	//mov esi, dword ptr [ebp + disp8A] ; ARG.x
			+	CMP(ESI, -1)			//cmp esi, -1
			;
			let addr = Exe.FindHex(code2, memAddr - 0xA0, memAddr);
			if (addr < 0)
			{
				code2 = code2.replace(
					JE(POS2WC),				//change JE _skip
					                        //  TO
					JNE(WCp)				//jne short _skip#2
				+	CMP([EBP, NEG2WC], EBX)	//cmp dword ptr [LOCAL.x], ebx
				+	JE(WCp)					//je short _skip#3
				);
				addr = Exe.FindHex(code2, memAddr - 0xF0, memAddr);
			}
			return (addr > 0);
		});
		if (!hookAddr)
			throw Log.rise(ErrMsg = new Error(`${self} - No proper size PUSHes found`));

		$$(_ + '3.5 - Save the addresses and the code size')
		HookAddr = hookAddr;
		OvrdSize = 6; //2 for the 1 byte PUSH + 4 for the 4 byte PUSH
		RetnAddr = Exe.Phy2Vir(hookAddr + 6);

		$$(_ + '3.6 - Extract the memory location & update the displacement to mob type flag')
		const ins = Instr.FromAddr(hookAddr + parts.byteCount(0, 1));
		MobType = [ins.MRM.getReg('M'), ins.Disp + 4];
	}

	$$(_ + '4.1 - Set Valid to true')
	return Log.rise(Valid = true);
}
