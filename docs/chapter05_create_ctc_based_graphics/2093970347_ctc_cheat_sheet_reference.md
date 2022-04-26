<!--
Title : 2093970347_ctc_cheat_sheet_reference

- Created : 2022-01-04 08:21
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->

# CTC Reference
CTC triggers are added to animations using markers. Markers can be added by Layer > Add Marker or Numpad *. Markers should only be added to the main composition that will be rendered.  Child compositions will not always support CTC triggers.

### Pause and Resume Triggers
Pauses are great to animate something in, hold, then animation something out. you can have as many pause points in your animation as you want.

#### Pause on a frame: hold
To hold on a specific frame you need to use the hold command. Hold will pause indefinitely without a trigger or hold time. The default value is false. This command can be used to hold on last frame, first frame or anywhere you want. You can have multiple holds in a single animation.

```
Hold Command
PauseHere  
hold = true
```


#### Pause for a specific duration: holdtime
To hold for a specific duration, use holdtime command. The following will hold for 1 minute.

Holdtime Command

```
PauseHere  
hold = true  
holdtime = 1:00 
```
Accepts standard time format
holdtime = 0 is the default  
0:00.5 = 1/2 second  
1:00 = 60 seconds

15:00 = 15 minutes

> Note   By default, all CTC animations hold on the final frame and there is no extra work required.  If you do not want the animation to hold on the final frame, add a composition marker to the last frame, enter a label for the marker, and then enter the line kill = this.

#### Resume Playing when paused: triggerresume
Now that we have pauses, we will want to resume playing this animation. We will want to unpause or resume when a specific trigger is fired. Triggers can be fired from Salvos or other animations. This is great if you want to time elements together that may be on air. Example: Hide a logo to show a promo then reveal the logo again when done - all without specific automation commands. To resume playing, you need to identify the trigger name that will resume playing. This usually will go on the pause label at that point in time.

```
triggerresume command

PauseHere  
hold = true  
holdtime = 0  
triggerresume = unpause

**triggerresume = triggername**

Can be any string but no spaces  
Trigger names should be lower case  
When “unpause” is fired using a fire trigger command, this animation will resume playing

```

#### Pause an animation using a trigger: triggerhold
If you would like to pause a specific graphic but you can't identify when it should be paused, you have the ability to send a trigger to pause it at anytime. This information can be anywhere in the timeline and does not have to be on a specific frame.

```
Trigger Hold Command

PauseLogic  
triggerhold = pausenow  
triggerresume = unpause

**triggerhold = triggername**  
Any animation with this command will  
pause imediately. User trigger resume to  
resume playing

```

### Firing a Trigger
A trigger can be fired from within an animation or a salvo. Salvos can also be set to play when a specific trigger has been fired. This is very powerful for having graphics communicate with each other instead of building separate automation commands. Triggers are names and are global. Multiple items can react to a single trigger on any layout/layer.

#### Fire a trigger: firetrigger
Fires a named trigger across all layers of IconStation.  You can specify multiple firetriggers per marker and they will all be fired at the same time.
```
Hold Command

EndAnimation  
firetrigger = uppause

**firetrigger = triggername**
```

### Loops and Timeline Controls
Using CTC commands you can create N point loops in your animations. You can control loops by triggers and loop count. You can fire gototriggers to jump and exit out of loops.

#### jump to a specific frame: goto

To build a loop you can use a goto command. The goto command will jump the playback to the defined frame/label. When building a loop, you want to make sure the last frame of the loop and the first frame are the same so there is no visible pause/jitter in your animation. You can have as many loops in your animation as you like. You can even nest, loops within loops. This can come in handy if you have a logo that has different states based on what is happening throughout the segment. You can specify a loop to exit using a loop count or trigger. Read below for triggerexit commands.

```
Go To Command

LoopEnd  
goto = LoopStart

**Options**

goto = framenumber  
goto = framelabel  
count = N (if used, will ignore the goto command after the designated number of loops)
```

#### Exit a Loop (Linear): triggerexit

Defines a trigger that will cause the animation, when in a loop, to ignore the specified goto label or frame when fired (it will ignore all gotos until it reaches the label or frame). If a label or frame is not specified it will play through the label the command is on. This type of trigger can be fired more than once.

```
Trigger Exit Command

ExitLoop  
triggerexit = exitloop:exit

**Options**

triggerexit = triggername (plays through marker this command lives in)  
triggerexit = triggername:labelname (Only plays through the specified marker)  
triggerexit = triggername:framenumber (only plays through the specified frame number)
```

> Note: The CTC Target triggerexit works well for exiting shorter loops. It would not work well if you had a longer loop and needed to time the exit with other objects.

#### Jump to a specific frame/label on a trigger: triggergoto

Defines a trigger that will immediately skip to the specified label or frame when fired. This is great if you have a loop that you may need to jump out of at any time. Each trigger of this type can only be fired once.  Playing over this frame again in a loop will not work.

```
Trigger Go To Command

ExitLoop  
triggergoto = exitloop:exit

**Options**

triggergoto = triggername  
triggergoto = triggername:labelname  
triggergoto = triggername:framenumber
```

#### Kill Triggers

A point on the timeline that instructions the graphics engine to kill the item. This will allow housekeeping of on air graphics to be handled in After Effects instead of building separate salvos to kill an item. Essentially the suicide trigger.

```
Kill Command

Reset  
kill = this 

**Options/Future Support  
**

kill = this  
kill = all  
kill = ItemName
```
