<!--
Title : kitv

- Created : 2022-01-06 15:58
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
	- https://lucid.app/lucidchart/6ca7f171-2b9f-4824-97cf-2fabdf26bf94/edit?invitationId=inv_2ebf6741-a25e-4d84-9c4f-980a6e5554a9&page=0_0#
	- 
- Author Notes :
- Tags :  [!versio_graphics_moc](../!versio_graphics_moc.md)
-->
# Versio Graphics Training for KITV

## Survey results

In the run up to the training being delivered we issued a survey to gauge the level of knowledge held amongst the local creators at KITV. 

Results:
1. What is your experience with Versio Graphics? - 100% None
2. Have you used Creation Station?- 100% No
3. Have you used Adobe After Effects? - 100% Yes
4.Have you used expressions in After Effects? - 66% Yes
5. Have you used composition markers with projects? - 100% Yes
6. Have you created Real Time Objects in After Effects? - 66% Yes
7. Have you created DVEs in After Effects before? -100% No
8. Do you understand the difference between a prog salvo and a salvo in Versio Graphics? - 100% No
9. Do you know what a layout is in Versio Graphics? - 100% No
10. Do you know how to add external data sources to your graphics for realtime updates, weather feeds etc..? 100% No

## Consultation 
In addition to the survey we met with the end customer to understand current graphics playout and workflow setup.  Plus what Versio needs to provide to replicate the current on air output. 

![](attachments/Pasted%20image%2020220106171917.png)
In the above image we are going to focus on the creation of the elements outlined in Red:
- Ticker/Scroll
- Channel Bug
- Sponsor 2 

The Yellow element, is the Time and Temp derived from BrandNet, it is understood that BrandNet will remain in the video path, however we have created Time and Temp optional replacements in the upcoming training.  


## KITV Graphics Creation
If you wish to review the AEP for the upcoming sections please download the `KITVAeSample.zip` which contains all the assets and AE project. 

The KITV sample graphic that has been provided looks like this:

![](attachments/2022-01-07%2017.10.59.gif)

We will cover each of the elements that you can see. 

### Ticker
We have provided a number of ticker examples to help you start with Versio graphics.  We have:

- Basic

- Local 

- Network

Lets start with the basic ticker.

### Basic Ticker

![](attachments/Pasted%20image%2020220106173321.png)

The basic ticker is comprised of the following elements:
- Realtime Sponsor
- Realtime Separator
- Realtime Crawl text 
- Realtime Crawl object
- Number of Shape Layers
- XMP Comp Marker - Pause
	- hold = true
	- triggerresume = crawlend
-  XMP Comp Marker - End 
	- kill = this

To understand how this crawl is created for Versio, please review chapter 6 realtime crawls. 

- This ticker will be rendered and inserted into a layout, 
	- Crawl attributes can be edited there, loop n , loop forever. 

	- External data can be linked as you would wish. 
	
	- Done salvo will host a command fire trigger  `crawlend` 

> Note there is a bug on the showing of the separator image, that is being reviewed. 

![](attachments/2022-01-06%2017.53.59.gif)


### Ticker Network & Ticker Local
There are 3 compositions that make up this auto changing ticker, from local to network rss feeds. This is an example to showcase auto updating and changing feeds. 

- Compositions:
	- Ticker Background
	- Ticker Local 
	- Ticker Network

### Ticker Background Comp
This comp has 2 XMP comp markers
- pause 
	- hold = true
	- triggerresume = crawldone
- end 
	- kill = this

![](attachments/2022-01-06%2017.58.38.gif)


This comp will be rendered and added to a new layout, lets call that `KITVCATICKER`, combined with the other compositions that we need to review. 

The background ticker played on its own looks like this:

![](attachments/2022-01-07%2010.29.10.gif)

### Ticker Local Comp
This comp has a number of elements.
![](attachments/Pasted%20image%2020220107103608.png)

We have included a category animation to reflect if the feed is local or network.  Orange labels in this comp are realtime, this includes masking and some expressions for text resize for the category background.

![](attachments/Pasted%20image%2020220107103813.png)

![](attachments/Pasted%20image%2020220107104125.png)

The ticker feed layers, purple, as also realtime.  This includes the sponsor, lower right, ticker image separator. Plus the crawl text and object.  

![](attachments/Pasted%20image%2020220107104215.png)

The xmp comp markers are as follows:

![](attachments/Pasted%20image%2020220107104447.png)
- pause 
	- hold = true
	- triggerresume = crawlend
- showlocal
	- firetrigger = network
- end 
	- kill = this

Once scripts have been run and comp rendered, this .mov will be added to the new layout that hosts the ticker background `KITVCATICKER`. 

### Ticker Network Comp
This is the last of the 3 compositions for the auto change ticker. 
![](attachments/Pasted%20image%2020220107105302.png)
This comp is very similar to the local ticker comp, but there is one difference in the comp markers, and that is the fire trigger is local. 

- pause 
	- hold = true
	- triggerresume = crawlend
- showlocal
	- firetrigger = local
- end 
	- kill = this

Once scripts have been run and comp rendered, this .mov will be added to the new layout that hosts the ticker background `KITVCATICKER`. 

### Ticker Network & Local - Layout Build
You have all 3 comps published and added to a CSL Layout `KITVCATICKER`.  

![](attachments/Pasted%20image%2020220107110628.png)


How does this work?  We have a ticker that will play all the data from an external source, then once completed, play all the data from another external source and the cycle continues.  Lets explore how this is put together.

![](attachments/2022-01-07%2011.05.04.gif)

#### Object Real Time Properties 
Both the ticker network and ticker local object have real time tags. 

![](attachments/Pasted%20image%2020220107110930.png)

Real time tags for **ticker network**:

- Category 
	- Static real time text, as this is the network news feed, we have set the text network news.

- Crawl text 
	- Real time external data collected from data sourcerer, this could be an rss feed and or other data source

- Separator
	- Real time image - pointing towards the location of the image that will be used to separate the news items in the crawl. Note this must be a network path, not a local drive. Remember when you publish this layout to a Versio, the IconStation on the Versio also needs to be able to see that item.

- Sponsor
	- Real time image- pointing towards the location of the image that will be used for the lower right corner sponsor. Note this must be a network path, not a local drive. Remember when you publish this layout to a Versio, the IconStation on the Versio also needs to be able to see that item.


Real time tags for **ticker local**

- Category 
	- Static real time text, as this is the local news feed, we have set the text local news.

- Crawl text 
	- Real time external data collected from data sourcerer, this could be an rss feed and or other data source

- Separator
	- Real time image - pointing towards the location of the image that will be used to separate the news items in the crawl. Note this must be a network path, not a local drive. Remember when you publish this layout to a Versio, the IconStation on the Versio also needs to be able to see that item.

- Sponsor
	- Real time image- pointing towards the location of the image that will be used for the lower right corner sponsor. Note this must be a network path, not a local drive. Remember when you publish this layout to a Versio, the IconStation on the Versio also needs to be able to see that item.

	- Note the sponsor image used in the local news ticker is differing from the network news ticker, providing a dynamic sponsor. 

#### Macros
- For this layout there are some macros that provide the logic.

![](attachments/Pasted%20image%2020220107111748.png)
##### Start macro
- The start macro is holding in the `show` salvo both the ticker network crawl and ticker background

- Both the background and network will play. 

- Both background and network will hit a hold = true, no more frames, but crawl data carries on.

	- triggerresume for network = crawlend
	
	- triggerresume for background = crawldone

![](attachments/Pasted%20image%2020220107112435.png)

- When the data from the mapped external source linked to the crawl text is completed, it will receive a trigger `crawlend` ticker network will continue playout and reach the next comp marker. This is `firetrigger = local`

- Immediately after this trigger the other comp marker is reached `kill = this` killing the ticker network, taking it off air.

- The background remains on air as it is in hold.

##### Local macro
- The local macro is hosting the ticker local object

![](attachments/Pasted%20image%2020220107112809.png)
- This macro `local` will be started when the trigger `local` is fired.

![](attachments/Pasted%20image%2020220107112859.png)
- ticker local will play, pulling data from external source. 

- ticker local will hit a hold = true, no more frames, but crawl data carries on.

	- triggerresume for local = crawlend

- When the data from the mapped external source linked to the crawl text is completed, it will receive a trigger `crawlend` ticker network will continue playout and reach the next comp marker. This is `firetrigger = network`

- Immediately after this trigger the other comp marker is reached `kill = this` killing the ticker local, taking it off air.

- The background remains on air as it is in hold.

#####  Network macro
- The network macro is hosting the ticker network object.

![](attachments/Pasted%20image%2020220107113436.png)

- This macro `network` will be started when the trigger `network` is fired.

![](attachments/Pasted%20image%2020220107113638.png)

- ticker network will play, pulling data from external source. 

- ticker network will hit a hold = true, no more frames, but crawl data carries on.
	
	- triggerresume for local = crawlend

- When the data from the mapped external source linked to the crawl text is completed, it will receive a trigger `crawlend` ticker network will continue playout and reach the next comp marker. This is `firetrigger = local`
- Immediately after this trigger the other comp marker is reached `kill = this` killing the ticker network, taking it off air.

- The background remains on air as it is in hold.

and the loop continues ....

#### Exiting the loop
- If we come back to the `start` macro and look at the `done` salvo, we have a command listed in the action row. 

![](attachments/Pasted%20image%2020220107135937.png)

- The command is firing a trigger - `crawldone` which we know the background ticker is listening for to end the background ticker. 

- In addition to this we are dissolving the ticker local and ticker network. Then a kill to eject and remove. 

## Channel Bug

- The KITV Channel Bug is a nice and simple animation. 

![](attachments/2022-01-07%2011.49.40.gif)

- But we have added 2 real time text areas that can be used for the time and temp. 


![](attachments/Pasted%20image%2020220107115110.png)

- There are 2 xmp comp markers 

- pause 

	- hold = true
	
	- triggerresume = bugout

- end
	
	- kill = this

### Channel Bug - Layout Build
- New layout - `KITVBUG`

- 1 macro - `KITV`

- Real time tag for temp - can be pointed to external source

- Time attribute is set for a clock



