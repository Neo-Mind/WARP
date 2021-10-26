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
*   along with program.  If not, see <http://www.gnu.org/licenses/>.       *
*                                                                          *
*                                                                          *
|**************************************************************************|
*                                                                          *
*   Author(s)     : Neo-Mind                                               *
*   Created Date  : 2021-08-23                                             *
*   Last Modified : 2021-10-22                                             *
*                                                                          *
\**************************************************************************/

//
// A General per session storage location for patches
// ==================================================
//
// MODULE_NAME => CACHE
// -----------------------

///
/// \brief Local data members
///
var Heap = new Map();
var Switches = new Map();
var SharedVault = new Map();
var BackupVault = new Map();
var AllocVault = new Map();
var TagVault = new Map();
var UserRegistry = new Map();

///
/// \brief Initialization Function
///
export function init()
{
	Heap.clear();
	Switches.clear();
	SharedVault.clear();
	BackupVault.clear();
	AllocVault.clear();
	TagVault.clear();
	UserRegistry.clear();
}

///
/// \brief Function to setup the switches & tags for a key
///
export function setup(key, tag, keyOptions = null)
{
	let options =
	{
		saveUser_after_change: true,     //Save the name into the UserRegistry after the entry corresponding to the name has been changed in the SharedVault.
		saveUser_after_alloc: false,     //Save the active patch name into the UserRegistry when an address is allocated and saved into AllocVault.
		delUser_after_restore: true,     //Delete the 'user name' from UserRegistry  after an entry is restored from the BackupVault. Default = true.
		cleanTag_after_restore: true,    //Clean up changes in a tag after an entry is restored from the BackupVault.
		dealloc_after_restore: true,     //Delete a previous allocation (only the address is removed) from AllocVault.
		cleanTag_after_userDel: true,    //Clean up changes in a tag after a user is removed from the UserRegistry.
		cleanTag_after_zeroUsers: true,  //Clean up changes in a tag after the last user gets removed from the UserRegistry.
		dealloc_after_zeroUsers: true,   //Delete a previous allocation after the last user gets removed from the UserRegistry.
		dealloc_after_tagClean: false,   //Delete a previous allocation after the associated tag has been cleaned up (not just the one in the AllocVault)
	};
	if (keyOptions)
		Object.assign(options, keyOptions);

	Switches.set(key, options);

	if (tag)
		TagVault.set(key, tag);
}

///
/// \brief Function to load the initial shared data for a key
///
export function load(key, ...args)
{
	if (BackupVault.has(key))
		return;

	const needMap = args.take_if('boolean', true);
	const [names, values] = args;

	let data, bkData;
	if (needMap)
	{
		data = new Map();
		bkData = new Map();

		names.forEach( (name, idx) =>
		{
			data.set(name, values[idx]);
			bkData.set(name, values[idx]);
		});
	}
	else
	{
		data = {};
		bkData = {};

		names.forEach( (name, idx) =>
		{
			data[name] = values[idx];
			bkData[name] = values[idx];
		});
	}

	BackupVault.set(key, bkData);
	SharedVault.set(key, data);
}

/* *************** Setters *************** */

///
/// \brief Function to change an individual entry inside the shared data for a key
///
export function setEntry(key, name, value)
{
	let hash = SharedVault.get(key);
	if (!hash)
		return false;

	if (hash instanceof Map)
		hash.set(name, value);
	else
		hash[name] = value;

	const {saveUser_after_change} = Switches.get(key);
	if (saveUser_after_change)
		addUser(key, name);

	return true;
}

///
/// \brief Function to revert an individual entry inside the shared data for a key
///
export function restoreEntry(key, name)
{
	let hash = SharedVault.get(key);
	if (!hash)
		return false;

	let bkHash = BackupVault.get(key);
	if (hash instanceof Map)
		hash.set(name, bkHash.get(name));
	else
		hash[name] = bkHash[name];

	const {delUser_after_restore, cleanTag_after_restore, dealloc_after_restore} = Switches.get(key);
	if (delUser_after_restore)
		delUser(key, name);

	if (cleanTag_after_restore)
		cleanTag(key);

	if (dealloc_after_restore)
		deallocate(key);
}

///
/// \brief Function to add a user to the registry
///
export function addUser(key, name)
{
	if (!UserRegistry.has(key))
		UserRegistry.set(key, new Set());

	UserRegistry.get(key).add(name);
}

///
/// \brief Function to remove a user from the registry
///
export function delUser(key, name)
{
	if (!UserRegistry.has(key))
		return false;

	let users = UserRegistry.get(key);
	users.delete(name);

	const {cleanTag_after_userDel, dealloc_after_zeroUsers, cleanTag_after_zeroUsers} = Switches.get(key);
	const zeroUsers = users.size === 0;

	const runDealloc = zeroUsers && dealloc_after_zeroUsers;

	if (cleanTag_after_userDel || (zeroUsers && cleanTag_after_zeroUsers))
		cleanTag(key, runDealloc);

	if (runDealloc)
		deallocate(key);

	return true;
}

///
/// \brief Function to remove the changes associated with the tag
///
export function cleanTag(key, runDealloc = false)
{
	const name = TagVault.get(key);
	if (name)
	{
		const {dealloc_after_tagClean} = Switches.get(key);
		runDealloc = runDealloc || dealloc_after_tagClean;

		Exe.DelTag(name, runDealloc);
		if (runDealloc)
			deallocate(key);

		return true;
	}

	return false;
}

///
/// \brief Function to allocate space , save it in the vault & return the address pair
///
export function allocate(key, subKey, code, snap = 0x10)
{
	if (!AllocVault.has(key))
		AllocVault.set(key, new Map());

	let hash = AllocVault.get(key);
	if (!hash.has(subKey))
		hash.set(subKey, Exe.Allocate(code.byteCount(), snap));

	const {saveUser_after_alloc} = Switches.get(key);
	if (saveUser_after_alloc)
		addUser(key, Exe.ActivePatch);

	return hash.get(subKey);
}

///
/// \brief Function to deallocate the space
///
export function deallocate(key, subKey = null)
{
	if (subKey)
	{
		let hash = AllocVault.get(key);
		if (hash)
			hash.delete(subKey);
	}
	else
		AllocVault.delete(key);
}

/* *************** Getters *************** */

///
/// \brief Function to get the individual entry for a key
///
export function entry(key, name)
{
	let hash = SharedVault.get(key);
	if (hash instanceof Map)
		return hash.get(name);
	else if (hash instanceof Object)
		return hash[name];
	else
		return null;
}

///
/// \brief Function to get the complete data for a key
///
export const getData = key =>
	SharedVault.get(key);

///
/// \brief Function to get the first user name
///
export function firstUser(key)
{
	if (UserRegistry.has(key))
		return UserRegistry.get(key).get(0);
	else
		return null;
}

///
/// \brief Function to check if any users remain
///
export const hasUsers = key =>
	UserRegistry.has(key) && UserRegistry.get(key).size > 0;

///
/// \brief Function to retrieve the tag
///
export const getTag = key =>
	TagVault.get(key);


/* ************* Heap Access ************* */

///
/// \brief Put an item in the heap
///
export const put = (key, val) =>
	Heap.set(key, val);

///
/// \brief Take out an item from the heap
///
export const take = key =>
{
	const val = Heap.get(key);
	Heap.delete(key);
	return val;
}

///
/// \brief Retrieve an item from the heap (just a copy of the data stored. For objects, it will be the address)
///
export const get = key =>
	Heap.get(key);

///
/// \brief Remove an item in the heap
///
export const del = key =>
	Heap.delete(key);

///
/// \brief Tests for existence of an item in the heap
///
export const has = key =>
	Heap.has(key);
