# API Documentation
The aim of this document is to provide you a comprehensive view of all the available objects, classes, functions and constants being provided as part of QJS in addition to standard JS.

## Table of Contents
- [Inbuilt Entities](#inbuilt-entities)
	- [Type Values](#type-values)
		- [SectionType](#sectiontype)
		- [AddrType](#addrtype)
		- [DataType](#datatype)
		- [DirType](#dirtype)
		- [Encoding](#encoding)

	- [Other Values](#other-values)
	
	- [Global Objects](#global-objects)
		- [Exe](#exe)
		- [System](#system)
		- [Warp](#warp)

	- [Classes](#classes)
		- [TextFile](#textfile)
		- [BinFile](#binfile)
		- [IExe](#iexe)

- [Scripted Entities](#scripted-entities)

	- [Constants](#constants)

	- [Classes](#classes-1)
		- [IPrefix](#iprefix)
		- [OpData](#opdata)
		- [ModRM](#modrm)
		- [SIBase](#sibase)
		- [PtrSize](#ptrsize)
		- [Register](#register)
		- [Instr](#instr)

	- [Functions](#functions)
		- [Testers](#testers)
		- [Filler Functions](#filler-functions)
		- [Converters](#converters)
		- [Calculators](#calculators)
		- [Extractors](#extractors)
		- [Utilities](#utilities)

	- [Overrides](#overrides)
		- ['console' overrides](#console-overrides)
		- [Testers](#testers-1)
		- [Converters](#converters-1)
		- [Calculators](#calculators-1)
		- [Other addons](#other-addons)

	- [Instructions](#instructions)
		- [Regular](#regular)
		- [ST based](#st-based)
		- [XMM based](#xmm-based)
	
## Inbuilt Entities

The following items have been provided from within the tool itself (hence the 'Inbuilt' part). While there is no explicit way of making them as read only, please treat them as such regardless.

### Type Values

These values serve to indicate a particular type based on the context. They are used in many functions across the objects & classes mentioned below. Internally these become Enumerations in a wrapper.

#### SectionType
Valid values are

| Value | Notes |
|---|---|
| CODE   | Usually .text |
| DATA   | Usually .rdata or .data |
| DATA2  | Sometimes .data is present in addition to .rdata, hence DATA2 is needed |
| IMPORT | usually .rsrc |
| RSRC   | Resource section. usually .rsrc |
| DIFF   | The .xdiff section |
| MIXED  | Only valid for unpacked clients. Essentially a merger of CODE & DATA |

#### AddrType
In WARP we deal with 2 types of addresses - physical & virtual. To represent these 2 we have the corresponding values:
- PHYSICAL
- VIRTUAL

In addition to these, you might occasionally need to deal with a Relative Virtual Address. However you can just convert it to Virtual address, since it is essentially VIRTUAL address - ImageBase. So we do not have a seperate type for it.

#### DataType
These are the types used by **GetUserInput** function, to determine what kind of input is required from user and accordingly show the appropriate UI.<br>
Valid values are

| Value | Description |
|---|---|
| D_Int8     | Signed Integer  8 bit. Ranges from -128 to 127 |
| D_Int16    | Signed Integer 16 bit. Ranges from -32768 to 32767 |
| D_Int32    | Signed Integer 32 bit. Ranges from -2147483648 to 2147483647 |
| D_Uint8    | Unsigned Integer 8 bit. Ranges from 0 to 255 |
| D_Uint16   | Unsigned Integer 16 bit. Ranges from 0 to 65535 |
| D_Uint32   | Unsigned Integer 32 bit. Ranges from 0 to 2147483647 |
| D_Bool     | Boolean (can occupy 8, 16 or 32 bit based on context) |
| D_Text     | Text String |
| D_List     | List of Text Strings |
| D_Hex      | Hex String (spaced out between bytes) |
| D_FontName | Font name (to be picked from font dialog) |
| D_FontSize | Font size (to be picked from font size dialog). Ranges from 0 to 127 |
| D_InFile   | Name of file which serves as input (to be picked from text field or open file dialog) |
| D_OutFile  | Name of file which serves as output (to be picked from text field or save file dialog) |
| D_Color    | Color (RGB hex format from color picker dialog) |

#### DirType
These represent the type of Directories available in an application.<br>
Valid values are

| Value | Description |
|---|---|
| D_Export  | Export Directory |
| D_Import  | Import Directory |
| D_Res     | Resource Directory |
| D_Except  | Exception Directory |
| D_Secure  | Security Directory |
| D_Reloc   | Base Relocation Table |
| D_Debug   | Debug Directory |
| D_Arch    | Architecture Specific Data |
| D_GlobPtr | RVA of Global Pointer |
| D_TLS     | TLS Directory |
| D_LoadCfg | Load Configuration Directory |
| D_BoundI  | Bound Import Directory in headers |
| D_IAT     | Import Address Table (Unsure of its use but Import Directory should be used for finding imports) |
| D_DelayI  | Delay Load Import Descriptors |
| D_ComDesc | COM Runtime descriptor |

#### Encoding

Whenever you deal with text inside the Exe, by default it is considered to be Ascii encoding. To override this, we need to make use of these Encoding values:
- ASCII
- UTF8
- UTF16

### Other Values

All the above values are related to the [Global Objects]. The following values are independent of them.

- TEMPDIR - Temp directory of the host system.
- ROOTDIR - The root directory of the host system. In Windows this will refer to a drive.
- HOMEDIR - User's home directory.

### Global Objects

Currently there are 3 Global Objects being provided inbuilt - Exe, System & Warp

#### Exe
**Exe** is an object always pointing to the currently loaded application. It provides a bunch of properties and a generous set of functions for accessing its internals and for setting up changes for a patch.<br>

Properties :

| Name | Description |
|---|---|
| PEoffset  | The [PHYSICAL][#addrtype] address of the PE header |
| ImageBase | Self explanatory |
| BuildDate | The application's build date in the form "yyyymmdd" |
| Version   | The linker version used for building this app in the form "major.minor" |
| Unpacked  | Self explanatory |
| FileSize  | Self explanatory |
| FilePath  | Self explanatory |
| TestMode  | Set to true when you are loading the app in the [Tester GUI](#Usage_Guide.md#tester-gui) |

Functions :	
- ** Exe.GetUserInput(varName, dtype, title, prompt, defValue, constraints)**<br>
  This function allows you to collect inputs from user. We make use of [DataType] values to determine the type of input required.
  It takes the following arguments.
  
	- **varName**<br>
	  Every input value needs a way to refer it later, For this purpose, we make use of a 'variable name'.
	
	- **dtype**<br>
	  As the 2nd argument we specify one of the valid [DataType] values.
	
	- **title & prompt**<br>
	  As the name suggests these form the Title & Prompt used in the Dialog that shows up to fetch the user input.
	
	- **defValue**<br>
	  The default value for the input. Aside from **D_InFile & D_OutFile**, if the input is not changed from the default value then the function will return false.<br>
	  This behavior can be controlled using the **'saveDefault'** constraint explained below.
	
	- **constraints**<br>
	  This is an optional hash map specifying the constraints which vary based on the type of input.
	  And therefore it would be of the form 
	  ```javascript
	  {
	      name1: <value1>,
	      name2: <value2>
	  }
	  ```
	  
	  Following are the various constraints currently recognized and all of them are optional.
		
		- **saveDefault**<br>
	      Boolean value indicating that default values should be saved as well. If not specified, then the behavior would be dependent on the type (\*File will save others wont).<br>
		  Available for all [DataType]s.
		
		- **acceptText & rejectText**<br>
	      Optional button texts for the OK & Cancel buttons. Available for all [DataType]s.
		  Especially useful for **D_Bool** type.
		
		- **min & max**<br>
	      Lower and Upper Limit overriding the default limits of numeric inputs.<br>
		  Used by the following [DataType]s => **D_Int8, D_Int16, D_Int32, D_Uint8, D_Uint16, D_Uint16, D_FontSize**
	  
		- **minLen & maxLen**<br>
	      Length limits for string inputs. if not specified then they become unlimited in length (theoretically atleast).<br>
		  Used by the following [DataType]s => **D_Text, D_Hex, D_FontName, D_InFile, D_OutFile**
		  Even for **D_Hex**, the length is in bytes rather than the hex string length.
	
		- **align**<br>
	      If the input string entered is less than minimum then remaining space is padded with blank space (NULL byte for hex strings).<br>
		  The **align** constraint specifies whether to keep the value aligned to **right** or **left** . If it is not provided, then **right** alignment is done.
	 	  Used by the following [DataType]s => **D_Text, D_Hex, D_FontName, D_InFile, D_OutFile**
		
		- **reversed**<br>
	      Only used for **D_Hex**. It is a boolean indicating whether we need to reverse the order of bytes in the final value (for e.g. in the case of little endian).<br>
		  If not specified then no reversal take place.
	
		- **encoding**<br>
	      When we deal with text strings in the exe, by default it is taken to be Ascii encoded. If you wish to change that then you can specify it using the **encoding** constraint.
		  Used by the following [DataType]s => **D_Text, D_FontName, D_InFile, D_OutFile, D_List**
	
		- **keepAlpha & ignoreAlpha**
		  Both of these are used only or **D_Color** and pertains to how we use the Alpha component.<br>
		  **keepAlpha** is a boolean which informs the tool to preserve the same alpha component as the default value provided. This means that user will not be shown any Alpha component selection controls in the Color dialog.<br>
		  **ignoreAlpha** is a boolean which makes the tool use an alpha of 1.0 while displaying all the colors in the dialog. This is only used in conjunction with **keepAlpha** to help keep the colors visible rather than translucent.
		
		- **choices**<br>
	      Only used for **D_List**. It provides the list of strings from which the user needs to select one.
		  If not provided then we end up with an empty list, which is not pretty. So don't skip it.
	
		- **dataSize**<br>
	      Only used for **D_Bool**. It specifies the byte size to keep for the boolean value.<br>
		  If provided, the value will be restricted to (1-4). If not provided, dataSize is considered to be 1.

- Patch specific
	- **Exe.IsSelected(name)**<br> 
	  Check whether the Patch by the given name is currently selected.
	
	- **Exe.SetActivePatch(name)**<br>
	  Set the Patch by the given name as the active one. All **Set\*** and **Add\*** functions setup changes into the active patch only.
	
	- **Exe.ClearPatch(name)**<br>
	  Clear any setup done for the Patch by the given name i.e. all changes and reservations are gone.

- Address Conversion
	- **Exe.Phy2Vir(addr, [stype])**<br>
	  Convert a PHYSICAL address to a VIRTUAL one and returns it. It takes an optional [SectionType] argument. If provided, conversion will take place only if the provided address is within that section.<br>
	  In case of failure, it returns -1
	
	- **Exe.Phy2Rva(addr, [stype])**<br>
	  Just like the above one but we get the Relative Virtual Address instead (basically ImageBase isnt added).<br>
	  In case of failure, it returns -1
	
	- **Exe.Vir2Phy(addr, [stype])**<br>
	  Just the reverse of Phy2Vir.<br>
	  In case of failure, it returns -1
    
	- **Exe.Rva2Phy(addr, [stype])**<br>
	  Just the reverse of Phy2Rva.<br>
	  In case of failure, it returns -1

- Section Specific
	- **Exe.GetSectBegin(stype, [atype])**<br>
	  Retrieve the starting address of specified [SectionType]. If [AddrType] is not provided then the PHYSICAL address is retrieved.
	  In case of failure, it returns -1
    
	- **Exe.GetSectEnd(stype, [atype])**<br>
	  Retrieve the ending address of specified [SectionType]. If [AddrType] is not provided then the PHYSICAL address is retrieved.
	  In case of failure, it returns -1
    
	- **Exe.GetSectSize(stype, [atype])**<br>
	  Retrieve the size of specified [SectionType]. Equivalent to **GetSectEnd - GetSectBegin**.<br>
	  In case of failure, it returns 0
    
- Content Retrieval
	- **Exe.GetInt8/Exe.GetInt16/Exe.GetInt32(addr)**<br>
	  Extract the next 8/16/32 bits (1/2/4 bytes) of data from **addr** as a signed integer respectively.
	  In case of failure, it returns 0
	 
	- **Exe.GetUint8/Exe.GetUint16/Exe.GetUint32(addr)**<br>
	  Extract the next 8/16/32 bits (1/2/4 bytes) of data from **addr** as an unsigned integer respectively.
	  In case of failure, it returns 0
	
	- **Exe.GetHex(addr, size)**<br>
	  Extract the next **size** bytes from **addr** as a hex string. If the file doesnt have **size** bytes after **addr** whatever is available is extracted.<br>
	  In case **addr** is at the end of the file OR **Exe** doesnt have any file loaded, it returns an empty string.
	
	- **Exe.GetText(addr, [size], [enc])**<br>
	  Extract the next **size** bytes from **addr** as a text string. If the **size** is negative, then the tool will look for **NULL termination**.<br>
	  **ASCII** is the default encoding. If you need to change it then provide the optional [Encoding] argument.<br>
	  In case **addr** is at a NULL or at the end of the file OR **Exe** doesnt have any file loaded, it returns an empty string.
	
	- **Exe.GetTgtAddr(addr, [atype], [travel])**<br>
	  Extract the next **travel** bytes from **addr**, Calculate and return the target address (used in CALLs & JMPs).<br>
	  If the [AddrType] argument is not provided, then it returns the **VIRTUAL** address.<br>
	  The **travel** argument defaults to 4 bytes. If you expect short Jumps use 1 as **travel**.<br>
	  In case of failure, it returns -1

- Directory specific
	- **Exe.GetDirAddr(dtype, [atype])**<br>
	  Extract the Starting address of the directory specified using [DirType].<br>
	  If the [AddrType] argument is not provided, then it returns the **VIRTUAL** address.
	  In case of failure, it returns -1
	  
	- **Exe.GetDirSize(dtype)**<br>
	  Extract the Size of the directory specified using [DirType].<br>
	  In case of failure, it returns 0
	
- Setters (only affects the active patch. will not alter the target file size)
	- **Exe.SetInt8/Exe.SetInt16/Exe.SetInt32(addr, value)**<br>
	  Adds an entry to overwrite 8/16/32 bits (1/2/4 bytes) of data at **addr** with the signed integer **value**.
	  Returns true if successful.
	
	- **Exe.SetUint8/Exe.SetUint16/Exe.SetUint32(addr, value)**<br>
	  Adds an entry to overwrite 8/16/32 bits (1/2/4 bytes) of data at **addr** with the unsigned integer **value**.
	  Returns true if successful.
	
	- **Exe.SetHex(addr, hex)**<br>
	  Adds an entry to overwrite data at **addr** with a new **hex** string.<br>
	  No of bytes to alter is determined from the byte count in the **hex** string.<br>
	  Returns the number of bytes affected.
	
	- **Exe.SetText(addr, text, [enc])**<br>
	  Adds an entry to overwrite data at **addr** with a new **text** string.<br>
	  No of bytes to alter is determined from the **text** string length.<br>
	  Returns the number of bytes affected.
	
	- **Exe.SetFromVar(addr, varName)**<br>
	  Adds an entry to overwrite data at **addr** with a user input value previously saved under the **varName**.
	  No of bytes to alter is picked up from the input.
	  Returns the number of bytes affected.
	
	- **Exe.SetNOPs(addr, [count])**<br>
	  Adds an entry to overwrite data at **addr** with **NOP instructions**.
	  If the **count** is not provided then only 1 **NOP** is put.<br>
	  Similarly if the **count** > 4, then we make use of a **JMP** internally to avoid CPU cycle wastage.<br>
	  Returns true if successful.

    - **Exe.SetJMP(addr)**<br>
	  Adds an entry to change the conditional jump at **addr** to a **JMP**.<br>
	  Returns true if successful.
	   
	- **Exe.SetJMP(from, to, [atype], [extraNOPs])**<br>
	  Adds an entry to create a **JMP** instruction at the **from** address targetting the **to** address. Short & Long Jumps are taken care of automatically.<br>
	  If the [AddrType] is not provided, the **to** address is expected to be VIRTUAL.<br>
	  If you want to suffix NOPs at the end of the **JMP** instruction then provide the number of **extraNOPs**.<br>
	  Returns true if successful.
	
	- **Exe.SetCALL(from, to, [atype], [extraNOPs])**<br>
	  Similar to the above **SetJMP** function but creates a **CALL** instruction instead.
	  Returns true if successful.
	
	- **Exe.SetTgtAddr(from, to, [atype])**<br>
	  Adds an entry to create a delta value at the **from** address targetting the **to** address.<br>
	  Mostly used for changing the target of an existing **JMP** or **CALL**.<br>
	  If the [AddrType] is not provided, the **to** address is expected to be VIRTUAL.<br>
	  Returns true if successful.
	
	- **Exe.SetDirAddr(dtype, addr, [atype])**<br>
	  Adds an entry to change the starting offset of the specified [DirType] with **addr**.
	  If the [AddrType] is not provided, the **addr** is expected to be VIRTUAL.<br>
	  Returns true if successful.
	  
	- **Exe.SetDirSize(dtype, size)**<br>
	  Adds an entry to change the Size of the specified [DirType] with **size**.
	  Returns true if successful.
	  
- Adders (only affects the active patch. Can alter the target file size.)
	- **Exe.AddHex(addr, hex, [size])**<br>
	  Adds an entry to insert the **hex** string at **addr**. If **addr** is not in the **DIFF** section, then this works identical to **SetHex**.<br>
	  Also marks **size** bytes starting at **addr** as 'reserved' if it is inside **DIFF**.<br>
	  If **size** is negative, the byte count of the **hex** string is used.<br>
	  Returns the number of bytes affected/reserved.<br>
	  <br>
	  **Make sure to use the FindSpace function to get a free address range for insertion **.
	  
	- **Exe.AddText(addr, text, [size], [enc])**<br>
	  Adds an entry to insert the **text** string at **addr**. If **addr** is not in the **DIFF** section, then this works identical to **SetText**.<br>
	  Also marks **size** bytes starting at **addr** as 'reserved' if it is inside **DIFF**.<br>
	  If **size** is negative, the byte count of the **hex** string is used.<br>
	  Returns the number of bytes affected/reserved.<br>
	  <br>
	  **Make sure to use the FindSpace function to get a free address range for insertion **.
	  
	- **Exe.AddFromVar(addr, varName, [size])**<br>
	  Adds an entry to insert the user input value (previously saved under **varName**) at the specified **addr**. If **addr** is not in the **DIFF** section, then this works identical to **SetFromVar**.<br>
	  Also marks **size** bytes starting at **addr** as 'reserved' if it is inside **DIFF**.<br>
      If **size** is negative, the data size is determined from the value itself.<br>
	  Returns the number of bytes affected/reserved.<br>
	  <br>
	  **Make sure to use the FindSpace function to get a free address range for insertion **.
	  
- Query functions
	- **Exe.FindHex(pattern, [from], [to])**<br>
	  Searches the **Exe** for the provided hex string. It can contain wildcard characters such as '?' & '.' . See [Script Writing] for more details.<br>
	  If the **from** address is not provided or is negative then it starts from the **CODE** section's starting address.<br>
	  Similarly if the **to** address is not provided or is negative then search goes on till the end of **CODE** section.<br>
	  Returns -1 if no match found.
	  
	- **Exe.FindHexN(pattern, [count], [from], [to])**<br>
	  Similar to above but keeps searching for the pattern until **count** no of matches have been found.<br>
	  If **count** is negative then all the matching locations are retrieved.
	  Returns empty list if no match found.
	  
	- **Exe.FindText(str, [atype], [prefixNull], [suffixNull], [from], [to])**<br>
	  Searches the **Exe** for the provided text string. The text is expected to be Ascii encoded.<br>
	  **atype** is the [AddrType] of output address expected (default is VIRTUAL).<br>
	  **prefixNull & suffixNull** indicate whether to put NULL bytes before and after the string to restrict the matched pattern. By default both are true.<br>
	  Without the **from & to** addresses, the search takes place within **DATA** and **DATA2** sections.<br>
	  If the **from** address is provided without the **to** address, then the search takes place till End of the file.<br>
	  Returns -1 if no match found.
	  
    - **Exe.FindText(enc, str, [atype], [prefixNull], [suffixNull], [from], [to])**<br>
	  Works identical to the one above but the text string can now be of any [Encoding] specified by **enc**.
	  Returns -1 if no match found.
	  
	- **Exe.FindTextN(str, [count], [atype], [prefixNull], [suffixNull], [from], [to])**<br>
	  Similar to **FindHexN**, it keeps searching for the text string until **count** matches have been found.
	  If **count** is negative, then we get all the matching locations.
	  Returns empty list if no match found.
	  
	- **Exe.FindTextN(enc, str, [count], [atype], [prefixNull], [suffixNull], [from], [to])**<br>
	  Works identical to the one above but the text string can now be of any [Encoding] specified by **enc**.
	  Returns -1 if no match found.
	  
	- **Exe.FindFunc(name, [dllName], [ordinal])**<br>
	  Find the **VIRTUAL** address of the specified imported function. The function should have either a valid **name** or an **ordinal** (sometimes putting both helps so that atleast one of them match)<br>
	  You can use the **dllName** of the parent DLL where it was imported from, to further limit the search.
	  Returns -1 if function is not found.
	  
	- **Exe.FindSpace(size, [snap])
	  Find the starting **PHYSICAL** address of next range of addresses (the range being specified by the **size**) within the DIFF section not reserved by any patches yet.<br>
	  You can also provide a **snap** value for the address to be a multiple of. For e.g. Functions are generally aligned to 0x10 so we can use that as **snap** for custom ones as well.
	  Returns -1 if space could not be found successfully. Shouldnt happen unless the Exe itself has some issues.

#### System
**System** is an object providing properties & functions intended to provide some amount of access to the host filesystem and OS features.<br>

Properties:

| Name | Description |
|---|---|
| LocalTime | Date object pointing to current time in local timezone |
| UtcTime | Date object pointing to current time in UTC |

Functions:
- Modifiers
	- **System.Copy(source, target, [force])**<br>
	  Copies the **source** to the **target**. **force** is a boolean enforcing the copy process.<br>
	  Returns true if successfully copied. All the following combinations are valid.
	  
	  | source | target | what happens |
	  |---|---|---|
	  | file | file | If the **target** already exists then it will **return false unless** you are setting **force** as **true** |
	  | file | dir | The **source** gets copied inside **target** directory. Same rules of **force** apply as above. |
	  | dir | dir | All the contents of the **source** directory gets copied inside **target** hierarchically and the same **force** setting is used in full hierarchy. |

	- **System.Delete(path, [force]**<br>
	  Delete the specified **path**. It can be either a file or directory. Returns true if successfully deleted.<br>
	  As before the **force** setting enforces the deletion. For directories, this means everything inside it will get deleted before the directory itself is deleted.<br>
	  Trying to delete a non-empty dir without **force** will make the function return false.

    - **System.Move(source, target)**<br>
	  Moves the specified **source** to the **target** path, essentially renaming it in the process.<br>
	  Returns true if successfully moved/renamed. All the following combinations are valid.
	  
	  | source | target | what happens |
	  |---|---|---|
	  | file | file | If the **target** already exists then it **returns false** |
	  | file | dir | The **source** gets moved inside **target** directory unless it already has a file with the same name |
	  | dir | dir | If the **target** already exists then the **source** gets moved inside the **target** directory |

	- **System.MkDir(path)**<br>
	  Create the directory specified by the **path**. Any missing parent directories are also created.
	  Returns true if successfully done or if it already exists.
	
- Name retrieval
	- **System.FileName(path)**<br>
	  Retrieve the file name part of the specified file.
	  
	- **System.BaseName(path)**<br>
	  Retrieve the base name of the specified file (file name without suffix).
	
	- **System.Suffix(path)**<br>
	  Retrieve the suffix of the specified file.
	
	- **System.DirName(path)**<br>
	  Retrieve the parent directory name of the specified file/directory.
	
	- **System.DirPath(path)**<br>
      Retrieve the parent directory path for the specified file/directory.
	
	- **System.FullPath(path)**<br>
      Retrieve the absolute full path of the specified file/directory without any symlinks or relative paths.

- Date retrieval

	- **System.CreatedDate(path)**<br>
      Retrieve the creation date of the specified file/directory.

    - **System.ModifiedDate(path)**<br>
	  Retrieve the last modified date of the specified file/directory.
	
	- **System.AccessedDate(path)**<br>
      Retrieve the last accessed date of the specified file/directory

	- **System.TouchedDate(path)**<br>
      Retrieve the last date when the file/directory was touched (which also included permission changes).
	  
- Directory Content retrieval

	- **System.GetFiles(path, [filters])**<br>
      Get the list of files in the specified directory **path**.
	  The **filters** are optional global patterns for restrict the list to matching filenames (like in `ls` command).
	  For e.g. "\*.yaml"
	
	- **System.GetDirs(path, [filters]);
      Get the list of sub directories in the specified directory **path**.
      The **filters** work the same way as above.
	
- Checkers (all of them return true or false to indicate success or failure)

	- **System.Exists(path);
      Check for existence of the path in the filesystem.
	  
    - **System.IsFile(path);
      Check whether given path is an existing file or a symbolic link to one.

    - **System.IsDir(const QString& path);
      Check whether given path is an existing directory or a symbolic link to one.

    - **System.IsReadable(const QString& path);
      Check whether given path can be read from.

    - **System.IsWritable(const QString& path);
      Check whether given path can be modified

    - **System.IsExecutable(const QString& path);
      Check whether given path has execution permission

    - **System.IsHidden(const QString& path);
      Check whether given path is treated as hidden in the filesystem
	  
- Other info retrieval

	- **System.SizeOf(path);
      Retrieve the size of specified file in bytes

#### Warp
**Warp** object is a representative of the tool to provide access to functions outside the scope of **Exe** and **System**.
Currently it has the following functions.

- **Warp.LoadYaml(path)**<br>
  Loads the specified YAML file, Converts the Node hierarchy into equivalent JS hierarchy and returns it.
  If any error occurs during the loading process, a message pops up and it returns false instead.
 
- **Warp.LoadQJS(path)**<br>
  Loads the specified QJS file and returns the result of the last evaluated expression.

- **Warp.Show(path)**<br>
  Only Available in [Main GUI] & [Tester GUI]. Displays the specified file/directory using the default application assigned in the OS.

- **Warp.LoadExe(path)**<br>
  Only available in [Tester GUI]. Loads the specified file into the **Exe** object.<br>
  If any error occurs during the loading process, a message pops up and it returns false instead.<br>
  Alternatively, you can also use **Exe.LoadFile(path)** but it is not recommended as it will not show any details if an error occurs. 

### Classes

Just like in C++, Classes are types and to use their various properties & functions we need to create instances (object) of them using the **new** keyword.<br>
The main 2 classes provided are **TextFile & BinFile**. Both of them have some common properties & functions as described below.

- Properties
  
	| Name | Description |
	|---|---|
	| Path | The opened file's path |
	| Size | Size of currently open file |
	| Pos | Current file position offset |
	| Valid | Boolean indicating there is a valid file currently open |
  
- Basic Functions
	- **<obj>.Open(path, mode)**<br>
	  Opens a new file **path** in the specified **mode**. If any file is already open using this object, it is automatically closed first.<br>
	  Returns true if successfully opened.
	
	- **<obj>.Close()**<br>
	  Closes currently open file if any.
	
	- **<obj>.AtEnd()**<br>
	  Check whether End of File has reached.
	
	- **<obj>.Seek(pos)**<br>
	  Seeks to **pos** i.e. Change the file position offset to **pos**.<br>
	  Returns true if successful.

The last class provided is **IExe** which is the base for **Exe**. Now let's deep dive into all 3.

#### TextFile

**TextFile** class is used for accessing & modifying an existing text file or creating a new one in the file system from QJS scripts.<br>
It's constructor can take 1 of 3 forms.

- **new TextFile([enc])**<br>
  Creates the object with the specified [Encoding]. If the [Encoding] is not provided, it defaults to **UTF8**.

- **new TextFile(path, [mode])**<br>
  Creates the object and opens the file **path** specified in the requested **mode**. Uses **UTF8** encoding.<br>
  **mode** can be one of r - read only, w - write only, rw - read/write, a - append<br>
  If no **mode** is provided, then file opens in read only mode.

- **new TextFile(path, enc, [mode])**<br>
  Same as the above one but we can specify the [Encoding].

Once the object is created, we will have access to the following functions in addition to the [ones discussed above](#classes).

- Overloads

	- **<obj>.Open(path, enc, [mode])**<br>
	  Same as the other **Open** function, but we can specify the [Encoding].
	  
- Readers

	- **<obj>.Read([size], [from])**<br>
	  Reads a text string of **size** characters **from** the specified position, both of which are optional and defaults to -1.<br>
	  If **size** is negative, all remaining data is retrieved.<br>
	  If **from** is negative, then data is retrieved from current position and then the position gets incremented.
	
	- **<obj>.ReadLine([pos])**<br>
	  Reads a line of text **from** the specified position, which is optional and defaults to -1.
	  If **from** is negative, then line is retrieved from current position and then the position gets incremented.
	
- Writers
    - **<obj>.Write(text, [to])**<br>
	  Writes a text string **to** the specified position, which is optional and defaults to -1.
	  If **to** is negative, then data is written at current position and then the position gets incremented.
	  Returns true if successfully written else false
	  
	- **<obj>.WriteLine(text, [to])**<br>
	  Same as above but adds a new line character after the **text**.
	  Returns true if successfully written else false

- Codec settings
	- **<obj>.SetEncoding(enc)**<br>
	  All files are treated as UTF-8 by default. If you need to change that then use this function to set the [Encoding].

#### BinFile

**BinFile** class is used for accessing & modifying an existing binary file or creating a new one in the file system from QJS scripts.<br>
It's constructor also has 2 forms, just like **TextFile**. Both of them work in pretty much same way as in [TextFile]

- **new BinFile()**<br>

- **new BinFile(path, [mode])**<br>

Once the object is created, we will have access to the following functions in addition to the [ones discussed above](#classes).

- Readers

	- **<obj>.ReadText([size], [from], [enc])**<br>
	  Read **size** bytes **from** the specified position as a text string with the specified [Encoding]. All arguments are optional.<br>
	  **size** and **from** defaults to -1 and **enc** defaults to **ASCII**.<br>
	  If **size** is negative then all remaining bytes are read.<br>
	  If **from** is negative, bytes are read from current position and then the position gets incremented.
	
	- **<obj>.ReadHex([size], [from])**<br>
	  Read **size** bytes **from** the specified position as a hex string.Both arguments are optional and defaults to -1.<br>
	  If **size** is negative then all remaining bytes are read.<br>
	  If **from** is negative, bytes are read from current position and then the position gets incremented.
	
	- **<obj>.ReadInt8/<obj>.ReadInt16/<obj>.ReadInt32([from])**<br>
	  Read 1/2/4 bytes **from** the specified position as a signed integer respectively. **from** defaults to -1.<br>
	  If **from** is negative, bytes are retrieved from current position and then the position gets incremented.
	
	- **<obj>.ReadUint8/<obj>.ReadUint16/<obj>.ReadUint32([from])**<br>
	  Read 1/2/4 bytes **from** the specified position as an unsigned integer respectively. **from** defaults to -1.<br>
	  If **from** is negative, bytes are retrieved from current position and then the position gets incremented.
	
- Writers

	- **<obj>.WriteText(str, [to], [enc])**<br>
	  Write the text string of specified [Encoding] **to** the specified position. Both **to & enc** are optional. **to** defaults to -1 and **enc** defaults to ASCII.<br>
	  If **to** is negative, bytes are written at current position and then the position gets incremented.<br>
	  Returns true if successful else false.

    - **<obj>.WriteHex(str, [to])**<br>
	  Write the hex string **to** the specified position. **to** defaults to -1.<br>
	  If **to** is negative, bytes are written at current position and then the position gets incremented.<br>
	  Returns true if successful else false.
	
	- **<obj>.WriteInt8/<obj>.WriteInt16/<obj>.WriteInt32(value, [to])**<br>
	  Writes a signed 8/16/32 bit integer **to** the specified position respectively. **to** defaults to -1.<br>
	  If **to** is negative, bytes are written at current position and then the position gets incremented.<br>
	  Returns true if successful else false.

	- **<obj>.WriteUint8/<obj>.WriteUint16/<obj>.WriteUint32(value, [to])**<br>
	  Writes an unsigned 8/16/32 bit integer **to** the specified position respectively. **to** defaults to -1.<br>
	  If **to** is negative, bytes are written at current position and then the position gets incremented.<br>
	  Returns true if successful else false.

#### IExe

**IExe** is the class used to create **Exe** object internally.<br>
Therefore any instances of **IExe** will have the same functions as **Exe**.<br>
It's constructor takes the form.

	- **new IExe([path])**
	  Creates a new instance and loads the '.exe' file if any specified.
	  
You can also load the '.exe' file later (or perhaps use the same object to load a different file),
using the **<obj>.LoadFile(path)** function.

## Scripted Entities

The following items have been added using QJS supporting scripts (the ones inside 'Support' folder).

### Constants

- **Strings & Error Messages**

	| Name | Description |
	|---|---|
	| **YMLFILTER** | Filter string for YAML files. Used with user inputs of **D_InFile** [DataType] |
	| **TAB** | 4 blank spaces used in **console** object methods |
	| **NO_ALLOC** | Error message to use when **Exe.FindSpace** returns -1 |
	| **NO_EXE** | Error message to use in extensions after testing **Exe.FileSize** == 0 |
	| **NO_OUTPUT** | Error message to use when [TextFile].**Open** & [BinFile].**Open** fails |

- **Hex Codes**

	| Name | Description |
	|---|---|
	| **WC** | Wild Card byte ('??') |
	| **WCp** | Positive Wild Card byte |
	| **WCn** | Negative Wild Card byte |
	| **ALLWC** | DWORD with all Wild Cards |
	| **ALLWCp** | DWORD with all Wild Cards having +ve sign bit |
	| **ALLWCn** | DWORD with all Wild Cards having -ve sign bit |
	| **ALL00** | DWORD with all zeroes |
	| **POS1WC** | Positive DWORD with 1 Lower Wild Card bytes |
	| **POS2WC** | Positive DWORD with 2 Lower Wild Card bytes |
	| **POS3WC** | Positive DWORD with 3 Lower Wild Card bytes |
	| **POS4WC** | Positive DWORD with 3 Lower Wild Card bytes & partial Wild Card MSB |
	| **ALLFF** | DWORD for -1 |
	| **NEG1WC** | Negative DWORD with 1 Lower Wild Card bytes |
	| **NEG2WC** | Negative DWORD with 2 Lower Wild Card bytes |
	| **NEG3WC** | Negative DWORD with 3 Lower Wild Card bytes |
	| **NEG4WC** | Negative DWORD with 3 Lower Wild Card bytes & partial Wild Card MSB |
	
- **Common instructions**
	- **PUSH_0**
	- **PUSH_1**
	- **PUSH_2**
	- **PUSH_R** - PUSH Reg32
	- **PUSH_EAX**
	- **POP_R** - POP Reg32

- **OpCodeList** - Mapping of various opcodes. Used internally by [Instr].

- **OpTypes** - Map of Operand types. It has the following keys.
  
	| Key | Description
	|---|---|
	| **OpTypes.ERR** | Illegal operation |
	| **OpTypes.A** | Acc \<, Imm\> |
	| **OpTypes.R** | Reg \<, Imm\> |
	| **OpTypes.I** | \<Imm\> |
	| **OpTypes.R_R** | Reg, Reg \<, Imm\> |
	| **OpTypes.D_A** | Ptr \[Disp\], Acc \<, Imm\> |
	| **OpTypes.P_R** | Ptr \[\*\], Reg \<, Imm\> |
	| **OpTypes.A_D** | Acc, Ptr \[Disp\] \<, Imm\> |
	| **OpTypes.R_P** | Reg, Ptr \[\*\] <, Imm\> |
	
  **Imm**ediate values are all optional and depends on the instruction whether they will be present or not.<br>
  **Acc** can refer to any primary Reg not just Accumulator.
	
### Classes

Following classes are provided. Only [Instr] is generally used for creating new objects.

#### Register

Class representing various CPU registers. Not usually created in code.<br>
Instead we have the following objects created using this class for use in code.

	| Names | Description |
	|---|---|
	| **AL, CL, DL, BL, AH, CH, DH, BH** | 8 bit reg |
	| **AX, CX, DX, BX, SP, BP, SI, DI** | 16 bit reg |
	| **EAX, ECX, EDX, EBX, ESP, EBP, ESI, EDI** | 32 bit reg |
	| **ST0 - ST7** | 80 bit reg |
	| **MM0 - MM7** | 64 bit reg |
	| **XMM0 - XMM7** | 128 bit reg |
	| **R8, R16, R32, ST$, MM$, XMM$** | Generic Placeholders |

Each placeholder have a **List** member containing all valid types of it's size.<br>
For e.g. **R8.List** contains all the items in the first row.

All the objects have the following data members<br>
- **Name** - Name of the Register
- **Index** - Index of the Register.
- **Width** - Bit Width of the register.

Additionally, there is a **ST** function which takes the index and retrieves corresponding **ST#** object.

#### PtrSize

Class representing data size for Memory Pointers & Immediate values. Not usually created in code.<br>
Instead we have the following objects created using this class for use in code.

	| Name | Size in bits |
	|---|---|
	| **BYTE_PTR** | 8 |
	| **WORD_PTR** | 16 |
	| **DWORD_PTR** | 32 |
	| **QWORD_PTR** | 64 |
	| **TBYTE_PTR** | 80 |
	| **DQWORD_PTR** | 128 |

Normally [OpData] picks up the required bitsize even without explicitly specifying one of these.
However, in some cases we need to override the size determined.

All the objects have 1 Data Member - it's bitsize **Value** and 1 method - **toString** which returns the **Value** inside as a string.

#### IPrefix

Class representing Instruction prefixes. Not usually created in code.<br>
Instead we have the following objects created using this class for use in code.

	| Name | Description |
	|---|---|
	| **CS** | Segment override to Code Segment |
	| **DS** | Segment override to Data Segment |
	| **ES** | Segment override to Extra Segment |
	| **FS** | Segment override to General Segment 1 |
	| **GS** | Segment override to General Segment 2 |
	| **SS** | Segment override to Stack Segment |
	| **OPCH** | OPerand size CHange - 32bit to 16, 64bit to 128 etc. |
	| **AD16** | ADdress override to 16bit. Also used in float instructions for converting to lower size |
	| **LOCK** | Repeat/LOCK to grant exclusive use of all shared memory |
	| **REPE** | String manipulation - Repeat string operation |
	| **REPN** | String manipulation - Repeat string operation |

All of them have 1 data member - its underlying **Value**.<br>
They also have the following 2 methods.

- **equals(p)** - compares with another prefix. Returns if true the underlying value matches.
- **toString** - Returns the underlying value's hex form.

Also, all these object's **Value**s are saved inside **IPrefix.List** and used in [Instr] class.

#### ModRM

Class for representing the Mod R/M byte. Not usually created in code, but is available as part of [Instr] objects.<br>
It's objects have 3 data members:

- **Mode** - valid values are 

	| 0 | Ptr with no displacement |
	| 1 | Ptr with byte displacement |
	| 2 | Ptr with dword/word displacement |
	| 3 | Reg only |

- **RgOp** - Either [Register], its 'index' or operational code

- **RegM** - Either [Register], its 'index' or memory operand indicator

If you need to create it at some point then use **ModRM.FromParts(mode, regop, regm)**

#### SIBase

Class for representing the SIB byte (\[S*I + B\]). Just like [ModRM] it is not usually created in code, but is part of [Instr] objects.<br>
It's objects have 3 data members:

- **Scale** - can be one of 1, 2, 4 or 8
- **Index** - Index Register or its 'index'
- **Base**  - Base Register or its 'index'

If you need to create it at some point then use **SIBase.FromParts(scale, index, base)**

#### OpData

Helper class for parsing Instruction arguments to determine target, source & sizes. Only used for internal purposes<br>
So we are not going into details.

#### Instr

Class representing a CPU instruction. There are 2 ways to create these.<br>

- **Instr.FromAddr(addr)** - Create using bytes extracted at addr.

- **Instr.FromParts(data, code, oper)** - Internal use mostly. Create using [OpData], opcode & operator.

It's objects have the following data members:

- **Addr**<br>
  Location in [Exe] where this was extracted from. Set to -1 if created [FromParts].
  
- **Prefixes**<br>
  Array of prefix bytes.
  
- **Codes**<br>
  Array of opcode bytes.
  
- **MRM**<br>
  The extracted/calculated [ModRM] object.
  
- **SIB**<br>
  The extracted/calculated [SIBase] object.
  
- **Disp**<br> 
  The displacement value which can be undefined.
  
- **BC_Disp**<br>
  The byte count of the displacement.
  
- **Immd**<br>
  The immediate value which can be undefined.
  
- **BC_Immd**<br>
  The byte count of the immediate value.
  
- **SegNum**<br>
  Segment number for FAR type instructions.
  
- **NestLvl**<br>
  Nesting level used for ENTER instruction.
  
- **Size**<br>
  The total size of instruction in bytes.
  
- **NextAddr**<br>
  The address for the next instruction.

It also has the following methods:

- **addPrefix(p)**<br>
  Add the prefix to the object. Can be [IPrefix] or the value itself.
  
- **addOpCode(o)**<br>
  Add opcode byte(s) to the object.
  
- **needModRM**<br>
  Check if the instruction requires a [ModRM] object.
  
- **isReversed**<br>
  Check if the instruction has to reverse its argument order.
  
- **hasAddrOvrd**<br>
  Check if there is an address override prefix (**AD16**).
  
- **hasOperOvrd**<br>
  Check if there is a operand override prefix (**OPCH**).
  
- **calcImmSize**<br>
  Calculate the size of immediate value expected.
  
- **toString**<br>
  Constructs the hex equivalent and returns it.

### Functions

Following functions have been provided as well.

#### Testers

- **IsNum(v)**<br>
  Check whether the value is a number.
  
- **IsStr(v)**<br>
  Check whether the value is a string.
  
- **IsBool(v)**<br>
  Check whether the value is a boolean.
  
- **IsNumOrStr(v)**<br>
  Check whether the value is a number or a string.
  
- **IsWord(v, [signed])**<br>
  Check whether the value is a number or hex string with 2 bytes. **signed** boolean indicates whether to treat this as a signed number (which is the default) or not.
  
- **IsByte(v, [signed])**<br>
  Check whether the value is a number or hex string with 1 byte. **signed** boolean indicates whether to treat this as a signed number (which is the default) or not.

#### Filler Functions

- **MakeFiller(index, [bc])**<br>
  Create a filler hex string with the provided **index** & **b**yte **c**ount (default is 4). Fillers are generated using '?' character.

- **SwapFiller(str, index, data, [count], [bc])**<br>
  Swaps out **count** of occurences of the filler hex string generated using the specified **index** & **b**yte **c**ount with the actual **data** in the provided **str**.<br>
  Default values for **count** is -1 && for **bc** is 4. If **count** is negative, all occurences are replaced.

- **SwapFillers(str, map, [count], [bc])**<br>
  Similar to above but does multiple swaps for all the key (index) & value (data) pairs in the **map**.

#### Converters

- **Wrap(v)**<br>
  Wrap the value in an array unless its already one and return the result.

#### Calculators

- **BitWidth(v)**<br>
  Calculate the bit width of the value which can be a number, hex string or [Register].
  
- **Distance(tgt, src)**<br>
  Calculate the distance from **src** to **tgt**. If either of them isnt a number then **tgt** itself gets returned.

#### Extractors

- **CaseAddr(num, movzxAddr, retnType, jmpDpAddr)**<br>
  Extract the switch jump address for the specified switch case. 
  **movzxAddr** and **jmpDpAddr** are optional, but not together. i.e. atleast one need to be a valid address.<br>
  If only **movzxAddr** is specified, **jmpDpAddr** is assumed to be address of the instruction after it.<br>
  **retnType** specifies the [AddrType] required and **num** refers to either the case number if **movzxAddr** is provided or the index in the table otherwise.

#### Utilities

- **ParseData(data, scaled)**<br>
  Used by [ModRM] & [SIBase] classes to parse the data provided into their 3 parts.

- **FindInstr(testFn, from, [to])
  Search for a particular instruction using the testing function within the specified address range. **to** address is optional and defaults to end of **CODE** section.
  
#### Syntax Identifiers 

- **Identify(v)**<br>
  Identifies the string provided to the Syntax Assistant.

- **IdentifyClass(type)**<br>
  Identifies the class, it's properties & it's methods to the Syntax Assistant.

- **IdentifyObj(name)**<br>
  Identifies the object specified by it's **name** along with it's properties & it's methods to the Syntax Assistant.
  
- **IdentifyMany(...)**<br>
  Runs **IdentifyObj** for all object names provided as arguments.

- **Assign(name, code)**<br>
  Evaluates the **code** and assigns it's result to the variable **name**. Also identifies the variable to the Syntax Assistant.

- **AssignStr(name, value)**<br>
  Same as above but we provide a string **value** instead.

### Overrides

The following functions are overrides to existing objects or primitives (whose type is shown in angled brackets i.e. <>)

#### 'console' overrides

- **console.debug(...)**<br>
  Just copy of **console.log**.

- **console.dump(obj)**<br>
  Dump the key and value pairs of the object.

- **console.showAddr(addr, [type])**<br>
  Shows the **PHYSICAL & VIRTUAL** counterparts of an address. You can optionally specify the [AddrType] of the provided **addr** (default is **PHYSICAL**).

- **console.showAddrs(addrs, [type])**<br>
  Similar to above but we can provide a list of addresses. All the addresses will need to be of same [AddrType].
  
#### Testers

- **\<array\>.isEmpty()**<br>
  Check for empty array.

- **\<array\>.isRegPtr()**<br>
  Check if the array is of the form \[[Register]\]

- **\<array\>.isDispPtr()**<br>
  Check if the array is of the form \[displacement\]. The displacement can be number or hex string.

- **\<string\>.isEmpty()**<br>
  Check for empty string.

- **\<string\>.isHex()**<br>
  Check if the string only has valid characters for hex (including the wild card characters).
  
#### Converters

- **\<number\>.toBits([count])**<br>
  Convert the integer to bit string and return the result. **count** is optional and can go upto 32. Default is also 32.

- **\<number\>.toHex([count], [bigEndian])** or **\<number\>.toHex([bigEndian])<br>
  Convert the integer to hex string and return the result. The byte **count** is optional and goes upto 4 (default is also 4).<br>
  **bigEndian** is a boolean to get the result in Big Endian form (bytes don't get reversed and spaces are removed). Default is Little endian form.

- **\<number\>.toIEEE([bigEndian])**<br>
  Convert the floating point number to IEEE format hex string and return the result. **bigEndian** works the same way as above.

- **\<string\>.toInt([count], [signed])** or **\<string\>.toInt([signed])**<br>
  Convert the little endian hex string to equivalent integer and return the result. **signed** indicates whether to consider this as a signed number (default is **true**).
  
- **\<string\>.toHex()**<br>
  Convert the ascii string to equivalent hex string and return the result.

- **\<string\>.le2be()**<br>
  Convert the little endian hex string to it's big endian form and return the result.
  
#### Calculators

- **\<string\>.byteCount()**<br>
  Calculate the hex string's byte count and return it. If not a valid hex string then -1 is returned.
  
#### Other addons

- **\<string\>.remove(str)**<br>
  Remove the **str** provided and return the result.
  
- **\<string\>.replaceAt(index, str, [len])**<br>
  Replace **len** characters at **index** location with **str** and return the result. **len** is -1 by default.<br>
  If **len** is negative then **str**'s length is used instead.

- **\<string\>.insertAt(index, str)**<br>
  Insert **str** at **index** location and return the result.

- **\<string\>.appendAsHex(data, [bc], [bigEndian])**<br>
  Append the provided **data** as a hex string and return the result. If **data** is a number then **bc** and **bigEndian** are utilized to convert it **toHex**.

- **\<array\>.last()**<br>
  Retrieve the last value of the array.
  
### Instructions

Most of the known instructions have been added as functions to easily write hex code in your patches & extensions.
Following are the ones available as of now

*Imm = Immediate value specified as a Number or Hex.
*[...] = Memory Pointer which takes the generic form [scale\*reg + reg + displacement], all parts of which are optional.

#### Regular

| Instruction | Accepted argument forms |
|---|---|
| **PUSH** | Imm<br>[Reg]<br> \[...\] |
| **POP** | [Reg]<br> \[...\] |
| **CALL & JMP** | TgtAddr, SrcAddr<br> Distance (number or hex) <br> [Reg]<br> \[...\] |
| **RETN** | 2 byte Imm<br> None |
| **ENTER** | Size (number), NestLevel (number or hex) |
| **JO/JNO/JB/JC/JNAE/JNB/JNC/JAE/<br>JE/JZ/JNE/JNZ/JBE/JNA/JNBE/JA/<br>JS/JNS/JP/JPE/JNP/JPO/JL/<br>JNGE/JNL/JGE/JLE/JNG/JNLE/JG** | TgtAddr, SrcAddr<br> Distance (number or hex) |
| **LEA** | [Reg], \[...\] |
| **MOV** | [Reg], [Reg]<br> [Reg], \[...\]<br> [Reg], Imm<br> \[...\], [Reg]<br> \[...\], Imm | 
| **MOVSX/MOVZX** | [Reg], [Reg]<br>[Reg], \[...\] |
| **CMOVO/CMOVNO/CMOVB/CMOVC/<br>CMOVNAE/CMOVNB/CMOVNC/CMOVAE/<br>CMOVE/CMOVZ/CMOVNE/CMOVNZ/<br>CMOVBE/CMOVNA/CMOVNBE/CMOVA/<br>CMOVS/CMOVNS/CMOVP/CMOVPE/<br>CMOVNP/CMOVPO/CMOVL/CMOVNGE/<br>CMOVNL/CMOVGE/CMOVLE/CMOVNG/<br>CMOVNLE/CMOVG** | [Reg], [Reg]<br> [Reg], \[...\] |
| **SETO/SETNO/SETB/SETC/SETNAE/<br>SETNB/SETNC/SETAE/SETE/SETZ/<br>SETNE/SETNZ/SETBE/SETNA/SETNBE/<br>SETA/SETS/SETNS/SETP/SETPE/<br>SETNP/SETPO/SETL/SETNGE/SETNL/<br>SETGE/SETLE/SETNG/SETNLE/SETG** | 8 bit [Register]<br> \[...\] |
| **INC/DEC** | [Reg]<br> \[...\] |
| **NOT/NEG** | [Reg]<br> \[...\] |
| **MUL/DIV/IDIV** | [Reg]<br> \[...\] |
| **IMUL** | [Reg]<br> \[...\]<br> [Reg], [Reg]<br> [Reg], [Reg], Imm<br>[Reg], \[...\]<br> [Reg], \[...\], Imm |
| **ROL/ROR/RCL/RCR/SHL/SHR/SAL/SAR** | [Reg]<br> [Reg], Imm<br> \[...\]<br> \[...\], 1<br> [Reg], [Reg]<br> \[...\], [Reg] |
| **ADD/OR/ADC/SBB/AND/SUB/XOR/CMP** | [Reg], [Reg]<br> [Reg], \[...\]<br> [Reg], Imm<br> \[...\], [Reg]<br> \[...\], Imm |
| **TEST** | [Reg]<br> \[...\]<br> [Reg], [Reg]<br>[Reg], \[...\]<br> \[...\], [Reg] |
| **PUSHAD/POPAD/NOP/CWDE/LEAVE** | None |


#### ST based

| Instruction | Accepted argument forms |
|---|---|
| **FADD/FMUL/FCOM/FCOMP/<br>FSUB/FSUBR/FDIV/FDIVR** | [Reg]<br> \[...\]<br> [Reg] & [Reg] for some |
| **FLD/FST/FSTP/FLDENV/<br>FLDCW/FSTENV/FSTCW** | [Reg]<br> \[...\] |
| **FIADD/FIMUL/FICOM/FICOMP/<br>FISUB/FISUBR/FIDIV/FIDIVR** | \[...\] |
| **FILD/FISTTP/FIST/FISTP** | \[...\] |
| **FCMOVB/FCMOVE/FCMOVBE/FCMOVU** | [Reg] & [Reg] |
| **FCMOVNB/FCMOVNE/FCMOVNBE/FCMOVNU** | [Reg] & [Reg] |
| **FADDP/FMULP/FSUBRP/<br>FSUBP/FDIVRP/FDIVP** | [Reg] & [Reg]<br> None |
| **FFREEP** | [Reg] |
| **FSTSW** | AX<br> \[...\] |
| **FUCOMI/FUCOMIP** | ST0, ST [Reg] |
| **FNOP/FCHS/FABS/FTST/FXAM** | None |
| **FLD1/FLDL2T/FLDL2E/FLDPI/<br>FLDLG2/FLDLN2/FLDZ** | None |
| **F2XM1/FYL2X/FPTAN/FPATAN/<br>FXTRACT/FPREM1/FDECSTP/FINCSTP** | None |
| **FPREM/FYL2XP1/FSQRT/FSINCOS/<br>FRNDINT/FSCALE/FSIN/FCOS/FUCOMPP** | None |
| **FNENI/FNDISI/FNCLEX/FNINIT/<br>FCLEX/FINIT/FNSETPM/FCOMPP** | None |

#### XMM based

| Instruction | Accepted argument forms |
|---|---|
| **MOVAPD/MOVAPS/MOVDQA/MOVDQU/<br>MOVSS/MOVUPD/MOVUPS** | 2 | [Reg], \[...\]<br> \[...\], [Reg]<br> [Reg] & [Reg] |
| **MOVLPS/MOVHPS/MOVLPD/MOVHPD** | [Reg], \[...\]<br> \[...\], [Reg] |
| **MOVNTPD/MOVNTPS/MOVNTQ/<br>MOVNTDQ/MOVNTSS** | \[...\], [Reg] |
| **MOVSLDUP/MOVSHDUP** | [Reg], [Reg]<br> [Reg], \[...\] |
| **UNPCKLPS/UNPCKHPS/<br>PUNPCKLQDQ/PUNPCKHQDQ** | [Reg], [Reg]<br> [Reg], \[...\] |
| **CVTDQ2PD/CVTDQ2PS/CVTPS2DQ** | [Reg], [Reg]<br> [Reg], \[...\] |
| **CVTPD2PI/CVTPI2PD/CVTPI2PS/<br>CVTPD2PS/CVTPS2PD/CVTPS2PI** | [Reg], [Reg]<br> [Reg], \[...\] |
| **CVTSI2SS/CVTSS2SI/CVTSS2SD** | [Reg], [Reg]<br> [Reg], \[...\] |
| **CVTTPD2PI/CVTTPD2DQ/CVTTPS2DQ/<br>CVTTPS2PI/CVTTSS2SI** | [Reg], [Reg]<br> [Reg], \[...\] |
| **UCOMISD/COMISD/UCOMISS/COMISS** | [Reg], [Reg]<br> [Reg], \[...\] |
| **SQRTPD/SQRTPS/SQRTSS/RSQRTPS/RSQRTSS** | [Reg], [Reg]<br> [Reg], \[...\] |
| **ANDPD/ANDNPD/ANDPS/ANDNPS** | [Reg], [Reg]<br> [Reg], \[...\] |
| **ORPD/ORPS/XORPD/XORPS** | [Reg], [Reg]<br> [Reg], \[...\] |
| **ADDPD/ADDPS/ADDSS/ADDSUBPD/HADDPD** | [Reg], [Reg]<br> [Reg], \[...\] |
| **MULPD/MULPS/MULSS/DIVPD/<br>DIVPS/DIVSS/RCPPS/RCPSS** |  [Reg], [Reg]<br> [Reg], \[...\] |
| **SUBPD/SUBPS/SUBSS/HSUBPD** | [Reg], [Reg]<br> [Reg], \[...\] |
| **MINPD/MINPS/MINSS/MAXPD/MAXPS/MAXSS** | [Reg], [Reg]<br> [Reg], \[...\] |
| **PSHUFD/PSHUFW/PSHUFHW/SHUFPD/SHUFPS** | [Reg], [Reg]<br> [Reg], \[...\] |
| **UNPCKLPD/UNPCKHPD** | [Reg], \[...\] |
	
## Other Links

- [Usage Guide](Usage_Guide.md)
- [Patch & Extension Guide](PatExt_Guide.md)
- [Writing Scripts](Script_Writing.md)
- [Setting & Session files](Setting_Session.md)
- [Writing Language files](Language_Writing.md)
- [Writing Style files](Style_Writing.md)
