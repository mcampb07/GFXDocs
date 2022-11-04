---
tags:
  - data sourcerer
  - reference
  - sql
---
<!--
Title : ref_data_sourcerer_custom_sql_queries
- Created : 2022-10-29
- Updated :
- Author : Matt Campbell
- Written against (version): 4.6
- Sources : TechGuides, Confluence, Learning
- Author Notes :
- Tags : 
-->

!!! info "Article Updated"
    Fri 28 Oct 2022 18:30:39 BST

# Advanced SQL Data Sourcerer 
Data Sourcerer can do more than aggregate and pull down data sources. The following are some advanced methods of using data sourcerer.  

## Preview SQL Source
A preview SQL source is a powerful tool that allows users to run custom SQL queries on an exising data sources. Examples of this feature could be used to:

- Perform caclulations on data and create additional tables with new strings and values
- Check values of multiple tables and create values based on importance/presence
- Handle NULLs from XML Profider as blank data (current bug https://imaginecommunications.atlassian.net/browse/VPLAY-8072)

1. Open the `PowerShell ISE` application
2. Create a new `.ps` file
3. Add the following syntax to the new file.

```ps
 . "$PSScriptRoot\SourceName.ps1"

try {
    Invoke-RestMethod http://localhost:6474/api/sources `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
{
    "name": $($NewSourceName | ConvertTo-Json),
    "providerConfiguration": {
        "type": "view",
        "ParentSourceName": $($ParentSourceName | ConvertTo-Json),
        "QueryString": $($Query | ConvertTo-Json)
    },
    "pollingIntervalMs": 1000
}
"@ 

```

4. Create a new `SourceName.ps1` file (Name appropriately based on your source). This will hold the variable values that the new source script will call. 
5. Add the following syntax to the new file.

```ps
$NewSourceName = "NewSQLPreviewSourceName"
$ParentSourceName = "OrginDataSource" 
$Query = "SELECT *, YOUR QUERY FROM OrginDataSource;"
```
- NewSourceName = Name of the new SQL Preview source you would like to create. This is the source name you will use when binding graphics to a data source.
- ParentSourceName = Existing Data Sourcerer source you have already created.
- The new source will contain all the tables from the existing source, plus any new tables created by your query.

!!! tip
    When creating data sources, avoid "dashes" and special characters in the name of the source.

- Query = This is where you can input your query to do something awesome.

!!! tip
    Use SQLLite Queries and formatting

### Query Examples

- Insert empty strings if NULL

`SELECT *, ifnull(ExistingTableName1, '') as NewName1, ifnull(ExistingTableName2, '') as NewName2 from OrginDataSource;" `

- Detect if there are values in tables and display the most important value from left to right. The user case is if there was a partciular value, they would display that value first. If missing, display the next value, else, display the final value. This would work if the values were all populated or empty.

`SELECT TableName,COALESCE(NULLIF(TableName1,''),NULLIF(TableName2,''),NULLIF(TableName3,'')) NewTableName FROM OrginDataSource"`

6. Run the Create .PS completed in step 3
7. Run the start-pull command on the new source
