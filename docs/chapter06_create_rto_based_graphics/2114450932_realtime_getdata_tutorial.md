---
tags:
  - realtime
  - get data
  - pull
  - requery
---

<!--
Title : 2114450932_realtime_getdata_tutorial

- Created : 2022-01-06 14:33
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->
!!! info "Article Updated"
    Sun 30 Oct 2022 19:12:23 IST

# Real Time GetData 
`getdata` is another xmp marker that we can use in the comp of AE project. So lets have an RT field grab another data source set on every loop. Before we do that lets see the non loop, non getdata example. 


Here we have a layout with our frame counter and the realtime text field that is mapped to an external source, a simple text file with a number of lines, hello being the first.  This layout has a loop xmp marker and is continuing to loop. 

![](attachments/2022-01-05%2012.44.08.gif)

Now lets add in a new XMP marker `getdata` the name of the text layer that you want to update on each loop needs to be the target, the example below you can see the text layer is RealTimeText, the getdata target is the same. 

![](attachments/Pasted%20image%2020220105124858.png)
Run the script and render. Add to a layout, link to an external source and test.  Here is the example output. 

Now on every loop at frame 100 the realtime field is going to update and render the next record from the external data set. 

![](attachments/2022-01-05%2013.06.03.gif)

But you need to understand that we are not sending an http request to the data source to get new data, what was already loaded in the cache when we went to air is being used. If we want to get new data updates from the data source then we need to use a new xmp marker - requery. 

Please review the [202204272022_realtime_pull_data_tutorial](202204272022_realtime_pull_data_tutorial.md) pages also that covers a similar subject regards getting new data.

