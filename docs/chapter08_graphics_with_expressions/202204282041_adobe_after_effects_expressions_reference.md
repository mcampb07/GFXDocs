<!--
Title : 202204282041_adobe_after_effects_expressions_reference
- Created : 2022-04-15 11:10
- Updated :
- Author : James Rivers
- Written against (version):
- Sources :
- Author Notes :
- Tags : [!versio_graphics_moc](../../!versio_graphics_moc.md)
-->
# Adobe After Effects Scripts - Expressions

## Sample Scripts

**TIPS**

- For leading to be applied to text, run Imagine Script with two lines of text (not from an expression - use an actual break)
- All Adobe Extend Scripting may not be supported, there may be ways of doing things using JavaScript that will also work in After Effects
- Tracks must be at frame 0 for real time object.
- Expressions on nested nulls may not work

### WRAP TEXT BASED ON CHARACTER COUNT

Versio does not support paragraph text objects. To get around this, use a wrapping expression on the sourceText of a text object. Allows you to set the number of characters. This will insert a break after a whole word and attempts to avoid orphan words.
```json
line = 22;

txt = value;

len = text.sourceText.length;

if(len<= line){

         txt

}

else{

         var processed = '';

         var breakChar ='\r';

         while (txt.length > line){

         var subStr = txt.substr(0,line);

         var lastSpaceIndex = subStr.lastIndexOf(" ");

         processed += txt.substr(0,lastSpaceIndex) + breakChar;

         txt = txt.substr(lastSpaceIndex + 1);

}

         txt = processed + txt;

}
```

### COUNT THE NUMBER OF LINES IN A TEXT OBJECT

This is a great little expression to get a value for if statements if you need to move objects based on the number of lines of text.

```json
Linecount = thisComp.layer(“LayerName”).text.sourceText.split(/\n|\r/).length;
```

Example: if there are 2 lines move the object up 100px:

```json
	xPos = transform.position[0];
	yPos =  transform.position[1];
	Linecount = thisComp.layer(“Title”).text.sourceText.split(/\n|\r/).length;
	if (Linecount == 2){
		newY = yPos - 100;
		[xPos,newY]
	}
	Else{
		[xPos,yPos]
	}

```

### SET A MINIMUM OR MAXIMUM VALUE

Let’s say you have and object that you want to scale but you want to set a minimum and maximum size. You have a variable that calculates the width but it could go higher than what you want and need to force some constraints.

```json
Math.min(Math.max(VALUE, MIN), MAX)
```

Examples:
```json
Math.min(Math.max(YourValue, 0), 10);
```
The above would have a minimum value of 0 and a max value of 10.

### STRINGS TO INTERGER

There may be times you want a real time text object to be used as variable for transformations or calculations. To do this, you will need to convert the string value to an INT. Example: you may want to expose X/Y coordinates to the operator to move a graphic.

```json
parseint(Value)
toString(Value)
```

### FOLLOW

There are many times where you want an object to follow another text object as a locator where it always appears on the Right. To do this, we need to get the length of the text object and add some space.

```json
thisComp.layer(“LayerName”).sourceRectAtTime().width;
```

`sourceRectAtTime` may add more space as different characters have varying widths. Sometimes you may have to add some math to even it out.

Example:
```json
	yPos = transform.position[1];
	xPos = transform.position[0];
	Space = 50;
	NewPos = xPos + locatorPos + Space;		
	[NewPos,yPos]

```

### INSERT A BREAK ON A SPECIAL CHARACTER

There may be times when the customer is passing in a special character where they would like to insert a break or specific text.

```json
text.sourceText.replace(/: /gi, ":"+"\n")
```

### SCALE TEXT BASED ON THE NUMBER OF LINES

The designer may want to scale text based on the number of lines. If you are wrapping text based on a specific character count, the character count will remain the same but the text can get smaller. In this example, I would set the text to use a larger font size for smaller text.  I set the maximum line length to be 740 pixels. Short text will use a larger font. Once the size reaches 740 it will scale down to fit. In this case, if there are two lines detected it will use a fixed scale size.

Example:
```json
layerWidth = thisLayer.sourceRectAtTime(0).width; 
	line = 740; 
	linecount = thisComp.layer("<Title_RT>").text.sourceText.value.split(/\n|\r/).length;

	if ((linecount == 1) & (layerWidth <= line)) {
	[100,100];
	}
	else if ((linecount == 1) & (layerWidth > line)){
	scaleit = Math.round(100*line/layerWidth); 
	[scaleit,scaleit];
	}	
	else if (linecount == 2){
	[60,60]}

```

### FIND THE LONGEST OBJECT

There are times when I need to change the scene based on the longest object between many.
```json
Math.max(Value 1, Value 2, Value 3, …);
```
Example:
```json
P1 = thisComp.layer("Page 1").sourceRectAtTime().width;
	P2= thisComp.layer("Page 2").sourceRectAtTime().width;
	P3 = thisComp.layer("Page 3").sourceRectAtTime().width;
	P4 = thisComp.layer("Page 4").sourceRectAtTime().width;
	longest = Math.max(P1,P2,P3,P4);
```
### LINEAR OR EASE ANIMATION

If you need to animate based on dynamic values you can use a linear or ease animation. When animating using expressions, it is over a fixed amount of time.

```json
linear(time,StartTime,EndTime,Value1,Value2);
Ease(time,StartTime,EndTime,Value1,Value2);
animateThis = linear(time,animStart,animEnd,73,SecXPos);
[animateThis,yPos]
Bounce
amp = .1;
freq = 2.0;
decay = 2.5;
n = 0;
time_max = 3;
if (numKeys > 0){
n = nearestKey(time).index;
if (key(n).time > time){
n--;
}}
if (n == 0){ t = 0;
}else{
t = time - key(n).time;
}
if (n > 0 && t < time_max){
v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
}else{value}

```

