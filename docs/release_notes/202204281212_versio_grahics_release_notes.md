<!--
Title : 202204281212_versio_grahics_release_notes
- Created : 2022-04-15 11:10
- Updated :
- Author : James Rivers
- Written against (version):
- Sources : Tech authors
- Author Notes :
- Tags : 
-->
# Versio Graphics Release Notes
Page dedicated to the release notes for Versio Graphics.

## Versio 4.6 Release - November 2021
### Versio Graphics Enhancements
#### POPGM-286: Graphics Automation Layer Control
You can now target each of the ten layers of a graphic layout using Versio Automation. You can set certain graphics to always appear on a certain layer, and also override this setting as necessary.

When working with a layout within the Graphics module, you can set its default layer using the **Default Graphic Layer** drop-down in the **Info** pane. If you set this to **Auto** then Versio will load the graphic in the next available layer, otherwise it will be loaded into the default layer that you selected.

In Versio Automation you can override this setting using the **Graphics Layer** drop-down in the Info pane.

If a graphic layout is already loaded into the requested layer then the old graphic will be replaced by the  
new one during playback.

#### POPGM-2822, POPGM-3089: Improved Mask Support
Versio Graphics now supports the following After Effects mask features:

-   Mask paths (non-rectangular internal masks).
-   Inverted masks.
-   The following internal mask effects are now supported: feather, opacity, and expansion.
-   Gradient masks on images.

#### VMGMT-10192: Export Layouts to a Network Path
You can now export layouts to a network path instead of needing to download them through the  
browser. To export a layout:

1.  Switch to the Layouts tab on the right pane.
2.  Locate the layout that you want to export in the list.
3.  Click the dotted menu icon on the layout line.
4.  Select **Download** from the popup menu. - An Export dialog appears.
5. Enter the following information in the dialog. 
	1. Enter an Export Path, relative to where the Graphics system is located.
	2. If you choose to change the default credentials for accessing the export location, uncheck the Use Default Credentials checkbox and enter a new Username and Password. 

> Note: These default credentials are the ones that were used to install Versio Graphics. They are stored in the central Hermes database. 

#### VPLAY-8020: XML Support in DataSourcerer
DataSourcerer now supports XML data handling. These data sources are of type xml, and they allow  
you to specify which parts of the XML file to fetch.

For more information see the _Manage Data Sources with Data Sourcerer_ section of the _Versio Platform  
Engineering Guide_.

## Versio 4.5 Release - May 2021
### Versio Graphics Enhancemnts
#### POPGM-340: Random Playback of Graphic Animations
It is now possible to add XMP commands in your MOV files which fire random triggers within Versio Graphics.

If you wish to fire a random trigger from within a set of triggers, use the firerandomtrigger XMP command and provide a list of the triggers separated by commas. Only one of the triggers in the list will be randomly chosen to be fired.

For example, firerandomtrigger = loop1,loop2,loop3 will fire either loop1, loop2, or loop3 each time the command is fired.

Note: Do not include spaces after the commas in the set of triggers.

A new Random Fire Trigger command action is also available within the Versio Graphics Macro Editor. Provide a list of triggers separated by commas, and one of them will be randomly chosen and fired when the command is run.

#### POPGM-342: XMP Triggers from WAV Files
XMP triggers can now be embedded in WAV files. These triggers are used by Versio Graphics to control layout playback.

Note: Unlike MOV files, WAV files currently only support firing triggers.

For more information about using XMP triggers with Versio Graphics, consult the Versio Platform System
Operations Guide.

#### POPGM-2195: Inspect the Current Time or Destination of aClock or Timer
The Versio Graphics module allows you to inspect the current time and destination time of your Clock and Timer objects. 

This allows you to write Javascript routines in After Effects to fire triggers based on these values.

Within After Effects, use add your Java code as the Source Text to a text object in the same layout as your clock or timer object, and use the following syntax in the code to retrieve the time and destination time of the object:

```js
<ClockTimerObject>_time
<ClockTimerObject>_destination
```

For example, the following code in a text object will retrieve the destination value of a mytimer object in the same layout and convert it to a text string.

```js
var mytimer_destination = new Date();
mytimer_destination.toString();
```