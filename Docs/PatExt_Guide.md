# Patches & Extensions
This guide is intended for people who are interested in knowing a bit more about
patches/extensions and how to define new ones.

## Table of Contents
- [About Exe object](#about-exe-object)
- [Intro to Patches](#intro-to-patches)
- [Defining Patches]
- [Patch Function]
- [Intro to Extensions](#intro-to-extensions)
- [Defining Extensions](#defining-extensions)
- [Extension Function](#extension-function)
- [Other Links](#other-links)

## About Exe Object
- In QJS, we get additional global objects, classes & functions either inbuilt or from Support scripts.
- For Patches & Extensions, the most important amongst them is the [Exe] object.
- [Exe] object always refers to the currently loaded app and provides a heap of functions for accessing its contents.
- Most common functions used are :
	- **Exe.FindHex, Exe.GetHex, Exe.SetHex, Exe.AddHex**
	- **Exe.FindText, Exe.GetText, Exe.SetText, Exe.AddText**
	- **Exe.SetJMP, Exe.SetCALL, Exe.FindSpace, Exe.GetUserInput**
	
- The **GetUserInput** function works even if the [Exe] has not been loaded yet.
- There is a **NOSPACE** error object available to use when **FindSpace** function fails.
- You can find more details in the [API Documentation].

## Intro to Patches
- As explained in the [Usage Guide], Patches are a means of expressing the set of changes to be performed on an app.
- The details of a Patch like **title** need to be set while [Defining Patches].
- When a patch is selected, the Tool invokes its corresponding QJS function which has the same name as the patch. You can see [more about it later](#patch-function).
- Every patch needs to be added into a group. If no existing groups are a match for the patch then you need to create a new one.

## Defining Patches
Patches are defined in a YAML file under the name **'Patches.yml'** which has the following general format.

```yaml
groups:
    - GroupName1:
        title : <Brief title for the group which gets displayed along with the patch title. All Caps are suggested.>
        mutex : true/false <Indicates whether patches in this group are mutually exclusive or not>
        color : <Color to use for the title expressed as a keyword or #hexcode or [r,g,b,a]>
        
        patches:
            - PatchName11:
    		    title : <Brief title for the patch>
                recommend : yes/no <Whether to mark it as recommended or not>
                author : <Name of the author(s)>
                desc : <Proper description of the patch. Can be as long as you need.>
            
            - PatchName12:
                title: <Brief title>
                recommend : yes/no
                author : <Author name(s)>
                desc : <Proper description of the patch>
#           etc.
    
    - GroupName2:
        title : <Brief title>
        mutex : true/false
        color : <Valid color>
        
        patches:
            - PatchName21:
                title: <Brief title>
                recommend : yes/no
                author : <Author name(s)>
                desc : <Proper description of the patch>
    
#   etc.	
```

- The **groups** array would be already there in **'Patches.yml'**. You simply need to add the extra patches & groups you want to the list.
- A Group's name has no influence on the patches it holds. However, it cannot be empty either.
- Group name can be useful in naming script files containing the [Patch Function] implementation.
- Another use case is when a common function is used for implementing multiple patches in a group, in which case that function can have the group's name.

- The **title & color** of a group are utilized while displaying its consitutent patches as shown below. 

<img src="Snapshots/Patches.png">

- The **mutex** part is used internally to deselect other patches in same group when its true.

- All the keys in a group as well as a patch are optional.
- Default values for a group:
	- **title** - group name itself
	- **mutex** - true
	- **color** - transparent

- Default values for a patch:
	- **title** - patch name itself
	- **author** - 'Unknown'
	- **recommend** - no
	- **desc** - will be empty

## Patch Function
- As stated before Patch Name also serves as the QJS function name to be called while selecting the patch.
- A patch will only be visible to the end-user if the corresponding function has already been defined in QJS.
- For this reason, the tool auto-loads scripts first if not done atleast once.
- It can be implemented as either a regular function or an arrow function.
- General syntax followed:
```javascript
PatchName = function(name)
{
    <bunch of code>
	return true;
};

/// All the members below are optional.

PatchName.validate = function(name)
{
	<prep code>
	return <validation expression>
};

PatchName.cleanup = function(name)
{
	<bunch of code>
};

PatchName.onSelected = function(name)
{
	<bunch of code>
};

PatchName.onDeselected = function(name)
{
	<bunch of code>
};
```

- As shown above a Patch Function can also have subfunctions used for different purposes
	- **validate** - Function to test whether this patch can be used with the loaded [Exe].<br> If it is defined & doesnt return true then the patch is not shown.
	- **cleanup** - Function for performing additional cleanup when a patch is deselected, aside from what the tool already does.<br> One use case is to shift some data to other related patches.
	- **onSelected** - Gets invoked after a Patch is selected. Can be useful for some post-processing like creating logs.
	- **onDeselected** - Gets invoked after a Patch is deselected. Redundant with **cleanup**, but it can be useful for some post-processing like creating logs.

- None of the subfunctions are mandatory.

- All the functions get the patch name itself as argument. This is helpful when you have the same function for related patches.<br>However, it is not mandatory that the function should accept any arguments.

- If the function **return**s or **throw**s any strings, it is treated as a warning.

- If an error occured then you need to **throw** an **Error** object with the message to be displayed (same as any other QJS function). For e.g.
```javascript
throw Error("the error message");
```

- The patch function needs to **return true** towards the end to indicate success. If it is missing or you end up returning **false**, the patch will fail with a warning.

### Usual Steps in Patch Functions
- Find a reference address using either a known pattern or string using **Exe.Find\*** functions.
- Use the reference to find the actual code you want to modify which exists within a certain range of addresses from it.
- Some times you need some data extracted from the original area or reference addresses.
- Some times you retrieve user's inputs with **Exe.GetUserInput** function.
- Now that every input ready, you use them to prep the code or string to replace with.
- If you are trying to insert new code, then first allocate space with **Exe.FindSpace** function and then use one of the **Exe.Add\*** functions.
- If you are modifying an existing location, use one of the **Exe.Set\*** functions.
- **Finally return true (This is mandatory)**

Naturally, not all patch functions would have all of these steps aside from the last step.<br>
Most of the time it would be a combination of these. For more details refer [Writing Scripts].

## Intro to Extensions
- As explained in the [Usage Guide], Extensions as the name suggests adds features to the tools via QJS functions.
- When an extension is clicked it's corresponding QJS function (which has the same name) gets invoked.
- Just like in the case of patches, A extension only gets shown if it's function has already been defined.<br>
- For this reason, the tool auto-loads scripts first if not done atleast once.
- An Extension is displayed using its details such as title, author, tooltip and icon as shown below.

<img src="Snapshots/Extensions.png">

- A general use case for extensions is for querying and extracting data from [Exe] in a specific format.
- To this effect, the [TextFile] and [BinFile] classes are often used in Extensions.

## Defining Extensions
Extensions are defined in **'Extensions.yml'** file which has the following format
```yaml
- ExtName1:
    title : <Brief title to be displayed in the drawer>
    author : <Name of the author(s)>
    tooltip : <Proper description of the extension. While it can be longer than the title. Keep it of reasonable length.>
    icon : <Path to image serving as the icon. Relative paths will be wrt the repo folder.>

- ExtName2:
    title : <Brief title>
    author : <Author name(s)>
    tooltip : <Proper description of the extension.>
    icon : <Path to image serving as the icon.>

# etc.
```

- All the keys are optional. Default values are 
	- **title** - extension name itself
	- **author** - 'Unknown'
	- **tooltip** - will be empty
	- **icon** - will be empty

## Extension Function
- Extension Functions is just like any other QJS function. Unlike patch functions, no arguments are provided for extensions (primarily because you dont need them 99% of the time).
- One key difference however is that the return value is expected to be a success message.
- If any error occurs you need to **throw** using an **Error** object (same as other functions).
- In case the function returns true, nothing is displayed. Conversely, if the function returns false, then we get a warning.

### Usual Steps in Extension Functions
- Find a reference address using either a known pattern or string using **Exe.Find\*** functions.
- Use the reference to find some additional code.
- Extract the needed data from the addresses found using one of the **Exe.Get\*** functions.
- Use [TextFile] or [BinFile] classes to load an input file (Usually a YAML file with some kind of mapping or list).
- Process all the data retrieved into the format we want.
- Use [TextFile] or [BinFile] classes to create output file with the formatted data.
- **Finally return some message (if you dont want any popup just return true)**

Just like in Patch function, there would be some combination of these steps in an Extension function.
Ensure the function returns something, otherwise you get a success message saying 'undefined'.<br>
For more details refer [Writing Scripts].

## Other Links
- [Usage Guide]
- [Writing Scripts]
- [API Documentation]
- [Writing Language files](Language_Writing.md)
- [Writing Style files](Style_Writing.md)

[Usage Guide]: Usage_Guide.md
[Writing Scripts]: (Script_Writing.md)
[API Documentation]: API_Documentation.md
[Defining Patches]: #defining-patches
[Patch Function]: #patch-function
[Exe]:API_Documentation.md#exe
[TextFile]: API_Documentation.md#textfile
[BinFile]: API_Documentation.md#binfile