<h1>Static page template</h1>
<p>Use for Bite-software plugin-dev deployment</p>
<p>Insert $vars into setup.php for basic site generation</p>
<p><i>dont forget to re-initialise git repro..</i></p>
<h2>Features:</h2>
<ul>
	<li>Disqus comments</li>
	<li>Code syntax highlighting</li>
	<li>Google analytics</li>
	<li>Custom fonts</li>
</ul>

PLUGIN
======

<a href='http://bite-software.co.uk/offreg'>Plugin Site</a>

BASIC USAGE:
```javascript
$('.element').plugin(
	source,
	variables,
	options
);
```
<h1>config options:</h1>

| Option             | data type      | values               | Required | Nb.                								  | 
| ------------------ |----------------|----------------------|----------|-----------------------------------------------------|
| source  			 | string         | 'img/image.jpg'      | Yes      | any img type     									  |       
| transparent        | boolean        | true / false         | Yes      |                									  |        
| rotation 			 | float          | 0.0 -> 1.0  	     | Yes      | rotation offset strength      					  |        
| offset 			 | float          | 0.0 -> 1.0   	     | No       | x/y axis offset strength    					      |        

<h1>usage example</h1>
```javascript
$('.container').offset(img,true,0.7);
```