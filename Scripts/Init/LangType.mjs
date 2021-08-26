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
// Stores the language type
// ========================
//
// MODULE_NAME => LANGTYPE
// -----------------------

///
/// \brief Local data members
///
const self = 'LANGTYPE';

var Valid;  //Will be true or false indicating extraction status
var ErrMsg; //Will contain the Error Object with a message about the issue encountered during extraction if any
var Value;  //The g_serviceType VIRTUAL Address
var Hex;    //It's hex in Little Endian form

///
/// \brief Initialization Function
///
export function init()
{
	Value   = -1;
	Hex     = '';
	Valid  = null;
	ErrMsg = null;

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

	$$(_ + '1.4 - Find the string "america"')
	let addr = Exe.FindText("america");
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`${self} - 'america' not found`));

	$$(_ + '1.5 - Find where its used in a PUSH')
	addr = Exe.FindHex( PUSH(addr) );
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`${self} - 'america' not used`));

	$$(_ + '1.6 - Find an assignment to g_serviceType after it')
	addr = Exe.FindHex( MOV([POS4WC], 1), addr + 5); //mov dword ptr ds:[g_serviceType], 1
	if (addr < 0)
		throw Log.rise(ErrMsg = new Error(`${self} - g_serviceType not assigned`));

	$$(_ + '2.1 - Extract the address to \'Value\' & save its hex')
	Value = Exe.GetUint32(addr + 2);
	Hex = Value.toHex(4);

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
