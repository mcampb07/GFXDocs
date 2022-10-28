---
tags:
  - realtime
  - pull
  - referenced
  - active texture
  - tutorial
---


<!--
Title : tut_realtime_pull_reference_active_textures
- Created : 2022-10-28
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
-->

!!! info "Article Updated"
    Fri 28 Oct 2022 10:21:40 BST
# Tutorial - Real Time Pull with Referenced Active Textures

In the previous session [202210280919_tut_realtime_pull_requery](../tut_realtime_pull_requery/202210280919_tut_realtime_pull_requery.md) we learned how to build a real time text item that was linked to an external data source and was set to loop and pull and or requery data from that external data source. 

But, what if we want to have `active textures` also included in this type of setup. Can we do this? Sure we can, but as with everything in graphics it is all about the logic and behind scenes external data.

This session will review the additonal logic that we are going to implement including:

- active texture locations
- prefixes 
- sufixes

In this session you will need the following:

- [RealTime_Pull_Ref_Active_Textures_2210.aep](../../downloads/202210281021_tut_realtime_pull_reference_active_textures/RealTime_Pull_Active_Texture_Ref_2210.zip)

!!! tip 
    Try not to use this example in the session, but rather build your own real time text pull and requery. You can use this example if you get stuck and use it for reference. But you need to start creating theses items, real time layers, comp markers for CTC on your own - **LEARN BY DOING!**

## Session Objective 

- Crete a new composition add the following 
   - Real time text for temp
   - Real time text for location
   - Real time text for type
   - Real time active texture for the the weather icon - sunny.png
- Include the loop and pull logic 
- Create a new layout 
   - Link the realtime objects to the weather data source
   - Pay attention to the icon logic and how this is going to work

