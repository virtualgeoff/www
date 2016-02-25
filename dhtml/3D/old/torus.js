// torus.js

// by geoff pack
// geoff@virtualgeoff.com
// http://www.virtualgeoff.com
// june 2001


// set up the torus:

// change first two variables to change number of points
var n = 18;  // every 360/n degrees latitude;
var m = 9;  // every 360/m degrees longitude;
var pi = 3.14159;
var radius1 = 0.6;
var radius2 = 0.3;

var point = new Array();
var numpoints = 32;
var count = 0;
var px = new Array();
var py = new Array();
var pz = new Array();
var pr = new Array();
var pth = new Array();

var k=0;
var str='';
// set up torus points
for (i=0; i<=n; i++) {
    for (j=0; j<m; j++) {
        // find angle in degrees
        phi   = i * 360/n;
        theta = j * 360/m;
        // convert to radians
        thetaR = theta * (2*pi/360);
        phiR   = phi   * (2*pi/360);
        // find co-ordinates
        pr[k] = radius1 + radius2*Math.sin(phiR);
        px[k] = pr[k] * Math.sin(thetaR);
        pz[k] = dist + pr[k] * Math.cos(thetaR);
        py[k] = radius2 * Math.cos(phiR);
        pth[k] = thetaR;
        k++;
        //only calculate once at poles:
        if ((i==0)||(i==n)) break;
    }
}
//alert(k + ' points');
var numpoints = k;

// write the stylesheet:
document.writeln('<style type="text/css">');
for (i=0; i<numpoints; i++){
    j=i+1; x=20*i; y=0*i+200;
    document.write('#p'+i+' {position: absolute; z-index: '+j+'; left:-1; top: -1;}');
}
document.writeln('</style>');


// rotate the torus and plot it:
var xmax=7;
var ymax=6;
var Xmax = 450;
var Ymax = 300;
var zz = 40;
var time = 0;
var theta2 = 0;
var dist = 5;

function moveThem() {
    // rotate torus:
    theta2 = (time/10) * (2*pi/360);
    for (i=0; i<numpoints; i++){
        px[i] = pr[i]*Math.sin(theta2+pth[i]);
        pz[i] = pr[i]*Math.cos(theta2+pth[i]);
    }
    time+=50;
    // plot points:
    for (i=0; i<numpoints; i++){
        x = px[i]*(zz/(pz[i]+dist));
        y = py[i]*(zz/(pz[i]+dist));
        X=(Xmax/2)*(x/xmax+1);
        Y=(Ymax/2)*(1-y/ymax);
        obj=eval('point['+i+']');
		obj.css.left = X; 
		obj.css.top = Y;
    }
    count++
    setTimeout('moveThem()',50);
}

function init() {
    for (i=0; i<numpoints; i++){
        str1 = 'point['+i+']';
        str2 = 'p'+i;
        point[i] = new  makeScrollObj(str1,str2);
    }
    window.status = numpoints + ' points';
	moveThem();
}
