<!--
Title :202204272022_realtime_pull_data
- Created : 2022-04-15 11:10
- Updated :
- Author : James Rivers
- Written against (version): Versio Graphics 2.0.0.426
- Sources :
- Author Notes :
- Tags : 
-->
# Versio Graphics Real Time Data - Pulls and Loops
In this article we are going to walk through the process of linking an RTO text item to a Data Source, and for that data to loop and show differing items on each. 
![](attachments/2022-04-27%2020.27.49.gif)

## After Effects Comp
Lets start here with the basics for a simple pull loop with external data: 
- Create a new text field - in this example we have a text field with a source name of `city1`
- This layer will be labelled as a `RealTime` label as we will need to run the script against this.  
- I am wanting to populate this field with city names from an external database. 
	- This data is hosted and set already via data sourcerer
	- The data source = currents
	- The field = display_name1

![](attachments/Pasted%20image%2020220427203524.png)

- In order for this text field to loop through the data, we need to add the following comp markers:
	- pull = 
	- loopin/loopout

![](attachments/Pasted%20image%2020220427204032.png)

What is happening here?  When the graphic is loaded it will reach out to the data source and query and get the 1st record from the data source that I will link to `city1`. But after that 1st record, I want to loop through the remaining records and show them on air also, so this is where we add the loop and pull requests. In the above image we have the following comp markers: 

- frame 1 - `loopin` just the first line of the comp marker reads as `loopin`
- frame 2 - `pause` - first is just for info, 2nd line in the state are we going to hold on this frame and the 3rd line is stating how long for. 

```
pause 
hold = true
holdtime = 0:04
```

-  frame 3 - `1pull`  1st line is just for info, but the 2nd line is stating what is required to be pulled. In this example we are stating that we need to go and pull the item (next record) that is linked to `city1` - `display_name1`

```
1pull
pull = city1
```

- frame 4 - `loopout` 1st line is just for info, 2nd line sets the goto label.  In this example `loopin` found on frame 1.

```
loopout
goto = loopin
```

Once this is done, we need to run the realtime script against our comp and then render the comp with the Versio GFX template. 

### Creation Station Layout
Add the rendered .mov to a layout and link the data source to the rto you have created. 

![](attachments/Pasted%20image%2020220427205238.png)
![](attachments/Pasted%20image%2020220427205255.png)
![](attachments/2022-04-27%2020.53.34.gif)

What happens at the end, when all records have been read from the external data source?  Nothing, you have exhausted all the data and nothing more will be shown on air.  

But what if we need to loop the data?  Great question, yes we can loop the data but the toggle to set that behavior is not exposed in the Versio Graphics web ui as of version 4.6, it will be exposed in later versions.  To enable looping of the data we need to edit the `videoclip.json` file. In the example below we are working on a layout called city1 and an object known as pull_1, navigate to `D:\Layouts\CITY1\CITY1\Pull_1` and edit the json file. 

![](attachments/Pasted%20image%2020220428095107.png)

Before edit:
```json
{
    "city1": {
        "Value": null,
        "Type": "text",
        "Datasource Association": {
            "name": "Currents",
            "field": "display_name1",
            "prefix": null,
            "postfix": null,
            "condition": null
        },
        "Attributes": {
            "loop": false,
            "loop iterations": 0
        }
    }
}
```

After edit to enable infinite loops:

```json
{
    "city1": {
        "Value": null,
        "Type": "text",
        "Datasource Association": {
            "name": "Currents",
            "field": "display_name1",
            "prefix": null,
            "postfix": null,
            "condition": null
        },
        "Attributes": {
            "loop": true,
            "loop iterations": -1
        }
    }
}
```

The 1st record in the db is `Allentown` the last is `Wilmington`
![](attachments/2022-04-28%2009.55.54.gif)

### Customer request
Customer A has requested to show not 1 town but 2 towns on screen at the same time from the same data source. Can this be achieved? Yes!  - How? 

Let's go back to the After Effect Comp and make some changes: 
- Added additional text fields 
	- static text fields number 1 and 2
	- new real time field `city2`

![](attachments/Pasted%20image%2020220428101218.png)

We are going to link the following:
- `city1` to data source = currents /  field = display_name1
- `city2` to data source = currents /  field = display_name1

- Added additional comp markers:
- frame 0  - `1pull` in this comp marker, I am asking for a pull against `city2`. How and why are we doing this? 
	- When the item is loaded on the layout we run an initial query against the data source, this would give us, `city1` = `Allentown` and `city2` = `Allentown` 
	- So we will run a pull against `city2` giving us `city2` = `Bangor` 
- frame 1 - `loopin`
- frame 2 - `pause` - first is just for info, 2nd line in the state are we going to hold on this frame and the 3rd line is stating how long for. 

```
pause 
hold = true
holdtime = 0:04
```

- frame 3 - `2pull` this is post the loopin point and we are requesting another pull for `city1` and `city2`

```
2pull
pull = city1
pull = city2
```

- frame 4 - `loop` go to `loopin`

![](attachments/Pasted%20image%2020220428101600.png)

> What will happen if we leave this comp in this state?  We would end up in a state in which the `city2` will have `bangor` on loop1 and `city1` will have `bangor` on loop 2.  Is that what we want?

![](attachments/2022-04-28%2010.42.31.gif)

No I don't want to repeat the data on `city1`and `city2` so how do resolve that? 

Going back to the After Effect Comp we are going to add another comp marker, before the loop at frame 4, so I will push the loop to frame 5 and place a new comp marker `3pull`.

```
3pull
pull = city1
pull = city2
```

>What effect does this have?  Before the loop we are asking for another pull of data on both `city1` and `city2` thus shifting the data across. 

![](attachments/2022-04-28%2011.41.50.gif)

That concludes this article on pulls and loops with static text and data sources.  You can also review the article [2114450932_realtime_getdata_tutorial](2114450932_realtime_getdata_tutorial.md) which also covers data collection. 