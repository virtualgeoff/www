// scrollObject.js 1.0

// by geoff pack
// geoff@virtualgeoff.com
// http://www.virtualgeoff.com
// march 2001

// similar to moveIt.js but is more object-oriented


var dom = document.getElementById?1:0;
var ie4  = (document.all && !document.getElementById)?1:0
var ns4  = document.layers?1:0

function makeScrollObj(objId,layerId){
	if (dom) {				// IE5, IE6, NS6, DOM
		this.css          = document.getElementById(layerId).style;
		this.scrollHeight = this.css.height;
		this.scrollWidth  = this.css.width;
    } else if (ie4) {		// IE4
		this.css          = document.all[layerId].style;
		this.scrollHeight = document.all[layerId].offsetHeight;
		this.scrollWidth  = document.all[layerId].offsetWidth;
    } else if (ns4) {		// NS4
		this.css          = eval('document.'+layerId);
		this.scrollHeight = this.css.document.height;
		this.scrollWidth  = this.css.document.width;
	} 
    this.top  = getTop;
    this.left = getLeft;
    this.id   = objId;
    //alert(this.css.left + ',' + this.css.top);
}
function getTop(){
	if (dom||ns4) return this.css.top;
    else if (ie4) return this.css.pixelTop;
}
function getLeft(){
	if (dom||ns4) return this.css.left;
    else if (ie4) return this.css.pixelLeft;
}
