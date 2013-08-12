/**
* Starscroll jQuery plug-in
* Everyone needs a Starfield .. 
*
* @author Jean-Christophe Nicolas <mrjcnicolas@gmail.com>
* @homepage http://bite-software.co.uk/starscroll/
* @version 0.1.3
* @license MIT http://opensource.org/licenses/MIT
* @date 02-07-2013
*/
(function($) {

$.fn.starscroll = function(bit,fields,num,size,smooth,colour,mix,anim){ // 8bit mode 
	
	var el = $(this),
		mobile = isMobile.any(),	
		process = new Plugin(el,mobile,bit,fields,num,size,smooth,colour,mix,anim);	
	
	window.addEventListener('scroll', function() { process.parallax(); }, false);		
	if(anim && !mobile){
		setInterval(function(){		
			process.time += 5;
			process.parallax();
		},1000/40);
	}
	return this.el;	

}

var Plugin = function(me,mobile,bit,levels,density,dimension,smooth,colour,mix,anim){

	this.el = me;
	this.levels = (levels > 10)? 10 : levels;
	this.layers = [];
	this.dimension = (dimension > 20)? 20 : dimension;
	this.density = density;
	this.colour = (!colour)? [255,255,255] : colour;
	this.hue = (!mix)? false : mix;
	this.bit = (!bit)? false : bit;
	this.time = 0;
	this.anim = anim;
	this.smooth = (smooth > 5 || true)? 5 : smooth;

	var width, ww = $(window).width(),
		height, wh = $(window).width();

	width = (ww > 700)? 700 : ww;
	height = (wh > 600)? 650 : wh;

	this.w = width;
	this.h = height;

	if(!mobile) this.init();
}

Plugin.prototype.init = function(){

	for(var i=0;i<this.levels;i++){

		this.layers[i] = this.buildlayers(i)
	}
	this.images = this.createStars();
	this.applyImages(this.images);
}

Plugin.prototype.buildlayers = function(i){

	var elements = {},
		canvas = document.createElement( 'canvas' ),
        context = canvas.getContext( '2d' );

    canvas.width = this.w;
    canvas.height = this.h;

    var DOM = $('<div id="starchild'+i+'"/>');   
    this.buildDOMels(DOM,i);

    elements.canvas = canvas;
    elements.context = context;
    elements.DOM = DOM;

    return elements;
}

Plugin.prototype.createStars = function(){

	var images = [];

	for(var i=0;i<this.levels;i++){

		var c = this.layers[i].canvas,
			ctx = this.layers[i].context,
			hsl = this.hsl(this.colour);

		for(var j=0;j<this.density;j++){
			this.drawStar(ctx,i,hsl)
		}

		images[i] = this.convertCanvasToImage(c);

	}
	return images;

}
Plugin.prototype.drawStar = function(ctx,i,hsl){
	
	var z = this.dimension / (i*.075 +1),
		radius = Math.random()*z,
        sx=0, sy=0,
        flare = Math.random()*(radius*.9),
        col = (this.hue)? this.colstep(hsl) : this.colour;

    sx = this.boundary('x',radius);
    sy = this.boundary('y',radius);

    var grd = ctx.createRadialGradient(sx, sy, flare, sx, sy, radius),
    	alf = .7 + Math.random()*.3;

    grd.addColorStop(0, 'rgba(255,255,255,.9)');
    if(col) grd.addColorStop(0.5, 'rgba('+col+',.8)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    
    ctx.beginPath();
    
    if(this.bit == 8 || false){  	
    	ctx.fillRect(sx,sy,radius,radius);	
    	ctx.fillStyle = 'rgba(255,255,255,'+alf+')';
    }else{
    	ctx.arc(sx,sy,radius,0,Math.PI*2,true);
    	ctx.globalAlpha = .7 + Math.random()*.3;
    	ctx.fillStyle = grd;
    } 
    ctx.fill();
}
Plugin.prototype.colstep = function(hsl){

	hsl[0] = hsl[0] - (~~(Math.random()*4)) + (~~(Math.random()*8));

	return this.rgb(hsl);
}

Plugin.prototype.boundary = function(axis,rad){

	var rlf = rad,
		rtn = 0;

	if(axis == 'x'){
		var pos = Math.random()*this.w;
		rtn = pos;
		if (pos < rlf){
			rtn = pos + rlf + Math.random()*rad;
		}else if(pos > this.w - rlf){
			rtn = pos - rlf - Math.random()*rad;
		}
		return rtn;

	}else{
		var pos = Math.random()*this.h;
		rtn = pos;	
		if (pos < rlf){		
			rtn = pos + rlf + Math.random()*rad;
		}else if(pos > this.h - rlf){
			rtn = pos - rlf - Math.random()*rad;
		}
		return rtn;
	}

	
}
Plugin.prototype.applyImages = function(imgs){

	for(var i=0;i<this.levels;i++){

		var $el = this.layers[i].DOM,
			img = imgs[i].src;
		$el.css({
			'background-image':'url('+img+')'
		});
	}
}
Plugin.prototype.parallax = function(){

	var pos = window.pageYOffset - this.time; 

    for(var i=0;i<this.levels;i++){

    	var $el = this.layers[i].DOM,
    		speed = -pos*((i+1)/2);
    	
    	$el.css({
            'background-position':'0 '+ speed +'px'
        })
	}   
}
Plugin.prototype.buildDOMels = function(DOM,i){
	
	this.el.append(DOM);
	var scroll = '5s';
	if(this.anim){
		scroll = '0s'
	}

	this.el.css({
		'position': 'fixed',
		'z-index': -1,
		'top':0,
		'width':'100%',
		'height':'100%'
	})
	DOM.css({
		'transition':'all '+scroll+' cubic-bezier(0.230, 1.000, 0.320, 1.000)', 
		'position': 'fixed',
		'width':'100%',
		'height':'100%',
		'background-repeat': 'repeat',
		'background-color': 'transparent'
	})
}
Plugin.prototype.convertCanvasToImage = function(canvas) {
    
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

Plugin.prototype.hsl = function(rgb){

	var r1 = rgb[0] / 255;
	var g1 = rgb[1] / 255;
	var b1 = rgb[2] / 255;
	var maxColor = Math.max(r1,g1,b1);
	var minColor = Math.min(r1,g1,b1);
	//Calculate L:
	var L = (maxColor + minColor) / 2 ;
	var S = 0;
	var H = 0;
	if(maxColor != minColor){
	    //Calculate S:
	    if(L < 0.5){
	        S = (maxColor - minColor) / (maxColor + minColor);
	    }else{
	        S = (maxColor - minColor) / (2.0 - maxColor - minColor);
	    }
	    //Calculate H:
	    if(r1 == maxColor){
	        H = (g1-b1) / (maxColor - minColor);
	    }else if(g1 == maxColor){
	        H = 2.0 + (b1 - r1) / (maxColor - minColor);
	    }else{
	        H = 4.0 + (r1 - g1) / (maxColor - minColor);
	    }
	}

	L = L * 100;
	S = S * 100;
	H = H * 60;
	if(H<0){
	    H += 360;
	}

	var result = [H, S, L];
	return result;
	
}
Plugin.prototype.rgb = function(hsl){
	var h = hsl[0];
	var s = hsl[1];
	var l = hsl[2];
	
	var m1, m2, hue;
	var r, g, b;
	s /=100;
	l /= 100;
	if (s == 0)
		r = g = b = (l * 255);
	else {
		if (l <= 0.5)
			m2 = l * (s + 1);
		else
			m2 = l + s - l * s;
		m1 = l * 2 - m2;
		hue = h / 360;
		r = this.hue2rgb(m1, m2, hue + 1/3);
		g = this.hue2rgb(m1, m2, hue);
		b = this.hue2rgb(m1, m2, hue - 1/3);
	}
	return [Math.round(r), Math.round(g), Math.round(b)];
}
Plugin.prototype.hue2rgb = function(m1, m2, hue) {
	var v;
	if (hue < 0)
		hue += 1;
	else if (hue > 1)
		hue -= 1;

	if (6 * hue < 1)
		v = m1 + (m2 - m1) * hue * 6;
	else if (2 * hue < 1)
		v = m2;
	else if (3 * hue < 2)
		v = m1 + (m2 - m1) * (2/3 - hue) * 6;
	else
		v = m1;

	return 255 * v;
};

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

})(jQuery);