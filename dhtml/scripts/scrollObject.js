// scrollObject.js 1.0

// by geoff pack
// geoff@virtualgeoff.com
// http://www.virtualgeoff.com
// march 2001


// similar to moveIt.js but is more object-oriented
// october 2003: killed all the version 4 crap - only works with DOM browsers now...

var dom = document.getElementById?1:0;

function makeScrollObj(objId,layerId){
	if (dom) {
		this.css          = document.getElementById(layerId).style;
		this.scrollHeight = this.css.height;
		this.scrollWidth  = this.css.width;
    }
    this.top  = getTop;
    this.left = getLeft;
    this.id   = objId;
}
function getTop(){
	if (dom) return this.css.top;
}
function getLeft(){
	if (dom) return this.css.left;
}
