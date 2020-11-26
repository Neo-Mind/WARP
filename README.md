<p align="center">
    <img src="Docs/logo.png?raw=true" alt="Warp logo" width=128 height=128>
</p>

<h1 align="center">
	Win App Revamp Package
</h1>

<p align="center">
	Handy set of tools for Querying and Revamping a 32 bit Windows Application
	<br>
	<a href="https://github.com/Neo-Mind/WARP/issues/new?template=bug_report.md"><strong>Report bug</strong></a>
	·
	<a href="https://github.com/Neo-Mind/WARP/issues/new?template=feature_request.md"><strong>Request feature</strong></a>
	·
</p>
<br>

## What's included

- In this repository you will find the following directories and files, grouped based on the purpose of all the resources.
- Also provided are different branches depending on the OS & the client application.

```text
WARP/
│
├── README.md        (This readme file)
│
├── LICENSE          (GPL-3.0 license file)
│
├── ICON_attribution (Attribution for the tool icons & the logo)
│
├── Patches.yml      (YAML file describing all the patches)
│
├── Extensions.yml   (YAML file describing all the extensions)
│
├── Settings.yml     (YAML file containing all the tool settings)
│
├── LastSession.yml  (YAML session file from the last revamp)
│
├── Docs/     (All files used for Documentation purposes)
│   │
│   ├── logo.png
│   └── Snapshots
│       │
│       ├── Warp.png
│       ├── Warp_Tester1.png
│       ├── Warp_Tester2.png
│       ├── Warp_Tester3.png
│       └── Warp_Tester4.png
│
├── Fonts/    (All fonts contained in here are automatically loaded. Electrolize is used as default.)
│   │
│   ├── Electrolize-Bold.ttf
│   ├── Electrolize-Regular.ttf
│   └── OFL.txt
│
├── Images/   (Contains all images used by the Tools.)
│   │
│   ├── ICON_attribution
│   ├── actns_a.png
│   ├── actns_i.png
│   ├── ascend.png
│   ├── bold_off.png
│   ├── bold_on.png
│   ├── browse_a.png
│   ├── browse_i.png
│   ├── clear_a.png
│   ├── clear_i.png
│   ├── descend.png
│   ├── discord.png
│   ├── error_header.png
│   ├── extns_a.png
│   ├── extns_i.png
│   ├── github.png
│   ├── grip.png
│   ├── info.png
│   ├── italic_off.png
│   ├── italic_on.png
│   ├── next_a.png
│   ├── next_i.png
│   ├── prev_a.png
│   ├── prev_i.png
│   ├── query_header.png
│   ├── rcmd_i.png
│   ├── rcmd_s.png
│   ├── search.png
│   ├── success_header.png
│   └── warn_header.png
│
├── Scripts/
│   │
│   ├── Support/        (Contains all scripts which add supporting data & functions for Patches & Extensions.)
│   │   │
│   │   ├── AllFuncs.qjs
│   │   ├── Class_IPrefix.qjs
│   │   ├── Class_Instr.qjs
│   │   ├── Class_ModRM.qjs
│   │   ├── Class_OpData.qjs
│   │   ├── Class_PtrSize.qjs
│   │   ├── Class_Register.qjs
│   │   ├── Class_SIBase.qjs
│   │   ├── Constants.qjs
│   │   ├── Instructions.qjs
│   │   ├── Instructions_ST.qjs
│   │   ├── Instructions_XMM.qjs
│   │   └── Overrides.qjs
│   │
│   ├── Patches/        (Add all scripts implementing Patches here.)
│   │
│   ├── Extensions/     (Add all scripts implementing Extensions here.)
│   │
│   └── Init/           (Add all initialization scripts here. Gets loaded each time an app is loaded.)
│
├── Languages/     (Add all Language description YAML files here.)
│
├── Styles/        (Add all Styling description YAML files here.)
│
├── Inputs/        (Add all input files for Patches & Extensions here.)
│                  
├── Outputs/       (Use this folder for generating files from Extensions & Patches.)
│
└── <os_specific_folder>/    (Contains the tool along with DLL/SO files)
```

## Documentation Links

- [Usage Guide](Docs/Usage_Guide.md)
- [Patch & Extension Guide](Docs/PatExt_Guide.md)
- [Writing Scripts](Docs/Script_Writing.md)
- [API Documentation](Docs/API_Documentation.md)
- [Settings & Session files](Docs/Setting_Session.md)
- [Writing Language files](Docs/Language_Writing.md)
- [Writing Style files](Docs/Style_Writing.md)
