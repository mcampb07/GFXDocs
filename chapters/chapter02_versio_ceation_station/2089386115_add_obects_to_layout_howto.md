<!--
Title : 2089386115_add_obects_to_layout_howto

- Created : 2021-12-31 12:26
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
	- Versio 4.6 System Operations
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->

# How to add objects to layouts
 All layout objects are imported as graphics assets from third-party software, such as Adobe After Effects or Adobe Photoshop.

## Versio Platform Operations
 If you are using Versio Platform these assets must be placed in the graphics watch folder specified during your Versio Platform system configuration. Once the files are placed in the watch folder, the files become available on the Content tab.

Drag a graphics object from the Content tab, open the Content tab and drag the content onto the workspace.

## Non Versio Platform Operations
Simply open a file explorer and drag and drop the asset onto the new layout workspace.

![](attachments/2021-12-31%2012.31.24.gif)

 The object will appear in the workspace, and will also be added to the Objects list.
 
 >  Note: If your layout already contains an object with the same name, then you are prompted whether you want to replace the existing object or add a new copy of it. This will happen even if the objects are different versions of an asset, allowing you to update objects in a layout with new versions without needing to re-create the layout.

## Placement
Use your mouse to position the object where you want it displayed in the workspace.![](attachments/2021-12-31%2012.34.11.gif)

>  Note: Audio objects are not positioned in the workspace. They only appear in the Objects list.

For exact placement, select the object and use the Info tab's Properties > X-Coordinate and Y- Coordinate fields. Once you have this set you can also lock the position.

![](attachments/2021-12-31%2012.39.47.gif)

## Z Order
Add all your objects to the layout as required.  You can drag the layout object up or down in the Objects list to set the z-order. The list determines the top- to-bottom display of overlapping layout objects.

![](attachments/2021-12-31%2012.45.16.gif)

## Delete Object
Either 
- Select the object in the object list and press the delete key

Or 
- Select the object in the workspace and select the cross top right on the object. 

**Locking an object** will prevent the following: 
- object renaming 
- object selection in the workspace
- object deletion in the object list

![](attachments/2021-12-31%2012.53.23.gif)

## Replace Object
Replace the object in the workspace, you will be prompted if you want to replace the object of the same name in the layout.  

![](attachments/2022-01-07%2017.25.48.gif)

> Note the macro, properties and other items you have already set will remain... Phew!


## Resize Object
Select an object, navigate to the info tab and click on resize to review the options. 
- off - no resize params applied 
- crop - crop the item to the current object size
![](attachments/2021-12-31%2013.02.33.gif)

- scale - scale the object and maintain aspect or not
![](attachments/2021-12-31%2013.00.54.gif)
## Audio Objects
Audio objects do not appear in your workspace, but they are available in the Objects list. You can add them to macros like any other object, and you can also edit their properties.
![](attachments/2021-12-31%2013.09.07.gif)
Once the audio object has been added, open the info tab and select audio to review the properties. 

- Enable Ducking: Check this checkbox if you want other audio to duck while this object plays. Specify the number of dB that the audio will ducked.
	- Note audio will not be heard on preview web ui
- Asset Profile: Select the Advanced Audio Track Router asset profile that will be used to play this audio.
	- This option is only listed if you are working on a Versio Platform connected CSL. 

![](attachments/2021-12-31%2013.13.18.gif)



