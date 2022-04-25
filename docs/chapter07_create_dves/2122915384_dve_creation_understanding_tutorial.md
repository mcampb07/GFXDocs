<!--
Title : 2122915384_dve_creation_understanding_tutorial

- Created : 2022-01-08 20:32
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->
# DVE Creation Understanding
Before you get to the creation of how to build a DVE we need to go over some of the overall elements here, with Versio, IconStation etc... 

## Animations in Versio 
- Animations are linear, controllable and can be variable durations
- Animations can be one and done(fixed duration)
![](attachments/Pasted%20image%2020220108203458.png)

---

- Animations support 3 and 4 point loops
![](attachments/Pasted%20image%2020220108203518.png)

---

- DVE effect that squeezes in Pauses with static background
- DVE effect that squeezes in and has a looping background
- Squeeze up for the bottom bar 
- Show and hide a bug or graphic   
- Versio also supports N point animations

![](attachments/Pasted%20image%2020220108203711.png)

---
## Z-Order
- Within an MOV there is a semi-fixed hierarch
	- TOP:     Real Time Graphics elements with their composition z-index
	- BOTTOM:    Flattened graphics rendered in MOV

- MOV/IMAGES live within layouts. 
	- 10 Layouts can be loaded at one time with a Z-Order 1 (top) -10 (bottom)

![](attachments/Pasted%20image%2020220108203926.png)

### Graphics can change the Z-Order
- Graphics defaults to atop A and B, but priority of all 3 can be swapped

![](attachments/Pasted%20image%2020220108204037.png)

### What else should you know...
-   Real time graphics will always be rendered on top of flattened render graphics
    
-   Graphics will always be on top of DVEs unless specified with a CTC trigger
    
-   Any CTC triggers should be on the main composition timeline that is to be rendered.