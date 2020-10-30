// index.js

// by geoff pack
// geoff@virtualgeoff.com
// http://www.virtualgeoff.com
// march 2001


// ---------------------------------------------------
// physics:

var N = 8; // N = number of layers
var dragging;
var fps = 25;
var dx,dy,dr;

var f = new Array('f0','f1','f2','f3','f4','f5','f6','f7','f8');
var px = new Array(0,0,0,0,0,0,0,0,0);
var py = new Array(0,0,0,0,0,0,0,0,0);
var vx = new Array(0,0,0,0,0,0,0,0,0);
var vy = new Array(0,0,0,0,0,0,0,0,0);
var ax = new Array(0,0,0,0,0,0,0,0,0);
var ay = new Array(0,0,0,0,0,0,0,0,0);

px[0]=window.innerWidth/2;
py[0]=window.innerHeight/2;
for (i=1; i<=N; i++) {
    px[i]=Math.random()*window.innerWidth;
    py[i]=Math.random()*window.innerHeight;
}

var vmax = 20;
var rmin = 40;
var k = 20;
var j = 10000;
var d = 0.98;
var j = 40000;
var d = 0.96;

function movefs() {
	dt = 1/fps; // dt is in seconds !
	
    // find f0 position
	if (document.getElementById) {
        px[0] = parseInt(document.getElementById('f0').style.left);
        py[0] = parseInt(document.getElementById('f0').style.top);
    } else if (document.all) {
        // need parseInt to remove 'px'
        px[0] = parseInt(document.all.f0.style.left);
        py[0] = parseInt(document.all.f0.style.top);
	} else if (document.layers) {
        px[0] = document.layers.f0.left;
        py[0] = document.layers.f0.top;
    }  
    // rule one - follow the leader (f0)
    for (n=1; n<=N; n++) {
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
    for (n=0; n<=N; n++) {
        for (m=n+1; m<=N; m++) {
            dx=px[m]-px[n];
            dy=py[m]-py[n];
            dr = Math.sqrt(dx*dx+dy*dy);
            if ((dr<1)&&(dr>=0)) {
            	dr=1;
            } else if ((dr>-1)&&(dr<=0)) {
            	dr=-1;
            }
            if ((dx<1)&&(dx>=0)) {
            	dx=1;
            } else if ((dx>-1)&&(dx<=0)) {
            	dx=-1;
            }
            if ((dy<1)&&(dy>=0)) {
            	dy=1;
            } else if ((dy>-1)&&(dy<=0)) {
            	dy=-1;
            }
            vx[n]+=-j*dx/(dr*dr*dr);
            vy[n]+=-j*dy/(dr*dr*dr);
            vx[m]+=j*dx/(dr*dr*dr);
            vy[m]+=j*dy/(dr*dr*dr);
        }
     }
    // plot positions
    for (n=1; n<=N; n++) {
        px[n]+=vx[n]*dt;
        py[n]+=vy[n]*dt;
		moveIt(f[n],px[n],py[n]);
    }
    next = setTimeout("movefs()",1000/fps);
}
function pauseIt() {
	clearTimeout(next);
}
function resumeIt() {
    next = setTimeout("movefs()",1000/fps);
}

// ---------------------------------------------------

function init() {
	if (document.all) {
        xmax = window.width;
        ymax = window.height;
	} else if (document.layers || document.getElementById) {
        xmax = window.innerWidth;
        ymax = window.innerHeight;
	}
	// move to initial positions
	for (n=0; n<=N; n++) {
		moveIt(f[n],px[n],py[n]);
	}
	window.status = "drag the orange square...";
	dragInit();
	movefs();
}

window.onload = init;
