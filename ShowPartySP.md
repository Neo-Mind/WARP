
# Add SP Bar for party members

## Demo

<video src="https://raw.githubusercontent.com/Neo-Mind/Wikages/base/WARP/Clips/SpBar_Demo.mp4" width="800" controls></video>

**`@spbar` Command**

<video src="https://raw.githubusercontent.com/Neo-Mind/Wikages/base/WARP/Clips/SpBar_cmdDemo.mp4" width="800" controls></video>

## Client side
> Available for all dates from 2010-08 to 2021-01

> Party member's SP color can be customized

## Server side
> Diff file available for rAthena (Hercules to be added based on demand).

## What's included?

### Server-side modifications

- You can control the visibility of the SP bar with a new config => `party_sp_on` which can take either 0 or 1.

- You can also change the visibility in game using `@spbar` command.

- Diff file provided can be easily added to your server with `git apply` command.

### Modified client (only for Option 1 mentioned below)

- A fresh client with the specified date will be patched and provided.

- If you need the patch on your own modified client, the charges may or may not vary depending on the client provided.

- As shown in the demo, the SP bar color is kept different for party members. 

- You can opt to either keep it same as the current player or customize it.

- There will be no additional charge for it (even if you decide to change the color later).

### Script (only for Option 2 mentioned below)

- An encrypted script (EJS) file will be provided which defines the patch function specific for your client date.

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
