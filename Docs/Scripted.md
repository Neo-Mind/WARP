# Scripted Entities

This document provides a comprehensive view of all the available values, classes and functions provided in addition to standard JS implemented using QJS supporting scripts (the ones inside 'Support' folder).

## Table of Contents

- [Values](#values)

- [Classes](#classes)
	- [Register](#register)
	- [PtrSize](#ptrsize)
	- [IPrefix](#iprefix)
	- [ModRM](#modrm)
	- [SIBase](#sibase)
	- [OpData](#opdata)
	- [Instr](#instr)

- [Functions](#functions)
	- [Testers](#testers)
	- [Filler Functions](#filler-functions)
	- [Converters](#converters)
	- [Calculators](#calculators)
	- [Extractors](#extractors)
	- [Utilities](#utilities)
	- [Syntax Identifiers](#syntax-identifiers)

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

- [See Also](#see-also)

- [Other Links](#other-links)

## Values

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
	
## Classes

Following classes are provided. Only [Instr] is generally used for creating new objects.

### Register

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

### PtrSize

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

### IPrefix

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

### ModRM

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

### SIBase

Class for representing the SIB byte (\[S*I + B\]). Just like [ModRM] it is not usually created in code, but is part of [Instr] objects.<br>
It's objects have 3 data members:

- **Scale** - can be one of 1, 2, 4 or 8
- **Index** - Index Register or its 'index'
- **Base**  - Base Register or its 'index'

If you need to create it at some point then use **SIBase.FromParts(scale, index, base)**

### OpData

Helper class for parsing Instruction arguments to determine target, source & sizes. Only used for internal purposes<br>
So we are not going into details.

### Instr

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

## Functions

Following functions have been provided as well.

### Testers

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

### Filler Functions

- **MakeFiller(index, [bc])**<br>
  Create a filler hex string with the provided **index** & **b**yte **c**ount (default is 4). Fillers are generated using '?' character.

- **SwapFiller(str, index, data, [count], [bc])**<br>
  Swaps out **count** of occurences of the filler hex string generated using the specified **index** & **b**yte **c**ount with the actual **data** in the provided **str**.<br>
  Default values for **count** is -1 && for **bc** is 4. If **count** is negative, all occurences are replaced.

- **SwapFillers(str, map, [count], [bc])**<br>
  Similar to above but does multiple swaps for all the key (index) & value (data) pairs in the **map**.

### Converters

- **Wrap(v)**<br>
  Wrap the value in an array unless its already one and return the result.

### Calculators

- **BitWidth(v)**<br>
  Calculate the bit width of the value which can be a number, hex string or [Register].
  
- **Distance(tgt, src)**<br>
  Calculate the distance from **src** to **tgt**. If either of them isnt a number then **tgt** itself gets returned.

### Extractors

- **CaseAddr(num, movzxAddr, retnType, jmpDpAddr)**<br>
  Extract the switch jump address for the specified switch case. 
  **movzxAddr** and **jmpDpAddr** are optional, but not together. i.e. atleast one need to be a valid address.<br>
  If only **movzxAddr** is specified, **jmpDpAddr** is assumed to be address of the instruction after it.<br>
  **retnType** specifies the [AddrType] required and **num** refers to either the case number if **movzxAddr** is provided or the index in the table otherwise.

### Utilities

- **ParseData(data, scaled)**<br>
  Used by [ModRM] & [SIBase] classes to parse the data provided into their 3 parts.

- **FindInstr(testFn, from, [to])
  Search for a particular instruction using the testing function within the specified address range. **to** address is optional and defaults to end of **CODE** section.
  
### Syntax Identifiers 

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

## Overrides

The following functions are overrides to existing objects or primitives (whose type is shown in angled brackets i.e. <>)

### 'console' overrides

- **console.debug(...)**<br>
  Just copy of **console.log**.

- **console.dump(obj)**<br>
  Dump the key and value pairs of the object.

- **console.showAddr(addr, [type])**<br>
  Shows the **PHYSICAL & VIRTUAL** counterparts of an address. You can optionally specify the [AddrType] of the provided **addr** (default is **PHYSICAL**).

- **console.showAddrs(addrs, [type])**<br>
  Similar to above but we can provide a list of addresses. All the addresses will need to be of same [AddrType].
  
### Testers

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
  
### Converters

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
  
### Calculators

- **\<string\>.byteCount()**<br>
  Calculate the hex string's byte count and return it. If not a valid hex string then -1 is returned.
  
### Other addons

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
  
## Instructions

Most of the known instructions have been added as functions to easily write hex code in your patches & extensions.
Following are the ones available as of now

*Imm = Immediate value specified as a Number or Hex.
*[...] = Memory Pointer which takes the generic form [scale\*reg + reg + displacement], all parts of which are optional.

### Regular

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


### ST based

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

### XMM based

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

## See Also

- [Inbuilt API](Inbuilt.md)

## Other Links

- [Usage Guide](Usage_Guide.md)
- [Patch & Extension Guide](PatExt_Guide.md)
- [Writing Scripts](Script_Writing.md)
- [Setting & Session files](Setting_Session.md)
- [Writing Language files](Language_Writing.md)
- [Writing Style files](Style_Writing.md)
