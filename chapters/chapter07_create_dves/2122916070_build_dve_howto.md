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
> Note compositions can be cropped or full screen. Plus remember to trim composition timelines to work area. 

> Note Scripts parse the entire timeline and not just the time ruler.

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
![](attachments/Pasted%20image%2020220108205145.png)

## Build - Single DVE
Enough waffle - lets build.  In the comp add 2 new solids, give them differing colors, this will help later.  Name 1 sold `DVE A` and the other `DVE B`

> I know we are building a single DVE, so why do we have 2 solids A & B?  the Versio Graphics engine on playout needs to understand that there are A & B, even though we are going to perform a single DVE.  

> Note DVE A and DVE B are the names that are listed in the Zenium blueprint found on your Versio - hence the names we use here.

In your composition make sure A is over B - that is default state on the Versio.

![](attachments/Pasted%20image%2020220108205742.png)
As we are doing a single DVE on `DVE A` make the `DVE B` solid a 100% opacity at the beginning of the comp, just case something is loaded in the preset on the Versio we don't need to see it in the DVE.

![](attachments/Pasted%20image%2020220108210017.png)

Next we want to move onto creating the animation. 

- Frame 1 add keyframes for position and scale on `DVE A`
- Go forward so many frames in the timeline
- Position the solid

> Note you can play with - position, scale, roatation and opacity

- Add a pause comp marker a few frames after the animation
- After the pause comp start build your aniimation back out

![](attachments/2022-01-08%2021.08.12.gif)

- **Remember** once you have finished the animation, you must leave `DVE B` in a good state, so put back the opacity. 
- lastly add an end comp marker - `kill = this`  at the end of your timeline to eject this item. 

### Adding Graphics to this simple single DVE 