# Inbuilt Entities

This document provides a comprehensive view of all values, objects & classes  provided in addition to standard JS from the tool itself (hence the 'Inbuilt' part).<br>
**Do not overwrite them. In case you do, you will need to restart the tool to get them back.**

## Table of Contents

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

- [See Also](#see-also)

- [Other Links](#other-links)

## Type Values

These values serve to indicate a particular type based on the context. They are used in many functions across the objects & classes mentioned below. Internally these become Enumerations in a wrapper.

### SectionType

Valid values are

	| Value | Notes |
	|---|---|
	| **CODE**   | Usually .text |
	| **DATA**   | Usually .rdata or .data |
	| **DATA2**  | Sometimes .data is present in addition to .rdata, hence DATA2 is needed |
	| **IMPORT** | usually .rsrc |
	| **RSRC**   | Resource section. usually .rsrc |
	| **DIFF**   | The .xdiff section |
	| **MIXED**  | Only valid for unpacked clients. Essentially a merger of CODE & DATA |

### AddrType

In WARP we deal with 2 types of addresses - physical & virtual.<br>Correspondingly we have 2 type values to represent them i.e. **PHYSICAL & VIRTUAL**<br>
In addition to these, you might occasionally need to deal with a Relative Virtual Address. However you can just convert it to Virtual address, since it is essentially **VIRTUAL** address - **Exe.ImageBase**. So we do not have a seperate type for it.

### DataType

These are the types used by **Exe.GetUserInput** function, to determine what kind of input is required from user and accordingly show the appropriate UI.<br>
Valid values are

	| Value | Description |
	|---|---|
	| **D_Int8**     | Signed Integer  8 bit. Ranges from -128 to 127 |
	| **D_Int16**    | Signed Integer 16 bit. Ranges from -32768 to 32767 |
	| **D_Int32**    | Signed Integer 32 bit. Ranges from -2147483648 to 2147483647 |
	| **D_Uint8**    | Unsigned Integer 8 bit. Ranges from 0 to 255 |
	| **D_Uint16**   | Unsigned Integer 16 bit. Ranges from 0 to 65535 |
	| **D_Uint32**   | Unsigned Integer 32 bit. Ranges from 0 to 2147483647 |
	| **D_Bool**     | Boolean (can occupy 8, 16 or 32 bit based on context) |
	| **D_Text**     | Text String |
	| **D_List**     | List of Text Strings |
	| **D_Hex**      | Hex String (spaced out between bytes) |
	| **D_FontName** | Font name (to be picked from font dialog) |
	| **D_FontSize** | Font size (to be picked from font size dialog). Ranges from 0 to 127 |
	| **D_InFile**   | Name of file which serves as input (to be picked from text field or open file dialog) |
	| **D_OutFile**  | Name of file which serves as output (to be picked from text field or save file dialog) |
	| **D_Color**    | Color (RGB hex format from color picker dialog) |

### DirType

These represent the type of Directories available in an application.<br>
Valid values are

	| Value | Description |
	|---|---|
	| **D_Export**  | Export Directory |
	| **D_Import**  | Import Directory |
	| **D_Res**     | Resource Directory |
	| **D_Except**  | Exception Directory |
	| **D_Secure**  | Security Directory |
	| **D_Reloc**   | Base Relocation Table |
	| **D_Debug**   | Debug Directory |
	| **D_Arch**    | Architecture Specific Data |
	| **D_GlobPtr** | RVA of Global Pointer |
	| **D_TLS**     | TLS Directory |
	| **D_LoadCfg** | Load Configuration Directory |
	| **D_BoundI**  | Bound Import Directory in headers |
	| **D_IAT**     | Import Address Table (Unsure of its use but Import Directory should be used for finding imports) |
	| **D_DelayI**  | Delay Load Import Descriptors |
	| **D_ComDesc** | COM Runtime descriptor |

### Encoding

Whenever you deal with text inside the Exe, by default it is considered to be Ascii encoding. To override this, we need to make use of these Encoding values:
	- **ASCII**
	- **UTF8**
	- **UTF16**

### Other Values

All the above values are related to the [Global Objects]. The following values are independent of them.

	- **TEMPDIR** - Temp directory of the host system.
	- **ROOTDIR** - The root directory of the host system. In Windows this will refer to a drive.
	- **HOMEDIR** - User's home directory.

## Global Objects

Currently there are 3 Global Objects being provided inbuilt - Exe, System & Warp

### Exe
**Exe** is an object always pointing to the currently loaded application. It provides a bunch of properties and a generous set of functions for accessing its internals and for setting up changes for a patch.<br>

Properties :

	| Name | Description |
	|---|---|
	| **PEoffset**  | The **PHYSICAL** address of the PE header |
	| **ImageBase** | Self explanatory |
	| **BuildDate** | The application's build date in the form "yyyymmdd" |
	| **Version**   | The linker version used for building this app in the form "major.minor" |
	| **Unpacked**  | Self explanatory |
	| **FileSize**  | Self explanatory |
	| **FilePath**  | Self explanatory |
	| **TestMode**  | Set to true when you are loading the app in the [Tester GUI](#Usage_Guide.md#tester-gui) |

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
	
		- **keepAlpha & ignoreAlpha**<br>
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
	  Just the reverse of Phy2Vir. In case of failure, it returns -1
    
	- **Exe.Rva2Phy(addr, [stype])**<br>
	  Just the reverse of Phy2Rva. In case of failure, it returns -1

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
	  
- Adders (only affects the active patch. Can alter the target file size)

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
	  
	  | Source | Target | What happens |
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
	  
	  | Source | Target | What happens |
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
	- **\<obj\>.Open(path, mode)**<br>
	  Opens a new file **path** in the specified **mode**. If any file is already open using this object, it is automatically closed first.<br>
	  Returns true if successfully opened.
	
	- **\<obj\>.Close()**<br>
	  Closes currently open file if any.
	
	- **\<obj\>.AtEnd()**<br>
	  Check whether End of File has reached.
	
	- **\<obj\>.Seek(pos)**<br>
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

	- **\<obj\>.Open(path, enc, [mode])**<br>
	  Same as the other **Open** function, but we can specify the [Encoding].
	  
- Readers

	- **\<obj\>.Read([size], [from])**<br>
	  Reads a text string of **size** characters **from** the specified position, both of which are optional and defaults to -1.<br>
	  If **size** is negative, all remaining data is retrieved.<br>
	  If **from** is negative, then data is retrieved from current position and then the position gets incremented.
	
	- **\<obj\>.ReadLine([pos])**<br>
	  Reads a line of text **from** the specified position, which is optional and defaults to -1.
	  If **from** is negative, then line is retrieved from current position and then the position gets incremented.
	
- Writers
    - **\<obj\>.Write(text, [to])**<br>
	  Writes a text string **to** the specified position, which is optional and defaults to -1.
	  If **to** is negative, then data is written at current position and then the position gets incremented.
	  Returns true if successfully written else false
	  
	- **\<obj\>.WriteLine(text, [to])**<br>
	  Same as above but adds a new line character after the **text**.
	  Returns true if successfully written else false

- Codec settings
	- **\<obj\>.SetEncoding(enc)**<br>
	  All files are treated as UTF-8 by default. If you need to change that then use this function to set the [Encoding].

#### BinFile

**BinFile** class is used for accessing & modifying an existing binary file or creating a new one in the file system from QJS scripts.<br>
It's constructor also has 2 forms, just like **TextFile**. Both of them work in pretty much same way as in [TextFile]

- **new BinFile()**<br>

- **new BinFile(path, [mode])**<br>

Once the object is created, we will have access to the following functions in addition to the [ones discussed above](#classes).

- Readers

	- **\<obj\>.ReadText([size], [from], [enc])**<br>
	  Read **size** bytes **from** the specified position as a text string with the specified [Encoding]. All arguments are optional.<br>
	  **size** and **from** defaults to -1 and **enc** defaults to **ASCII**.<br>
	  If **size** is negative then all remaining bytes are read.<br>
	  If **from** is negative, bytes are read from current position and then the position gets incremented.
	
	- **\<obj\>.ReadHex([size], [from])**<br>
	  Read **size** bytes **from** the specified position as a hex string.Both arguments are optional and defaults to -1.<br>
	  If **size** is negative then all remaining bytes are read.<br>
	  If **from** is negative, bytes are read from current position and then the position gets incremented.
	
	- **\<obj\>.ReadInt8/\<obj\>.ReadInt16/\<obj\>.ReadInt32([from])**<br>
	  Read 1/2/4 bytes **from** the specified position as a signed integer respectively. **from** defaults to -1.<br>
	  If **from** is negative, bytes are retrieved from current position and then the position gets incremented.
	
	- **\<obj\>.ReadUint8/\<obj\>.ReadUint16/\<obj\>.ReadUint32([from])**<br>
	  Read 1/2/4 bytes **from** the specified position as an unsigned integer respectively. **from** defaults to -1.<br>
	  If **from** is negative, bytes are retrieved from current position and then the position gets incremented.
	
- Writers

	- **\<obj\>.WriteText(str, [to], [enc])**<br>
	  Write the text string of specified [Encoding] **to** the specified position. Both **to & enc** are optional. **to** defaults to -1 and **enc** defaults to ASCII.<br>
	  If **to** is negative, bytes are written at current position and then the position gets incremented.<br>
	  Returns true if successful else false.

    - **\<obj\>.WriteHex(str, [to])**<br>
	  Write the hex string **to** the specified position. **to** defaults to -1.<br>
	  If **to** is negative, bytes are written at current position and then the position gets incremented.<br>
	  Returns true if successful else false.
	
	- **\<obj\>.WriteInt8/\<obj\>.WriteInt16/\<obj\>.WriteInt32(value, [to])**<br>
	  Writes a signed 8/16/32 bit integer **to** the specified position respectively. **to** defaults to -1.<br>
	  If **to** is negative, bytes are written at current position and then the position gets incremented.<br>
	  Returns true if successful else false.

	- **\<obj\>.WriteUint8/\<obj\>.WriteUint16/\<obj\>.WriteUint32(value, [to])**<br>
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
using the **\<obj\>.LoadFile(path)** function.

## See Also

- [Scripted API](Scripted.md)

## Other Links

- [Usage Guide](Usage_Guide.md)
- [Patch & Extension Guide](PatExt_Guide.md)
- [Writing Scripts](Script_Writing.md)
- [Setting & Session files](Setting_Session.md)
- [Writing Language files](Language_Writing.md)
- [Writing Style files](Style_Writing.md)
