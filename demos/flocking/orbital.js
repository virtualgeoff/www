// ------------------------------------------------------------
//
// orbital.js
//
// Geoff Pack, geoff@virtualgeoff.com
// from: http://www.virtualgeoff.com/demos/flocking/orbital.html
//
// June 2001
//
// modified October 2003 to work in Mozilla/Safari
// modified October 2004
//
// ---------------------------------------------------
// physics:

var dt = 0.5;		
var dx,dy,dr;
var vmax = 100;
var rmin = 40;
var k = 2;    		// spring constant
var d = 0.99;   	// damping constant

var N = 9; 			// number of squares
var xmax = 600; 	// width of content area
var ymax = 400; 	// height of content area
var mx = 200;		// mouse position
var my = 200;		

// position, velocity, acceleration arrays
var f = new Array('f0','f1','f2','f3','f4','f5','f6','f7','f8');
var px = new Array();
var py = new Array();
var vx = new Array();
var vy = new Array();
var ax = new Array();
var ay = new Array();

// initialise positions, etc
for (i=0; i<N; i++) {
	//f[i] = "f" + i;
	px[i] = xmax * Math.random(); 
	py[i] =	ymax * Math.random();
	vx[i] = 0;
	vy[i] = 0;
	ax[i] = 0;
	ay[i] = 0;
}


function moveFollowers() {
    // leader position is set by mouse + an offset
	px[0] = mx + 20;
	py[0] = my - 20;
    moveIt(f[0],px[0],py[0]);

    // follow the leader
    for (n=1; n<N; n++) {
        dx=px[0]-px[n];
        dy=py[0]-py[n];
        dr = Math.sqrt(dx*dx+dy*dy);
        if ((dr<1)&&(dr>=0)) dr=1;
        if ((dr>-1)&&(dr<=0)) dr=-1;
        vx[n]+=k*dx/dr;
        vy[n]+=k*dy/dr;
        vx[n]*=d;
        vy[n]*=d;
        px[n] += vx[n] * dt;
        py[n] += vy[n] * dt;
        moveIt(f[n],px[n],py[n]);
    }
	window.status = px[0] + ", " + py[0];
    next = setTimeout("moveFollowers()",20);
}

function moveIt(id,x,y) {
	var d = document.getElementById(id); 
	d.style.left = x + 'px';
	d.style.top  = y + 'px';
	
}

function mouseMove(e) {
	if (document.all) {
        mx = event.x
        my = event.y
        crossHair(xto,yto);
    } else if (document.layers || document.getElementById) {
        mx = e.pageX;
        my = e.pageY;
    }
}

// ---------------------------------------------------

function init() {
    //if (document.layers) document.captureEvents(Event.MOUSEMOVE);
    document.onmousemove = mouseMove;
    moveFollowers();
}
