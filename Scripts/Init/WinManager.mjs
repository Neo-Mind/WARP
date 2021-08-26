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
*   Created Date  : 2021-08-20                                             *
*   Last Modified : 2021-08-20                                             *
*                                                                          *
\**************************************************************************/

//
// Stores the Window Manager & related details
// ===========================================
//
// MODULE_NAME => WINMGR
// ---------------------

///
/// \brief Exported data members
///
export var MovECX;  //The code for MOV ECX, g_windowMgr (more useful most of the time)
export var MakeWin; //The VIRTUAL address of UIWindowMgr::MakeWindow

///
/// \brief Local data members
///
const self = 'WINMGR';

var Valid;  //Will be true or false indicating extraction status
var ErrMsg; //Will contain the Error Object with a message about the issue encountered during extraction if any
var Value;  //The VIRTUAL address of g_windowMgr
var Hex;    //It's hex in Little Endian form

///
/// \brief Initialization Function
///
export function init()
{
	Value   = -1;
	Hex     = '';
	MovECX  = '';
	MakeWin = -1;
	Valid   = null;
	ErrMsg  = null;

	Identify(self, ["MovECX", "MakeWin", 'init', 'load', 'toString', 'valueOf']);
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

	$$(_ + '1.4 - Find the string "NUMACCOUNT"')
	let addr = Exe.FindText("NUMACCOUNT");
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`${self} - 'NUMACCOUNT' not found`));

	$$(_ + '1.5 - Find where its used in a PUSH')
	let code =
		MOV(ECX, POS4WC) //mov ecx, <g_windowMgr>
	+	CALL(NEG3WC)     //call UIWindowMgr::MakeWindow
	+	PUSH_0           //push 0
	+	PUSH_0           //push 0
	+	PUSH(addr)       //push offset "NUMACCOUNT"
	;

	addr = Exe.FindHex(code);
	if (addr < 0)
	{
		code = code.replace(PUSH_0, PUSH_0 + MOV(R32, R32)); //mov regA, regB follows the first 'push 0'
		addr = Exe.FindHex(code);
	}
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`${self} - 'NUMACCOUNT' not used`));

	$$(_ + '2.1 - Extract the g_windowMgr address, compute MOV instruction & CALL function address')
	Value   = Exe.GetUint32(addr + 1);
	Hex     = Value.toHex(4);
	MovECX  = ' B9' + Hex;
	MakeWin = Exe.GetTgtAddr(addr + 6);

	$$(_ + '2.2 - Set validity to true')
	return Log.rise(Valid = true);
}

///
/// \brief Override to return the hex value
///
export function toString()
{
	return Hex;
}

///
/// \brief Override to return the numeric value
///
export function valueOf()
{
	return Value;
}
