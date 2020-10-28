// ---------------------------------------------------
// drag script stuff

IE4 = (document.all) ? 1 : 0;
NS4 = (document.layers) ? 1 : 0;

currentX = currentY = 0;
whichElement = null;

function mDown(e) {
    dragging = true;
    if (IE4) {
        whichElement = event.srcElement;
        while (whichElement.id.indexOf("leader") == -1) {
            whichElement = whichElement.parentElement;
            if (whichElement == null) { return }
        }
    } else {
        mouseX = e.pageX;
        mouseY = e.pageY;

        for ( i=0; i<document.layers.length; i++ ) {
            tempLayer = document.layers[i];
            if ( tempLayer.id.indexOf("leader") == -1 ) { continue }
            if ( (mouseX > tempLayer.left) && (mouseX < (tempLayer.left + tempLayer.clip.width))
                 && (mouseY > tempLayer.top) && (mouseY < (tempLayer.top + tempLayer.clip.height)) ) {
                whichElement = tempLayer;
            }
        }
        if (whichElement == null) { return}
    }
    if (whichElement != activeElement) {
        if (IE4) { whichElement.style.zIndex = activeElement.style.zIndex + 1 }
            else { whichElement.moveAbove(activeElement) };
            activeElement = whichElement;
    }
    if (IE4) {
        whichElement.style.pixelLeft = whichElement.offsetLeft;
        whichElement.style.pixelTop = whichElement.offsetTop;
        currentX = (event.clientX + document.body.scrollLeft);
        currentY = (event.clientY + document.body.scrollTop);
    } else {
        currentX = e.pageX;
        currentY = e.pageY;
        document.captureEvents(Event.MOUSEMOVE);
        document.onmousemove = mMove;
    }
}

function mMove(e) {
    if (whichElement == null) { return };
    if (IE4) {
        newX = (event.clientX + document.body.scrollLeft);
        newY = (event.clientY + document.body.scrollTop);
    } else {
        newX = e.pageX;
        newY = e.pageY;
    }
    distanceX = (newX - currentX);
    distanceY = (newY - currentY);
    currentX = newX;
    currentY = newY;
    if (IE4) {
        whichElement.style.pixelLeft += distanceX;
        whichElement.style.pixelTop += distanceY;
        event.returnValue = false;
    } else {
        whichElement.moveBy(distanceX,distanceY)
    }
}

function mUp() {
    if (NS4) {
        document.releaseEvents(Event.MOUSEMOVE)
    }
    whichElement = null;
    dragging=false;
}
