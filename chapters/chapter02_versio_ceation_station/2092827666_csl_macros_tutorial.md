<!--
Title : 2092827666_csl_macros_tutorial

- Created : 2022-01-03 06:35
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
	- Versio 4.6 System Operations
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->
# Creation Station Lite - Macros / Salvos
 A macro is automatically created when you start a new layout. Macros determine when layout objects show and hide during output, and include three states:

- Show 
- Done 
- Setup

 All layout objects are automatically set to show on the Show tab, kill on the Done tab, and preload on the Setup tab.

This type of macro is called a  `prog salvo`.

 During output from within Versio and ADC Automation, when a layout is attached to a primary event as a secondary event, we experience the following states:

Set up the layout objects before the secondary event airs. This will occur 12 seconds before the start of the primary event.

Show the layout objects when the secondary event begins output.  
Kill the layout objects when the duration of the secondary event is reached.

## Macro Timing Offsets
 In Versio Graphics, you can use an offset value to move the trigger point for the Show and Done macro states. The following steps describe how to apply the offset. This is applicable to Versio Automation.

1. In Versio Graphics, select the macro name below the workspace.
2. Switch to the Info tab and expand the Macro Properties if necessary.
3. To activate the offset options, select the Add Default Automation Start/End Times toggle.
4. Using the Fire Show options:
	1. Enter the number of frames for the offset in the textbox.        
    2.  Select where the offset is applied from the drop-down list: Before Primary Starts, After Primary Starts, or Before Primary Ends.
5. Using the Fire Done options:
	1. Enter the number of frames for the offset in the textbox.       
    2. Select where the offset is applied from the drop-down list: Before Primary Starts, After Primary Starts, or Before Primary Ends.

- Any secondary-event offsets applied in Versio Automation will override the offsets set in Versio Graphics. For more details on setting offsets for secondary events, see the Versio Automation section.    
-   You cannot offset the Setup state in Versio Automation.

## Fire Done Macros Early
    
Done macros are fired at the time of a Take Next (the result of having scheduled a Hard Start). 

This can be disabled if your workflow relies on Done macros being fired early. 

To disable this change, edit your `SESConfig.json` and set 
`secondaryTrueTimeOffsetDelaySeconds` to the time (in seconds) you want the Done macros to fire early, relative to the hard start.

## Create Custom Macros
    
By default, all layout objects are triggered to set up, show, and kill using the Setup, Show, and Done macro tabs. Each state is triggered by ADC/Versio Automation, and the display of the layout objects are based on the start and end points for the primary event. 
    
As an alternative to the default behavior, you can also control the display duration of layout objects within the macro itself. When you specify the object display duration within the macro, you can apply custom actions to any tab. 

This means that Setup actions are not limited to the Setup tab; Show actions are not limited to the Show tab; and Kill or Hide actions are not limited to the Done tab.
 
The following steps get you started designing custom macros. These steps describe how to prepare the macro for custom design, and outline one possible method for applying custom-display durations for layout objects. In this specific example, the custom macro will display two objects, one after the other, in the same location on screen.

 1. In the Macro Editor, click the macro name on the left.
 2. Prepare the macro for custom design by deleting the default Show and Kill actions:
	 1. On the Show tab, click the diamond-shaped action on each object line and press the DELETE key on your keyboard.
	 2. On the Done tab, click the diamond-shaped action on each object line and press the DELETE key on your keyboard.
 3.  Set the first object to Show and Kill on the Show tab:
	 1. Click the first object timeline and select the transition that will show the object from the popup menu.
	 2. Select the transition action on the object timeline.
	 3. Use the Info tab > Item Properties to adjust the transition settings and start time.
	 4. Click on the object timeline and select the Kill action from the popup menu.
	 5. Select the Kill action on the object timeline.
	 6. Use the Info tab > Item Properties to adjust when the kill occurs. You can also drag the action on the timeline.

![](attachments/2022-01-03%2007.22.39.gif)

 

Set the second object to Show and Hide on the Show tab:

1. Click the second object timeline and select the transition that will show the object from the popup menu.
2. Select the transition action on the object timeline.
3. Use the Info tab > Item Properties to adjust the show transition settings and start time.
4. Click the second object timeline and select the transition that will hide the object from the popup menu. When you hide an object instead of kill, the object remains hidden but loaded, and is ready for air.
5. Select the transition action on the object timeline.

![](attachments/Pasted%20image%2020220103072618.png)
## Custom Store & Restore States
 You can use the Store State and Restore State actions to save and then resume the on-air output status of macro objects, applicable to Versio Automation.  In a typical on-air situation, the Store State action saves which objects are currently on air, the object states change (for example, they are hidden or killed), then the Restore State resumes the object output to the saved state. See the following example:
 - State 1: A Store State action captures the object showing on-air, 
 - State 2: The MOV with the crawl and image is killed and a still is shown.
 - State 3: The Restore State action kills the still and resumes the output 

 ![](attachments/Pasted%20image%2020220103073410.png)

1. Select the macro name in the Macro Editor.
2. Switch to the Show tab if necessary.
3. Click on the timeline where you want to add the Store State action, and select Store State from the popup.
- Click on the ACTIONS timeline to apply the action to all objects in the layout. 
- Click on the object timeline to apply the action to a specific object.

 1. Click on the timeline where you want to add the Restore State action, and select Restore State from the popup.
	 1. Click on the ACTIONS timeline to apply the action to all objects in the layout. 
	 2. Click on the object timeline to apply the action to a specific object.
 2.  Set the properties for each Restore State marker:
	 1. With the Restore State marker selected on an object timeline, expand the Item Properties heading on the right.
	 2. Specify the Restore State's transition using the Type, Direction, and Duration options.
	 3. Adjust the start of the Restore State action using the Start Time field, if necessary.
	 4. Click the Apply button to apply the setting.
 3. Switch to the Done tab, click any Kill actions and select Cut from the popup.

## Add commands to your Macros
You can add XMP metadata to the frames of your macros using a simple command interface.
 
- In the Macro Editor, click on the macro name on the left.
- On the object line that you would like to add metadata to, click on the frame where you would like to add the command and select the Command option.

An action diamond will appear where you clicked, and the Info tab will switch to the Item Properties section.

![](attachments/2022-01-03%2007.43.17.gif)
Use the Start Time field if you wish to change the frame when the command will occur.

Click the Add Action button to add an action to the command:

- Change Video Source: This allows you to set the video source for a specific DVE. For each DVE source (A or B), select the type of source you want to use (clip 1-4 or live 1-4).
- Duck Audio: Use this action to set the amount of ducking and the fade length for one of your sources.
- Fire Named Trigger: Enter the macro trigger that you want to fire.
- Satmatte: This action will fire two types of Satmatte triggers:
- Toggle: Select the GPI that you want to turn on, and/or the GPI that you want to turn off.
- Duration: Select the GPI that you want to turn on, and the number of frames you want it to stay on.
- Set DVE Z-Order: Use this action to change the DVE order of your Key/Fills, graphics layer, DVE sources, and background inputs. You can drag items up or down within the list to set their orders.
- Show/Hide Video Source: This action allows you to show or hide a specific source in the blueprint that is configured for control.
- Timer Control: This action allows you to select one of the timers in your layout and either start it, stop it, or reset it back to its offset time. This will not work if counting to a specific date and time.
- Fire Random Trigger: Provide a list of triggers separated by commas. When the command is run, one of the triggers will be randomly chosen and fired. 


You can add multiple actions to a single commands.
5. To delete an action from a command, click the X button beside the action you want to delete.
6. To delete an entire command, click the Delete Command button.

![](attachments/2022-01-03%2007.45.27.gif)

## Macro Mangment
### Create a new macro in the layout
- Click on the plus icon
- Create new macro pop up is shown enter name and choose type
	- Prog Salvo - show setup done - leave box uncheck
	- Salvo - single salvo - check the box
![](attachments/2022-01-03%2007.52.11.gif)
### Duplicate a macro 
- Select the macro
	- Click on the duplicate icon
	- Enter the macro name 
![](attachments/2022-01-03%2007.55.34.gif)
### Delete a macro
- Select the macro
	- Click on the delete icon
 ![](attachments/2022-01-03%2007.57.38.gif)