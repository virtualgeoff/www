// test1.js

// by Geoff Pack
// geoff@virtualgeoff.com
// http://www.virtualgeoff.com

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

// ---------------------------------------------------
// physics:

var dragging;
var now; var then = new Date();
var dt = 1;
var dx,dy,dr;

var px = new Array(400,100,200,300,400,150,250,350,450);
var py = new Array(100,50,50,50,50,150,150,150,150);
var vx = new Array(0,0,0,0,0,0,0,0,0);
var vy = new Array(0,0,0,0,0,0,0,0,0);
var ax = new Array(0,0,0,0,0,0,0,0,0);
var ay = new Array(0,0,0,0,0,0,0,0,0);

var vmax = 20;
var rmin = 40;
var k = 20;
var j = 10000;
var d = 0.98;

var temp1, temp2; // error testing

function moveFollowers() {
    // calculate time, dt
    now = new Date();
    dt = (now.getTime()-then.getTime())/1000; // in seconds

    // find leader position
    if (document.layers) {
        px[0] = document.layers.leader.left;
        py[0] = document.layers.leader.top;
    } else if (document.all) {
        // need parseInt to remove 'px'
        px[0] = parseInt(document.all.leader.style.left);
        py[0] = parseInt(document.all.leader.style.top);
    }
    // rule one - follow the leader
    for (n=1; n<=8; n++) {
        dx=px[0]-px[n];
        dy=py[0]-py[n];
        dr = Math.sqrt(dx*dx+dy*dy);
        if ((dr<1)&&(dr>=0)) dr=1;
        if ((dr>-1)&&(dr<=0)) dr=-1;
        vx[n]+=k*dx/dr;
        vy[n]+=k*dy/dr;
        vx[n]*=d;
        vy[n]*=d;
    }
    // rule two - avoid each other
    for (n=0; n<=8; n++) {
        for (m=n+1; m<=8; m++) {
            dx=px[m]-px[n];
            dy=py[m]-py[n];
            dr = Math.sqrt(dx*dx+dy*dy);
            if ((dr<1)&&(dr>=0)) dr=1;
            else if ((dr>-1)&&(dr<=0)) dr=-1;
            if ((dx<1)&&(dx>=0)) dx=1;
            else if ((dx>-1)&&(dx<=0)) dx=-1;
            if ((dy<1)&&(dy>=0)) dy=1;
            else if ((dy>-1)&&(dy<=0)) dy=-1;
            //vx[n]=50*k*dx/dr;
            //vy[n]=50*k*dy/dr;
            vx[n]+=-j*dx/(dr*dr*dr);
            vy[n]+=-j*dy/(dr*dr*dr);
            vx[m]+=j*dx/(dr*dr*dr);
            vy[m]+=j*dy/(dr*dr*dr);
        }
     }
    // plot positions
    window.status=('dr = ' + dr + ', dx = ' + dx + ', dy = ' + dy);
    for (n=1; n<=8; n++) {
        px[n]+=vx[n]*dt;
        py[n]+=vy[n]*dt;
        temp1=(px[n]);
        temp2=(py[n]);
        if (n==1) moveIt('follower1',temp1,temp2);
        if (n==2) moveIt('follower2',temp1,temp2);
        if (n==3) moveIt('follower3',temp1,temp2);
        if (n==4) moveIt('follower4',temp1,temp2);
        if (n==5) moveIt('follower5',temp1,temp2);
        if (n==6) moveIt('follower6',temp1,temp2);
        if (n==7) moveIt('follower7',temp1,temp2);
        if (n==8) moveIt('follower8',temp1,temp2);
    }
    then = now;
    next = setTimeout("moveFollowers()",1);
}

function moveIt(layerID,mLeft,mTop){
    if (document.layers) {
        document.layers[layerID].moveTo(mLeft,mTop);
    } else if (document.all) {
        document.all[layerID].style.left = mLeft;
        document.all[layerID].style.top  = mTop;
    }
}

// ---------------------------------------------------
// Error messages

function myErrorHandler(errorMessage,url,line) {
    alert('temp1 = ' + temp1 + '\ntemp2 = ' + temp2 + '\n dr = ' + dr);
    //return true to supress javascript error message; false to retain.
    return false;
}

// ---------------------------------------------------

function init() {
    onerror = myErrorHandler;
    if (NS4) {
        document.captureEvents(Event.MOUSEDOWN | Event.MOUSEUP);
        activeElement = document.leader;
        xmax = window.innerWidth;
        ymax = window.innerHeight;
    } else {
        document.onmousemove = mMove;
        activeElement = document.all.leader;
        xmax = window.width;
        ymax = window.height;
        leader.style.left=400; leader.style.top=100;
        follower1.style.left=100; follower1.style.top=50;
        follower2.style.left=200; follower2.style.top=50;
        follower3.style.left=300; follower3.style.top=50;
        follower4.style.left=400; follower4.style.top=50;
        follower5.style.left=150; follower1.style.top=150;
        follower6.style.left=250; follower2.style.top=150;
        follower7.style.left=350; follower3.style.top=150;
        follower8.style.left=450; follower4.style.top=150;
    }
    document.onmousedown = mDown;
    document.onmouseup = mUp;
}
