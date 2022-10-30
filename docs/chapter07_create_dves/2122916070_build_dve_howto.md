---
tags:
  - dev
  - how to
---


<!--
Title : 2122916070_build_dve_howto

- Created : 2022-01-08 20:42
- Updated :
- Author : James Rivers
- Written against (version):
- Sources : Versio 4.6 System Operations
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->

# How to build a DVE

In After Effects  create a composition to match your output framerate. 

!!! note
    Compositions can be cropped or full screen. Plus remember to trim composition timelines to work area. 

!!! info
    Scripts parse the entire timeline and not just the time ruler.

## CTC 
 You will have covered CTC - Triggers in a  previous chapter. We are going to be using some again in this project. 

 - Firetrigger - Ability to fire a trigger from within a MOV
 - Triggergoto - On a specified trigger, jump to a specific label within the MOV
 - kill -  Good practice to kill the animations when they are DONE - Clear up after yourself!
 - DVE Triggers 
	 - Duck audio on a specific frame for a set duration
	 - Change the DVE z-order (Source A, Source B, GFX)

## DVE Script

In previous chapters we have covered the use of Scripts with Real Time objects.  Those scripts reviewed the composition and worked on those layers that had a label of a certain syntax, Realtime, Time, Scroll.

The DVE script does not use a label, insteaad the layer is going to be called either:
- `DVE A`
- `DVE B`

You must use that to name the layers. 
![](attachments/Pasted%20image%2020220108213258.png)

## Build - Single DVE

Enough waffle - lets build.  In the comp add 2 new solids, give them differing colors, this will help later.  Name 1 sold `DVE A` and the other `DVE B`

!!! tip
    I know we are building a single DVE, so why do we have 2 solids A & B?  the Versio Graphics engine on playout needs to understand that there are A & B, even though we are going to perform a single DVE.  

!!! note
    DVE A and DVE B are the names that are listed in the Zenium blueprint found on your Versio - hence the names we use here.

In your composition make sure A is over B - that is default state on the Versio.

As we are doing a single DVE on `DVE A` make the `DVE B` solid a 100% opacity at the beginning of the comp, just case something is loaded in the preset on the Versio we don't need to see it in the DVE.
![](attachments/Pasted%20image%2020220108213407.png)

Next we want to move onto creating the animation. 

- Frame 1 add keyframes for position and scale on `DVE A`
- Go forward so many frames in the timeline
- Position the solid

!!! note
    You can play with - position, scale, roatation and opacity

- Add a pause comp marker a few frames after the animation
- After the pause comp start build your aniimation back out

![](attachments/2022-01-08%2021.39.05.gif)

- **Remember** once you have finished the animation, you must leave `DVE B` in a good state, so put back the opacity. 
- lastly add an end comp marker - `kill = this`  at the end of your timeline to eject this item. 

### Adding Graphics to this simple single DVE 
The above is a simple single dve, but we are going to expand on this and add graphics underneath dve A and B. 

We are going to use an image now you would think that this layering is ok.

![](attachments/Pasted%20image%2020220110113246.png)

But then I have to manage the Z-Order and that is always going to be complicated.  A and B are over G, complicated that I need to change that order etc.. 

![](attachments/Pasted%20image%2020220110113332.png)

Instead we are going to use an image with a mask.  So we are going to place the graphic on top of the DVE. 

!!! note
    It is best practice to keep the graphics on top if you can, like bugs etc, it really does help. 

So we are going to have this layering, graphics on top of the dve a and b. 
![](attachments/Pasted%20image%2020220110113552.png)

To make this work we are going to add a shape layer, rectangle. 

![](attachments/Pasted%20image%2020220110113728.png)
Make the rectangle the same size as your output, in this example it is 1920 * 1080.  Rename the shape layer to something useful - 'addmask' as an example. 

![](attachments/Pasted%20image%2020220110114517.png)

!!! tip
    have snapping on

Then we want to take the keyframes from `dve a` and copy then to the new shape layer. 

![](attachments/Pasted%20image%2020220110120753.png)

Next we want to set the track matte on the image to be an alpha inverted track mask. 

![](attachments/Pasted%20image%2020220110120955.png)

So now we have a mask reveal of the squeeze.  

![](attachments/2022-01-10%2012.10.16.gif)

Ok so we have the `dve a` and `dve b` plus the mask and image/mov of the promo / advertising.  Moving on, add some real time text fields labels. 

- make the image a RT layer - we can change this for another image/mov later. 
- make the shape layer an RT layer.

![](attachments/Pasted%20image%2020220110121717.png)

- run both the dve and realtime scripts.
- render
- create new layout
- link the realtime image
- edit the done salvo 
	- remove the kill 
	- add new command - fire trigger whatever the trigger resume was on the unpause of the squeeze out.  

Preview is not possible on the CSL. You will need a zenium based system to review the dve on out put. 

