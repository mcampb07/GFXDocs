<!--
Title : 2094000644_create_ctc_howto

- Created : 2022-01-03 13:14
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
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