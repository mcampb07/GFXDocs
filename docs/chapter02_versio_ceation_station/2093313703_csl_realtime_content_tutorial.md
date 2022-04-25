<!--
Title : 2093313703_csl_realtime_content_tutorial

- Created : 2022-01-03 09:47
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
	- Versio 4.6 System Operations
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->

# Real Time Content
 Objects created in After Effects can contain Real Time content. See the module in Chapter 6 for real time graphics. 


1. In your layout, add the MOV asset that contains Real Time content.
2. Select the asset in your layout.
3. Switch to the Info tab and expand the Real Time Tags heading.

![](attachments/2022-01-03%2010.27.31.gif)

Use the fields to update the Real Time content. The next time the layout is output, the updated content displays.

> Note: After editing a field, you must click outside of the Real Time Tags panel in order to finalize your changes.

> Note: If the layout is currently being output and it is not paused, the content will update on-air. Variables which change their values during playback, however, will not update automatically on-air.

![](attachments/2022-01-03%2010.29.31.gif)

## Updating all types of Real Time Content
 

If your Real Time content includes a network path to an image or clip file, edit the path to change the file that is used.

> Note the path to the asset should be reachable from the CSL and also the Versio Playout Server. 

1. Select the object that contains Real Time content in your layout.
2. Switch to the Info tab and expand the Real Time Tags heading.
3. Click on the field that you'd like to edit, and enter the new path and filename that you'd like to use.

 The next time the layout is output, the updated content displays.

 >   Note: You can use either MOV files or image files.

 ![](attachments/Pasted%20image%2020220103104054.png)

![](attachments/2022-01-03%2010.58.37.gif)

## Realtime Dynamic Variables
When the layouts with dynamic variables are played within a playlist, the text that appears on your output depends on the metadata of the current and upcoming events in the playlist.  

In the ADC realm this is known as `dynamic branding`.  ADC dynamic branding monitors the list services and sets variables as the list changes. 

This allows graphics to bind directly to {{Now.Title}}, {{Next.Title}} as a example. 

ADC Dynamic Branding will set these variables for the 1st segment of Primary events that are of type Program. All other types will be ignored. This means all commercials and promos need to be tagged property int he ADC database.


Dynamic variables consist of
- A "variable" such as title, date, or time. This determines which piece of event metadata is used during playback
- A "context" such as now, next, or later. This determines which event in the playlist is queried for its metadata during playback, in relation to the event that the layout is attached to.

>  Note: Within Versio Platform, each dynamic variable is identified by its context and its variable enclosed in two curly braces, such as "{{next.date}}".

 
 - Your layout might contain a Real Time tag called "Coming Up Next," containing the dynamic variable "{{next.title}}".
 - In the Automation module, this layout could be attached as a secondary event to a clip whose title metadata is "Galactic Megashow".
 - The event which follows this clip could be another clip, whose title metadata is "Pirates and Kings"
 - During playback, this "Coming Up Next" tag will display the title of the clip that follows it in the playlist: "Pirates and Kings".

If, in the above example, you replaced the "Pirates and Kings" clip with one called "Enormous Reptiles," the "Coming Up Next" tag would display "Enormous Reptiles" during playback.

### Use Dynamic Variables
- Select the object that contains Real Time content in your layout.
- Switch to the Info tab and expand the Real Time Tags heading.

> Note: You can type a dynamic variable into the tag if you wish (for example, {{next.date}}), or you can continue with the steps below to generate the variable with the Data Sources window.
    
- Click on the Storage icon ( ) beside the tag you'd like to edit. The Data Sources window opens.
- Ensure you are on the Variables tab.

In the Select Context list, select which event in the playlist is queried for its metadata during playback, in relation to the event that the layout is attached to.

- Now: During output, the currently-playing event will be queried for metadata.
- Next: During output, the next event in the playlist will be queried for metadata.
- Later: During output, the event which follows the next event will be queried for metadata.
- Each subsequent Later in the list will query the next later event in the playlist. For example, Later5 will query the event that is scheduled six slots below the currently-playing event.

In the Select Variable list, select the metadata that will be used to fill the variable during output.

You can select the standard variables that come with Versio Platform, as well as any custom data you have defined. See Managing Custom Data (Admin) (on page 207) to learn how to manage custom data in Content Portal.

> Note :  The AMPM variable will show "AM" or "PM" depending on the starting time of the event.

 - Click Apply. 
 
 The Data Sources window closes, and your Real Time tag displays the dynamic variable you have defined, for example {{now.date}}.

You can combine real time text and dynamic variables in each Real Time tag, for example:
- Coming Up: {{next.title}}
• Later Tonight: {{later2.title}} at {{later2.time}}

This requires you to manually enter and/or edit the Real Time tags, instead of only using the Data Sources window.


## Connect to External Data Sources
 You can also set Real Time content to gather data from external data sources.
 >  Note: Before you can access external data sources within the Graphics module, you must set up and configure the Data Sourcerer application.

- Select the object that contains Real Time content in your layout.
- Switch to the Info tab and expand the Real Time Tags heading.
- Click on the Storage icon ( ) beside the tag you'd like to edit.
- The Data Sources window opens.
- Ensure you are on the Data Gatherer tab.
 
![](attachments/2022-01-03%2012.19.31.gif)

- In the Select Data Source list, select the data set that you would like to gather information from. This is the data set you have previously defined in Data Sourcerer.
- In the Select Field list, select the data set field that you would like to connect to your Real Time tag.
- If you would like to add a prefix or a suffix to the data that is displayed in the tag, check the Add Prefix and/or Add Suffix checkbox and type the text in the appropriate field.
- If you would like to filter your query using a single condition that compares a data set field with a value:
	- Check the Condition checkbox.
	- In the first field, select the data set field whose values will be used to filter your query.
	- In the second field, select the operator that will be used to compare the data set field with the value in field three. Options are:
		- Equals
		- Less Than
		- Greater Than
		- Less Than or Equal to
		- Greater Than or Equal to
		- Not Equal to
	- In the third field, enter the value that the data set field will be compared to. This can be a any combination of numbers or text, and can also be a dynamic variable such as {{now.title}}.
- The Data Preview section displays the first five data set records that meet your criteria, including any prefix or suffix you have chosen and any condition you have applied. Click the View All link to view all of the available records instead of just the first five.
- Click Apply.  The Data Sources window closes, and your Real Time tag displays a text query representing what you have chosen.

The next time the layout is output, your Real Time tag will display the first available record from the data set. If you wish to cause the next record to be shown, or if you wish to go back to the first record again, you can use the `pull` and `requery `commands in the After Effects composition. 
