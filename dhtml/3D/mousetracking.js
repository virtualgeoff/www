// Geoff Pack
// January 2008

var recording = false;
var replaying = false;
var startTime;
var stoptime;
var points = [];
var count = 0;
var limit3D = 200;

function moveBlock(x,y) {
	document.getElementById('block').style.left = x-8 + 'px';
	document.getElementById('block').style.top = y-25 + 'px';
}
function replayBlock(i) {
	var dt = points[i][0];
	var X = points[i][1];
	var Y = points[i][2];
	//var T = points[count][0];
	var T = 1000;

	//moveBlock(X,Y);
	document.getElementById('coords').innerHTML = 'replay: ' + X + "," + Y;
	document.getElementById('coords').innerHTML += '<br>i: ' + i + ", t: " + dt + "ms";

	if (i < limit3D) {
		// translate points from mouse coords+time (points[]) to 3D point (p[])	
		p[i] = {};
		p[i].x = ((X - windowWidth/2) / windowWidth) * 4; 
		p[i].y = (dt - T/2) / T * 2;
		p[i].z = ((Y - windowHeight/2) / windowHeight) * 4;   
	
		// write points to page...
		//writePoints();
		body.innerHTML += '<b id="p' + i + '">&middot;</b>';
	}
}

function fade(obj)      {document.getElementById(obj).style.color = '#aaa';}
function highlight(obj) {document.getElementById(obj).style.color = '#f00';}
function normalise(obj) {document.getElementById(obj).style.color = '#00f';}

function mouseTrackingMove(e) {
	window.status = 'mouseTrackingMove: ' + e.pageX + ', ' + e.pageY;
	X = e.pageX;
	Y = e.pageY;
	
	moveBlock(X,Y);
	document.getElementById('coords').innerHTML = 'current: ' + X + "," + Y;

	if (recording) {
		var now = new Date();
		dt = now - startTime;
		points[count] = [dt, X, Y];
		count++;
		document.getElementById('coords').innerHTML += '<br>i: ' + count + ", t: " + dt + "ms";
	}
}

function record() {
	if (!replaying && !recording) {
		points = []; // clear points array;
		count = 0;		
		recording = true;
		startTime = new Date();
		highlight('record'); normalise('stop'); fade('replay'); 

		//
		clearAllPoints(); // clear 3D points
		window.onmousemove = mouseTrackingMove;
	}
}

function stop() {
	if (!replaying) {
		recording = false;
		stoptime = new Date();
		normalise('record'); highlight('stop'); normalise('replay'); 
		
		// 
		window.onmousemove = mouseMove; // original function
	}
}

function replay() {
	if (!replaying) { // don't double up
		recording = false;	// stops recording if not already stopped
		replaying = true;
		fade('record'); fade('stop'); highlight('replay'); 
		document.getElementById('block').style.display = 'block';
		
		for (var i=0; i<count; i++) {
			//var str = 'moveBlock('+points[i][1]+','+points[i][2]+')';
			var str = 'replayBlock('+i+')';
			setTimeout(str, points[i][0]);
		}
		// set replaying false after last position:
		var lastTime = points[count-1][0];
		setTimeout('replaying=false;',lastTime);
		setTimeout("normalise('record'); fade('stop'); normalise('replay');",lastTime);
		setTimeout("document.getElementById('block').style.display = 'none';",lastTime);
	}
}

function translatePoints() {
}

function clearAllPoints() {
	// remove page elements
	for (var i=0; i<p.length; i++) {
		body.removeChild(document.getElementById('p' + i));
	}
	p = []; // clear all points;
	
	// add one point back to prevent errors ?
	p[0] = {};
	p[0].x = 0;
	p[0].y = 0;
	p[0].z = 0;

	p[1] = {};
	p[1].x = 1;
	p[1].y = 1;
	p[1].z = 1;

	writePoints();
}

function animatePoints() {
	// nothing - keep still!
}
