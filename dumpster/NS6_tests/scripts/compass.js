
// created by Geoff Pack
// geoff@spike.com.au

// compass motion scripting

var fps=20, dt=1000/fps; // fps = frames per second; dt in millisecs
var p1x=0, v1x=0, a1x=0; // position, velocity, acceleration of compassLayer
var p2x=0, dx=0;         // position of navDevice, separation
var k=0.00001, d=0.95;   // spring, damping constants

function moveCompass() {
    // moves compass layer inside navDevice
    // find positions of navDevice and compass
    if (document.layers) {
        p1x = document.layers.navDevice.document.layers.compassClipLayer.document.layers.compassLayer.left;
        p2x = document.layers.navDevice.left;
    } else if (document.all) {
        // need parseInt to remove 'px'
        p1x = parseInt(document.all.compassLayer.style.left);
        p2x = parseInt(document.all.navDevice.style.left);
    }
    // find separation of navDevice and compass, allowing for offsets
    // navDevice.left = 285 when centered in 800x600 screen
    // compassLayer.left = 720-230/2 = 605 when North is centered in compassClipLayer
    dx = (p2x - 285) - (p1x + 605) ;

    // calculate acceleration, velocity, position
    a1x = k * dx;               // acceleration proportional to separation
    v1x = (v1x + a1x*dt) * d;   // damping proportional to v
    p1x += v1x * dt;

    // limit p1x to prevent empty space
    if (p1x > 20) p1x = 20;
    else if (p1x < -1230) p1x = -1230;

    // move compass
    if (document.layers) {
        document.layers.navDevice.document.layers.compassClipLayer.document.layers.compassLayer.moveTo(p1x,0);
    } else if (document.all) {
        document.all.compassLayer.style.left = p1x;
        document.all.compassLayer.style.top  = 0;
    }
}


// navDevice map motion

var contourScroll,contourTextScroll;
var navMapOpen = false;
var dragging=false;

function dragTest() {
    // called by MM_dragLayer in dragging.js while navDevice is being moved
    dragging=true;
    window.status = "Dragging...";
}
function openNavMap() {
    // opens and closes navDevice map
    window.status = "Click compass to show menu. Drag to reposition";
    // open if not dragging the navDevice
    if (!dragging) {
        if (navMapOpen) {
            scrollTo(contourScroll,0,-130,.3,.3);
            scrollTo(contourTextScroll,0,-130,.2,.2);
            navMapOpen = false;
        } else {
            scrollTo(contourScroll,0,0,.3,.3);
            scrollTo(contourTextScroll,0,0,.2,.2);
            navMapOpen = true;
        }
    } else {
        dragging=false;
    }
    // save coordinates of navDevice in variables in the frameset
    if (document.layers) {
        if (parent.navX) parent.navX = document.layers.navDevice.left;
        if (parent.navY) parent.navY = document.layers.navDevice.top;
    } else if (document.all) {
        // need parseInt to remove 'px'
        if (parent.navX) parent.navX  = parseInt(document.all.navDevice.style.left);
        if (parent.navY) parent.navY = parseInt(document.all.navDevice.style.top);
    }
}

// initialize compass and navDevice

function compassInit(px,py) {
    window.status = "Click compass to show menu. Drag to reposition";
    contourScroll     = new  makeScrollObj('contourScroll','contourLayer','contourClipLayer','navDevice');
    contourTextScroll = new  makeScrollObj('contourTextScroll','textLayer','contourClipLayer','navDevice');

    // compass dragging and limits
    var winX = (document.layers)? window.innerWidth-230:770-230;
    var winY = (document.layers)? window.innerHeight-30:460-30;
    MM_dragLayer('document.layers[\'navDevice\']','document.all[\'navDevice\']',0,0,230,30,true,false,0,winY,0,winX,false,false,0,'openNavMap()',true,'dragTest()');

    // re-position navDevice
    // if no arguments, see if stored in frameset, or set to default
    if (!px) {
        if (parent.navX) px=parent.navX;
        else px=15;
    }
    if (!py) {
        if (parent.navY) py=parent.navY;
        else py=15;
    }
    // set position
    if (document.layers) {
        document.layers.navDevice.moveTo(px,py);
    } else if (document.all) {
        //for IE, must set values before we can read them...
        document.all.compassLayer.style.left=10;
        document.all.navDevice.style.left=px;
        document.all.navDevice.style.top=py;
    }

    // start compass animation
    compassTimer = setInterval("moveCompass()",dt);
}

