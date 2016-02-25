
// Geoff Pack, October 2008
// last modified: Septemmber 2011
// a more general 3D perspective solution
// c.f. http://en.wikipedia.org/wiki/Perspective_transform

// uses left-handed co-ordinate system:
// +x is to the right
// +y is up
// +z is into the screen

var p = []; 	// array of points in 3D space that is to be projected.
var c = {}; 	// the location of the camera.
var theta = {}; // The rotation of the camera. When c=<0,0,0>, and theta=<0,0,0>, the 3D vector <1,2,0> is projected to the 2D vector <1,2>.
var e = {x:0, y:0, z:5}; 	// the viewer's position relative to the display surface - camera is 5 units behind display surface
var b = {};		// the 2D projection of p
var d = {};		// translation of p into coordinate system defined by c
var cameraMove = true // camera fixed or movable
var ds = {};
var dt = 20;	// time step in millisec = 50 fps
var timer = null;
var pi = Math.PI;
var body;		// document body
var info;		// info layer
var windowWidth  = self.innerWidth;
var windowHeight = self.innerHeight;
var scale = (windowHeight/2) * 0.8; //300;
var center = {x:(windowWidth/2), y:(windowHeight/2)}

function setScale() {
	scale = (self.innerHeight/2) * 0.8;
	center.x = self.innerWidth/2;
	center.y = self.innerHeight/2;
}

function fixed(n, digits) {
	var m = Math.pow(10, digits)
	return Math.round(n*m)/m;
}

function setPoints() {
	// random points - default if not overriddden
	var N = 100;
	var i;
	
	for (i = 0; i < N; i++) {
		p[i] = {};
		p[i].x = 2 - Math.random() * 4; // should be in range -2 to +2
		p[i].y = 2 - Math.random() * 4;
		p[i].z = 2 - Math.random() * 4;
	}
}

function writePoints() {
	// write the points	to the page
	var i;
	
	for (i = 0; i < p.length; i++) {
		body.innerHTML += '<b id="p' + i + '">&middot;</b>';
	}	
}

function animatePoints() {
	// rotate points around the y axis
	var x2, y2, z2; 		// temp vars
	var theta2 = 1/100; 	// radians per time step
	var sinTheta = Math.sin(theta2);
	var cosTheta = Math.cos(theta2);
	var i;

	for (i = 0, j = p.length; i < j; i++) {		
		x2 = p[i].x * cosTheta - p[i].z * sinTheta;
		y2 = p[i].y;
		z2 = p[i].x * sinTheta + p[i].z * cosTheta;
		
		p[i].x = x2;
		p[i].y = y2;
		p[i].z = z2;
	}
}

function changeStyle(style) {
	var i;
	
	for (i = 0, j = p.length; i < j; i++) {
		if (style == 'number') {
			document.getElementById('p' + i).innerHTML = i;
		} else if (style == 'plus') {
			document.getElementById('p' + i).innerHTML = '+';
		} else if (style == 'pos'){
			document.getElementById('p' + i).innerHTML =  '(' + fixed(p[i].x,2) + ', ' + fixed(p[i].y,2) + ', ' + fixed(p[i].z,2) + ')';	
		} else {
			document.getElementById('p' + i).innerHTML = '&middot;';		
		}
	}
	return false;
}

function setCamera(X,Y,Z,thetaX,thetaY,thetaZ) {
	c.x = X;
	c.y = Y;
	c.z = Z;
	// convert degrees to radians
	theta.x = thetaX * Math.PI / 180;
	theta.y = thetaY * Math.PI / 180;
	theta.z = thetaZ * Math.PI / 180;
	return false;
}

function mouseMove(e) {
	var eX, eY, P, Q, radius;
	
	window.status = 'mouseMove: ' + e.pageX + ', ' + e.pageY;
	eX = e.pageX;
	eY = e.pageY;
	info.innerHTML = eX + ',' +eY;

	if (cameraMove) {
		P = 2 * Math.PI * (eX/windowWidth - 0.5);
		Q = 2 * Math.PI * (eY/windowHeight - 0.5);
		
		// move camera		
		theta.x = Q;
		theta.y = P;
		theta.z = 0;

 		radius = Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
		c.y = radius * Math.sin(Q);			
		c.x = -radius * Math.sin(P) * Math.cos(Q) ;
		c.z = -radius * Math.cos(P) * Math.cos(Q);	
		
		info.innerHTML = c.x + '<br>' + c.y + '<br>' + c.z;
		info.innerHTML += '<br>' + theta.x + '<br>' + theta.y + '<br>' + theta.z;
	}
}

function plotPoints() {
	var dx, dy, dz, sinX, cosX, sinY, cosY, sinZ, cosZ, i;

	for (i = 0; i < p.length; i++) {		
		dx = p[i].x - c.x;
		dy = p[i].y - c.y;
		dz = p[i].z - c.z;
		
		sinX = Math.sin(theta.x);
		cosX = Math.cos(theta.x);
		sinY = Math.sin(theta.y);
		cosY = Math.cos(theta.y);
		sinZ = Math.sin(theta.z);
		cosZ = Math.cos(theta.z);
		
		d.x = cosY*(sinZ*dy + cosZ*dx) - sinY*dz;
		d.y = sinX*(cosY*dz + sinY*(sinZ*dy + cosZ*dx)) + cosX*(cosZ*dy - sinZ*dx);
		d.z = cosX*(cosY*dz + sinY*(sinZ*dy + cosZ*dx)) - sinX*(cosZ*dy - sinZ*dx);
		
		// project onto 2d plane and scale
		b.x = (d.x - e.x) * (e.z/d.z) * scale;
		b.y = (d.y - e.y) * (e.z/d.z) * scale;
		
		// find disance from point to camera
		dd = 12 - d.z;
		var ccc = Math.round(50 + dd * 50); // arbitrary scale and offset
		if (ccc < 0) ccc = 0;
		if (ccc > 255) ccc = 255;

		// move points in page
		// is slightly quicker (by a few ms) to store each dom element in an array
		// rather than look up each time, but makes animation noticably jerkier...
		ds = document.getElementById('p' + i).style;
		ds.left = center.x  + b.x + 'px';
		ds.top  = center.y - b.y + 'px'; // invert
		ds.fontSize = (16 + dd * 8) + 'px';
		ds.color = 'rgb(' + ccc + ', ' + ccc + ', ' + ccc + ')';
		ds.zIndex = ccc;	
	}
}

function run() {
	var now;
	var then = new Date();
	animatePoints();
	plotPoints();
	now = new Date();
	document.getElementById('info').innerHTML = (now - then)  + ' ms per frame';
}

function init() {
	body = document.getElementsByTagName('BODY')[0];
	info = document.getElementById('info');
	setPoints();
	writePoints();
	setCamera(0,0,-10,0,0,0); 	// front view of object: camera 10 units out from screen looking into screen
	timer = setInterval('run()', dt);
	window.onmousemove = mouseMove;
	window.onresize = setScale;
}

window.onload = init;

