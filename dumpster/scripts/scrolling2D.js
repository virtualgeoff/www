
// created by Geoff Pack
// geoff@virtualgeoff.com.au
//
// modified for Netscape 6 Nov 2000
// modified 6 Dec 2001: contHeight,contWidth is now a property of the scroll object
//     - this allows differently sized scroll objects to be used on the same page

// scroll object: makes a browser-independent object for easy 2D scrolling or animation

function makeScrollObj(objId,layerId,parent,width,height){
	if (document.getElementById) {
		this.style = document.getElementById(layerId).style; 
		this.style.top=0; this.style.left=0;
		this.unit = 'px';
		this.scrollHeight = document.getElementById(layerId).offsetHeight;
		this.scrollWidth = document.getElementById(layerId).offsetWidth;
	} else if (document.all) {
		this.style = eval('document.all.'+layerId+'.style');
		this.style.top=0; this.style.left=0;
		this.unit = 'px';	
		this.scrollHeight = eval('document.all.'+layerId+'.offsetHeight');
		this.scrollWidth = eval('document.all.'+layerId+'.offsetWidth');
	} else if (document.layers) {
	    parent=(parent)? 'document.'+parent+'.':'';
	    this.style = eval(parent+'document.'+layerId);
		this.unit = '';
		this.scrollHeight = this.style.document.height;	
		this.scrollWidth = this.style.document.width;	
	}
    this.id   = objId;
	this.contHeight = height;
	this.contWidth = width;
    this.top  = getTop;
    this.left = getLeft;
	this.setTop  = setTop;
	this.setLeft = setLeft;
	this.moveTo  = moveTo;
}
function getTop() {return parseInt(this.style.top);}
function getLeft() {return parseInt(this.style.left);}
function setTop(y) {this.style.top=y+this.unit;}
function setLeft(x) {this.style.left=x+this.unit;}
function moveTo(x,y) {this.style.left=x+this.unit; this.style.top=y+this.unit;}

// Scroll Variables
var scrollTimer = new Array();	// timeouts for each scrolling object
var fps=50, deltaT = 1000/fps;	// fps = frames per second; deltaT in millisecs
//var contHeight = 175;			// height of scroll clipping area
//var contWidth  = 50;			// width of scroll clipping area

function scroll(obj,vx,vy){
    if (scrollTimer[obj.id]) clearTimeout(scrollTimer[obj.id]);
    px=obj.left(); py=obj.top();
    px+=vx; xMin=0; xMax=obj.contWidth-obj.scrollWidth;
    py+=vy; yMin=0; yMax=obj.contHeight-obj.scrollHeight;
	if(px<xMax){px=xMax;vx=0;} if(px>xMin){px=xMin;vx=0;}
	if(py<yMax){py=yMax;vy=0;} if(py>yMin){py=yMin;vy=0;}
	obj.setLeft(px); obj.setTop(py);
    if (vy!=0 || vx!=0) scrollTimer[obj.id]=setTimeout("scroll("+obj.id+","+vx+","+vy+")",deltaT);
}
function noScroll(obj){
    if (scrollTimer[obj.id]) clearTimeout(scrollTimer[obj.id]);
}
