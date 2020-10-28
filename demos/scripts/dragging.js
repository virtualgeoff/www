// dragging script for vgeoff pages

// by geoff pack 
// geoff@virtualgeoff.com
// march 2001

var mouseX, mouseY, offsetX, offsetY, obj;
 
function mouseDown(e) {
	offsetX = mouseX - px[0]
	offsetY = mouseY - py[0]
	dragging = true
}
function mouseUp(e) {
    dragging = false
}

function mouseMove(e) {
    if (document.all) {
		mouseX = event.x 
		mouseY = event.y + document.body.scrollTop
	} else if (document.layers || document.getElementById) {
		mouseX = e.pageX
		mouseY = e.pageY
	}
    if (dragging) {
        obj.left = mouseX - offsetX
        obj.top = mouseY - offsetY
        return false
    }
}

function dragInit() {
    if (document.all) {
		//
    } else if (document.layers||document.getElementById) {
		document.captureEvents(Event.MOUSEDOWN | Event.MOUSEMOVE | Event.MOUSEUP)
	}
    document.onmousedown = mouseDown
    document.onmousemove = mouseMove
    document.onmouseup   = mouseUp
	
    if (document.layers) obj = document.layers.f0;
    else if (document.all) obj = document.all.f0.style;
    else if (document.getElementById) obj = document.getElementById('f0').style;

	dragging = false
}
