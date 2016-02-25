// sine.js

// by geoff pack
// geoff@virtualgeoff.com
// http://www.virtualgeoff.com
// march 2001


// write the stylesheet:
document.writeln('<style type="text/css">');
for (i=0; i<36; i++){
    j=i+1; x=13*i; y=0*i+150;
    document.write('#p'+i+' {position: absolute; z-index: '+j+'; left: '+x+'px; top: '+y+'px;}');
}
document.writeln('</style>');

function moveThem() {
    for (i=0; i<36; i++){
        obj=eval('point['+i+']');
        y = 150 + 50*Math.sin(count+(2*pi*i/10));
        obj.css.top=y;
    }
    count++
    setTimeout('moveThem()',100);
}

var point = new Array();
var count = 0;
var pi = 3.1415926;

function init() {
	xmax = 450;
	ymax = 300;

	for (i=0; i<36; i++) {
		str1 = 'point['+i+']';
		str2 = 'p'+i;
		point[i] = new makeScrollObj(str1,str2);
	}
	moveThem();
}
