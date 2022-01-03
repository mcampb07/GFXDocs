- rn_1225719630_After_Effects_CTC
	- Imagine Communications - MyImagine Academy Content
	- Created on the: 2021-04-20 08:59
	- Created by: James Rivers
	- Written against (version): 
	- Sources: 
	- Author Notes: 
	- Tags: [!VERSIO_GRAPHICS_MOC](!VERSIO_GRAPHICS_MOC.md)
	- ICON set : Warning ⚠️ / Notes 🗒 / Version 🌱 / Knowledge 🧠 / WWW 🕸 / Learning AIM 🎯
***

## CTC Triggers

Content Triggering Content, known as CTC, allows for control of playback of video files through the use of named triggers. When building an animation in After Effects, the designer adds markers to the main composition track that are stored as Adobe XMP metadata and understood by the Versio graphics playback engine. This allows you to have graphics logic built directly into flatted animations without learning new CG tools, scripting or macros.

## RULES
-   All markers must have a label. 
    -   This is the first line in the marker.
    -   Labels should not have spaces.
-   DO NOT use “=” or “:” in your label or trigger names as they are used in the commands.
-   Triggers are lower case only
-   Triggers are global - if anything fires FOO, ANY AND ALL objects set to react on FOO that is currently on air will respond.
-   Play once does not work with CTC triggers as it uses the clips duration which is invalid. you will have to kill your own events with salvos.

### CTC Tips

**Keep trigger names simple and implicit**

Because triggers are global, if you want a particular animation to exit or similar on the trigger "exit" ensure that that can be fired regardless of the state of other on air objects. If you have many objects that should exit at the same time "exit" can be used and will work great. If you only need one object to exit, you should name that trigger more uniquely for that object OR have multiple triggers.

Managing many trigger names can get complicated. Keep it simple and few if possible.


#### Adding CTC Triggers in After Effects

CTC triggers are added to animations using markers. Markers can be added by Layer > Add Marker or Numpad \*. Markers should only be added to the main composition that will be rendered.  Child compositions will not always support CTC triggers.
![](/attachments/Pasted%20image%2020210420092406.png)

### Pause and Resume Triggers

Pauses are great to animate something in, hold, then animation something out. you can have as many pause points in your animation as you want.

#### Pause on a frame: hold

To hold on a specific frame you need to use the hold command. Hold will pause indefinitely without a trigger or hold time. The default value is false. This command can be used to hold on last frame, first frame or anywhere you want. You can have multiple holds in a single animation

> PauseHere  
> hold = true

#### Pause for a specific duration: holdtime

To hold for a specific duration, use holdtime command. The following will hold for 1 minute.
> PauseHere  
> hold = true  
> holdtime = 1:00 

> **Accepts standard time format**  
> holdtime = 0 is the default  
> 0:00.5 = 1/2 second  
> 1:00 = 60 seconds
> 15:00 = 15 minutes

#### Resume Playing when paused: triggerresume

Now that we have pauses, we will want to resume playing this animation. We will want to unpause or resume when a specific trigger is fired. Triggers can be fired from Salvos or other animations. This is great if you want to time elements together that may be on air. Example: Hide a logo to show a promo then reveal the logo again when done - all without specific automation commands. To resume playing, you need to identify the trigger name that will resume playing. This usually will go on the pause label at that point in time.

> PauseHere  
> hold = true  
>  holdtime = 0  
> triggerresume = unpause

> **triggerresume = triggername**
Can be any string but no spaces  
Trigger names should be lower case  
When “unpause” is fired using a fire trigger command, this animation will resume playing

#### Pause an animation using a trigger: triggerhold

If you would like to pause a specific graphic but you can't identify when it should be paused, you have the ability to send a trigger to pause it at anytime. This information can be anywhere in the timeline and does not have to be on a specific frame.

> PauseLogic  
triggerhold = pausenow  
triggerresume = unpause

> **triggerhold = triggername**  
Any animation with this command will  
pause imediately. User trigger resume to  
resume playing

### Firing a Trigger

A trigger can be fired from within an animation or a salvo. Salvos can also be set to play when a specific trigger has been fired. This is very powerful for having graphics communicate with each other instead of building separate automation commands. Triggers are names and are global. Multiple items can react to a single trigger on any layout/layer.

#### Fire a trigger: firetrigger

Fires a named trigger across all layers of IconStation.  You can specify multiple firetriggers per marker and they will all be fired at the same time.

> EndAnimation  
firetrigger = uppause
**firetrigger = triggername**

### Loops and Timeline Controls

Using CTC commands you can create N point loops in your animations. You can control loops by triggers and loop count. You can fire gototriggers to jump and exit out of loops.

#### jump to a specific frame: goto

To build a loop you can use a goto command. The goto command will jump the playback to the defined frame/label. When building a loop, you want to make sure the last frame of the loop and the first frame are the same so there is no visible pause/jitter in your animation. You can have as many loops in your animation as you like. You can even nest, loops within loops. This can come in handy if you have a logo that has different states based on what is happening throughout the segment. You can specify a loop to exit using a loop count or trigger. Read below for triggerexit commands.

> LoopEnd  
goto = LoopStart

> **Options**
goto = framenumber  
goto = framelabel  
count = N (if used, will ignore the goto command after the designated number of loops)

#### Exit a Loop (Linear): triggerexit

Defines a trigger that will cause the animation, when in a loop, to ignore the specified goto label or frame when fired (it will ignore all gotos until it reaches the label or frame). If a label or frame is not specified it will play through the label the command is on. This type of trigger can be fired more than once.

> ExitLoop  
triggerexit = exitloop:exit

> **Options**
triggerexit = triggername (plays through marker this command lives in)  
triggerexit = triggername:labelname (Only plays through the specified marker)  
triggerexit = triggername:framenumber (only plays through the specified frame number)

#### Jump to a specific frame/label on a trigger: triggergoto

Defines a trigger that will immediately skip to the specified label or frame when fired. This is great if you have a loop that you may need to jump out of at any time. Each trigger of this type can only be fired once.  Playing over this frame again in a loop will not work.

> ExitLoop  
triggergoto = exitloop:exit

> **Options**
triggergoto = triggername  
triggergoto = triggername:labelname  
triggergoto = triggername:framenumber

### Other Triggers 

#### Kill a playing item: kill

A point on the timeline that instructions the graphics engine to kill the item. This will allow housekeeping of on air graphics to be handled in After Effects instead of building separate salvos to kill an item. Essentially the suicide trigger.

> Reset  
kill = this 

> **Options/Future Support  
**
kill = this  
kill = all  
kill = ItemName

#### Real Time Crawl Commands: crawlend [Peter Musial](https://imaginecommunications.atlassian.net/wiki/people/5e506ae3691b8a0c95c361bf?ref=confluence) do we support this?

Real time crawls take the transformations in after effects and render the text in real time. The user has the ability to use the CTC features above to design IN, loop and Out for the crawl. The crawl text will be rendered by the graphics engine. A trigger can be fired to signal the crawl has ended or needs to end.

> CrawlLoop  
crawlloop = 4  
crawlend = endcrawl 

> **Options/Future Support  
**
crawlloop = # (number of times to play the crawl before exiting)  
crawlend = triggerName (fire a trigger to let other graphics know the crawl has completed - this can be used to hide other elements of the crawl in sync with the crawl text.)

#### Audio Ducking: Audio A = db:duration

On a specific frame you can set the ducking levels of your A and B sources. You can set the specific dB level and the duration in seconds it takes to change this.

> Duck  
Audio A = -60:0.5  
Audio B = 0:0.5

>**Options/Future Support  
**
you can set the value of A and/or B  
Duration is in seconds