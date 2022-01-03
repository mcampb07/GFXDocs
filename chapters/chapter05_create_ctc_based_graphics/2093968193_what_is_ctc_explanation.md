<!--
Title : 2093968193_what_is_ctc_explanation

- Created : 2022-01-03 12:59
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->
# CTC - Content Triggering Content
Content Triggering Content, known as CTC, allows for control of playback of video files through the use of named triggers. When building an animation in After Effects, the designer adds markers to the main composition track that are stored as Adobe XMP metadata and understood by the Versio graphics playback engine. This allows you to have graphics logic built directly into flatted animations without learning new CG tools, scripting or macros.

![](attachments/2022-01-03%2013.02.06.gif)

One of the advantages of CTC triggers are the possibilities are endless. There are no rules on how many loops and exit points you can create within a single animation. You can even create loops within loops. This section will cover  some basic to more advanced playback control of your clips.

- To see this work files must rendered as: 
	- MOV and “Include Source XMP Metadata” must be enabled.
	- Tip: build an output profile that allows you to reuse these settings each time.

## How this works
We need to discuss how a graphic can be controlled. Versio Graphics with this capability are required to be MOV formats with Adobe XMP enabled.

### Salvo, ProgSalvo, Macro (Manual or Automation)
An item will be shown most times by automation. Usually it will be part of a Salvo or Macro. In this case the object is set to be “Shown”. It will play and then enter its CTC commands which may loop or pause waiting on instructions from graphics. CTC Triggers can be added to a Salvo timeline and fired as a trigger. This will allow the designer to send commands to the clip to play an exit animation or hide. A salvo can also be fired when a CTC trigger is received.  

### Another MOV
Triggers can be build right into other animations. Animation A can control Animation B. This is very useful if you know your promo always appears in the same space as your logo. The animation can be built to auto hide the logo then show the promo without any additional automation events.

### Inline Triggers
Most triggers will be embedded into the XMP metadata of the MOV file. 
Markers must only be on the main composition timeline of the element that is to be rendered. Markers can be inserted using the NUMPAD * key.
![](attachments/Pasted%20image%2020220103131206.png)
![](attachments/Pasted%20image%2020220103131216.png)
### Salvo Triggers 
Triggers can be fired using a Salvo. The command can be added to your switcher command timeline where you can fire one to many named triggers. 

![](attachments/Pasted%20image%2020220103131355.png)