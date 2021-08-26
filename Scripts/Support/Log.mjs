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
*   Last Modified : 2021-08-27                                             *
*                                                                          *
\**************************************************************************/

//
// Stores all functions and manages values used for logging
// ========================================================
//

///
/// \brief Exported data members
///
export var Tee = false;

///
/// \brief Local data members
///
var Handle = null;
var Depth = 0;
var UserDepth = 0;

///
/// \brief Function to start the logging process
///
export function start(file)
{
	if (Handle)
		return true;

	file = file ?? "Comment_Log_" + System.LocalTime.toISOString().replace(/:/g, '_') + ".log";

	let fp = new TextFile(OUTDIR + file, "w");
	if (fp.Valid)
	{
		Handle = fp;
		return true;
	}

	return false;
}

///
/// \brief Function to stop the logging process
///
export function stop(display = true)
{
	if (!Handle)
		return Log;

	Handle.Close();
	if (display)
		Warp.Show(Handle.Path);

	Handle = null;

	return Log;
}

///
/// \brief Function to show the log file
///
export function show()
{
	if (!Handle)
		return false;

	Warp.Show(Handle.Path);
	return Log;
}

///
/// \brief Function to write line to log file if open
///
///
export function write(msg)
{
	if (Handle)
		Handle.WriteLine(msg);

	return Log;
}

/// \brief Function to enable carbon copy of messages to console.
///
export function cc(state = true)
{
	Tee = state;
	return Log;
}

///
/// \brief Function to increase the active depth (to be used by supporting functions).
///        Also concatenates the inputs provided using ':' (to help with prefix building)
///
export function dive(...v)
{
	Depth++;
	return v.length ? v.join(' :: ') + ' : ' : Log;
}

///
/// \brief Function to decrease the active depth (to be used by supporting functions)
///        Also acts as a passthrough for values so that it can be 'return'ed.
///        If multiple values are given they get wrapped into an array.
///
export function rise()
{
	Depth--;
	switch(arguments.length)
	{
		case 0 : return Log;
		case 1 : return arguments[0];
		default : return [...arguments];
	}
}

///
/// \brief Function to set depth for user
///
export function setDepth(new_depth)
{
	if (IsNum(new_depth))
		UserDepth = new_depth;

	return Log;
}

///
/// \brief Function to test active depth against user depth (the level which user wants to see)
///
export const valid = () =>
	UserDepth >= Depth;

///
/// \brief Override to avoid type error in string context
///
export function toString()
{
	return "Log";
}
