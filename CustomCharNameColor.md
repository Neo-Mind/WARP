
# Customize Color for character names

## Demo

<video src="https://raw.githubusercontent.com/Neo-Mind/Wikages/base/WARP/Clips/NameColor_Demo.mp4" width="800" controls></video>

**`setnamecolor` & `unsetnamecolor` commands**

<video src="https://raw.githubusercontent.com/Neo-Mind/Wikages/base/WARP/Clips/NameColor_cmdDemo.mp4" width="800" controls></video>

## Client side
> Available for all dates from **2010-08** to **2021-01**

> Color is controlled completely server-side, hence no additional files needed.

## Server side
> Diff & SQL Files available for rAthena (Hercules to be added based on demand).

> Each character's color can be configured in anyway you want.

> By default, a new SQL table is used for connecting character IDs to their colors.

## What's included?

### Server-side modifications

- You can enable/disable coloring of names with a new config => `allow_char_name_colors` which can take either 0 or 1.

- You can change the colors in game by means of the `@setnamecolor` command (`#setnamecolor` for changing other characters).

- Similarly you can use `@unsetnamecolor` for erasing the color.

- Diff file will be provided to make the source changes required and it can be easily added to your server with `git apply` command.

- SQL file will be provided for creating the aformentioned color database for the characters.

### Modified client (only for Option 1 mentioned below)

- A fresh client with the specified date will be patched and provided.

- If you need the patch on your own modified client, the charges may or may not vary depending on the client provided.

### Script (only for Option 2 mentioned below)

- A set of encrypted script (EJS) files will be provided which defines the patch function & associated functions specific for your client date.

- `Premium.yml` file will be provided which is automatically imported by `Patches.yml`.

- If the YAML file is already present for some reason, you can simply add the entries there.

  Feel free to ask me or consult the [Wiki](https://github.com/Neo-Mind/WARP/wiki/Writing-Patches#defining-patches) for the same.

## Pricing
There are 2 options available:

### Option 1:

- Client of specified date will be patched and provided => **60$**

- If you need the same for different dates in future => **+10$**

### Option 2:

- Script to patch the specified client date will be provided => **70$**

- If you need the same for different dates in future => **+10$**
