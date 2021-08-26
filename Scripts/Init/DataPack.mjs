/**************************************************************************\
*                                                                          *
*   Copyright (C) 2021 Neo-Mind                                            *
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
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.  *
*                                                                          *
*                                                                          *
|**************************************************************************|
*                                                                          *
*   Author(s)     : Neo-Mind                                               *
*   Created Date  : 2021-08-20                                             *
*   Last Modified : 2021-08-20                                             *
*                                                                          *
\**************************************************************************/

//
// Stores the Data GRF addr2ess & related details
// =============================================
//
// MODULE_NAME => DGRF
// ---------------------

///
/// \brief Exported data members
///
export var Name;    //Will hold either 'data.grf' or 'sdata.grf' later
export var RefAddr; //The address where it is referenced
export var MovFMgr; //The MOV ECX, g_FileMgr code

///
/// \brief Local data members
///
const self = 'DGRF';

var Valid;  //Will be true or false indicating extraction status
var ErrMsg; //Will contain the Error Object with a message about the issue encountered during extraction if any
var Addr;   //The VIRTUAL address of the name
var Hex;    //It's equivalent hex

///
/// \brief Initialization Function
///
export function init()
{
	Name = '';
	Addr = -1;
	Hex  = '';
	RefAddr = -1;
	MovFMgr = '';
	Valid  = null;
	ErrMsg = null;

	Identify(self, ['Name', 'RefAddr', 'MovFMgr', 'init', 'load', 'toString', 'valueOf']);
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

	$$(_ + '1.4 - Find "data.grf" or "sdata.grf" for really old clients')
	Name = ROC.Post2010 ? "data.grf" : "sdata.grf"
	Addr = Exe.FindText(this.Name);

	if (Addr < 0)
		throw Log.rise(ErrMsg = new Error(`${self} - 'data.grf' not found`));

	$$(_ + '1.5 - Convert to hex')
	Hex = Addr.toHex();

	$$(_ + '1.6 - Find where its used in a PUSH')
	let addr2 = -1;
	if (Exe.Version >= 14.0) //for VC14.16
	{
		const code =
			MOV(ECX, POS4WC)   	//mov ecx, offset <g_fileMgr>
		+	TEST(EAX, EAX)      //test eax, eax
		+	SETNE([POS4WC])     //setne byte ptR [addr2]
		+	PUSH(Hex)           //push offset "data.grf"
		;

		addr2 = Exe.FindHex(code);
		if (addr2 > 0)
		{
			$$(_ + '2.1 - Save the Reference addr2ess (where the PUSH occurs in VC14.16) & extract the g_FileMgr MOV before it')
			RefAddr = addr2 + code.byteCount() - 5;
			MovFMgr = Exe.GetHex(addr2, 5);
		}
	}
	if (addr2 < 0) //for VC6-VC11 or when the above match failed
	{
		const code =
			PUSH(Hex)           //push offset "data.grf"
		+	MOV(ECX, POS4WC)    //mov ecx, <g_fileMgr>
		;

		addr2 = Exe.FindHex(code);
		if (addr2 < 0)
			throw Log.rise(ErrMsg = new Error(`${self} - 'data.grf' not used`));

		$$(_ + '2.2 - Save the Reference addr2ess (where the PUSH occurs in older clients) & extract the g_FileMgr MOV after it')
		RefAddr = addr2;
		MovFMgr = Exe.GetHex(addr2 + 5, 5);
	}

	$$(_ + '2.3 - Set validity to true')
	return Log.rise(Valid = true);
}

///
/// \brief Override to return the name address as hex
///
export function toString()
{
	return Hex;
}

///
/// \brief Override to return the name address
///
export function valueOf()
{
	return Addr;
}
