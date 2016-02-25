
// created by Geoff Pack
// geoff@virtualgeoff.com.au
//
// modified for Netscape 6 Nov 2000
// modified 6 Dec 2001: contHeight is now a property of the scroll object
//     - this allows differently sized scroll objects to be used on the same page

// scroll object: makes a browser-independent object for easy (vertical) scrolling

function makeScrollObj(objId,layerId,parent,height){
	if (document.getElementById) {
		this.style = document.getElementById(layerId).style; 
		this.style.top=0;
		this.unit = 'px';
		this.scrollHeight = document.getElementById(layerId).offsetHeight;
	} else if (document.all) {
		this.style = eval('document.all.'+layerId+'.style');
		this.style.top=0;
		this.unit = 'px';	
		this.scrollHeight = eval('document.all.'+layerId+'.offsetHeight');
	} else if (document.layers) {
	    parent=(parent)? 'document.'+parent+'.':'';
	    this.style = eval(parent+'document.'+layerId);
		this.unit = '';
		this.scrollHeight = this.style.document.height;	
	}
    this.id   = objId;
	this.contHeight = height;
    this.top  = getTop;
	this.setTop  = setTop;
}
function getTop() {return parseInt(this.style.top);}
function setTop(y) {this.style.top=y+this.unit;}

// Scroll Variables
var scrollTimer = new Array();	// timeouts for each scrolling object
var fps=50, deltaT = 1000/fps;	// fps = frames per second; deltaT in millisecs
//var contHeight = 175;			// height of scroll clipping area

function scroll(obj,vy){
    if (scrollTimer[obj.id]) clearTimeout(scrollTimer[obj.id]);
    py=obj.top();
    py+=vy; yMin=0; yMax=obj.contHeight-obj.scrollHeight;
	if(py<yMax){py=yMax;vy=0;} if(py>yMin){py=yMin;vy=0;}
	obj.setTop(py);
    if (vy!=0) scrollTimer[obj.id]=setTimeout("scroll("+obj.id+","+vy+")",deltaT);
}
function noScroll(obj){
    if (scrollTimer[obj.id]) clearTimeout(scrollTimer[obj.id]);
}
