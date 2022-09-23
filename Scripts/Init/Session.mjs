 /**************************************************************************\
*                                                                          *
*   Copyright (C) 2022 Neo-Mind                                            *
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
*   Created Date  : 2022-09-22                                             *
*   Last Modified : 2022-09-22                                             *
*                                                                          *
\**************************************************************************/

//
// Stores 'g_session' & related function addresses
// ===============================================
//
// MODULE_NAME => SSN
// -----------------------

///
/// \brief Exported data members
///
export var Funcs;
export var EBvals;

///
/// \brief Local data members
///
const self = 'SSN';

var Valid;    //Will be true or false indicating extraction status
var ErrMsg;   //Will contain the Error Object with a message about the issue encountered during extraction if any
var Value;    //The g_session VIRTUAL Address
var Hex;      //It's hex in Little Endian form

///
/// \brief Initialization Function
///
export function init()
{
	Value   = -1;
	Hex     = '';
	Valid  = null;
	ErrMsg = null;
	EBvals = null;
	Funcs = null;
	
	Identify(self, ['init', 'load', 'toString', 'valueOf']);
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
	
	$$(_ + '2.1 - Find the reference PUSH (Base Exp Bar coords)')
	let code =
		PUSH(0x4E)   //push 4Eh
	+	PUSH(-0xC8)  //push -0C8h
	;
	const refAddr = Exe.FindHex(code);
	if (refAddr < 0)
		throw Log.rise(ErrMsg = new Error(`${self} - Base coords not PUSHed`));
	
	$$(_ + '2.3 - Find the GetJobID call before the PUSH')
	code =
		MOV(ECX, POS4WC)  //mov ecx, <g_session>
	+	CALL(ALLWC)       //call CSession::GetJobID
	+	PUSH_EAX          //push eax
	+	MOV(ECX, POS4WC)  //mov ecx, <g_session>
	+	CALL(ALLWC)       //call CSession::IsThirdJob
	;
	const basebegin = Exe.FindLastHex(code, refAddr, refAddr - 0x120);
	if (basebegin < 0)
		throw Log.rise(ErrMsg = new Error(`${self} - JobID CALL not found`));

	const afterBB = basebegin + code.byteCount();
	
	$$(_ + '2.4 - Save the values')
	const GetJobID = Exe.GetTgtAddr(basebegin + 6);
	const IsThirdJob = Exe.GetTgtAddr(afterBB - 4);
	
	Value = Exe.GetInt32(basebegin + 1);
	Hex = Value.toHex(4);
	
	Funcs = {
		GetJobID,
		IsThirdJob
	};
	
	EBvals = {
		refAddr,
		basebegin,
		afterBB
	};
	
	$$(_ + '2.5 - Set validity to true')
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
