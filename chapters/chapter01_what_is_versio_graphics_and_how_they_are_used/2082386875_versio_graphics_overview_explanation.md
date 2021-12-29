<!--
Title : 2082386875_versio_graphics_overview_explanation

- Created : 2021-12-29 14:44
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](!versio_graphics_moc.md)
-->

# Overview of Versio Graphics
A good starting point on this course is to take that 25000ft view of what the Versio Graphics deployment looks like.  

- Playout Server 
	- Hosted IconStation - 10 layers
	- Versio Automation uses layers 6 - 10 automatically
	- ADC / D-Series Automation layers 1 - 10 are scheduled 
	- Master Control Panel  - access to all layers and manual control
	- Layouts are loaded into the layers as required, schedule, manual
	- Layouts host assets and macros / salvos / prog salvos
	- Macros / salvos / prog salvos are fired on air
	- Assets can also be shown on air with no salvos
	- Complete layout can be shown on air with all assets with no salvos
	- All layouts are hosted on the local playout server D:/
- Creation Station 
	- Used to create and preview layouts - offline
	- Hosted IconStation - 10 layers
	- 3 UIs to review - HTML5, Silverlight, and Desktop
	- Layout management
		- create
		- delete, 
		- edit, 
		- export, 
		- publish
- QuickPorter
	- Optional workflow element
	- Create layouts automatically in Creation Station from watchfolders
- Motion Workflow Manager
	- Mange, move Layouts as required for on air
- Adode After Effects
	- Create assets to be used in Layouts
- Data Sourcerer
	- Import data from other data sources to update real time tags


Suggest a white board session is used in parallel with this list to outline the system.  Also show and review the customer system and talk about the differing user interfaces, applications and workflows. Demystify the terminology surrounding the product. 



