All PowerShell Scripts.
pull from source 
```sh
  Invoke-RestMethod http://localhost:6474/api/sources/KITVTopStories/pull `
-Method POST  

```
add text
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

