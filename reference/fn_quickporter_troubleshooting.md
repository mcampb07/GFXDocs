1. Verify the VM is up and running
2.  Verify the administrator account is login
- Review the QuickPorter logs to see what was last processed or what if failing C:\ProgramData\Imagine Communications\QuickPorter\Logs
3.  Open Computer Management
4.  Check that the QuickPorter Service is running
5. Check the windows event viewer log application and system to see if the QuickPorter service is crashing constantly.
6. Stop the QuickPorter Service
7. Rename the last QuickPorter log file. (You do this to get a new log file when the service is restarted)
8. Remove all PNG and MOV files form the drop folders
9. Start the QuickPorter service
10. Check the Quick porter latest log, you should see the folder locations
11. Open the file location noted in the logs to ensure you can reach the location
12. Drop a MOV or PNG in the drop folder.
13. Open the Versio Console> Layout Manager, check the layout was created
14. Drop another MOV or PNG in the drop folder
15. If the process is still not working, reboot the VM and go over the steps above.
16. Call support at 866 446 -2446 provide the serial number of a Versio and a case will be created