
// Geoff Pack, October 2008
// last modified: Septemmber 2011
// a more general 3D perspective solution
// c.f. http://en.wikipedia.org/wiki/3D_projection#Perspective_projection

// uses left-handed coördinate system:
// +x is to the right
// +y is up
// +z is into the screen

var p = []; 	// array of points in 3D space that is to be projected
var c = {}; 	// camera location
var theta = {}; // camera rotation: when c=<0,0,0>, and theta=<0,0,0>, the 3D vector <1,2,0> is projected to the 2D vector <1,2>
var theta2 = 0.003; 	// rotation speed in radians per time step
var e = {x:0, y:0, z:5}; 	// viewer's position relative to the display surface - camera is 5 units behind display surface
var b = {};		// the 2D projection of p
var d = {};		// translation of p into coordinate system defined by c
var q = [];		// dom elements holding the dots
var dt = 20;	// time step in millisec = 50 fps

var cameraMove = true 		// camera fixed or movable
var timer = null;
var pi = Math.PI;
var body, info, info2;		// page elements

var windowWidth  = window.innerWidth;
var windowHeight = window.innerHeight;
var scale = (window.innerHeight / 2) * 0.8;
var center = {x:(window.innerWidth / 2), y:(window.innerHeight / 2)}

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
	// random points - default if not overridden
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
		//body.innerHTML += '<b id="p' + i + '">&middot;</b>';
		q[i] = document.createElement('b');
		q[i].id = 'p' + i;
		q[i].innerHTML = '&middot;';
		body.appendChild(q[i]);
	}	
}

function animatePoints() {
	// rotate points around the y axis
	var x2, y2, z2; 		// temp vars
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

function setRotationSpeed(speed) {
	theta2 = speed;
	return false;
}

function changeStyle(style) {
	var i, j;
	
	for (i = 0, j = p.length; i < j; i++) {
		if (style == 'number') {
			q[i].innerHTML = i;
		} else if (style == 'plus') {
			q[i].innerHTML = '+';
		} else if (style == 'pos'){
			q[i].innerHTML = '(' + fixed(p[i].x,2) + ', ' + fixed(p[i].y,2) + ', ' + fixed(p[i].z,2) + ')';	
		} else {
			q[i].innerHTML = '&middot;';
		}
	}
	return false;
}

function setCamera(X,Y,Z,thetaX,thetaY,thetaZ) {
	c.x = X;
	c.y = Y;
	c.z = Z;
	// convert degrees to radians
	theta.x = thetaX * pi / 180;
	theta.y = thetaY * pi / 180;
	theta.z = thetaZ * pi / 180;
	return false;
}

function mouseMove(e) {
	var eX, eY, P, Q, radius;
	
	eX = e.pageX;
	eY = e.pageY;
	info2.innerHTML = 'mouse: ' + eX + ', ' + eY;

	if (cameraMove) {
		// move camera		
		theta.y = 2 * pi * (eX / window.innerWidth - 0.5);
		theta.x = 2 * pi * (eY / window.innerHeight - 0.5);
		theta.z = 0;

 		radius = Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z);
		c.y = radius * Math.sin(theta.x);			
		c.x = -radius * Math.sin(theta.y) * Math.cos(theta.x) ;
		c.z = -radius * Math.cos(theta.y) * Math.cos(theta.x);	
	}
}

function plotPoints() {
	var dx, dy, dz, sinX, cosX, sinY, cosY, sinZ, cosZ, dist, ccc, i;

	sinX = Math.sin(theta.x);
	cosX = Math.cos(theta.x);
	sinY = Math.sin(theta.y);
	cosY = Math.cos(theta.y);
	sinZ = Math.sin(theta.z);
	cosZ = Math.cos(theta.z);

	for (i = 0; i < p.length; i++) {		
		dx = p[i].x - c.x;
		dy = p[i].y - c.y;
		dz = p[i].z - c.z;
		
		d.x = cosY * (sinZ * dy + cosZ * dx) - sinY * dz;
		d.y = sinX * (cosY * dz + sinY * (sinZ * dy + cosZ * dx)) + cosX * (cosZ * dy - sinZ * dx);
		d.z = cosX * (cosY * dz + sinY * (sinZ * dy + cosZ * dx)) - sinX * (cosZ * dy - sinZ * dx);
		
		// project onto 2d plane and scale
		b.x = (d.x - e.x) * (e.z / d.z) * scale;
		b.y = (d.y - e.y) * (e.z / d.z) * scale;
		
		// find disance from point to camera
		//dist = Math.sqrt(c.x * c.x + c.y * c.y + c.z * c.z) + 2 - d.z;
		dist = 12 - d.z;
		ccc = Math.round(50 + dist * 50); // arbitrary scale and offset
		if (ccc < 0) ccc = 0;
		if (ccc > 255) ccc = 255;
		
		// move points in page
		q[i].style.left = center.x  + b.x + 'px';
		q[i].style.top  = center.y - b.y + 'px'; // invert
		q[i].style.fontSize = (16 + dist * 8) + "px";
		q[i].style.color = 'rgb(' + ccc + ', ' + ccc + ', ' + ccc + ')';
		q[i].style.zIndex = ccc;
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
	info2 = document.getElementById('info2');
	setPoints();
	writePoints();
	setCamera(0,0,-10,0,0,0); 	// front view of object: camera 10 units out from screen looking into screen
	timer = setInterval('run()', dt);
	window.onmousemove = mouseMove;
	window.onresize = setScale;
}

window.onload = init;

