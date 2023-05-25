// moveit.js 1.0

// by geoff pack 
// geoff@virtualgeoff.com
// march 2001

// this version: 
// improved performance by adding var to hold layer reference.

function moveIt(id,x,y) {
	if (document.getElementById) {	// IE5, NS6, DOM
		var d = document.getElementById(id); 
        d.style.left = x + 'px';
        d.style.top  = y + 'px';
    } else if (document.all) {		// IE4
		var d = document.all[id];
        d.style.left = x;
        d.style.top  = y;
    } else if (document.layers) {	// NS4
        document.layers[id].moveTo(x,y);
	} 
}
function getLeft(id) {
	if (document.getElementById) return document.getElementById(id).style.left;
    else if (document.all) return document.all[id].style.left;
    else if (document.layers) return document.layers[id].left;
}
function getTop(id) {
	if (document.getElementById) return document.getElementById(id).style.top;
    else if (document.all) return document.all[id].style.top;
    else if (document.layers) return document.layers[id].top;
}
