<!--
Title : 2083088310_what_is_quickporter_explanation

- Created : 2021-12-29 18:04
- Updated :
- Author : James Rivers
- Written against (version):
- Sources : 
	- QuickPorter User Guide
	- [fn-Quickporter_Workflow](../../reference/fn-Quickporter_Workflow.md)
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->

# QuickPorter

What is QuickPorter? 

Quickporter uses a Versio Graphics template layout and a series of MOV files to automatically fill Versio Graphics layouts with video content. 

QuickPorter requires 
- Creation Station 2.1 or later 
- Quickporter 
- The .NET 4.5.1 framework 
- QuickTime 7 

After you  have configured  Quickporter and saved  your Versio  Graphics  template, you can  use Quickporter to  create  new  layouts with  MOV  files.

## Steps
- The artist workflow is as follows:
	- create and render MOV from After Effects  
	- upload MOV to S3 bucket  
	- Open Workspaces-Open Creation Station Lite UI  
	- Open the new auto-generated layout  
	- Check for errors, adjust if necessary  
	- Press publish  
	- In content portal, select layout, press "re-publish"
- The Operator workflow is as follows:
	- The layout magically appears in Content Portal  
	- the layout is already published to Versio

