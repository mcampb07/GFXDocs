<!--
Title : 2114465112_creation_real_time_clocks_timers_howto

- Created : 2022-01-06 14:36
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->

## Realtime Timers / Clocks
Realtime timers also adopt this hybrid pause approach.  
- On the composition add a new text layer, add the text hh:mm:ss
	- Other options are available and will be covered later.
![](attachments/Pasted%20image%2020220105134624.png)
- Set the  label for the text layer to be `Time`
![](attachments/Pasted%20image%2020220105134704.png)
- Run the realtime script
- Add a pause xmp comp marker
- Render the composition

> Option add a triggerresume to the pause xmp marker that can be fired when the timer gets to its destination. 
- Add the mov to a layout and review the output. 
- Note we have a hybrid pause and we are repeating that frame 55, in this example. 
- Scroll and Time are stateful. 
![](attachments/2022-01-05%2013.52.24.gif)

> Time is collected from Chronos or the Time is collected from the OS system clock time. 

Something that we need to be aware of regards time and setup.  If we setup the layout with a clock, then we are fetching the data required from the source, Chronos or the PC time. But if we then perform a show, after the setup we will see stale data and clock time be listed incorrectly until it can catch up. Here is an example of that behaviour. A jump from 06.28.10 to 06.28.16.
![](attachments/2022-01-05%2014.28.06.gif)

To avoid this on air issue, add opacity to the text layer for the first few frames so this error is not shown. 

![](attachments/2022-01-05%2014.35.30.gif)

### Hierarchal build. 
Timers/ clocks can be built in a hierarchal manner. Here is an example, we are going to break up the hh, mm and ss into 3 text layers. 
![](attachments/Pasted%20image%2020220105144154.png)

![](attachments/Pasted%20image%2020220105144136.png)




