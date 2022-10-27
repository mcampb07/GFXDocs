---
tags:
   - creation station
   - review 
---
<!--
Title : 2084363940_csl_review_explanation

- Created : 2021-12-29 18:48
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
	- Creation Station for Versio 3.0 User Guide_20151219
	- Versio Platform 4.6 System Operations - p248
	- Creation Station Lite for Versio 4.0.2 System Requirements
- Author Notes :
-->
!!! info "Article Updated"
    Thu 27 Oct 2022 15:53:05 BST

# CSL Review
Creation Station Lite will be installed on one or many PCs in your facility.  CSL comproises of 3 main User Interfaces:
- IconStation
- Versio Console - Siliverlight  
- Versio Graphics - HTML5

We use the `CSL` to  create  and  control  graphics  layouts  that  present  a  consistent brand  identity  across all  our  onair  programming.  Designers  can  use  the  offline  Creation  Station  Lite  to drag  content  into  the  workspace  to  create  a  layout  and  set  when  objects  show  and  hide  during  output. 


Operators  can  use  the  online  Versio  Graphics  component  to  add  layouts to  a  playlist  for  automation playback,  or  manually  output  the  layout  using  the  Control  tab  options.

## How to access the CSL
2 of the 3 user interfaces listed above are browser based. 

To access the Versio Graphics - HTML5 UI enter the follwing url replacing the IP address / hostname to fit your system. `http://a.b.c.d:10442/Graphics`

To access the Versio Console - SilverLight UI enter the follwing url replacing the IP address / hostname to fit your system. `http://localhost:8895/Versio/VersioConsole.html#GraphicsControl`

!!! info "Keep hold of this link - you will need it!"
    Full screen preview `http://localhost:8895/Versio/PreviewDebug.html`  Port 4502 - see Creation Station System and port for details on ports


To access the IconStation Login into the hosting server there you should see the IconStation Desktop application. 


## Versio Graphics UI Review 
Versio  Graphics Overview Use  the  Versio  Graphics component  to  create  and  control graphics layouts  that present  a  consistent brand  identity  across all  your onair  programming. Designers  can  use  the  offline  Creation  Station  Lite  to drag  content  into  the  workspace  to  create  a layout  and  set  when  objects show  and  hide  during  output. Operators can use  the  online  Versio  Graphics  component to  add  layouts to  a  playlist  for  automation playback,  or  manually  output  the layout  using  the  Control  tab options.

![](attachments/Pasted%20image%2020211230150909.png)

1. Layout  Workspace Displays  the  currently  selected  layout  in  the  workspace. Use  the  tabs to  create  or  open  multiple layouts  at  one  time. Click  an  EMPTY  tab  to  create  a new  layout,  or  to  drag  an existing  layout  onto the workspace. Note  that if  you  output  multiple layouts  at  one  time  they  display  in z order,  with  the  layout assigned to the  leftmost  tab  on  the  top  and  the  layout  assigned to  the  rightmost  tab  on  the bottom.
2. Content tab Lists all the graphic elements available to Versio Platform, which can include clip and still files. You can select and preview an element on the Content tab then drag the asset onto the workspace to include in a layout. All layout changes are saved automatically. To make content available in Versio Platform, you must add your media files to the watch folder, which is specified on the Content Portal endpoint configuration page.
3. Objects list Lists the objects included in the selected layout. Use the icons to the left of the object name to show, hide, and lock the layout object in the workspace. The status icons to the right of the object name indicate if the object is setup or on air and visible. 
4. Info tab Displays the properties of the currently selected layout or object. 
5. Macro Editor Uses timelines to set up, show, and hide layout objects during output. Each macro has three separate states (available on the Show, Done, and Setup tabs). All macro changes are saved automatically.
6. Layouts tab Lists all the graphics layouts available on the currently viewed Versio Graphics system. You can open a layout by dragging it onto the workspace. Use the menu icon beside the layout name to access the following layout options: Open, Publish, Properties, and Delete Layout. Layouts are stored in the watch folder, which is specified on the Content Portal endpoint configuration page.
7. Control tab Includes manual output options that override the automation control of Versio Platform and send the graphics layouts directly to air. 

This user interface is the same user interface that can be found on the actual Versio playout server. 

### Versio Console  UI Review 
![](attachments/Pasted%20image%2020211230162251.png)

The Versio Console is broken into 2 key areas - layout management and graphics control. You will cover these in class, however a lot of the functionality found here is listed on the Versio Graphics HTML pages. 

However there are a few items that are useful on this Versio Console. 
1. Preview window - http://localhost:8895/Versio/PreviewDebug.html  Enabling you to preview the layouts on the CSL.
2. Publish to Versio - enabling you to push the layouts to the Versio IconStation. 
3. Command lookup - on the Layout Manager, you can obtain the commands required to trigger the layout 

![](attachments/Pasted%20image%2020211231095405.png)

### IconStation Desktop Review
The desktop application - IconStation remains and the functions used in legacy is still partly there, although like the Versio Console view this is becoming a deprecated user interface as the years go on. 
![](attachments/Pasted%20image%2020211231095553.png)
