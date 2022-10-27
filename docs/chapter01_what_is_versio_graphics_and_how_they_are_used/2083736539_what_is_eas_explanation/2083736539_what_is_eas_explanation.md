---
tags: 
   - eas
   - graphics
---

<!--
Title : 2083736539_what_is_eas_explanationUntitled

- Created : 2021-12-29 18:17
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :Versio EAS Setup Guide
- Author Notes :
-->

!!! info "Article Updated"
    Thu 27 Oct 2022 13:15:42 BST

# Emergency Alert System - EAS

The  Emergency  Alert  System  (EAS)  feature  enables Versio™  to  receive  and  broadcast  standard  FCC compliant  (S.A.M.E.)  EAS  messages from  a  supported  EAS  encoder. 

Versio supports  the  Digital  Alert Systems DASDEC  II.  Up  to 8 independent Versios may be configured from  a single  DASDEC device.  Multichannel  Versios  can be configured  to  recei ve  a common  DASDEC  EA source,  or each channel can be independent. Connectivity  with the DASDEC  is all done  via IP  (no serial, analog audio  receiver, or  GPI are necessary).

After receiving  alert  information,  the  information is stored as an audio file and an event notfigcation .txt file.  The  incoming text data is automatically populated  into an associated  template, depending  on  the alert type  and the configured output resolution. 

The  alert  audio and the upperthird visible  alert  crawl line  will  start  to  play at  the start time. 

The main program audio  will  be  ducked  in  level  throughout the  duration of  the  audible  alert. If the audio  completes  prior to the completion  of the  crawl  text, the  audio will  become  unducked and the crawl will  be  left  on until  it  completes. 

If  the crawl text is shorter than the audio the crawl will remain looping  until completion of  the  audio. 

Visible  EAS  crawls  are always  displayed  downstream  (on top) of the internal  graphics and external key fill inputs.

!!! note
    Note EAS support must be enabled within  Configuration Manager  before you  install your  channel instances, and it also  involves  configuring  your  EAS  device. 

