
# Settings file

Tool Settings are saved under the name **'Settings.yml'** which has the following format. 

```yaml
Language: <custom language name or Default (ENG)>
Style: <custom style name or Default>
LastApplied:
  SrcExe: <Source path used for last session. Only set if you run 'Apply Patches'. Same as 'from' in 'LastSession.yml'>
  TgtExe: <Target path used for last session. Only set if you run 'Apply Patches'. Same as 'to' in 'LastSession.yml'>
LastTestDir: <Only used by 'Tester GUI'. Last directory used for loading test applications>
```

- This file is auto-generated the first time you run any of the 3 tools.
- All the keys are optional.
- The **SrcExe** & **TgtExe** values are used for filling the **'Source'** and **'Target'** fields automatically upon launch.
- Similarly **LastTestDir** automatically fills the **'Test Dir'** field in [Tester GUI].
- **Language** and **Style** fields are used for setting up the initial language & style for both [Main GUI] & [Tester GUI].
- [Console] also uses the Language unless overridden with **-language** argument.

# Session file

Sessions are saved as YAML files with the following format.

```yaml
from: <path to the source file>
to: <path to the target file>

patches:
    - firstName
    - secondName
#     etc.

inputs:
    varname1:
        data: <hex sequence>
        display: <its representative string which varies based on 'DataType'>
    
    varname2:
        data: <hex sequence>
        display: <rep string>
    
#   etc.
```

- All the main keys are optional apart from **patches**.
- Names specified in **patches** need to match up with the name (not the title) defined in **'Patches.yml'**. See [Patch & Extension Guide] for details.


[Main GUI]: Usage_Guide.md#main-gui
[Tester GUI]: Usage_Guide.md#tester-gui
[Console]: Usage_Guide.md#console
[Patch & Extension Guide]: PatExt_Guide.md
