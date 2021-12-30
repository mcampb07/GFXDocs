<!--
Title : 2084300354_csl_best_practices_explanation

- Created : 2021-12-29 18:30
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->
# Creation Station Lite Best Practices
When creating graphics  layouts,  keep  the following  considerations  in  mind  during the  design  and troubleshooting of  your  content. 

Complex layouts  with  many  items  require  more  CPU  resources  than  simpler  layouts. If  you  find  that your  clips  require too  much  time  to  set  up,  or  if  the  items  in  your  layouts  have  difficulty  playing,  you may need  to  simplify  your  content,  increase  the  time  between  transitions,  or  lower  your  clip bit rate. 

When playing video  clips,  animations,  and graphics  from  file,  make  sure  the  media  file  resides  on the playout  system.  The system is  designed  with  large,  performant  drives  dedicated  to  the  playback of high-bitrate  graphics  elements. 

The Versio Playout server hosts the graphical layouts on SSDs. 

## Video Files 
Usually  the  content  being  ingested  already  has  its  frame rate  set,  in  which  case no  change should  be necessary. 

> Note that  the  broadcast  standards  for  each  region  should  also  be  considered.  Ex. PAL countries  would  expect  25  or 50,  and  NTSC  countries  29.97 or 59.94. 

### Field Order 
We recommend the  following  field order  settings  when creating  interlaced  video  clips: 
- HD: Upper field first. 
- SD PAL: Upper  field first. 
- SD NTSC: Upper  field first. 

When creating progressive  content,  be sure it  is  de-interlaced.   

### Resolution 
It is  most efficient to  playback  non-full screen  video  clips. 

For  example,  a  lower  third  banner  background could  be  rendered  at  1920x240 vs.  full  screen  1920x1080.   

Scaled  clips  or  dynamic  resizing  is  not  supported.  If  you  are  creating complex  layouts  with  many  items and  quick  transitions,  you  must  render your  clips  at  the  targeted  size. 

### File Size & Bit Rate

The size of  finished  clips  varies  considerably  depending on  the codec  and  the  available options  (bit  rate, compression,  etc.). Be  sure  that  you  have enough  drive space  to  store your  clips. 

Optimum  bit  rates  depend  on  the video  standard,  available  compression  settings,  and the  complexity  of the  video.  Values  that  are  too  high will produce  larger  files  which  require  more  disk  space  and  disk bandwidth  during  playback,  and  values  that  are  too  low  will  produce  compression  artifacts. 

The  QuickTime Animation  codec  is  most  efficient  for  pure  graphics  elements.  The QuickTime  H.264 codec  is  better  suited  for  video  clips  originating from a  camera. 

### Alpha Channel 
The VIA  and  QuickTime Animation  codecs  support  an  embedded  alpha  or  key  channel.  This  typically  is created  as pre-multiplied  and  is  the  recommended  method  for  default  operations.  

Versio  can  be configurated  to  support  straight  alpha,  but  mixing  between  pre-multiplied and  straight  content  will produce  incorrect  results.  It  is  therefor  best  to  standardize  on  one  method. 

### Supported  Codecs & Clip Formats 
As of 2019, codecs  and clip  formats  supported  by  IconStation.

- QuickTime  Animation  (32bit/Millions  of  Colors  +) (.mov)
- QuickTime  H.264  / AVC  (.mov) 
- Imagine  VIA  RLE  (.via) 

If  content  exists  in a  different  format  or  codec,  it  will  require  transcoding  to  a  supported  variant.  Contact Imagine  Communications  for  further  information  on  transcoding  solutions. 

### XML Automation  Protocol 
When using  the Setup  All  command,  performance  can  decline  if  layout  items  are  too  resource  intensive.   Note the following tips: 

- A crawl with  small  components  is  as  resource intensive as  about  50  non-data  sourced  image  items.   
- A Setup  All of  three  crawls  could  potentially overload the  system. 
- Bigger video  clips  are  more  resource  intensive  than  smaller  ones.   
- For layouts  with a  large  numbers  of  items,  make  sure  the  items  are  lightweight. 
- Make sure  the Setup  All  command  has  enough  time to  complete  or  use Setup  commands  only required  elements  (Example: ProgSalvo).   
- Make sure all  items  are setup  before using a  Show  All  command. See  the  XML  Automation  Protocol  Reference  Guide  for  details  on  the automation  commands. 

### Macros & Salvos
  Versio Graphics  Macros  contain  multiple  Salvo  states. 
  - Salvos fire  sequentially.   
  - Only one salvo  can  be active at  a  time.   
  - A salvo will be  canceled if  any item  it  affects  is  killed  from  a  command  outside the salvo. 
	  - For example,  by  another  salvo  or  an  outside kill  command.  
	  - Note  that  to  kill  an  item it  must  be  setup  or showing. 
  - For layouts  with  many  elements  that  are controlled  individually,  use  'on'  and  'off+kill'  salvos (Example:  ProgSalvo)  to  control  the  elements—rather  than  salvos  that  kill  elements  after  a  period of time.  Otherwise,  leaving  items  in  an off-air  yet  hidden state  (not  killed)  will still  utilize  graphics resources. 
  - When using an automation  playlist,  a  ProgSalvo  or  LoadFire  salvo  in  the secondary  event  cannot  play longer  than  the primary  event.  ProgSalvo  will play  the  Done  state  and  LoadFire  will  Kill at  end  of primary. 
  - However,  the  FireSalvo  command  does  not  have any  dependence  on  the length  of  the primary. 