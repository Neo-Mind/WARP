
# Customize item name color (Server-controlled)

## Demo

<video src="https://raw.githubusercontent.com/Neo-Mind/Wikages/base/WARP/Clips/INameClrSrvr_Demo.mp4" width="800" controls></video>

**Example With slots**

<video src="https://raw.githubusercontent.com/Neo-Mind/Wikages/base/WARP/Clips/INameClrRa_slotDemo.mp4" width="800" controls></video>

**Example for Herc**

<video src="https://raw.githubusercontent.com/Neo-Mind/Wikages/base/WARP/Clips/INameClrHerc_slotDemo.mp4" width="800" controls></video>

## Client side
> Available for all dates from **2010-08** to **2021-01**

## Server side
> Available for both rAthena & Hercules.

> All the colors are read from a new db file (YAML file for rA, Conf file for Herc).

> Colors for all item names can be customized in the file irrespective of slotted or not.

> As shown, you also have the option of specifying individual colors based on how many slots are occupied for an equipment item.

> In addition to the global name color, it is also possible to change the colors used in the popup balloon seperately.

> You can also specify a base itemid to inherit colors from either partially or completely.

## What's included?

### Server-side modifications

- Diff file will be provided to make the minimum source changes required and it can be easily added to your server with `git apply` command.

- In addition, custom source & header files will also be provided which needs to be put inside your server's `src` folder.

- As stated above the colors for the items are read from a seperate db file (`db/item_colors.yml` for rA, `db/item_colors.conf` for Herc).

- Just like the other db files, this one also gets loaded when the server starts. You can also reload the database using `@reloaditemcolors` command.

- Since the colors are completely under your control, you will be provided with an empty table and instructions about the keys needed.

### Modified client (only for Option 1 mentioned below)

- A fresh client with the specified date will be patched and provided.

- If you need the patch on your own modified client, the charges may or may not vary depending on the client provided.

### Script (only for Option 2 mentioned below)
- A set of encrypted script (EJS) files will be provided which defines the patch function & associated functions specific for your client date.

- `Premium.yml` file will be provided which is automatically imported by `Patches.yml`.

- If the YAML file is already present, you can simply add the entries there.

  Feel free to ask me or consult the [Wiki](https://github.com/Neo-Mind/WARP/wiki/Writing-Patches#defining-patches) for the same.

## Pricing
There are 2 options available:

### Option 1:

- Client of specified date will be patched and provided => **60$**

- If you need the same for different dates in future => **+10$**

### Option 2:

- Script to patch the specified client date will be provided => **70$**

- If you need the same for different dates in future => **+10$**
