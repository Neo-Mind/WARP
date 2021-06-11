# 2021-06-12 Changes

## Patch Updates
- Added patch to [Enable Custom Player Skills](https://github.com/Neo-Mind/WARP/issues/25).


# 2021-06-11 Changes

## Patch Updates
- Added patch for [Opening to Service Select from login screen](https://github.com/Neo-Mind/WARP/issues/35) in latest clients.
- Added patch for [Restoring Songs Effects](https://github.com/Neo-Mind/WARP/issues/36)
- Fixed bug in [Selected Login Background](https://github.com/Neo-Mind/WARP/issues/33) patch.
- Slight update to `addLoaders` function to report the reference lua file name (in case it fails)
- Fixed bug in [Hide Buttons patch for new UI](https://github.com/Neo-Mind/WARP/issues/32).
- Fixed bug in [Custom Shields patch](https://github.com/Neo-Mind/WARP/issues/37) related to showing two handed weapons.
- Fixed bugs in Show Exp Numbers patch. Thanks [@Haziel](https://github.com/SirHaziel) for pointing it out.


# 2021-06-10 Changes

## Patch Updates
- Made the higher limit of Custom Jobs patch a user input (restricted to max of 5000).
- Fixed the [arrow translations](https://github.com/Neo-Mind/WARP/issues/24). Since we are restricted to ASCII table, the best resembling values were picked from them.
- Fixed remaining [bugs in Increase Hairstyle patches](https://github.com/Neo-Mind/WARP/issues/16) (hopefully I have covered all the missed tables now)
- Updated Shared Head palettes to work well with Increase Hairstyle patches. 
- Fixed the Shared Body Palette patches for costume palettes and doram palettes. 
- Corrected descriptions for Shared Head palette patches & Arrow translation patch.
- Updated `addLoaders` function of `LUA` object with option to load the reference lua file either before or after the new ones. You can also completely skip it.


# 2021-06-05 Changes

## Patch Updates
- Fixed final [bug with Custom Vending Limit](https://github.com/Neo-Mind/WARP/issues/15) patch that was present in newer clients.
- Fixed 1 typo in Patches.yml (thanks [@Everade](https://github.com/Everade) for pointing it out).
- Fixed titles for user inputs in Resize \* Box patches.
- Added link to Changelog in README.
- Fixed 1 typo in [Translate arrows to English](https://github.com/Neo-Mind/WARP/issues/24) patch. But still the arrows arent correct.


# 2021-06-03 Changes

## Patch Updates
- Added patch to [Show Damage for GvG](https://github.com/Neo-Mind/WARP/issues/23).
- Added patch to [Translate arrows to English](https://github.com/Neo-Mind/WARP/issues/24).
- Fixed issues with Packet Key patches.
- Fixed [issue with Custom Vending Limit](https://github.com/Neo-Mind/WARP/issues/15) patch.
- Fixed [issue with Custom Walk Delay](https://github.com/Neo-Mind/WARP/issues/26) patch.
- Fixed [issue with Close Cutin on Esc key](https://github.com/Neo-Mind/WARP/issues/28) patch.
- Updated the translation made by [@Everade](https://github.com/Everade).

## Extension Updates
- Fixed problem with Get Packet Key extension (now it is able to get the keys from patched clients as well).

