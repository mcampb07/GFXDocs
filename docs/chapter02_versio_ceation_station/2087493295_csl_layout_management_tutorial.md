---
tags:
  - creation station
  - layouts
---

<!--
Title : 2087493295_csl_layout_management_tutorial

- Created : 2021-12-30 15:40
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
	-  Versio Platform 4.6 System Operations
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->
!!! info "Article updated"
    Sat 29 Oct 2022 18:29:55 BST
    
# CSL Layout Management Tutorial 
A quick tutorial on how to perform certain tasks with layouts on the CSL. 
 
Designers can use the offline Creation Station Lite to drag content into the workspace to create a layout and set when objects show and hide during output.

## Manage existing layouts
Open existing layouts hosted on the CSL. By default, five layouts can be opened in the Versio Graphics workspace using the layout tabs. When you output multiple layouts at the same time, graphics on the leftmost layout tab display on top and the graphics on the rightmost layout tab display on the bottom.

Why can I only see 5 layouts on this creation station lite view, when I I know there are 10 layers?

Great question, we have to remember that this user interface is used on the CSL, Versio Playout Servers that are under ADC control and under Versio Automation control. By design, Versio automation uses layers 6 - 10 by default, so it was designed to not show you the automation controlled layers in the web view.  

But we are working on a CSL so we can if see all 10 layers, by clicking on the control tab and checking the box to show all layers. 

![](attachments/Pasted%20image%2020211230155135.png)


### Export 
To export a layout:
1.  Switch to the Layouts tab on the right pane. 
2. Locate the layout that you want to export in the list.
3. Click the vertical ellipses menu icon on the layout line.
4. Select Download from the popup menu.


![](attachments/2021-12-30%2016.39.16.gif)

We have just exported a .lyt of the layout, 
![](attachments/Pasted%20image%2020211230164121.png)

Ok so what?  We can upload that layout to another CSL or Versio Server if required.  Simly drag and drop the .lyt into the layout tab. 


![](attachments/2021-12-30%2016.42.17.gif)


### Rename
1. Switch to the Layouts tab on the right pane.
2. Locate the layout that you want to rename in the list.
3. Click the dotted menu icon on the layout line.
4. Select Rename Layout from the popup menu.
5. In the window that displays, enter a new name for the layout and click the Rename button.

![](attachments/2021-12-30%2016.47.09.gif)

### Duplicate Layouts
1. Switch to the Layouts tab on the right pane.
	1. make sure the layout is loaded into a layer - otherwise the duplicate option is revealed.
2. Locate the layout that you want to duplicate in the list.
3. Select Duplicate Layout from the popup menu.
4. In the window that displays, enter a new name for the layout and click the Duplicate button. The duplicated layout displays in the Layouts list.

![](attachments/2021-12-30%2016.51.39.gif)


### Expire Layouts
> Versio Platform only.
 
 When you expire a layout the layout is deleted from the system on the specified date at 12:00 AM.

To expire a layout:
1.  Switch to the Layouts tab on the right pane.
2.  Locate the layout that you want to expire in the list.
3.  Click the dotted menu icon on the layout line.


### Delete Layout
1.  Switch to the Layouts tab on the right pane.
2.  Locate the layout that you want to delete in the list.
3.  Click the dotted menu icon on the layout line.
4.  Select Delete Layout from the popup menu.

 
 ![](attachments/2021-12-30%2016.55.54.gif)

## Create a new Layout
To create a new layout, find an empty layer and enter a unique layout name.  You can now add objects to this layout.  As you add graphics objects to the workspace, layout changes are saved automatically.

If you are working on a Versio Platform based system you will see a content tab. 

The Content tab allows you to access content available in Versio Content Portal when you are working in the Versio Automation and Versio Graphics components. Use the Content tab to preview content, or to drag content from the content list into a playlist or graphics layout.

-   Drag and drop items from the content list into a playlist or graphics layout.
-   Search/filter the content list for specific items.
-   Preview a low-res proxy of content in the content list.
-   Only valid, registered items are available via the Content tab.

![](attachments/Pasted%20image%2020211230170830.png)

![](attachments/Pasted%20image%2020211230170914.png)
![](attachments/Pasted%20image%2020211230170923.png)

If you are working on a non Versio Platform based system, you can simply  add graphics objects from a system folder, open the folder in Windows Explorer and drag the file onto the workspace.

Once you have added your objects, either via the content tab or the system folder,  objects will appear in the workspace, and will also be added to the Objects list.

> Note  If your layout already contains an object with the same name, then you are prompted whether you want to replace the existing object or add a new copy of it. This will happen even if the objects are different versions of an asset, allowing you to update objects in a layout with new versions without needing to re-create the layout.
 
Use your mouse to position the object where you want it displayed in the workspace.

> Note Audio objects are not positioned in the workspace. They only appear in the Objects list.
 
 For exact placement, select the object and use the Info tab's Properties > X-Coordinate and Y- Coordinate fields. 
  
Drag the layout object up or down in the Objects list to set the z-order. The list determines the top- to-bottom display of overlapping layout objects

![](attachments/Pasted%20image%2020211230171345.png)

### Publish Layouts
If you are using a CSL as part of a Versio Platform system you can follow these steps:
 
1.  Switch to the Layouts tab.
2. Locate the layout that you want to publish in the list. Use the Search field at the top of the Layouts tab to filter the layout names by letter and number.
3. Click the dotted menu icon on the layout line.
4. Select Publish from the popup menu.
5. The layout is published to the layouts watch folder specified during your Versio Platform system configuration and is available to the online system for output.

If you are using an ADC based system and want to publish the layouts to specified Versio Servers then you need to use the Versio Console, layout management pages. 

> Before  you  can  publish to  another Versio  system  you  must  first  share  its  D:\publish folder.  See Creation  Station  for  Versio™  3.0 

![](attachments/Pasted%20image%2020211230170319.png)

Also remember that you may have a workflow manager that will move layouts to versio servers for you automatically based upon pre defined workflows and triggers. 
