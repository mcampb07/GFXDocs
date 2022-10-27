---
tags:
   - realtime
   - example
---

<!--
Title : 2101012022_creation_real_time_text_howto

- Created : 2022-01-06 14:23
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
-->


# How to create real time text
Download the both the CTC_BUG_PROMO_2201.aep and RealTimeGraphicsExamples.aep. 

You can use the promo and rt text examples folder in this module. 

- Using the RT text example from RealTimeGraphicsExamples.aep. 
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

!!! success
    See the recent update to the loop option in the Versio CSL User Interface [here](chapter06_create_rto_based_graphics/202204272022_realtime_pull_data_tutorial.md)


