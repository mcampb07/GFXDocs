---
tags:
  - ctc
  - tutorial
  - basic
---

<!--
Title : tut_create_ctc_bug_promo
- Created : 2022-10-28
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
-->

!!! info "Article Updated"
    Fri 28 Oct 2022 08:14:31 BST
# Tutorial - Create Basic Bug and Promo Triggers

In this tutorial, we need to build a new CTC Bug and Promo. You will need the following:

- [Basic CTC AEP](../../downloads/2094000644_create_ctc_create_ctc_graphics_howto/CTC_BUG_PROMO_2201.zip)
 
## Session Objectives

- Create a bug with a hold 
   - Create new layout and review in CSL
- Create a bug with a pause and trigger resume
   - Create a new layout and review in CSL 
   - Where is the trigger going to come from to resume?
- Create a new promo with a trigger fire
   - Create a new layout
   - Have the bug and promo interact


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
