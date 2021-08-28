
## Add SP Bar for party members

### Demo


### Client side
> Available for all dates from 2010-08 to 2021-01

> Party member's SP color can be customized

### Server side
> Diff available for rAthena (Hercules to be added based on demand).

### What's included?

- Server-side modifications

	- You can control the visibility of the SP bar with a new config => `party_sp_on` which can take either 0 or 1.

	- You can also change the visibility in game using `@spbar` command.

	- Diff file provided can be easily added to your server with `git apply` command.

- Modified client (only for Option 1 mentioned below)

	- A fresh client with the specified date will be patched and provided.

	- If you need the patch on your own modified client, the charges may or may not vary depending on the client provided.

	- As shown in the demo, the SP bar color is kept different for party members. 

	- You can opt to either keep it same as the current player or customize it.

	- There will be no additional charge for it (even if you decide to change the color later).

- Script (only for Option 2 mentioned below)

	- A QJS file containing the encrypted patch function will be provided.

	- The `Premium.yml` file will be provided which gets imported by `Patches.yml` by default.

	- If the file is already present for some reason, you can simply add the entries there.

### Pricing
There are 2 options available:

- Option 1:

	- Client of specified date will be patched and provided => 60$

	- If you need the same for different dates in future => +10$

- Option 2:

	- Script to patch the specified client date will be provided => 70$

	- If you need the same for different dates in future => +10$

