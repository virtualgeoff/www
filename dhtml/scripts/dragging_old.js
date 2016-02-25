// dragging.js 1.0

// by geoff pack 
// geoff@virtualgeoff.com
// march 2001

// dragging script for vgeoff pages
// doesn't work yet for Netscape 6

currentX = currentY = 0;
whichElement = null;
target = null;

function mDown(e) {
    dragging = true;
    if (document.all) {
        whichElement = event.srcElement;
        while (whichElement.id.indexOf(target) == -1) {
            whichElement = whichElement.parentElement;
            if (whichElement == null) { return }
        }
    } else if (document.layers) {
        mouseX = e.pageX;
        mouseY = e.pageY;

        for ( i=0; i<document.layers.length; i++ ) {
            tempLayer = document.layers[i];
            if ( tempLayer.id.indexOf(target) == -1 ) { continue }
            if ( (mouseX > tempLayer.left) && (mouseX < (tempLayer.left + tempLayer.clip.width))
                 && (mouseY > tempLayer.top) && (mouseY < (tempLayer.top + tempLayer.clip.height)) ) {
                whichElement = tempLayer;
            }
        }
        if (whichElement == null) { return}
    } else if (document.getElementById) {
        mouseX = e.pageX;
        mouseY = e.pageY;
		whichElement = document.getElementById(target);
	}
    if (whichElement != activeElement) {
        if (document.all) { whichElement.style.zIndex = activeElement.style.zIndex + 1 }
            else { whichElement.moveAbove(activeElement) };
            activeElement = whichElement;
    }
    if (document.all) {
        whichElement.style.pixelLeft = whichElement.offsetLeft;
        whichElement.style.pixelTop = whichElement.offsetTop;
        currentX = (event.clientX + document.body.scrollLeft);
        currentY = (event.clientY + document.body.scrollTop);
    } else if (document.layers || document.getElementById){
        currentX = e.pageX;
        currentY = e.pageY;
        document.captureEvents(Event.MOUSEMOVE);
        document.onmousemove = mMove;
    }
}

function mMove(e) {
    if (whichElement == null) { return };
    if (document.all) {
        newX = (event.clientX + document.body.scrollLeft);
        newY = (event.clientY + document.body.scrollTop);
	} else if (document.layers || document.getElementBy) {
        newX = e.pageX;
        newY = e.pageY;
    }
    distanceX = (newX - currentX);
    distanceY = (newY - currentY);
    currentX = newX;
    currentY = newY;
    if (document.all) {
        whichElement.style.pixelLeft += distanceX;
        whichElement.style.pixelTop += distanceY;
        event.returnValue = false;
	} else if (document.layers) {
        whichElement.moveBy(distanceX,distanceY)
    } else if (document.getElementById) {
        whichElement.style.left += distanceX + 'px';
        whichElement.style.top += distanceY + 'px';	
	}
}

function mUp() {
	if (document.all) {
		//
	} else if (document.layers || document.getElementById) {
        document.releaseEvents(Event.MOUSEMOVE)
    }
    whichElement = null;
    dragging = false;
} 

function dragIt(id,message) {
	if (document.all) {
        document.onmousemove = mMove;
        activeElement = document.all[id];
	} else if (document.getElementById) {
        document.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP);
        activeElement = document.getElementById(id);
	} else if (document.layers) {
        document.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP);
        activeElement = document.layers[id];
	}
	document.onmousedown = mDown;
	document.onmouseup = mUp;
	window.status = message;
	target = id;
}


