<!--
Title : tut_weather_icons
- Created : 2022-07-21
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : 
-->


# Update weather icons on a pull

Here is the problem - I want to update a graphical icon that represents a data value from an external data source for example:
- data value = "Light Rain" - then show light rain icon
- data value = "Partly Cloudy" - then show part cloud sun icon

So in order to do that I have built the following:

- Comp holds a text layer this is an RTO called 'ICONVALUE', this will be out of the comp area and not visible. 


- This RTO is mapped to the external data



- The comp timeline will have a pull to update this layer evertime we loop


 


```js
if (thisComp.layer("ICONVALUE").text.sourceText.indexOf("Light Rain")!=-1)
{opacity = 100}
else
{opacity = 0}
```

or we can use something like this 


Create a new Text object named “ImageValue”
On the opacity of one of the images add an expression
if (ImageValue == “up”){
transform.opacity = 100
}
else{transform.opacity = 0}
Value should match whats in the DB
Repeat for alternate image
make all the objects RT
Render and add to layout
Bind ImageValue to the value in DB that tells you up or down (or whatever)

Or this in which create image rto, then using the prefix and suffix linked to local image files that can take the data and then bring on the icons... use CSL 1 and get this sorted



## H2
### H3
#### H4
##### H5
###### H6

---

> Info ℹ️

> Warning ⚠️

> Version Notes 🔖

> Check  ✅ 

> Question  ❓

> Danger ❗

> Bug 🐞

> Quote 💬
---
