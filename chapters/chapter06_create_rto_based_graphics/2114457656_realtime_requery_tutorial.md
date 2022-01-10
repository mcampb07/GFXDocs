<!--
Title : 2114457656_realtime_requery_tutorial

- Created : 2022-01-06 14:34
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->

# Real Time Requery
I have moved the data update to frame 20 and added another update at frame 50. So we will display 2 records in the field before we loop.  

Plus I have added a new xmp marker to time at frame 140 as shown below:
![](attachments/Pasted%20image%2020220105131609.png)
This will send an http request to the data source for an update set of data. You can see this is in the live pcap.

![](attachments/2022-01-05%2013.22.28.gif)

If that data source changes then the data requery will capture that new data.  Lets see that, we have a text file that is being polled by data sourcerer, in turn we have a realtime field linked to that data source and we are setting an xmp marker to requery that data source. 

![](attachments/2022-01-05%2013.36.29.gif)



