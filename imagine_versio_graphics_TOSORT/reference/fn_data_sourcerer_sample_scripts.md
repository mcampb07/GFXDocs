All PowerShell Scripts.
- pull from source 
```sh
  Invoke-RestMethod http://localhost:6474/api/sources/KITVTopStories/pull `
-Method POST  

```
- add text source
```sh
  Invoke-RestMethod http://localhost:6474/api/sources `
    -Method POST `
    -ContentType "application/json" `
    -Body `
@"
{
    "name": "SampleNewsNetwork",
    "providerConfiguration": {
        "type": 5,
        "Delimiter": ":",
        "HasHeaderRecord": false,
        "Path": "C:\\Users\\Administrator\\Desktop\\DS\\newsnetwork.txt",
        "PollingIntervalMs": 15000
    }
}
"@  
```
- remove source 
```sh
 Invoke-RestMethod http://localhost:6474/api/sources/NOAA-Honolulu `
    -Method DELETE 
```
- add xml

```sh
 . "$PSScriptRoot\..\Common.ps1"
. "$PSScriptRoot\Defs.ps1"

try {

    Invoke-RestMethod http://localhost:6474/api/sources `
        -Method POST `
        -ContentType "application/json" `
        -Body `
@"
{
    "name": "NOAA-Honolulu",
    "providerConfiguration": {
        "type": "xml",
        "Url": "https://w1.weather.gov/xml/current_obs/PHNL.xml",
        $RowFieldsParams
    },
    "pollingIntervalMs": 10000

}
"@

} catch [System.Net.WebException] {
    Print-ResponseBody $_
    throw
} 

```
- common - 1 folder up 

```sh
# PS pretends to be smart and converts HTTP 5xx and 6xx response codes into an exception.
# We'll have to do additional processing to get the actual response body from the exception.
# Source: https://stackoverflow.com/questions/18771424/how-to-get-powershell-invoke-restmethod-to-return-body-of-http-500-code-response
function Get-ResponseBody {
    param($Err)
    if ($PSVersionTable.PSVersion.Major -lt 6) {
        if ($Err.Exception.Response) {  
            $Reader = New-Object System.IO.StreamReader($Err.Exception.Response.GetResponseStream())
            $Reader.BaseStream.Position = 0
            $Reader.DiscardBufferedData()
            $ResponseBody = $Reader.ReadToEnd()
            if ($ResponseBody.StartsWith('{')) {
                $ResponseBody = $ResponseBody | ConvertFrom-Json
            }
            return $ResponseBody
        }
    } else {
        return $Err.ErrorDetails.Message
    }
}

function Print-ResponseBody
{
    param($Err)
    Write-Host (Get-ResponseBody $Err | Format-List | Out-String)
}

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
```

- defs in same folder as scripts - edited as required

```sh
 
#$Url = ([system.uri]"$PSScriptRoot\..\..\data\numbers.xml").AbsoluteUri | ConvertTo-Json

$RowFieldsParams = @"
    "Fields": [
        {"Name": "temp_f", "Xpath": "temp_f/text()"},
		{"Name": "weather", "Xpath": "weather/text()"},
		{"Name": "relative_humidity", "Xpath": "relative_humidity/text()"},
		{"Name": "dewpoint_f", "Xpath": "dewpoint_f/text()"},
		{"Name": "visibility_mi", "Xpath": "visibility_mi/text()"},
		{"Name": "icon_url_base", "Xpath": "icon_url_base/text()"},
		{"Name": "icon_url_name", "Xpath": "icon_url_name/text()"},
		{"Name": "wind_mph", "Xpath": "wind_mph/text()"},
		{"Name": "wind_dir", "Xpath": "wind_dir/text()"},
        {"Name": "wind_string", "Xpath": "wind_string/text()"},
    ]
"@
```

- add rss

```sh
 Invoke-RestMethod http://localhost:6474/api/sources `
    -Method POST `
    -ContentType "application/json" `
    -Body `
@"
{
    "name": "KITVTopStories",
    "providerConfiguration": {
        "type": 4,
        "Url": "https://www.kitv.com/search/?f=rss&t=article&c=news&l=50&s=start_time&sd=desc"
    }
}
"@ 
```

See [rn_session8_versio_data_sourcerer](../../imagine_club21/session8/rn_session8_versio_data_sourcerer.md)


crawl requery is run  3 records 