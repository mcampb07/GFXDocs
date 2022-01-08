On the creation station, you need to do the following for the CS to be able to connect to the 4.5 Versio.

This is a sample, so you need to change based on the IP address you have in TPBS.

  

1. Navigate to C:\Program Data\Harris\IconStation Web Service

  

2. Open the KnownDevices.config file.

In the file, there will be a target device for VERSIO-xx which will look like this: <device id="5e3999b6" name="VERSIO-xx" host="192.168.225.102" port="8890" share="" />

  

3. Change the port to 8895 to look as follows: <device id="5e3999b6" name="VERSIO-xx" host="192.168.225.102" port="8895" share="" />

  

4. Save the file and restart Conductor.

  

Once you done this, add in the Versio again.