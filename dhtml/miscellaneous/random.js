// random.js

// by geoff pack
// geoff@virtualgeoff.com
// http://www.virtualgeoff.com
// march 2001


// write the stylesheet:
document.writeln('<style type="text/css">');
for (i=0; i<32; i++){
	j=i+1; x=10*i; y=5*i;
	document.write('#p'+i+' {position: absolute; z-index: '+j+'; left: '+x+'px; top: '+y+'px;}');
}
document.writeln('</style>');

function moveThem() {
	for (i=0; i<32; i++) {
		obj = eval('point['+i+']');
		x = Math.random()*xmax; 
		y = Math.random()*ymax;
		obj.css.left=x; 
		obj.css.top=y;
	}
	setTimeout('moveThem()',50);
}

var point = new Array();

function init() {
	xmax = 450;
	ymax = 300;

	for (i=0; i<32; i++) {
		str1 = 'point['+i+']';
		str2 = 'p'+i;
		point[i] = new makeScrollObj(str1,str2);
	}
	moveThem();
}
