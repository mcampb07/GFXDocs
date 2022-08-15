- rn_1232654315_ADC_Dynamic_Branding
	- Imagine Communications - MyImagine Academy Content
	- Created on the: 2021-04-22 09:45
	- Created by: James Rivers
	- Written against (version): Versio 4.4 GA
	- Sources: 
	- Author Notes: 
	- Tags: [!ADC MOC](../adc/!ADC%20MOC.md)[!Versio Server MOC](playout/versio/!Versio%20Server%20MOC.md)
	- ICON set : Warning ⚠️ / Notes 🗒 / Version 🌱 / Knowledge 🧠 / WWW 🕸 / Learning AIM 🎯
***
🎯 We need to understand the configuration of the ADC Dynamic Branding and how this is used with on air operations

## ADC Dynamic Branding 
ADC dynamic branding monitors the list services and sets variables as the list changes. 

This allows graphics to bind directly to {{Now.Title}}, {{Next.Title}} as a example. 

ADC Dynamic Branding will set these variables for the 1st segment of Primary events that are of type Program. All other types will be ignored. This means all commercials and promos need to be tagged property int he ADC database.

## How is it installed? 
Warning ⚠️ Please review the latest Versio Engineering Guide for the most up to date details.

### Versio Configuration Manager
If you have opted for an ADC Automation install you are prompted whether you would like to include ADC Services as part of the install. In most configurations you will want to include it. If you answer n, ADC Services and **ADC Dynamic Branding will not be installed,** and you will not be prompted to configure these features during the install.

 If you have included - opted in for ADC Services or ADC Device Server as part of the install, you are prompted to enter Dynamic Branding information.

▪ Should a 12 Hour Clock Be Used: Specify yes (Y) or no (N).  
▪ Should AM/PM Be Shown: Specify yes (Y) or no (N).  
▪ EntertheProgramBlockSize:Specifywhethertheprogramblocksizeis1,15,30,or60. ▪ Enter the Number of Later Programs: Specify the number of later programs.  
▪ Enter the List Number: The list number must be greater than or equal to 1.

### Manual install 
if we need to manually install the package we need to run the following
> choco install adc-dynamic-branding

![](attachments/Pasted%20image%2020210422095924.png)


this package should be listed in a repo in order for it to install. Here we have a local repo and the package is listed

![](attachments/Pasted%20image%2020210422095727.png)

#### Is it installed?

Please run a choco check to review
> clist -l 
> 
> clist -l dynamic

You should see the installation of the item

![](attachments/Pasted%20image%2020210422095958.png)

### Configuration of ADC Dynamic Branding
Located at the following directory you will find the ADC Dynamic Branding Details 
> C:\ProgramData\Imagine Communications\DynamicBranding

Within this directory we will find an XML file - `DynamicBrandingConfig.xml`
```xml
<?xml version="1.0"?>

-<DynamicBrandingConfig xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">

<AdcServicesIP/>


-<Channels>


-<Channel>

<Name>Channel1</Name>

<DeviceServer>Versio-DS</DeviceServer>

<ListNumber>1</ListNumber>

<IconstationHost>127.0.0.1</IconstationHost>

<IconstationPort>9889</IconstationPort>

<TwelveHourClock>true</TwelveHourClock>

<ShowAMPM>true</ShowAMPM>

<ProgramBlockSize>15</ProgramBlockSize>

<LaterPrograms>1</LaterPrograms>

</Channel>

</Channels>

</DynamicBrandingConfig>
```

What is missing from this XML?  

The ADC Services IP needs to be populated. 

Plus in addition to this you need to add another channel if you are working on a multi channel versio - makes sense right .... Plus we also need to edit items such as the Device Server Names and List numbers


```xml
<?xml version="1.0"?>
<DynamicBrandingConfig xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <AdcServicesIP>10.0.11.33</AdcServicesIP>
  <Channels>
    <Channel>
      <Name>Channel1</Name>
      <DeviceServer>KHSL-DSA</DeviceServer>
      <ListNumber>1</ListNumber>
      <IconstationHost>10.0.11.25</IconstationHost>
      <IconstationPort>9889</IconstationPort>
      <TwelveHourClock>true</TwelveHourClock>
      <ShowAMPM>true</ShowAMPM>
      <ProgramBlockSize>15</ProgramBlockSize>
      <LaterPrograms>1</LaterPrograms>
    </Channel>
    <Channel>
      <Name>Channel2</Name>
      <DeviceServer>KHSL-DSA</DeviceServer>
      <ListNumber>2</ListNumber>
      <IconstationHost>10.0.11.25</IconstationHost>
      <IconstationPort>9891</IconstationPort>
      <TwelveHourClock>true</TwelveHourClock>
      <ShowAMPM>true</ShowAMPM>
      <ProgramBlockSize>15</ProgramBlockSize>
      <LaterPrograms>1</LaterPrograms>
    </Channel>
  </Channels>
</DynamicBrandingConfig>
```


### Is it working 
![](/attachments/Pasted%20image%2020210422102258.png)

Check the logs under magellan 
![](/attachments/Pasted%20image%2020210423100735.png)