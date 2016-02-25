
// created by Geoff Pack
// geoff@spike.com.au

var ie = document.all?1:0
var ns = document.layers?1:0

// scroll object:
// makes a browser-independent object for easy scrolling
// makeScrollObj is partly inspired by DFORM1.

function makeScrollObj(objId,layerId,parent,parent2,parent3,parent4){
    // need to find parents if netscape
    parent4=(parent4)? 'document.'+parent4+'.':'';
    parent3=(parent3)? 'document.'+parent3+'.':'';
    parent2=(parent2)? 'document.'+parent2+'.':'';
    parent=(parent)? 'document.'+parent+'.':'';
    this.css=(ns)? eval(parent4+parent3+parent2+parent+'document.'+layerId):eval('document.all.'+layerId+'.style');
    this.scrollHeight=(ns)?this.css.document.height:eval('document.all.'+layerId+'.offsetHeight');
    this.scrollWidth =(ns)?this.css.document.width:eval('document.all.'+layerId+'.offsetWidth');
    this.top  = getTop;
    this.left = getLeft;
    this.id   = objId;
    if (ie) {
        // initializes position to that set in stylesheet
        for (ss=0; ss<document.styleSheets.length; ss++) {
            for (sr=0; sr<document.styleSheets[ss].rules.length; sr++) {
                if (document.styleSheets[ss].rules[sr].selectorText=='#'+layerId) {
                    this.css.left=parseInt(document.styleSheets[ss].rules[sr].style.left);
                    this.css.top=parseInt(document.styleSheets[ss].rules[sr].style.top);
                }
            }
        }
    }
}
function getTop(){
    var top=(ns)?eval(this.css.top):eval(this.css.pixelTop);
    return top;
}
function getLeft(){
    var left=(ns)?eval(this.css.left):eval(this.css.pixelLeft);
    return left;
}

// scroll scripts:
// a collection a functions to move scrollObjects
// velocity in pixels per millisecond - independent of frame rate
// therefore position += velocity * deltaT

var scrollTimer=new Array(); // timeouts for each object using these fns
var fps=20, deltaT=1000/fps; // fps = frames per second; deltaT in millisecs
var contHeight = 100;
var contWidth  = 100;

function noScroll(obj){
    // clear the timeout for this object
    clearTimeout(scrollTimer[obj.id]);
}

function scroll(obj,vx,vy,maxX,maxY){
    // moves object at given velocity until reaches limit or is cancelled
    var px,py,xMin,yMin,xMax,yMax;
    // clear other scrolls for this object
    clearTimeout(scrollTimer[obj.id]);
    // find position
    px=obj.left(); py=obj.top();
    // find limits
    xMin=0; yMin=0;
    xMax=contWidth-obj.scrollWidth;
    yMax=contHeight-obj.scrollHeight;
    // calculate new position and test limits
    px+=vx*deltaT; if(px>xMin){px=xMin;vx=0;} if(px<xMax){px=xMax;vx=0;}
    py+=vy*deltaT; if(py>yMin){py=yMin;vy=0;} if(py<yMax){py=yMax;vy=0;}
    // move layer and do it all again
    obj.css.left=px; obj.css.top=py;
    if (vx!=0 || vy!=0) scrollTimer[obj.id]=setTimeout("scroll("+obj.id+","+vx+","+vy+","+xMax+","+yMax+")",deltaT);
}

function scrollTo(obj,destX,destY,vX,vY){
    // moves object to destination at given velocity
    var px,py;
    var vx=(vX)?vX:5; var vy=(vY)?vY:5;
    // clear other scrolls for this object
    clearTimeout(scrollTimer[obj.id]);
    // find position
    px=obj.left(); py=obj.top();
    // set velocity
    if (destX<px) vx=-Math.abs(vx); if (destY<py) vy=-Math.abs(vy);
    px+=vx*deltaT; py+=vy*deltaT;
    // test to see if reached destination
    if (vx<0) {if (px<=destX) {px=destX; vx=0;}}
    else  {if (px>=destX) {px=destX; vx=0;}}
    if (vy<0) {if (py<=destY) {py=destY; vy=0;}}
    else {if (py>=destY) {py=destY; vy=0;}}
    // move layer and do it all again
    obj.css.left=px; obj.css.top=py;
    if (vx!=0 || vy!=0) scrollTimer[obj.id]=setTimeout("scrollTo("+obj.id+","+destX+","+destY+","+vx+","+vy+")",deltaT);
}

function scrollBy(obj,deltaX,deltaY,vx,vy){
    // moves object by delta at given velocity
    destX=obj.left()+deltaX;
    destY=obj.top()+deltaY;
    scrollTo(obj,destX,destY,vx,vy);
}

function scrollToDuration(obj,destX,destY,duration){
    // moves object to destination over a given duration
    // duration in milliseconds
    vx=(destX-obj.left())/duration;
    vy=(destY-obj.top())/duration;
    scrollTo(obj,destX,destY,vx,vy);
}

function scrollByDuration(obj,deltaX,deltaY,duration){
    // moves object by delta over a given duration
    // duration in milliseconds
    vx=deltaX/duration; vy=deltaY/duration;
    destX=obj.left()+deltaX;
    destY=obj.top()+deltaY;
    scrollTo(obj,destX,destY,vx,vy);
}


