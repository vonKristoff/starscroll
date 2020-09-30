STARSCROLL an amazing project
==========

Create a div with purpose as your background .. activate plugin; animated or reactive as the user scrolls.
The plugin automatically will fix the div so it works seemlessly.

N.b the only css you might want to change is the z-index of your div. Also dont put anything in your starscroll div.

<i>depends on jQuery 1.8.1+</i>

<a href='http://bite-software.co.uk/starscroll'>Plugin Site</a>

<h2>Features:</h2>
<ul>
	<li>8-bit or 16-bit mode! (how retro do you wanna go!?)</li>
	<li>Animated or reactionary to scroll</li>
	<li>Multiple layers of true parallax</li>
	<li>Custom colours and complexities</li>
	<li>Every websites dream</li>
	<li>Forces static on mobile detection</li>
</ul>

BASIC USAGE:
```javascript
$('.element').plugin(
	mode,
	parallax-layers,
	density,
	dimension,
	smoothness,
	colour,
	colour-varience,
	animate,
	scrollspeed
);
```
<h1>config options:</h1>

| Option             | data type      | values               | Required | bit mode | Nb.                			| 
| ------------------ |----------------|----------------------|----------|----------|--------------------------------|
| mode  			 | int | boolean  | 8 / 16, true / false | Yes      | n/a	   | Sets the graphics complexity	|       
| parallax	         | int	          | max: 10		         | Yes      | both	   | num of parallax levels			|        
| density 			 | int            | num of stars  	     | Yes      | both	   | 							 	|       
| dimension			 | int	          | max: 20   	   		 | Yes      | both 	   | size of stars					|
| smoothness		 | int	          | min: 0, max: 5 		 | No       | both 	   | scroll smoothness speed		|
| colour			 | rgb array	  | [255,255,255]   	 | No       | 16-bit   |								|
| colour-varience	 | boolean        | true/false	   		 | No       | 16-bit   | subtle colour varience enabled	|
| animate			 | boolean        | true/false	   		 | No       | both     | auto scrolling starfield		|
| scrollspeed		 | int            | min: 0, default: 2   | No       | both     | scroll speed					|

<h1>usage example</h1>
```javascript
$('#starfield').starscroll(16,3,50,5);
```
