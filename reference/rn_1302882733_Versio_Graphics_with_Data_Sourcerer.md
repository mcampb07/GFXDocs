- rn_1302882733_Versio_Graphics_with_Data_Sourcerer
	- Imagine Communications - MyImagine Academy Content
	- Created on the: 2021-05-18 13:56
	- Created by: James Rivers
	- Written against (version): 
	- Sources: 
		- [ Data Sourcerer](https://imaginecommunications.atlassian.net/wiki/spaces/VPGM/pages/1684078596/Data+Sourcerer)
		- [SQL with Data Sourcerer](https://imaginecommunications.atlassian.net/wiki/spaces/VGFXT/pages/2068874860/Setting+up+a+new+SQL+Source+with+Data+Sourcerer)
	- Author Notes: 
	- Tags: [!Versio_Platform_MOC](playout/versio/!Versio_Platform_MOC.md) 
	- ICON set : Warning ⚠️ / Notes 🗒 / Version 🌱 / Knowledge 🧠 / WWW 🕸 / Learning AIM 🎯
***
## Objective 
- How to install data sourcerer
- How to configure data sourcerer
- How to use data sourcerer with Versio Graphics

### What is Data Sourcerer?
It is a tool that is used to gather external data and present that external data to the Versio Graphics engine so it can be used in RTO fields. Other than not liking the name the configuration of the tool is only via TUIs ... 


Data Sourcerer is a service that manages data source content for Versio Platform graphics. It works on a registration and pull model, with each of your data sources registered and then pulled in response to "pull" commands in your graphic animations. 


### What data can I collect? 
There are many sources that we can pull data from with Sourcerer... 

Data sources are registered using Powerscript files that you can customize and run as required. 

A selection of sample scripts is provided with the Data Sourcerer installation packages. 

Four data types are supported in this release: 
- CSV: A text file with each line representing a data record. Each record contains all the field values for that record, separated by a delimiter such as a comma or a colon. 
- RSS: A web feed whose structure conforms to the RSS standard. 
- TXT: A text file with each line representing an entire field value. 
- SQL: An SQL database defined by a T-SQL query. Verified with MSSQL databases and SQLite file-based sources. 


## How to install Data Sourcerer

On the services server, place the following files in your package source folder: 


- icw-datasourcerer 
- srvcwrap 
- versio-common 

Enter the following command in a Powershell window: 
`choco install icw-datasourcerer` Data Sourcerer and its dependencies will be installed. 


![](../../../attachments/Pasted%20image%2020210806173327.png)

> icw-datasourcerer is not part of the default 4.5 release need to download from artifactory

`https://deploy.imaginecommunications.com/artifactory`


> Note: You can install Data Sourcerer on a different system if you wish, but be sure to install the Chocolatey framework first, and also set up a choco source on the system. For more information visit http://chocolatey.org 

> The basic requirement for a Data Sourcerer system is for .NET core to be installed, and the system must have enough storage available for SQLLite. 

> Note that you need to do this on all Core Services in the system not just 1. 


Next, on each channel instance that will be using Data Sourcerer content, you must do the following: 

1. Navigate to `C:\Program Files\Imagine Communications\Web\Graphics` 

2. Hold `CTRL+SHIFT` and `right-click` the mouse in the Windows Explorer window, then select `Open Powershell Window Here.` 

3. Enter the following command, replacing `IPAddress` with the Data Sourcerer's IP address: 

> DataSourceConfiguration_Graphics.ps1 `IPAddress` 

![](../../../attachments/Pasted%20image%2020210806182004.png)

> Warning ⚠️ - Using HA? Then use the HA VIP and make sure that the HAProxy is updated to have the Data Sourcerer elements added to the configuration file. 
 
What does this do? 
It updates the `HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Inscriber\IconStation`
 
![](../../../attachments/Pasted%20image%2020210806194101.png)

The script also updates the following:
    
`C:\Program Files\Imagine Communications\Web\Graphics\json\config.override.json`

```json
{
    "dgrest":  {
                   "hostname":  "192.168.90.208"
               }
}
```



-   System reboot is required after install in order for the data sourcerer data sources to appear in the Prometheus UI


The graphics system is configured. 

4. Reboot the system. 

Consult the Versio Platform System Operations Guide to learn how to use Data Sourcerer with Versio Graphics. 


### Register a Data Source

You must register data sources before the Versio Graphics component is able to use them. Like all the other methods for interacting with Data Sourcerer, this must be done by creating a Powershell file, preferably with a program like Notepad++. This file will contain a reference to the location that contains the data (for example, a TXT file or an RSS feed), along with any properties for defining the source. 

What follows is an example of a script that registers a CSV source called "Sports" within a Sports.csv file. 

```ps
Invoke-RestMethod http://localhost:6474/api/sources `     
	-Method POST `     
	-ContentType "application/json" `     
	-Body ` 
@" 
{     
	"name": "Sports",     
	"providerConfiguration": { 
		"type": 3,   
		"HasHeaderRecord": true,  
		"Delimiter": ":",        
		"Path": "C:\\Sources\\data\\Sports.csv"     
},     
"filterConfiguration": {        
"columns": [ 
         "Digit",    
		 "Text" 
		 ]  
		 } 
} 
"@
```

```ps
Invoke-RestMethod http://localhost:6474/api/sources `
    -Method POST `
    -ContentType "application/json" `
    -Body `
@"
{
    "name": "Test",
    "providerConfiguration": {
        "type": 5,
        "HasHeaderRecord": false,
        "Path": "C:\\ds\\test.txt"
    }
}
"@
```


Some of the parameters in this script are standard for a REST interface, and you can get more information by using Swagger software for exploring the Data Sourcerer API. The following parameters are ones that you will need to edit in order to register your data source. 

`http://localhost:6474/api/sources`

> Full Swagger link is `http://127.0.0.1:6474/swagger/index.html`

![](../../../attachments/Pasted%20image%2020210806174044.png)

- name This is the name that Data Sourcerer will use to identify the data source within Versio. 
- type This is the type of data source you are registering, based on the format of the source file. 
	- 3: CSV
	- 4: RSS 
	- 5: TXT 
	- 6: SQL 
- HasHeaderRecord Whether the first line of the file contains header text. This is not applicable to RSS or SQL sources. 
- Delimiter The character that is used as a delimiter. This is only applicable to CSV sources. 
- Path The path to the data source file or feed. 
	- Note: This is not applicable to SQL sources. 
- columns Use this parameter to specify the names of the columns. These are column names that will appear in Versio Platform. 
- Url This is the connection string used to connect to an SQL database. SQL and Windows authentication are supported. 
- QueryString The transact SQL query to provide the data. 
- PollingIntervalMs The time between polling the source (15000 = 15 seconds) 

After you have created the script, save it as a .ps1 file and run it using Powershell. The information will be sent to the Data Sourcerer and the source will be registered. 

Screen grabs of the process

![](../../../attachments/Pasted%20image%2020210806193439.png)

![](../../../attachments/Pasted%20image%2020210806194835.png)

![](../../../attachments/Pasted%20image%2020210806194955.png)

### Example Scripts

Downloaded from http://git.myimagine.com/projects/CHOC/repos/datasourcerer/browse

Some powershells scripts showing how to create new sources, start pulling data, and query data.

You'll need to update the hardcoded paths to match the location of the csv data file.

DataSourcerer is a RESTFul service that provides APIs for configurating and consuming various forms of data. This repo contains two decent examples of how to use the API 1. look in the sample-scripts folder

-   data
-   numbers_two_columns.csv : sample data, arabic text, 2 columns
-   ds-code-demo
-   Numbers
    -   Delete-CsvSource.ps1 : example of how to delete a configured source
    -   Get-CsvSchema.ps1 : example of how to retrieve the schema for the configured source
    -   New-CsvSource.ps1 : example of creating a new source
    -   Preview-CsvData.ps1 : example of the preview api for viewing data
    -   Query-CsvSource.ps1 : Example of how to query data using SQL statements (requires New-CsvSource.ps1 and Start-PullFromCsvSource.ps1 have been called)
    -   Start-PullFromCsvSource.ps1 : example of how to start pulling data from the configured source 2. the .NET Core Tests
-   DataSourcerer.Tests : unit tests for the various internal components (Providers, Services, Filters, etc.)
-   Uses dummy data from the /TestData folder
-   Doesn't directly invoke the API


#### New CSV Source
```ps
Invoke-RestMethod http://localhost:6474/api/sources `

-Method POST `

-ContentType "application/json" `

-Body `

@"

{

"name": "SampleCsv_StringTestXX",

"providerConfiguration": {

"type": 3,

"Path": "C:\\hg\\DataSourcerer\\test\\DataSourcerer.Tests\\TestData\\stringtest.csv"

},

"filterConfiguration": {

"columns": [

"name",

"value"

]

}

}

"@
```

### New CSV Source No Header 
```ps
Invoke-RestMethod http://localhost:6474/api/sources `

-Method POST `

-ContentType "application/json" `

-Body `

@"

{

"name": "SampleCsv_textWithoutHeaderTest",

"providerConfiguration": {

"type": 3,

"HasHeaderRecord": false,

"Path": "C:\\hg\\DataSourcerer\\test\\DataSourcerer.Tests\\TestData\\textWithoutHeader.csv"

}

}

"@
```

### CSV preview provider data 
```ps
$data = Invoke-RestMethod http://localhost:6474/api/preview/data `

-Method POST `

-ContentType "application/json" `

-Body `

@"

{

"limit": 5,

"providerConfiguration": {

"type": 3,

"Path": "C:\\hg\\DataSourcerer\\test\\DataSourcerer.Tests\\TestData\\stringtest.csv"

}

}

"@

  

foreach ($row in $data) {

Write-Output "$($row -join " | ")"

Write-Output "---"

}
```

### Preview provider schema
```ps
$schema = Invoke-RestMethod http://localhost:6474/api/preview/schema `

-Method POST `

-ContentType "application/json" `

-Body `

@"

{

"type": 3,

"Path": "C:\\hg\\DataSourcerer\\test\\DataSourcerer.Tests\\TestData\\stringtest.csv"

}

"@

  

function Get-TypeName($typeId) {

$typeNames = @(

"null",

"boolean",

"integer",

"real",

"string"

)

return $typeNames[$typeId]

}

  

foreach ($column in $schema.columns) {

Write-Output "$($column.name): $(Get-TypeName $column.type)"

}
```

### Query Text Source
```ps
# The DataSourcerer Query API requires that the datasource is configured and pulling data.

## See New-TextSource.ps1 and Start-PullSample.ps1 for examples

# we consider that the datasource was configured as 1 column csv without header, for this case the column automatically named "data"

  

$sql = 'SELECT "data" FROM "SampleCsv_textWithoutHeaderTest";'

$data = Invoke-RestMethod "http://localhost:6474/api/data?q=$sql"

  

foreach ($row in $data) {

Write-Output $row

}
```

### Pull Sample 
```
Invoke-RestMethod http://localhost:6474/api/sources/SampleCsv_StringTestXX/pull `

-Method POST
```


### RSS Delete Source
```ps
Invoke-RestMethod http://localhost:6474/api/sources/SampleRss `

-Method Delete
```

### RSS new Source
```ps
Invoke-RestMethod http://localhost:6474/api/sources `

-Method POST `

-ContentType "application/json" `

-Body `

@"

{

"name": "SampleRss",

"providerConfiguration": {

"type": 4,

"Url": "https://www.reddit.com/.rss"

},

"filterConfiguration": {

"columns": [

"Title",

"Content"

]

}

}

"@
```

#### How to create your own RSS Feed?

	1.  Configure IIS Server
    
2.  On the C: drive folder inetpub/wwwroot should appear (C:\inetpub\wwwroot)
    
3.  Create an RSS feed (see below) and place it to C:\inetpub\wwwroot
    
4.  Check that IIS server was configured successfully by opening [http://localhost/](http://localhost/ "http://localhost/")
    
5.  RRS Feed created should be there, click on it and copy a link
    

#### How to create RSS Feed?

1.  Open Notepad++
    
2.  Create RSS Feed (see an example in the internet or see a sample file attached)
    
3.  Save it as xml file and place it to C:\inetpub\wwwroot
    
4.  Open [http://localhost/nameoffile.xml](http://localhost/nameoffile.xml "http://localhost/nameoffile.xml") in a browser
    
5.  Copy URL and use it in the DS scripts

Unicode XML 
```xml
<rss version="2.0">

<channel>

<title>DataSourcerer</title>

<link>http://masrcrawler/rss.aspx</link>

<description>Unicode Validation</description>

<item>

<title>APL</title>

<link>http://masrcrawler/story.aspx?ID=1012163</link>

<description>((V⍳V)=⍳⍴V)/V←,V ⌷←⍳→⍴∆∇⊃‾⍎⍕⌈</description>

</item>

<item>

<title>Braille</title>

<link>http://masrcrawler/story.aspx?ID=1012164</link>

<description>⡍⠜⠇⠑⠹ ⠺⠁⠎ ⠙⠑⠁⠙⠒ ⠞⠕ ⠃⠑⠛⠔ ⠺⠊⠹⠲ ⡹⠻⠑ ⠊⠎ ⠝⠕ ⠙⠳⠃⠞</description>

</item>

<item>

<title>Compact Fonts</title>

<link>http://masrcrawler/story.aspx?ID=1012165</link>

<description>∀∂∈ℝ∧∪≡∞ ↑↗↨↻⇣ ┐┼╔╘░►☺♀ ﬁ�⑀₂ἠḂӥẄɐː⍎אԱა –—‘“”„†•…‰™œŠŸž€ ΑΒΓΔΩαβγδω АБВГДабвгд</description>

</item>

<item>

<title>Greetings</title>

<link>http://masrcrawler/story.aspx?ID=1012166</link>

<description>Hello world, Καλημέρα κόσμε, コンニチハ</description>

</item>

<item>

<title>Ethiopian</title>

<link>http://masrcrawler/story.aspx?ID=1012167</link>

<description>ሰማይ አይታረስ ንጉሥ አይከሰስ።</description>

</item>

<item>

<title>Georgian</title>

<link>http://masrcrawler/story.aspx?ID=1012168</link>

<description>გთხოვთ ახლავე გაიაროთ რეგისტრაცია Unicode-ის მეათე საერთაშორისო</description>

</item>

<item>

<title>Greek</title>

<link>http://masrcrawler/story.aspx?ID=1012169</link>

<description>Σὲ γνωρίζω ἀπὸ τὴν κόψη

τοῦ σπαθιοῦ τὴν τρομερή,</description>

</item>

<item>

<title>Linguistics</title>

<link>http://masrcrawler/story.aspx?ID=1012170</link>

<description>ði ıntəˈnæʃənəl fəˈnɛtık əsoʊsiˈeıʃn</description>

</item>

<item>

<title>Math</title>

<link>http://masrcrawler/story.aspx?ID=1012171</link>

<description>∮ E⋅da = Q, n → ∞, ∑ f(i) = ∏ g(i), ∀x∈ℝ: ⌈x⌉ = −⌊−x⌋, α ∧ ¬β = ¬(¬α ∨ β)</description>

</item>

<item>

<title>Typography</title>

<link>http://masrcrawler/story.aspx?ID=1012172</link>

<description>‘single’ and “double” quotes, †, ‡, ‰, •, 3–4, —, −5/+5, ™, … </description>

</item>

<item>

<title>Runes</title>

<link>http://masrcrawler/story.aspx?ID=1012173</link>

<description>ᚻᛖ ᚳᚹᚫᚦ ᚦᚫᛏ ᚻᛖ ᛒᚢᛞᛖ ᚩᚾ ᚦᚫᛗ ᛚᚪᚾᛞᛖ ᚾᚩᚱᚦᚹᛖᚪᚱᛞᚢᛗ ᚹᛁᚦ ᚦᚪ ᚹᛖᛥᚫ</description>

</item>

<item>

<title>Russian</title>

<link>http://masrcrawler/story.aspx?ID=1012174</link>

<description>Зарегистрируйтесь сейчас на Десятую Международную Конференцию</description>

</item>

<item>

<title>Thai</title>

<link>http://masrcrawler/story.aspx?ID=1012175</link>

<description>๏ แผ่นดินฮั่นเสื่อมโทรมแสนสังเวช พระปกเกศกองบู๊กู้ขึ้นใหม่</description>

</item>

</channel>

</rss>

```


#### Setting up a new SQL Source with Data Sourcerer 
This video showcases how to setup a new SQL data source using Powershell Scripts for Data Sourcerer.

Video session with Peter and Matt for SQL Data Sourcerer setup and use. 
https://api.media.atlassian.com/file/48610c4e-250b-4084-831b-3694a90ca374/artifact/video_1280.mp4/binary?client=cfad340f-385f-4859-8801-c14cfc8952d4&collection=contentId-2068874860&max-age=2592000&token=eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJjZmFkMzQwZi0zODVmLTQ4NTktODgwMS1jMTRjZmM4OTUyZDQiLCJhY2Nlc3MiOnsidXJuOmZpbGVzdG9yZTpjb2xsZWN0aW9uOmNvbnRlbnRJZC0yMDY4ODc0ODYwIjpbInJlYWQiXX0sImV4cCI6MTYyODYwNTgwOSwibmJmIjoxNjI4NjAyODY5fQ.5XlfIQ30OzOwWyESsb_ge3q_9-zlY3QCChH3aqp5n20





https://imaginecommunications.atlassian.net/wiki/spaces/VPGM/pages/1684078596/Data+Sourcerer





#### Sample Layout used 
-   The one MOV uses commands: pull = line1, pull = line2
    
    -   The other uses: requery = line1, requery = line2
        
    -   line 1, line 2 are two text objects inside each MOV
        
-   **Pull** should display the first record then when it loops, display the next record, then third and so on.
    
    -   I think the pull will display nothing when the records have finished, this probably isn't the desired behavior.
        
    -   I suggest we provide the option to Loop or Fire a trigger
        
-   **Requery** will requery the data source and always display the first record (because there are no pulls).
    
    -   This is to test the source changing and getting new data
        
-   This is what’s happening in the MOV (pull). Sub pull for requery for the other sample:

![](../../../attachments/Pasted%20image%2020210806180720.png)

#### Test with EditShare as Folder Source
The txt file or csv file I am hosting on a EditShare mediaspace and Ia m going to edit the file from 2 machines. 
- local machine that is hosting the DataSourcerer
- remote machine 

I want to review the datasourcer read outcome of the file if edited by a remote machine. 

![](../../../attachments/Pasted%20image%2020210806200028.png)

![](../../../attachments/Pasted%20image%2020210806200126.png)

![](../../../attachments/Pasted%20image%2020210806200216.png)

Found an error with a local file on the C:\ path I am ok 204
![](../../../attachments/Pasted%20image%2020210806201842.png)
But when I switch to a mounted editshare path Y:\ then we are not allowed access
![](../../../attachments/Pasted%20image%2020210806202029.png)
If I target the file via path `\\192.168.200.40\Content_1\DS` what is the result? 
![](../../../attachments/Pasted%20image%2020210806202526.png)
FAIL
![](../../../attachments/Pasted%20image%2020210806202642.png)

Using NSSM to mount the EFS drive we are allowed access. 

-H "192.168.200.40" -S "/Unmanaged/content_1/Content" -U "192.168.90.208" "--password=192.168.90.208" "--volume-name=content_1" "--limitGroup=/192.168.90.208:192.168.90.208" "--enable-distributed-file-range-locks=yes" "--disable-sharing-restrictions=no" "--minimal-directory-permissions=2770" "--minimal-file-permissions=660" "--tls=yes" "--tls-ca-dir=C:/Program Files (x86)/EditShare/EditShare Connect/es_connect/resources/certs/"  T:

![](../../../attachments/Pasted%20image%2020210806205456.png)

Repeat of the test: 
- local machine that is hosting the DataSourcerer
	- Edit performed and the file is read successfully by the data sourcerer
- remote machine 
	- edit made but datasourcer is not seeing this update. 

