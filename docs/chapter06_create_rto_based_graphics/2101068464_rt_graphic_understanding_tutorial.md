---
tags:
  - realtime
  - tutorial
  - frame count
---

<!--
Title : 2101068464_rt_generating_frames_tutorial

- Created : 2022-01-04 11:47
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
	- https://web.microsoftstream.com/video/9e985a98-b5ed-4d7c-ad6c-6bc6792b9430
- Author Notes :
-->
!!! info 
    Sun 30 Oct 2022 19:04:15 IST

# RT Graphics Examples
Walkthrough some of the RT object behaviours and setups.  

## Last Frame Behaviour

- New Comp
   - 1920x1080
   - 5 Seconds duration
- New text field not realtime
- Add an expression to this layer 
   - `"frame " + thisLayer.timeToFrames(time);`

!!! info
    How to add expressions? Press Alt+click (Windows) or Option+click (macOS) the stopwatch button next to the property name in the Timeline panel or the Effect Controls panel.

<iframe width="560" height="315" src="https://www.youtube.com/embed/-Wq9B-bjDDQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


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
