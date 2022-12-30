# 2022-12-30 Changes

## Patch Updates
- Fixed bug in [Enforce 0 C in Cash Shop](https://github.com/Neo-Mind/WARP/issues/115) patch.

- Updated valid build dates for [Fix Homunculi AI](https://github.com/Neo-Mind/WARP/issues/93) patch.

- Fixed bug in [Increase Headgear View ID](https://discord.com/channels/780647066871136266/1051858994584633404) patch.


# 2022-10-05 Changes

## Patch Updates
- Updated Restore App Icon & Customize App icon patches.

	- Restore enables the new bigger icon in latest clients.
	
	- Custom icon has no limits now aside from anything Windows imposes.

## Extension Updates
- Fixed **`DumpImportTable`** extension for certain clients where LUT address is set as 0.

## Script Updates
- Updated **`RsrcEntry`** class with better traverse function & a dump function to report the hierarchy.

## Tool Updates
- Fixed minor bugs in GATE (similar issue as **`DumpImportTable`**)


# 2022-09-24 Changes

## Patch Updates
- Updated Chris' lua override patch to work with a mapping file and work properly on more recent clients.

## Script Updates
- Added **`LUA.loadLuaAfter`** function to support the branched loading in recent clients (used by `AddLuaOverrides` patch)


# 2022-09-24 Changes

## Patch Updates
- Added new module for capturing session value & related functions

- Added new patches to

	- Enable preview for equipments in Trader cash shops. Requires 2017+ clients.
	
	- Customize guild emblem file size.
	
	- Customize error message displayed when client runs without launcher.
	
	- Customize tax value used for mail (Rodex)
	
- Adapted some patches for latest clients (more to come soon).

- Updated copyright date for a few patches (more to be updated soon).


# 2022-09-08 Changes

## Patch Updates
- Updated [Skill spam patch for newer clients](https://github.com/Neo-Mind/WARP/issues/102).

- Updated copyrights for all patch definition yml files.

- Updated [Disable Gameguard patch for 2022 clients](https://github.com/Neo-Mind/WARP/issues/95)


# 2022-09-06 Changes

## Patch Updates
- Fixed [bug with Custom Captcha decompression patch](https://github.com/Neo-Mind/WARP/issues/103)


# 2022-08-24 Changes

## Extension Updates
- Updated **`Extract msgstringtable`** extension for latest client.


# 2022-08-23 Changes

## Patch Updates
- Fixed [crashes with Custom Shield patch](https://github.com/Neo-Mind/WARP/issues/97)

- Fixed [crashes with Custom Font Height patches](https://github.com/Neo-Mind/WARP/issues/92)

- Added patch to [Disable password encryption in login packet for new clients](https://github.com/Neo-Mind/WARP/issues/94)

- Fixed [conflict in Shared head palette patches](https://github.com/Neo-Mind/WARP/issues/84)

- Updated Lua files for Custom Job patch with [missing entries for new jobs](https://github.com/Neo-Mind/WARP/issues/98)
  and [correct mappings for doram race](https://github.com/Neo-Mind/WARP/issues/96)
  
- Partially fixed Gameguard patch. Still needs more work. 

- Removed unnecessary parseInt calls from scripts.

## Script Updates
- Updated **`ReloadPatch`** function to return the value of the called patch function.


# 2022-04-03 Changes

## Patch Updates
- Added new patches.
	- [Case-Insensitive cash shop search](https://github.com/Neo-Mind/WARP/issues/13)
	- [Enable "Notice" email section](https://github.com/Neo-Mind/WARP/issues/41)

- Added the start date for "No Color" translation.

## Script Updates
- Added **`PUSH_STR`** function to perform a `PUSH+JMP` for pushing strings .


# 2022-02-23 Changes

## Patch Updates
- Fixed crash in **`Custom Job`** patch.

- Fixed [issue in Draw Shield on Top patch](https://github.com/Neo-Mind/WARP/issues/83)

- Updated **`Disconnect to Login Window`** patch [for newer clients](https://github.com/Neo-Mind/WARP/issues/81)

- Fixed [bug in Increase Zoom Out patch](https://github.com/Neo-Mind/WARP/issues/44).


# 2022-02-22 Changes

## Patch Updates
- Updated LUA files for **`Custom Job`** patch.

- Added new translation [as requested](https://github.com/Neo-Mind/WARP/issues/89)

- Updated Custom Path patches to handle the various suffixes with a slightly better approach.


# 2021-12-29 Changes

## Tool Updates (v1.5.3)
- Fixed Bug in `Exe.Allocate` function when no active patch is available.

- Fixed `Exe.FindFunc` function to use look up table instead of thunk table.

- Fixed issue with `Drag & Drop` for Session files & Tester Directory.


# 2021-11-26 Changes

## Patch Updates
- Fixed the following patches for latest clients (2021-11-10+)
	- **`Enforce 0 C in Cash Shop`**
	- **`Custom Exp Bar Limits`**
	- **`Enable Custom Homunculi`**
	- **`Enable Custom Jobs`**
	- **`Enable Custom Shields`**
	- **`Allow 65k hair styles`**
	- **`Increase hair styles`**
	- **`Always see hidden/cloaked objects`**
	- **`Load iteminfo per server`**
	- **`Always load korea ExternalSettings lua file`**
	- **`Remove Adventurer Agency from party`**
	- All path customization patches

- Disabled **`Translate Taekwon`** patch for new clients, since it is picked up from msg table and therefore can be altered there instead.

- Fixed bug in **`Custom Font Weight for all`** patch


# 2021-11-11 Changes

## Patch Updates
- Fixed bug in **`Custom MerchantURLs`** patch.


# 2021-11-04 Changes

## Patch Updates
- Fixed [bug in Enable Proxy Support patch](https://github.com/Neo-Mind/WARP/issues/80)
- Fixed [bug in Allow Guild activities in clan patch](https://github.com/Neo-Mind/WARP/issues/75)

# 2021-10-29 Changes

## Script Updates
- Updated **`AutoHook`** function to allow for multiple from addresses & source offset(s). Also added 'this' pointer support for post processing function.


- Added **`MultiAlloc`** function to perform contiguous DIFF allocation for storing multiple values. It accepts the sizes needed and returns corresponding **`VIRTUAL`** addresses.


# 2021-10-28 Changes

## Patch Updates
- Fixed the order in `Enable Multiple GRFs` patch.


# 2021-10-27 Changes

## Tool Updates (v1.5.2)
- Added Drag & Drop support for the tools.
	- You can drop `Exe files` or `Session YAMLs` directly on the [Main GUI] for them to be loaded. 

	- Similarly you can drop the `Test Folder` or `Session YAMLs` in  [Test Bench]

	- Also, you can drop any files/folders into the various editor frames and text boxes to get their paths added directly.

- `Exe.FindSpace` function has been changed to `Exe.Allocate` and it always reserves the space allocated now. 

- Continuing from the above change, `Exe.Add*` functions no longer takes the target address as an argument. Please use the `Exe.Set*` functions instead on `allocated` addresses.

- If the value going to be added is already known, then use the `Exe.Add*` functions to stage the addition to the `DIFF` section and use it's return value (addresses & size - similar to `Exe.Allocate`). 

- `Exe.ProtectChanges` function has been split into `Exe.ConcealChanges` and `Exe.RevealChanges` respectively and they both take a password now.

- Added caching support to `Exe.FindFunc` to avoid repetitive searches for the same function later.

- Fixed bug with dependency chain not ignoring invalidated patches.

- Added type information to input values in Session files.

- Added support for `init` member function on Patch functions which will get executed when a client is loaded.

- Added support for `initvars` and `clearvars` member arrays on Patch functions to hold the name of member variables to be initialized/purged when a client is loaded.

  `initvars` need to be of the form `["name1", value1, "name2", value2...]`

## Script Updates
- Fixed bug in **`UserChoice`** function

## Patch Updates
- Updated patch **`Enable DNS Support`** to fix[Issue #77](https://github.com/Neo-Mind/WARP/issues/77)


# 2021-10-26 Changes

## Script Updates
- Added new function **`AutoHook`** to group together all the common steps involved in hooking & addition of code.


# 2021-10-22 Changes

## Script Updates
- Added new function `AttachCode` to group together all the common steps involved in hooking & addition of code.


# 2021-10-06 Changes

## Patch Updates
- Minor correction in `Font Height` patch script


# 2021-10-04 Changes

## Patch Updates
- Added patch to disable pkt encryption for login/char

- Fixed issue with `Auto mute` patch


# 2021-10-03 Changes

## Patch Updates
- Updated the Lua files used with `Custom Jobs` patch

- Added patch to fix the alignment & bg issue with recent 'New Character' window.


# 2021-10-02 Changes

## Patch Updates
- Updated `Customize Walk delay` patch to set individual delays.

- Added patches for the following:

	- More `Font customization` options i.e. weight (fixed and specific to normal & bold), charset, relative height & weight
	
	- Play sound instead of displaying `MessageBox`
	
	- Show icon inside `MessageBox`
	
	- Skip showing `MessageBox` altogether
	
	- Borderless full screen
	
	- Setting Mini title bar
	
	- Ignoring Debugger presence

	- Add Input Delay
	
	- Change Game Loop delay

	- Altering priority from (Idle to Normal) or (Normal to High)
	
	- Changing Captcha decompression size
	
## Script Updates
	- Added new function `GetImpRefs` to get references of Imported function
	
	
# 2021-09-26 Changes

## Patch Updates
- Added patch to `Customize Auto follow stop delay`.

## Tool Updates
- Fixed number input issue in session files.

- Modified `Exe.FindSpace` function to include the size allocated as the 3rd element in the returned list.

- Added `Exe.Reserve` function for performing allocation + reserve address in DIFF section without needing to set any data.

- Added variants of `Exe.Add*` functions which performs the allocation along with insertion and returns the addr & size list identical to `Exe.FindSpace`.


# 2021-09-11 Changes

## Patch Updates
- Added temporary fix for integers being loaded as strings from session files.
  Fixes [bug with Custom Jobs patch](https://github.com/Neo-Mind/WARP/issues/73)


# 2021-08-31 Changes

## Patch Updates
- Fixed bug with Custom Font Name patch

## Tool Updates
- Fixed 1 non-critical issue with the GATE dll

# 2021-08-27 Changes

## Patch Updates
- Fixed [bug with MonSizeEffect lub patch](https://github.com/Neo-Mind/WARP/issues/70)

- Fixed [bug with Hide Packets from PEEK patch](https://github.com/Neo-Mind/WARP/issues/68)

- Fixed [bug with Restore model culling patch](https://github.com/Neo-Mind/WARP/issues/67)

- Fixed [bug with New Button visibility patch](https://github.com/Neo-Mind/WARP/issues/72)

## Script Updates
- Renamed the `self_call` sub function to `self`

## Tool Updates
- Added `Warp.BlockMsgs` & `Warp.AllowMsgs` function to allow partial logging.


# 2021-08-26 Changes

## Script Updates
- Added extra functions to `Function`, `Map` & `Set` types.

	| Function           | Description |
	| ----------------   | ----------- |
	| `<map>.open`       | Provides a proxy for destructuring the keys out similar to an `Object` |
	| `<map>.hasValue`   | Check if the map has the specified value (alternative to the `has` function |
	| `<set>.get`        | Retrieve a value using it's index |
	| `<func>.call_self` | Enables call a function with itself as the `this` pointer |

- Added `MakeMap` function to create a `Map` object in a clearer form.

- Added `ReloadPatch` function to clear & load an already selected patch.

- Fixed bug in `OpData` class for 1 of the Scale index forms.

- Fixed bugs in some instruction generators.
 
## Patch/Extension Updates
- Started using all the new features in all the patches & extensions.

## Tool Updates
- Added 2 new options related to errors in [Test Bench].

	- `Show only errors & warnings` => As the name sounds, it allows for skipping 'success' & 'ignored' messages for each individual patch/extension during tests.
	
	- `Show lines with error` => Option to display the linenumber & filename from where the error originated.

- Modified the way the exe file names are displayed during test => Now the test directory being used is displayed first and only the filenames are reported seperately.


# 2021-08-22 Changes

## Script Updates
- Added `PatchReporter` function which uses the logging mechanism to report the changes staged by the tool. 

- Moved most of the `Init` scripts into Modules.

- Added a new `CACHE` module for storing data persistent per session i.e. It will remain in there as long as you don't load a new client.
  
  The module also helps with setting up shared data & changes amongst related patches by means of multiple Vaults & a User Registration system.

## Tool Updates
- Added `Exe.HasTag` function to check for existing tags.

- Enabled the use of `this` pointer in all the patch & extension functions. It will point to the main function for each.

- Modified the change reporting mechanism to use a Scripted function called `PatchReporter` instead.

- Now evaluation errors displays the line number & filename the error came from properly.


# 2021-08-20 Changes

## Script Updates
- Shifted `Log` and `OpCodeList` to module files

- Added depth settings to `Log` for hiding unnecessary level of support function logs. All the support functions have been updated.

- Added `getReg` functon to `ModRM` and `SIBase` classes to get their respective member registers quickly.

  It accepts 1 letter as argument ('R' & 'O' for `ModRm` , `I` & `B` for `SIBase`)

- Added `PH_Regs` map to get Placeholder registers quickly based on bit sizes.

- Removed `TAB` constant since it is not needed anymore.

- Shifted some of the content in initialization scripts into modules.


# 2021-08-19 Changes

## Tool Updates
- Changed the root node of **`Patches.yml` & `Extensions.yml`** to a map. No more hyphens needed for Group names and Extension names.

- Added support for including/importing additional YAML files into current one for **`Style` & `Language`** files as well as **`Patches.yml`** by means of the **`include`** key.

  It can be either 1 name of list of names. 
  
  **`Extensions.yml` do not have it yet since it will rarely get big enough to split into multiple files.**

- Session files now also records the selected **`extensions`**, the **`Test Dir`** as well as the selected **`tester exes`** when saving the file in [Test Bench].

  This will help to quickly start the tests when re-launched, instead of selecting everything again from scratch.

- Updated the inbuilt extension for converting NEMO profiles to WARP session files. Inputs are also mapped properly now (aside from **`D_MultiChoice`**).

- Fixed issue with session file generation of **`Target Exe`** when the option is enabled.

- Added support for fully encrypted scripts with the suffix **`.ejs`**. It can also have an optional disclaimer/license header.

  **Do not try to create this manually.**
  
- Added **`Warp.EncryptFile`** function for generating **`.ejs`** files from the specified source file. Any disclaimer/license header present will be retained as is.

- Added **`Warp.LoadEJS`** function for loading **`.ejs`** files explicitly from scripts or the **`Script Editor`**.

- Added support for module scripts with the suffix **`.mjs`**.

	- Modules are a handy way of encapsulating 'Singleton' objects and as such you are likely to see more use of these in future.

	- The name of the module can be defined inside the **`.mjs`** file by adding the following in a seperate line:

	   `// MODULE_NAME => put_the_name_here`

	- In case this line is not there, then the tool will use the **basename** of the file as the module name.

	- Be aware that modules only get loaded once and the variables exported can only be updated from within the module.

	- Since the loading process is different, module scripts cannot be encrypted into **`.ejs`**.


# 2021-08-18 Changes

## Tool Updates
- Added overload of **`Exe.FindHexN`, `Exe.FindLastHexN`, `Exe.FindTextN` & `Exe.FindLastTextN`** functions to accept a `min`, `max` pair as the count.

  These will return an empty list if the number of elements are < `min` or > `max`.

- Fixed bugs and modified the inner workings of **`D_Color`** type. It only takes the following constraints now:

	- `format` => Previously called `order`. Indicates the format in which the components need to be kept from MSB to LSB.

	- `R`, `G`, `B` & `A` => Optional keys to set the default value for any missing components in the format (need this for the color `ColorPanel` being displayed).
	
- Similarly the color value can be provided in one of 3 forms:

	- `[component list]` => The components need to follow the `format` specified. i.e. for `RGB`, it should be [r,g,b]

	- `0xnumber` => Same point here the bytes need to follow the `format` specified from MSB to LSB

	- `'#hexcode'` => Standard coloring hex code . The `format` is only used for determining the internal byte representation.

- Changed `align` constraint to `pad` for string types. 

- `align` constraint now represents the horizontal alignment of the string values inside the respective textboxes of the **`Input Dialog`**


# 2021-08-17 Changes

## Tool Updates
- Fixed the visual bug with List Panel (used for **`D_Choice & D_MultiChoice`** types) where the frame was coming out and the window just kept enlarging too much.

- Disabled the corner size-grips from going beyond specified `maxWidth` & `maxHeight` if any.

- Added a **"Global"** patch that is now available by default when an exe is loaded.

	- The purpose of this patch is to allow for a common patch to stage changes shared by multiple patches.

  	- Therefore it will not be available for selection in the **`Patch List`**.

- Added **`Exe.ActivateGlobal` & `Exe.ClearGlobal`** functions to work with the aforementioned **"Global"** patch (as counterparts to **SetActivePatch** & **ClearPatch**.

  These also selects & deselects the **"Global"** patch respectively unlike their counterparts.

- Added **`ActivePatch`** property to **`Exe`** object which reflects the name of the currently active patch.

  You can also set it directly instead of using **SetActivePatch** function.

- **`Exe.ClearPatch` & `Exe.SetActivePatch`** can now be invoked without arguments. Behavior for empty argument is as follows:

	- **`Exe.ClearPatch`** => will clear the changes in the active patch.
	
	- **`Exe.SetActivePatch`** => will keep no patch as active. Same thing happens if you assign **`Exe.ActivePatch`** member directly.

- Added **`Exe.UndoChanges`** function to revert the changes setup for a range of addresses.

- Added **`Exe.FreeUp`** function to revert the changes setup & free up a range of addresses from `DIFF` section.

- Added **`Exe.BeginTag` , `Exe.EndTag` , `Exe.DelTag`** for associating tag names with set of changes & address reservations (in `DIFF` section) to tag names.

	- The first 2 are used to mark the beginning & ending of the tagging process.

	- If **`Exe.BeginTag`** is again invoked with the same name, the previous changes gets wiped (and you can optionally `FreeUp` any reservations too).

	- The 3rd one is for deleting a tag. With this you have the option of either preserving or discarding the staged changes & reservations respectively.


# 2021-08-16 Changes

## Tool Updates
- Added overloads for **`Warp.Define` , `Warp.Encrypt` & `Warp.Execute`** functions to accept list of strings (which gets concatenated internally).

- Added support for links in titles, tooltips & descriptions of **`Patch List & Extension List`** (latter only makes sense while testing though).

- A `linkText` key is now available for specifying color for these link texts (items in the lists) inside a **`Style file`**

- Right clicking on the items in **`Patch List, Extension List & Exe List`** will now copy the details to the clipboard.

- All **`patch`** functions & sub-functions as well as **`extension`** functions get their respective titles as optional 2nd argument now.

- Added **`allowSkip`** key for use in **`Patches.yml` & `Extensions.yml`** to allow skipping of patches & extensions respectively without reporting it as a warning.

  The **`SkippedPatches.log`** file will still have the details.

- Fixed the issue where patches & extensions could not be fully empty.

  Now you can just specify the `<name>` alone without any keys attached to use the defaults for the other details.

- Fixed the issue with `Ctrl+Q` interruption mechanism.

- Fixed the issue with empty string auto-returning false for all the string types in **`Exe.GetUserInput`**

- Modified the usage of **`D_Hex`** type. Now it only has 2 constraints to guide it

	- **`endian`** => Indicates the endianness of the displayed values. This can be either `little` or `big` . Default is `big` .
	
	- **`byteCount`** => The number of bytes expected to be stored. Default is 1

- Added optional `stepSize0`, `stepSize1`, `stepSize2` & `stepSize3` constraints to use for the respective individual elements of **`D_Vec\*`** types.

- Enabled global `min`, `max` and `stepSize` constraints to **`D_Vec\*`** as well.

  If the individual constraint is not available, the elements will pick up these.

- The escape characters `\n` and `\t` now gets displayed properly in the **`Output`** section. Same goes for blank spaces.

- Added `maxWidth` and `maxHeight` constraints in the **`Input Dialog`** for all types.

- Added **`Warp.clearEditor` & `Warp.clearOutput`** functions for clearing the **`Script Editor` & `Output`** sections respectively from Scripts or the editor itself.

  **Please note that the starting letter is small unlike other functions** (need this way, since these serve as signals)


# 2021-08-15 Changes

## Tool Updates
- Added option in the **`Settings`** dialog to show the modifications setup via **`Exe.Set\*` & `Exe.Add\*`** functions.

- Added **`Exe.ProtectChanges`** function to selectively avoid the above switch when needed. It gets automatically re-enabled when the patch/extension function call is over. 

- Added **`Exe.SetFloat` & `Exe.GetFloat`** functions. Also added **`Exe.SetBytes`** function for list of bytes.

- Added **`Exe.Add\*`** variants of all the numeric types (including float) as well as list of bytes.


# 2021-07-31 Changes

## Patch Updates
- Fixed the remaining [issue with Increase Hair style patches](https://github.com/Neo-Mind/WARP/issues/56).


# 2021-07-29 Changes

## Patch Updates
- Corrected 1 issue in "Add Chris' lua overrides" patch.

- Divided the HP bar resize patch for mobs into 3 => 1 for Normal, 1 for Mini-Boss and 1 for Boss monster respectively.

  Now no more [conflicts about the health bar](https://github.com/Neo-Mind/WARP/issues/57).

- Fixed the [byte order issue in Packet Key patches](https://github.com/Neo-Mind/WARP/issues/55). 

  The `PACKET` object now better recognizes patched clients and `Get Packet Keys` extension works correctly for patched clients too.


# 2021-07-25 Changes

## Patch Updates
- Rearranging some codes and using `const` where appropriate.

## Tool Updates
- Added `findAs` function to `Array` types as an extended version of `find`. The function provided as argument can return the result required instead of `true`.

- Forgot to identify `GetInstr` function earlier. Fixed now.


# 2021-07-24 Changes

## Patch Updates
- Fixed [issue in Packet key patches](https://github.com/Neo-Mind/WARP/issues/55) for latest clients.

- Fixed [issue with Resize MVP health bar](https://github.com/Neo-Mind/WARP/issues/57).

## Tool Updates
- Corrected 1 bug in `OpData` class.


# 2021-07-23 Changes

## Patch Updates
- Updated patches using the placeholder functions to remove the deprecated functions.

- Minor cleanup also being done (using `const` and swapping out `forEach` with `for of`)

## Extension Updates
- A little bit of cleanup (using `const` and swapping out `forEach` with `for of`)


# 2021-07-22 Changes

## Patch Updates
- Converted a lot of `let` to `const`

- Changed some of the `forEach` functions to `for of` loops.

## Tool Updates
- Changed the placeholder functions to use `_` & `_.` instead of `?` to avoid clashing with regular wildcards.

- Removed `SwapFiller` & `SetFillTarget` function (kind of redundant with the other one without much benefits).

- Changed the way the byte count is sent to `SwapFillers` and `SetFillTargets`, now the byte count can be clubbed with the index as a string key => `"index, bc"`

- Also, for `SetFillTargets`, the starting address needs to be provided in the map argument itself using the key `start`. If it's not there then `0` is assumed.

- Converted a lot of `let` to `const`

- Changed some of the `forEach` functions to `for of` loops.

- Changed `LOCK`, `REPE` & `REPN` to `ILOCK`, `IREPE` & `IREPN` respectively. The first 3 are now functions instead to automatically prefix these values.

  `REP` function has also been provided as an alias to `REPE`. Check the wiki for more details. 

- Added string instructions to use with the `REP*` functions.

- Updated **'Init'** scripts to reflect the changes in placeholder functions.


# 2021-07-15 Changes

## Patch Updates
- Added patch for [Chris' lua overrides](https://github.com/llchrisll/ROenglishRE/tree/master/Custom%20Lua%20Files)

## Extension Updates
- Bug fix (Changed all the wrong `CaseInsensitive` names to `CASE_INSENSITIVE`).

- Added the missing `_` variable in `GenMapEffectPlugin.qjs`


# 2021-07-12 Changes

## Patch Updates
- Fixed bug in [Disable Multiple Windows](https://github.com/Neo-Mind/WARP/issues/52) patch.

- Some minor cleanup.


# 2021-07-07 Changes

## Patch Updates
- Fixed issue with doram palette in **`Increase Hairstyle`** patches.

- (Hopefully) Fixed the rendering bug with [Increase Zoom](https://github.com/Neo-Mind/WARP/issues/44) patches.

## Tool Updates
- Added thai language file with translations for the new entries.

- Changed the pattern for 1 byte fillers to use `?.` prefix . The earlier pattern was creating chaos when the bytes are clubbed together.


# 2021-07-06 Changes

## Tool Updates
- Added [Exe.ClearSavedInput](https://github.com/Neo-Mind/WARP/wiki/Exe-Object#patch-related) for clearing existing inputs. Useful in Test Bench.

- Fixed the bug with WARP crashing when running **`Exe.GetUserInput`** from [Script Window](https://github.com/Neo-Mind/WARP/wiki/Script-Window).


# 2021-07-05 Changes

## Patch Updates
- Converted comments in all the patch scripts to use `$$` function for optional reporting.

## Tool Updates
- Added few instruction constants.

	- **`FP_START`** = Frame pointer begins (`push ebp` followed by `mov ebp, esp`)
	
	- **`FP_STOP`**  = Frame pointer ends (`mov esp, ebp` followed by `pop ebp`)
	
	- **`POP_EAX`**  = Obvious no?
	
	- **`CDQ`**
	
	- **`INT3`**

- Changed [Exe.IsSelected](https://github.com/Neo-Mind/WARP/wiki/Exe-Object#patch-related) function to [Warp.GetPatchState](https://github.com/Neo-Mind/WARP/wiki/Warp-Object#functions) for logical reasons.

- Changed [Exe.TestMode](https://github.com/Neo-Mind/WARP/wiki/Exe-Object#properties) to [Warp.TestMode](https://github.com/Neo-Mind/WARP/wiki/Warp-Object#properties) as well.

- Added 2 functions for displaying messages from patch/extension scripts.

	- **`Warp.InformUser`** = Used for information messages
	
	- **`Warp.WarnUser`**   = Used for warning messages

- Added support for user interrupts with **`Ctrl+Q`** sequence while selecting multiple patches in [Main GUI] and running tests in [Test Bench].

- Added switches for **`RegEx`** & **`Case sensitivity`** in all the filter and search inputs.

- Updated **`Dark_Mode`** style for the new entries in UI (for e.g. the filter/search options).

- Updated the templates for [Language](https://github.com/Neo-Mind/WARP/wiki/Language-File) & [Style](https://github.com/Neo-Mind/WARP/wiki/Style-File) files.


# 2021-07-02 Changes

## Tool Updates
- Removed [NO_ALLOC](https://github.com/Neo-Mind/WARP/wiki/Scripted-API#strings--error-messages) constant since it is no longer needed.

- Changed the pattern generated by [Filler](https://github.com/Neo-Mind/WARP/wiki/Scripted-Functions#filler-functions) function for bc = 1. Now it looks like ?01 and ?121 etc.

- Added the reflection options in [Instr](https://github.com/Neo-Mind/WARP/wiki/Instr) class and [CaseAddr](https://github.com/Neo-Mind/WARP/wiki/Scripted-Functions#extractors) function.

- Added [Exe.GetSavedInput](https://github.com/Neo-Mind/WARP/wiki/Exe-Object#user-input) function to retrieve the value of a previously saved user input (either obtained from `session file` or using [Exe.GetUserInput](https://github.com/Neo-Mind/WARP/wiki/Exe-Object#user-input)

- Added support for encrypted scripting. To achieve this, following 3 functions have been added:

	- **`Warp.Encrypt`** = Converts a script code into it's equivalent encrypted bytes. Output is in hex form.

	- **`Warp.Execute`** = Evaluates the provided encrypted hex in the underlying JS engine and return the result.

	- **`Warp.Define`**  = Execute the provided encrypted hex and assign the result to the specified global variable. Returns false if an error occured or if the result was `undefined`.

- Added **`UserChoice`** function as a quick wrapper for yes/no questions to user. Primarily used in extensions.

- Converted comments in all the initialization scripts to use `$$` function for optional reporting. Should be helpful for debugging in future.

## Extension Updates
- Converted comments in all the extension to use `$$` function for optional reporting. Should be helpful for debugging in future.


# 2021-06-30 Changes

## Tool Updates
- Modified Language **`translations`** to check for **`find`** patterns case-insensitively.

- Fixed bug with filters not looking for translated text. Now they will look for both translated & original texts.

- Fixed bug with **`D_Color`** type when returning default value.


# 2021-06-26 Changes

## Tool Updates
- Added *numeric vector* input [DataTypes](https://github.com/Neo-Mind/WARP/wiki/Inbuilt-API#datatype)

	- **`D_VecI8, D_VecI16, D_VecI32`**

	- **`D_VecI8, D_VecI16, D_VecU32`**

	- **`D_VecF`**
	
- All the **`D_Vec`** can have upto `4` elements. The size is determined by the default value provided.

- All of them have individual constraints for setting **`min & max`** values as well as specifying a **`name`**.

  For e.g. `index 1` can be setup as `min1: 3, name1: "X Coord"`. If the `name` is not provided then it defaults to `Index1`


# 2021-06-25 Changes

## Tool Updates
- Added `view` button along with `browse` button for [D_InFile & D_OutFile](https://github.com/Neo-Mind/WARP/wiki/Inbuilt-API#datatype) types to open currently specified filename.

- Fixed bug with saving user inputs of [D_Choice & D_MultiChoice](https://github.com/Neo-Mind/WARP/wiki/Inbuilt-API#datatype) types.


# 2021-06-24 Changes

## Tool Updates
- Added reflection support to all the **`Exe.Get`** functions

	- i.e. any existing changes staged by patches can now be `reflected` while retrieving the values.

	- To do this an additional (optional) boolean argument has been added to all of the **`Exe.Get`** functions.
	
- Renamed **`D_List & D_MultiList`** types to [D_Choice & D_MultiChoice](https://github.com/Neo-Mind/WARP/wiki/Inbuilt-API#datatype) respectively.

	- Also added `Selected value` display and filtering support (similar to `Patch List`) for both of them.


# 2021-06-23 Changes

## Tool Updates
- Added [Warp.SetPatchState](https://github.com/Neo-Mind/WARP/wiki/Warp-Object#functions) function for updating the 'selection' state from script.

- Added dependency chain support (using **`'needs'`** key in **`Patches.yml`**

- Added case-insensitive search option to [Exe.FindText & Exe.FindTextN] functions (only for default encoding i.e. [ASCII](https://github.com/Neo-Mind/WARP/wiki/Inbuilt-API#encoding)).

	- [CASE_SENSITIVE & CASE_INSENSITIVE](https://github.com/Neo-Mind/WARP/wiki/Inbuilt-API#sensitivity) keywords have been added to support this.


# 2021-06-22 Changes

## Tool Updates
- Added **`D_Float`** user input [DataType](https://github.com/Neo-Mind/WARP/wiki/Inbuilt-API#datatype)

- Added **`'stepSize'`** constraint for all numeric inputs.

- Added [System.Trash](https://github.com/Neo-Mind/WARP/wiki/System-Object#modifications) command for moving files to `Recycle Bin`

- Added an optional ***`Build Version`*** display in [Main GUI]

- Added **`Settings`** dialog containing the following options & buttons :

	- [Main GUI]

		- Option to show `Build Version` along with `Build Date`.
		- Option to enable/disable usage of EPI.
		- Option to enable/disable generation of .secure.txt file along with **Target Exe**.
		- Option to enable/disable generation of session files along with **Target Exe**.
		- Option to keep the inputs as-is while loading session files.
		- Button for saving current resolution of **Main & Script** windows as the default.
		
	- [Test Bench]

		- Option to keep the inputs as-is while loading session files.
		- Option to stop running tests when the first error is encountered.
		- Button for saving current resolution as the default.


# 2021-06-21 Changes

## Tool Updates
- Added **`Settings`** & **`Donate`** buttons to both GUIs

- Modified [Exe.FindSpace](https://github.com/Neo-Mind/WARP/wiki/Exe-Extractors#content-query) function to return **`[PHYSICAL, VIRTUAL]`** address pair

- **`Exe.FindSpace`** also throws an error automatically in case it fails.


# 2021-06-20 Changes

## Patch Updates
- Slightly changed the title of **`OpenToServiceSelect`** patch.

- Added patches to

	- Restore Auto Follow

	- Hide Ingame Windows

	- Draw Shield on Top

	- Fix Achievement Counters

## Tool Updates
- Updated [SwapFiller & SetFillTarget] functions to accept array of strings.

- Added **`IsMain`** property to **ROC** object to indicate that the client is Main one (i.e. neither RE nor Zero type).


# 2021-06-17 Changes

## Patch Updates
- Added patches to

	- Enable Custom Homunculi

	- [Fix homunculus attack AI](https://github.com/Neo-Mind/WARP/issues/38)

	- Send client flags

	- Allow all items in Shortcut

	- Remove Adventurer Agency from Party

	- Fix Charset for Fonts

	- Customize Merchant store URL

	- Hide packets from PEEK

	- Use 'identified' drops for Boss (MVP) mob
	
- Added cleanup function to PreviewInShop to work with Send Client Flags patch

- Started fine tuning & comment fixes in scripts

- Updated some of the entries in Patch list (Patches.yml)


# 2021-06-14 Changes

## Patch Updates
- Added patch to [Enable item preview in Cash Shop](https://github.com/Neo-Mind/WARP/issues/17).

- Added patch to Decrease the zoom to 25% of Maximum.

- Fixed 1 remaining bug with Hide Buttons patch for new UI for slightly older clients.

## Tool Updates
- Fixed 1 bug in **`<number>.toIEEE`** function for conversion of float to IEEE hex string.


# 2021-06-12 Changes

## Patch Updates
- Added patch to [Enable Custom Player Skills](https://github.com/Neo-Mind/WARP/issues/25).

## Tool Updates
- Updated signature of [SwapFiller & SetFillTarget] functions to accept index & bytecount together as a tuple (2 element array).


# 2021-06-11 Changes

## Patch Updates
- Added patch for [Opening to Service Select from login screen](https://github.com/Neo-Mind/WARP/issues/35) in latest clients.

- Added patch for [Restoring Songs Effects](https://github.com/Neo-Mind/WARP/issues/36)

- Fixed bug in [Selected Login Background](https://github.com/Neo-Mind/WARP/issues/33) patch.

- Fixed bug in [Hide Buttons patch for new UI](https://github.com/Neo-Mind/WARP/issues/32).

- Fixed bug in [Custom Shields patch](https://github.com/Neo-Mind/WARP/issues/37) related to showing two handed weapons.

- Fixed bugs in **`Show Exp Numbers`** patch. Thanks [@Haziel](https://github.com/SirHaziel) for pointing it out.

## Tool Updates
- Slight update to **`LUA.addLoaders`** function to report the reference lua file name (in case it fails)


# 2021-06-10 Changes

## Patch Updates
- Made the higher limit of **`Custom Jobs`** patch a user input (restricted to max of `5000`).

- Fixed the [arrow translations](https://github.com/Neo-Mind/WARP/issues/24). Since we are restricted to ASCII table, the best resembling values were picked from them.

- Fixed remaining [bugs in Increase Hairstyle patches](https://github.com/Neo-Mind/WARP/issues/16) (hopefully I have covered all the missed tables now)

- Updated **`Shared Head palette`** patches to work well with **`Increase Hairstyle`** patches. 

- Fixed the **`Shared Body palette`** patches for costume palettes and doram palettes. 

- Corrected descriptions for **`Shared Head palette`** patches & **`Translate Arrows`** patch.

## Tool Updates
- Updated **`LUA.addLoaders`** with option to load the reference lua file either before or after the new ones. You can also completely skip it.


# 2021-06-05 Changes

## Patch Updates
- Fixed final [bug with Custom Vending Limit](https://github.com/Neo-Mind/WARP/issues/15) patch that was present in newer clients.

- Fixed 1 typo in **`Patches.yml`** (thanks [@Everade](https://github.com/Everade) for pointing it out).

- Fixed titles for user inputs in **`Resize \* Box`** patches.

- Fixed 1 typo in [Translate arrows to English](https://github.com/Neo-Mind/WARP/issues/24) patch. But still the arrows arent correct.

## Tool Updates
- Added link to Changelog in [README](README.md).


# 2021-06-03 Changes

## Patch Updates
- Added patch to [Show Damage for GvG](https://github.com/Neo-Mind/WARP/issues/23).

- Added patch to [Translate arrows to English](https://github.com/Neo-Mind/WARP/issues/24).

- Fixed issues with **`Packet Key`** patches.

- Fixed [issue with Custom Vending Limit](https://github.com/Neo-Mind/WARP/issues/15) patch.

- Fixed [issue with Custom Walk Delay](https://github.com/Neo-Mind/WARP/issues/26) patch.

- Fixed [issue with Close Cutin on Esc key](https://github.com/Neo-Mind/WARP/issues/28) patch.

- Updated the translation made by [@Everade](https://github.com/Everade).

## Extension Updates
- Fixed problem with **`Get Packet Keys`** extension (now it is able to get the keys from patched clients as well).

[Main GUI](https://github.com/Neo-Mind/WARP/wiki/Main-GUI)
[Test Bench](https://github.com/Neo-Mind/WARP/wiki/Test-Bench)
[SwapFiller & SetFillTarget](https://github.com/Neo-Mind/WARP/wiki/Scripted-Functions#filler-functions)
