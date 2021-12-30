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

We have just exported a .lyt of the layout, ok so what?  We can upload that layout to another CSL or Versio Server if required. 
<!-- VIDEO HERE-->


![](attachments/2021-12-30%2016.03.22.gif)

