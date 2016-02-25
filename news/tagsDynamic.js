
var ts={"3d":19,"accidents":1,"addiction":1,"aerospace":4,"aggregator":3,"aircraft":7,"ajax":3,"animation":2,"annotation":1,"Apple":1,"AppleWorks":1,"architecture":5,"art":18,"artificiallife":4,"astronomy":2,"audio":3,"aviation":6,"beam":4,"bicycles":1,"biology":5,"blog":5,"blogs":1,"bookmarks":1,"Business":1,"calendar":1,"cancer":1,"career":1,"chat":1,"children":6,"clothes":1,"cms":6,"cmsimple":3,"code":1,"comics":1,"computers":4,"Cooking":1,"cool":2,"cosmology":1,"crash":1,"creativity":1,"css":2,"date":1,"del.icio.us":1,"design":11,"DesignPatterns":2,"desktop":1,"development":3,"dhtml":5,"diet":2,"director":1,"diy":10,"drawing":1,"drugs":2,"education":8,"electronics":11,"energy":1,"engine":2,"entrepreneur":1,"environment":1,"Erskineville":1,"essay":2,"ethics":1,"evolution":2,"exoskeletons":1,"Fabrication":2,"family":1,"firefox":1,"flash":7,"flickr":1,"flying":5,"folksonomy":2,"food":1,"free":4,"French":1,"funny":1,"gadget":1,"game":4,"games":18,"gametheory":1,"generative":2,"geo":1,"geodesic":1,"geography":1,"geometry":4,"geourl":1,"gliders":1,"google":1,"graphics":12,"green":1,"groups":1,"growth":1,"hackers":1,"haptics":1,"hardware":7,"haryana":1,"health":7,"history":4,"house":1,"houses":1,"html":2,"humor":2,"hypertext":1,"Hyperwords":1,"hypnotism":1,"ideas":2,"images":1,"inspiration":1,"interface":4,"internet":3,"java":8,"javascript":13,"juggling":2,"kids":5,"kinetic":4,"langauges":1,"languages":8,"learning":4,"LEDs":2,"lego":1,"life":4,"links":2,"local":1,"longevity":3,"lowfat":1,"mac":3,"make":1,"manifesto":1,"maps":2,"math":5,"melanoma":1,"metadata":1,"microprocessor":1,"mobile":1,"modernism":1,"moon":1,"movies":2,"music":1,"nasa":2,"navigation":1,"news":2,"nitinol":1,"nostalgia":1,"nuclear":1,"obesity":1,"online":1,"opensource":1,"osx":2,"paint":2,"paper":1,"paragliders":1,"parenting":1,"parody":1,"Pascal":1,"paulgraham":4,"philosophy":2,"philosphy":1,"photography":5,"php":2,"physics":4,"podcasts":1,"prefab":2,"printer":1,"procrastination":2,"productivity":2,"programming":25,"prosthetics":1,"prostitution":2,"prototyping":1,"psychology":12,"punctuation":1,"rails":1,"recipes":1,"relationships":1,"review":1,"robotics":5,"robots":17,"rockets":2,"rubegoldberg":1,"ruby":2,"samples":1,"satellites":2,"science":9,"scifi":3,"sculpture":3,"semantic":1,"sex":1,"shelter":1,"shockwave":1,"simple":1,"simplicity":1,"Simulation":3,"skin":1,"smalltalk":1,"snippets":1,"social":3,"socialsoftware":1,"software":10,"solar":1,"sounds":1,"space":3,"squeak":1,"standards":1,"startup":1,"svg":2,"sweden":1,"Tagging":1,"tags":3,"tanks":1,"tech":8,"technology":3,"test":1,"TheBeatles":2,"time":4,"timemanagement":1,"tool":1,"tools":13,"toys":7,"tracking":1,"transparent":1,"typography":1,"ui":2,"URI":1,"url":2,"usability":3,"vc":1,"video":3,"virtualreality":2,"viruses":2,"vr":4,"vrml":1,"w3c":1,"weapons":1,"web":18,"web2.0":8,"WebDesign":7,"webdev":10,"wiki":1,"windows":1,"wolfenstein":1,"work":2,"writing":4,"Zeitgeist":2}

var ta=0,tz=25
function s(a,b,i,x){
	if(a>b){
		var m=(a-b)/Math.log(x),v=a-Math.floor(Math.log(i)*m)
	} else {
		var m=(b-a)/Math.log(x),v=Math.floor(Math.log(i)*m+a)
	}
	return v
}
document.write('<style type="text/css">.delicious-tags{font-family:arial,sans-serif}.delicious-tags a img{border:0;display:inline;margin:0 0 0 3px;padding:0}.delicious-tags a{text-decoration:none}.delicious-tags a:hover{text-decoration:underline}.delicious-tags ul{list-style-type:none;margin:0;padding:0; text-align:justify}.delicious-cloud li{position:absolute; top:10px; left:10px;display:block;text-align:justify;background-image:none !important;padding:0;margin:0}.delicious-cloud .delicious-tag-count{padding-left:0.2em;font-size:12px}.delicious-cloud li:before{content:"" !important}</style>')
var ca=[204,204,204],cz=[255,255,255],c=[]
document.write('<div class="delicious-tags" id="delicious-tags-virtualgeoff"><ul class="delicious-cloud">')
var k=0;
for(var t in ts){
	k++;
	for (var i=0;i<3;i++) c[i]=s(ca[i],cz[i],ts[t]-ta,tz)
	var fs = s(12,25,ts[t]-ta,tz)
	document.write('<li id="f'+k+'" style="font-size:'+fs+'px;line-height:1;"><a style="color:rgb('+c[0]+','+c[1]+','+c[2]+')" href="http://del.icio.us/virtualgeoff/'+encodeURIComponent(t).replace('%2F','/')+'">'+t+'</a> </li>');
}
document.write('<li><a href="http://del.icio.us/virtualgeoff"><img src="http://del.icio.us/static/img/delicious.small.gif" width="16" height="16" alt="my del.icio.us"></a></li>')
document.write('</ul></div>')


// index.js

// by geoff pack
// geoff@virtualgeoff.com
// http://www.virtualgeoff.com
// march 2001


// ---------------------------------------------------
// physics:

var N = k; // N = number of layers
var fps = 25;
var dx,dy,dr;

var f = new Array();
var px = new Array();
var py = new Array();
var vx = new Array();
var vy = new Array();
var ax = new Array();
var ay = new Array();

for (i=0; i<=N; i++) {
	f[i] = 'f' + i;
	px[i] = 0;
	py[i] = 0;
	vx[i] = 0;
	vy[i] = 0;
	ax[i] = 0;
	ay[i] = 0;
}

//px[0]=Math.random()*300 + 150;
//py[0]=Math.random()*200 + 100;
px[0]=220;
py[0]=220;
for (i=1; i<=N; i++) {
    px[i]=Math.random()*600;
    py[i]=Math.random()*400;
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
    for (n=1; n<=N; n++) {
        px[n]+=vx[n]*dt;
        py[n]+=vy[n]*dt;
		//moveIt(f[n],px[n],py[n]);
        document.getElementById(f[n]).style.left = px[n] + 'px';
        document.getElementById(f[n]).style.top  = py[n] + 'px';
    }
    next = setTimeout("movefs()",1000/fps); // timeout in millisecs
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
		//moveIt(f[n],px[n],py[n]);
        document.getElementById(f[n]).style.left = px[n] + 'px';
        document.getElementById(f[n]).style.top  = py[n] + 'px';
	}
	//window.status = "drag the orange square...";
	//dragInit();
	movefs();
}

