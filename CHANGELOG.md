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


# 2021-07-10 Changes

## Patch Updates
- Fixed the ordering for **`D_Color`** in the **`Customize Chat Color` & `Customize Slot Highlight color`** patches.


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

- Added support for user interrupts with **`Ctrl+Q`** sequence while selecting multiple patches in [Main GUI](https://github.com/Neo-Mind/WARP/wiki/Main-GUI) and running tests in [Test Bench](https://github.com/Neo-Mind/WARP/wiki/Test-Bench).
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
- Added an optional ***`Build Version`*** display in [Main GUI](https://github.com/Neo-Mind/WARP/wiki/Main-GUI)

- Added **`Settings`** dialog containing the following options & buttons :

	- [Main GUI](https://github.com/Neo-Mind/WARP/wiki/Main-GUI)
		- Option to show `Build Version` along with `Build Date`.
		- Option to enable/disable usage of EPI.
		- Option to enable/disable generation of .secure.txt file along with **Target Exe**.
		- Option to enable/disable generation of session files along with **Target Exe**.
		- Option to keep the inputs as-is while loading session files.
		- Button for saving current resolution of **Main & Script** windows as the default.
		
	- [Test Bench]([Main GUI](https://github.com/Neo-Mind/WARP/wiki/Test-Bench)
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
- Updated [SwapFiller & SetFillTarget](https://github.com/Neo-Mind/WARP/wiki/Scripted-Functions#filler-functions) functions to accept array of strings.
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
- Updated signature of [SwapFiller & SetFillTarget](https://github.com/Neo-Mind/WARP/wiki/Scripted-Functions#filler-functions) functions to accept index & bytecount together as a tuple (2 element array).


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
