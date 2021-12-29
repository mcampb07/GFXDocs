- rn_1232596116_Versio_Grpahics_DVE
	- Imagine Communications - MyImagine Academy Content
	- Created on the: 2021-04-22 09:26
	- Created by: James Rivers
	- Written against (version): Versio 4.3 / 4.4 
	- Sources: 
	- Author Notes: 
	- Tags: [!VERSIO_GRAPHICS_MOC](!VERSIO_GRAPHICS_MOC.md)
	- ICON set : Warning ⚠️ / Notes 🗒 / Version 🌱 / Knowledge 🧠 / WWW 🕸 / Learning AIM 🎯
***
# DVE - Digital Video Effect
A DVE in Versio is a Video Effect that is moving shaping the video. We also call this a Squeeze back. A SQZ can be either a single or dual channel SQZ. 

In this item I will walk you through how to create a single and dual channel DVE.  We will make notes on items that are variable and consideration we need to make to be clear how this is going to function. 

- Create a new Solid 
- name it DVE A - this is important 
- Give it a color 
- Create a new Solid 
- Name it DVE B this is important 
	- names are used in the Zenium Blueprint so they have to match
- we will only sqz the A source in this demo 
- as we are only using source A DVE A - lets make DVE B 100% opacity 
	- this stops the preset video from being seen 
- DVE A and B both have to be in the scene even though we are only using 1
- We support scale opacity positioning and rotation for these solids
- start to add you key frames
	-  position and scale 
	-  move in 20 frames or so 
	-  add some easing to the key frames - why not
- add a comp marker for a pause - to hold the animation 
	- [rn_Versio_Graphics_CTC_Cheat_Sheet](rn_Versio_Graphics_CTC_Cheat_Sheet)
	- pause /  hold = true /  triggerresume =sqzout (not this can be any string)
- Animation out add key frames for position and scale
	- make easy out
- progress some more frames 
	- copy first key frames and paste them further 
- Now make DVE B full opacity for coming back to preset if required
	- Leaving DVE B in a good state
- new comp marker kill
	- takes it off air and clears the buffer 

- Add a graphic in the DVE process itself
	- sample American Dad 
	- add to the top of the zorder in the comp
	- New shape layer
	- add a shape - top of zorder 
	- make rectangle contents
		- rectangle path same size of the output 1920 1080
		- click tool
		- make shape centre
	- Copy the key frames from the DVE sqz timeline and add to the mask under the transform 

trakmatte f4 on the keybaord 


inverted track matte

make your add and the mask realtime objects

run the DVE Script
run the Realtime Script

