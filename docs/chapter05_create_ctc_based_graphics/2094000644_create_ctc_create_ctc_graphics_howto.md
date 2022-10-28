---
tags:
   - ctc
   - tutorial
---

<!--
Title : 2094000644_create_ctc_howto

- Created : 2022-01-03 13:14
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
-->

# How to create CTC mov files
The majority of CTC commands are created in Adobe After Effects using Layer Markers. 

The Layer Markers must be on the **main composition timeline** being rendered in most cases. 

The Following are a list of supported commands and there behaviours. 

- Pause Resume
- Fire Triggers
- Loops & TimeLine Control
- Kill Triggers


## CTC Rules 

- All markers must have a label. A label is the 1st line in the comment.
- Labels should not have s pa ce s.
- DO NOT use “=” or “:” in your names as they are used in the commands.
- Trigger names are lower case only
- Triggers are global - if anything fires FOO, everything set to react on FOO that is currently playing will respond.
- Play once in IconStation does not work with CTC triggers as it uses the clips duration which is invalid. A kill command will need to be setup in a Salvo to kill CTC animations.

### Create CTC  Pause and Resume

- Add composition (comp) marker to your timeline.

#### Hold on Frame indefinitely

- To hold on a specific frame you need to use the hold command. 
	- Hold will pause indefinitely without a trigger or hold time. The default value is false.
```
pausehere
hold = true
```

![](attachments/Pasted%20image%2020220103132022.png)

#### Hold for specified duration
To hold for a specific duration, use `holdtime` command. The following will hold for 1 minute.
```
pausehere
hold = true
holdtime = 1:00
```
> Accepts standard time format :
> holdtime = 0 is the default  
> 0:00.5 = 1/2 second  
> 1:00 = 60 seconds  
> 15:00 = 15 minutes

![](attachments/Pasted%20image%2020220103132311.png)

#### Hold True,  Resume Trigger
If your animation is paused, and you would like to send a command to resume playing, the command below can be used.
```
PauseHere
hold = true
holdtime = 0
triggerresume = unpause
```
![](attachments/Pasted%20image%2020220103132435.png)

#### Hold Trigger, Resume Trigger
Using triggers you can command any animation to immediately pause. 
```
PauseLogic
triggerhold = pauseFoo
triggerresume = unpause

```

### Triggers

- Triggers are names that can be fired using CTC commands or salvos.
- A trigger is essentially a name. All triggering is global, so triggers should be implicit if necessary. 
- Multiple items can respond to a single trigger on any layout on air. A salvo can fire a trigger or be fired from a trigger as well.

#### Fire Triggers
- Fires a named trigger across all layers of IconStation.  
	- You can specify multiple fire triggers per marker and they will all be fired at the same time.
- EndAnimation
- firetrigger = uppause

### Loops & Timeline Control

- Using CTC commands you can create N point loops in your animations. 
- You can control loops by triggers and loop count. 
- You can fire gototriggers to jump and exit out of loops.

![](attachments/Pasted%20image%2020220104082251.png)

#### Goto 

- Go to a frame/label: goto
- When this command is hit, it will jump to a specific frame or label. 
- Ability to have a count as a parameter. After the count is reached, the goto will be ignored.


#### Loop Go to point

- Trigger a Jump: triggergoto
- Defines a trigger that will immediately skip to the specified label or frame when fired. This is great if you have a loop that you may need to jump out of at any time. 
- Each trigger of this type can only be fired once.  Playing over this frame again in a loop will not work.
```
LoopEnd
goto = LoopIn
```
#### Exit Loop

- Exit a loop: triggerexit
- Defines a trigger that will cause the animation, when in a loop, to play through the specified label or frame when fired (it will ignore all gotos until it reaches the label or frame). 
- If a label or frame is not specified it will play through the label the command is on. This type of trigger can be fired more than once.

```
ExitLoop
triggerexit = exitloop:exit

```
### Kill Triggers

- Kill Triggers are handy when it comes to cleaning up objects. Objects can sometimes be hidden but still on air. Kill triggers, can have objects immediately take themselves off air when passed. 
- Kill an Object: kill
	- Defines a point where an object will no longer be on air. Great for play once type of objects or to completely remove an object from air to reset it.

```
End
Kill = this
```
### Steps

#### Bug creation:

- Open the Bug composition of the resolution you require. 
- Review the composition markers that have already been added:
	- Hidebug
	- Pause
	- Showbug
	- end
- Understand the positioning of the markers with the respect to the frame of animation. 
- Trim your work area `CMD + Shift + X`  Never render more than you have too. 
- Render your composition using the output template you created earlier
- Create a new layout in CSL
- Add your .MOV as a new object to the layout
	- position the bug in the lower right corner
- Preview the layout and understand the exhibited behaviour.

#### Promo Creation:

- Open the Promo composition of the resolution you require. 
- Review the composition markers that have already been added:
	- Hidebug
	- Pause
	- Showbug
	- End
- Understand the positioning of the markers with the respect to the frame of animation. 
- Trim your work area `CMD + Shift + X`  Never render more than you have too. 
- Render your composition using the output template you created earlier
- Create a new layout in CSL, leave the Bug on air that you create earlier. 
	- position the bug in the lower right corner
- Add your .MOV as a new object to the layout
- With the Bug still loaded and on air in another layer, show this new layout and review the behaviour

If you have performed the above steps correctly then you should see graphics firing and interacting. 

#### Additional Trigger:

- Create a new layout
- Add no objects 
- Create a new salvo
- Add a command to the new salvo to fire a tigger 
	- triggers should be the ones used for hide bug and show bug









