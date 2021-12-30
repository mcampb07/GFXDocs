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