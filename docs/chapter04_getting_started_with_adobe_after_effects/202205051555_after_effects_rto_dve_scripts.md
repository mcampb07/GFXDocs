<!--
Title : 202205051555_after_effects_rto_dve_scripts
- Created : 2022-04-15 11:10
- Updated :
- Author : James Rivers
- Written against (version):
- Sources : 
- Author Notes :
- Tags : 
-->
# After Effect Scripts - RTO and DVE 
There are 2 scripts that we use in the after effects comps they are the `DVE.jsx` and `RealTime.jsx`.  

Please review the [2122915384_dve_creation_understanding_tutorial](../chapter07_create_dves/2122915384_dve_creation_understanding_tutorial.md) and [2101068464_rt_graphic_understanding_tutorial](../chapter06_create_rto_based_graphics/2101068464_rt_graphic_understanding_tutorial.md) pages to understand how the scripts are used for RTO and DVE based comps. 

## Where to find the scripts? 
When you install the Creation Station Lite `CSL` you will find that the scripts will also be installed and located at `C:\Imagine\CreationStationLite-4.4.0-2020-09-25\Adobe After Effects Scripts`

![](attachments/Pasted%20image%2020220505161101.png)

Note though that the scripts listed here will be for the version of Versio Graphic 4.4, that is not the latest and there for, should not be used. 

You should request the scripts from Imagine Communications, and state the versio graphics version you have deployed on the system, 2.0.0.426 for example. 

### Script Versions & Graphics Compatibility
Note you need to use the correct script version for the version of versio graphics you have installed. 

To check the version, open powershell prompt on both the CSL machine and Veriso server, and run the following command:

```sh
clist -l versio-graphics
```

| Versio Graphics Version | Packages                   | Realtime Script Version |
| ----------------------- | -------------------------- | ----------------------- |
| Veriso 4.6 GA           | versio-graphics 20.0.0.426 | 2.1.0.46                |
| Versio 4.7 GA           | versio-graphics 20.0.0.427 | 2.1.0.48                |
|                         | versio-graphics 20.0.0.432 | 2.1.0.48                |

Realtime scripts can be found under the downloads link. 


