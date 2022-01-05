<!--
Title : 2101068464_rt_generating_frames_tutorial

- Created : 2022-01-04 11:47
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
	- https://web.microsoftstream.com/video/9e985a98-b5ed-4d7c-ad6c-6bc6792b9430
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->
# RT Graphics Examples
Walkthrough some of the RT object behaviours and setups.  

## Last Frame Behaviour
- New Comp
	- 1920*1080
	- 5 Seconds duration
- New text field not realtime
- Add an expression to this layer 
	- `"frame " + thisLayer.timeToFrames(time);`

![](attachments/Pasted%20image%2020220104115910.png)

- Render this comp. 
- Open and play with VLC, MPV
- Create a new layout in CSL and add your mov
- Show this layout in preview
	- We pause on the last frame, this is default behaviour.
	- To disable this default behaviour, add loops with XMP markers.
- Go back to comp in After Effects
- Add comp marker at the end of the composition. 
- enter a kill- see CTC Reference for details - [2093970347_ctc_cheat_sheet_reference](../chapter05_create_ctc_based_graphics/2093970347_ctc_cheat_sheet_reference.md)
	- `end kill = this`
- Render the comp, add the mov to the layout and review again.
- When the XMP data marker is reached the object is ejected.

![](attachments/Pasted%20image%2020220104121011.png)

> Note this is a static item, no RT. 

## Real Time Text
- Back to the composition. 
- Add a new text layer
- Label it as RealTime
![](attachments/Pasted%20image%2020220104121607.png)

- Run the RT Script
- This causes the RT object to hide
- Layer info is generated

![](attachments/Pasted%20image%2020220104121753.png)

- Render the comp
- Add mov to your layout
- Note the new Real Time Tags added to the info area in CSL 

![](attachments/Pasted%20image%2020220104121945.png)
- This can be edited
	- This can be edited whilst playing out on air.
	- This will stop rendering frames once the last frame is hit.
	- This same behaviour will be exhibited if a pause XMP marker is hit

![](attachments/2022-01-04%2015.18.57.gif)

What if you wanted to update the RT whilst on air? Add in a loop.

## Real Time Text with Loops
- Add a loop to your comp - see [2093970347_ctc_cheat_sheet_reference](../chapter05_create_ctc_based_graphics/2093970347_ctc_cheat_sheet_reference.md)
- Once your loop is added you can continuously update your real time text.

![](attachments/2022-01-04%2015.24.05.gif)

## Real Time Crawls / Scrolls
Scrolls consist of various scroll items that will either roll vertically or crawl horizontally in the layout.
- Create a Shape Layer,  use the Rectangle tool to draw the scroll's "leading rectangle."
- The leading rectangle will not actually appear in your scroll. Instead, it defines the behavior of your scroll in many ways:
	- Direction and Speed of Scroll: The way you animate the leading rectangle (its animation direction and its speed) will determine the direction and speed of your scroll items
	- Pause Movement: The animation will also determine the amount of vertical or horizontal movement on a CTC pause marker.
	- Arrangement of Scroll Items: The distance of the scroll items in relation to the top-left corner of the leading rectangle can be used to imply a margin separating subsequent scroll items, and to organize the way components appear relative to each other.
	- Visual Aid: The leading rectangle can also be used as a visual aid to represent typical scroll data.
- Apply the the Scroll label to the leading rectangle.
- Add your Real Time items:
	- Using the Horizontal Type tool or the Rectangle tool, create text or shape layers to represent your scroll items and any other Real Time items. 
	- Label the items with the RealTime label. 
	- Set the Parent property of all scroll items to be your leading rectangle layer. 
![](attachments/Pasted%20image%2020220104153830.png)
- The distance between the scroll items and the rectangle edge will determine how the scroll items are spaced during output.

![](attachments/Pasted%20image%2020220104153935.png)
 

When the scroll is played within Versio Platform, the scroll items will be spaced accordingly:
![](attachments/Pasted%20image%2020220104154001.png)
If the scroll is a crawl, however, then the distance between the left edge of the rectangle and the left edge of the first scroll item will determine the space between all items in the crawl.

![](attachments/Pasted%20image%2020220104165416.png)

![](attachments/Pasted%20image%2020220104154030.png)
When the scroll is played within Versio Platform, the scroll items will be spaced accordingly:
![](attachments/Pasted%20image%2020220104154051.png)
> Note: The above examples show a roll that moves from bottom to top and a crawl that moves from right to left. Rolls and crawls can move in the opposite directions if desired.

##### Direction 
Animate the leading rectangle to set the direction and speed of the scroll.

If the leading rectangle is animated to move vertically faster than it moves horizontally, then the scroll will be treated as a roll. Otherwise, it will be a crawl. 

- Scroll items will move in the same direction that the leading rectangle moves.

![](attachments/2022-01-04%2018.16.50.gif)
- The speed of the rectangle's animation will determine the speed of the scroll items.
- You can also animate the scroll items. Their transformations will occur as they scroll during output.
- During playback the items will scroll until the the end of the AE animation, and then the scroll will stop. If you will be connecting your scroll items to a data source, you will generally want to allow the scroll to continue until the data has been completely displayed.
- You can do this by putting a pause point in the animation. When the pause point is reached, the items will continue to scroll until there are no scroll items left (because the data has all been displayed), and then the animation will resume.
- Add a composition marker
- In the Comment box, enter a label for the pause (example: pause).
- Also in the Comment box, enter the following command and then click OK:
hold = true
- If you do not do this the crawl will freeze on the at the end of the comp time on air - not what you want. 
- This is also known as a `hybrid pause`
![](attachments/Pasted%20image%2020220104165118.png)

- Run the RealTime Scripts
![](attachments/Pasted%20image%2020220104165624.png)
- Render the comp
- Add the mov to a new layout and edit the real time tags

You should note that the crawl does not freeze on the last frame of the 5 second comp we created.  
I have added a frame count to prove this point, the frame count should pause but the crawl should complete and finish.

![](attachments/2022-01-04%2017.43.56.gif)

If we want to loop forever in a crawl then we need to add those attributes.  In the CSL layout select the object and click on the info column, find the item properties and set the crawl to loop forever. 

![](attachments/2022-01-04%2017.49.20.gif)

#### Adding External Data to the Crawl
Instead of us adding static text to the real time field in Versio Graphic. Lets link the real time field to an external data source. In this example I am pulling a news rss feed into data sourcerer, then selecting the data that I want to populate in the RT field. 

![](attachments/2022-01-04%2018.19.18.gif)

IconStaion is talking to Data Sourcerer to fetch all that external data. What is Data Sourcerer? Please review [2083402020_what_is_data_sourcerer_explanation](../chapter01_what_is_versio_graphics_and_how_they_are_used/2083402020_what_is_data_sourcerer_explanation.md)

![](attachments/Pasted%20image%2020220104182346.png)
![](attachments/Pasted%20image%2020220104182417.png)

> Note a loop will just play out the same data that has already been captured from Data Sourcerer and displayed. If we want new data, then we will have to add in a `pull` into the comp as another xmp marker to pull new data from the data sourcerer. 

## Real Time Setup
- All graphics are set up prior to going to air. 
- We cache some frames, a quantity,  before going to air, we playback and throttle later  for a smooth playback. 
- Setup is just as intensive and playing out the graphics 
- We are generating the first frames of object prior to render.
- The same can be said for the data capture - http request is issued in setup
	- So if we setup the layout
	- Refreshed the external data 
	- Took the layout to air we will show stale data
- If we had a loop - we are not requesting new data updates from the external data source.  We will loop the same data collected on setup. 

## Real Time GetData 
`getdata` is another xmp marker that we can use in the comp of AE project. So lets have an RT field grab another data source set on every loop. Before we do that lets see the non loop, non getdata example. 




## Real Time Re-Query

> 
![](attachments/Pasted%20image%2020220104162701.png)