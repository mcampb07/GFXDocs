<!--
Title : how_data_sourcerer_management
- Created : 2022-06-07
- Updated :
- Author : James Rivers
- Written against (version): 4.6
- Sources : TechGuides, Confluence, Learning
- Author Notes :
- Tags : 
-->

## Registering a new Data Source
You must register data `sources` before the Versio Graphics component is able to use them. Like all the other methods for interacting with `Data Sourcerer`.

This must be done by creating a Powershell file (at this moment in time)

This file will contain a reference to the location that contains the data (for example, a TXT file or an RSS feed), along with any properties for defining the source.

Here is a sample
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

Lets break down the information in listed in the `body` section. 

- name 
	- This is the name that Data Sourcerer will use to identify the data source within Versio.
- type 
	- This is the type of data source you are registering, based on the format of the source file. 
	- 3: CSV
	- 4: RSS 
	- 5: TXT 
	- 6: SQL 
	- xml:XML
- HasHeaderRecord 
	- Whether the first line of the file contains header text. This is not applicable to RSS or SQL sources. 
- Delimiter 
	- The character that is used as a delimiter. This is only applicable to CSV sources. Exmaple `,` `:`
- Path 
	- The path to the data source file or feed. Note: This is not applicable to SQL sources. 
- columns 
	- Use this parameter to specify the names of the columns. These are column names that will appear in Versio Platform. 
- Url 
	- This is the connection string used to connect to an SQL database. SQL and Windows authentication are supported. 
- QueryString 
	- The transact SQL query to provide the data. 
- PollingIntervalMs 
	- The time between polling the source (15000 = 15 seconds) 

What follows are examples of the following data source types for review and practice. 

### Adding XML Source
In this section we will walk through the steps required to add a new XML based data source. login into the `Core Service` instance that has `Data Sourcerer` installed. 

> Note if you have multiple instances you will have to perform the tasks below more than once. 


1. Open the `PowerShell ISE` application
2. Create a new `.ps` file
3. Add the following syntax to the new file.

```shell
     Invoke-RestMethod http://localhost:6474/api/sources `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
{
    "name": "Forecasts",
    "providerConfiguration": {
        "type": "xml",
        "Url":  "http://192.168.0.12/cgi-bin/CHexportForecasts.pl",
        "RowXpath": "//DATA/Forecasts",
        "Fields": [
            {"Name": "city_label", "Xpath": "city_label/text()"},
            {"Name": "forecast_label", "Xpath": "forecast_label/text()"},
            {"Name": "temp_label1", "Xpath": "temp_label1/text()"},
            {"Name": "temp1", "Xpath": "temp1/text()"}
        ]
    },
    "pollingIntervalMs": 10000
}
"@ 
```

Let's walk through this file, the first section is not going to change from 1 source type to another, localhost
```shell
     Invoke-RestMethod http://localhost:6474/api/sources `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
```
Next we have: 
 - `name`  This is the name that Data Sourcerer will use to identify the data source within Versio - keep it unique. 
 - `type` What is the data source type? Well as this is an XML type we need to declare that in the form of `xml`
 - `url` What is the url path to the XML data we are searching for
	 - TIP test this in a browser to make sure you can access the data

![](attachments/WFMZ_CS22022-06-08-173733.png)

- `RowXpath` What is the path in the XML that we are going to locate the fields? In the example above, that is `//DATA/Forecasts` we can see this:
![](attachments/Pasted%20image%2020220608174158.png)

- `Fields` What fields do we need to pull from and add to our Versio Data Sourcerer? 

- `Polling Intervel` The time between polling the source (15000 = 15 seconds) - How often shall we poll the source for an update of the data that we are are going to pull. 

4. Save the PS file 
5. Run the PS file


### Adding CSV Source

```sh
 Invoke-RestMethod http://localhost:6474/api/sources `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
{
    "name": "NEWS",
    "providerConfiguration": {
        "type": 3,
        "delimiter": ":",
        "HasHeaderRecord": true,
        "Path": "C:\\DataSources\\news.csv"
    },
    "filterConfiguration": {
        "columns": [
            "region",
            "headline",
            "story"
            ]
         }
}
"@  

```

Walkthorugh on this csv data collection:

- name - the name of the data source you are adding.
- type 3 = csv type
- delimiter - what is going to seperare the data in the csv a `,` or  a `:` you get the idea....
- hasheaderrecord - is there a top row header
- path - path to the csv from the data sourcerer service
- filterconfiguration  - what data are we interested in gettting from the data source.


### Adding RSS Source
```sh
    Invoke-RestMethod http://localhost:6474/api/sources `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
{
    "name": "SampleRss",
    "providerConfiguration": {
        "type": "4",
        "Url": "https://www.reddit.com/.rss"
    },
    "filterConfiguration": {
        "columns": [
            "Title",
            "Content"
        ]
    },
    "pollingIntervalMs": 15000
}
"@
```

Walkthrough the RSS data collection - 

- name - your name for the source
- type - 4 = rss
- url - link to feed
- filterconfiguration  - what data are we interested in gettting from the data source.
- pollinginteval -  The time between polling the source (15000 = 15 seconds)
 
### Adding Text Source 
```sh
Invoke-RestMethod http://localhost:6474/api/sources `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
{
    "name": "Text",
    "providerConfiguration": {
        "type": "5",
        "Path": $path
    }
}
"@
```
Walkthrough the txt data collection

- name - your name for the source
- type - 5 = text
- path - path to the file from data sourcerer


### Adding a SQL Source

We need to pull data from a SQL source. This is fairly common as an internal data holding with customers.  What follows are examole powershell scritps to add a SQL source to data sourcerer. 

Add a `new` SQL source 

```ps
. "$PSScriptRoot\..\Common.ps1"
. "$PSScriptRoot\Defs.ps1"

try {

    Invoke-RestMethod http://localhost:6474/api/sources `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
{
    "name": "Sql",
    "providerConfiguration": {
        "type": "sql",
        "Url": $($Url | ConvertTo-Json),
   "QueryString" : $($Query | ConvertTo-Json)
    },
    "pollingIntervalMs": 10000
}
"@

} catch [System.Net.WebException] {
    Print-ResponseBody $_
    throw
}
```
#### Get SQL Schema

```ps
. "$PSScriptRoot\..\Common.ps1"

try {

    $schema = Invoke-RestMethod http://localhost:6474/api/schema/Sql

    foreach ($column in $schema.columns) {
        Write-Output "$($column.name): $(Get-TypeName $column.type)"
    }

} catch [System.Net.WebException] {
    Print-ResponseBody $_
    throw
}
```

#### Definitions PS

```ps
$DB = "c:\ProgramData\Imagine Communications\Data Sourcerer\test.db"


$Url = "sqlite://Data Source=$DB"

#$Url = "sqlserver://Data Source=172.16.30.131;Initial Catalog=QVC;Integrated Security=False;User ID=sa;Password=ImagineDB1;Connect Timeout=1000"

$Query = "SELECT name, price, customer, quantity FROM orders JOIN products ON orders.product_id = products.id;"
```

#### Delete SQL Source 

```ps
. "$PSScriptRoot\..\Common.ps1"

try {

    Invoke-RestMethod http://localhost:6474/api/sources/Sql `
        -Method Delete

} catch [System.Net.WebException] {
    Print-ResponseBody $_
    throw
}
```

#### Preview SQL Source Data

```ps
. "$PSScriptRoot\..\Common.ps1"
. "$PSScriptRoot\Defs.ps1"

try {

    $data = Invoke-RestMethod http://localhost:6474/api/preview/data `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
{
    "limit": 5,
    "providerConfiguration": {
        "type": "sql",
        "Url": $($Url | ConvertTo-Json),
   "QueryString": $($Query | ConvertTo-Json)
    }
}
"@

    foreach ($row in $data) {
        Write-Output "$($row -join " | ")"
        Write-Output "---"
    }

} catch [System.Net.WebException] {
    Print-ResponseBody $_
    throw
}
```

#### Preview SQL Schema Data 

```ps
. "$PSScriptRoot\..\Common.ps1"
. "$PSScriptRoot\Defs.ps1"

try {

    $schema = Invoke-RestMethod http://localhost:6474/api/preview/schema `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
{
    "type": "sql",
    "Url": $($Url | ConvertTo-Json),
    "QueryString" : $($Query | ConvertTo-Json)
}
"@

    foreach ($column in $schema.columns) {
        Write-Output "$($column.name): $(Get-TypeName $column.type)"
    }

} catch [System.Net.WebException] {
    Print-ResponseBody $_
    throw
}
```

#### Query Existing SQL Source added to Data Sourcerer

```ps 
# The DataSourcerer Query API requires that the datasource is configured and pulling data.
## See New-SqlSource.ps1 and Start-PullFromSqlSource.ps1 for examples

. "$PSScriptRoot\..\Common.ps1"

try {

    $sql = 'SELECT * FROM "Sql";'
    $data = Invoke-RestMethod "http://localhost:6474/api/data?q=$sql"
    
    foreach ($row in $data) {
        Write-Output "$($row -join " | ")"
        Write-Output "---"
    }

} catch [System.Net.WebException] {
    Print-ResponseBody $_
    throw
}
```

#### Pull from SQL Source 

The next heading details how to run a pull from a configured source. This entery is the same, just for SQL source 

```ps 
. "$PSScriptRoot\..\Common.ps1"

try {

    Invoke-RestMethod http://localhost:6474/api/sources/Sql/pull `
        -Method POST

} catch [System.Net.WebException] {
    Print-ResponseBody $_
    throw
}
```

#### SQL Sourcer Parent - Sub SQL Data Sources

This is a cleaver approach to pulling from a SQL source, then pulling additional children queries from the local data sourcerer source.

![11-04_235358.png](attachments/2022-11-04_235358.png)



### Initial Pull from a Data Source

Once the `source` is added, we need to `pull` from that source. You must send a pull request to Data Sourcerer before Versio Platform can use your registered source.

```shell
Invoke-RestMethod http://localhost:6474/api/sources/Forecasts/pull `
 -Method POST
```

The script must contain the correct address of the system running Data Sourcerer (or "localhost") and the `name` of the registered source (in this example, "Forecasts"). 

When you run this script, `Data Sourcerer` retrieves the data from the source file (or feed) and creates a table in its SQL database for it. Then it watches the source for changes, and if a change is detected it will update the table automatically.

Where is this data stored on the core services?  Located on the Core Service instance that you are running the Data Sourcerer we will find the `datasource.db` and the `dataset.db` located at `C:\ProgramData\Imagine Communications\Data Sourcerer`

### Checking the Data pulled

Either installed an application, like DB Browser for SQL lite - downloaded from https://sqlitebrowser.org/dl/
![](attachments/Pasted%20image%2020220608175107.png)

![](attachments/Pasted%20image%2020220608175151.png)

Additionally, if your Creation Station and or Versio Server Graphic engines have been configured to  point towards the `Data Sourcerer` then you can check the available data via the RTO fields in your layouts.

![](attachments/Pasted%20image%2020220608175720.png)

### Delete Data Source 

You need to remove a source that you have added prior. To remove simply run the following:

```sh
Invoke-RestMethod http://localhost:6474/api/sources/SOURCE-NAME `
   -Method Delete
```

