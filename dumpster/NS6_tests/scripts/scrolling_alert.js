
// scroll object:

var ie = document.all?1:0
var ns = document.layers?1:0

function makeScrollObj(objId,layerId,parent,parent2,parent3,parent4){
    parent4=(parent4)? 'document.'+parent4+'.':'';
    parent3=(parent3)? 'document.'+parent3+'.':'';
    parent2=(parent2)? 'document.'+parent2+'.':'';
    parent=(parent)? 'document.'+parent+'.':'';
    alert(objId);
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

var scrollTimer=new Array();
var fps=20, deltaT=1000/fps; //deltaT is in millisecs
var contHeight = 100;
var contWidth  = 100;

// need velocity to be independent of frame rate
// velocity in pixels per millisecond - independent of frame rate
// hence v = v/deltaT =

function noScroll(obj){
    clearTimeout(scrollTimer[obj.id]);
}

function scroll(obj,vx,vy,maxX,maxY){
    var px,py,xMin,yMin,xMax,yMax;
    clearTimeout(scrollTimer[obj.id]);
    // find position
    px=obj.left(); py=obj.top();
    // test limits
    xMin=0; yMin=0;
    xMax=contWidth-obj.scrollWidth;
    yMax=contHeight-obj.scrollHeight;
    px+=vx*deltaT; if(px>xMin){px=xMin;vx=0;} if(px<xMax){px=xMax;vx=0;}
    py+=vy*deltaT; if(py>yMin){py=yMin;vy=0;} if(py<yMax){py=yMax;vy=0;}
    // move layer and do it all again
    obj.css.left=px; obj.css.top=py;
    if (vx!=0 || vy!=0) scrollTimer[obj.id]=setTimeout("scroll("+obj.id+","+vx+","+vy+","+xMax+","+yMax+")",deltaT);
}

function scrollTo(obj,destX,destY,vX,vY){
    var px,py;
    var vx=(vX)?vX:5; var vy=(vY)?vY:5;
    clearTimeout(scrollTimer[obj.id]);
    // find position
    px=obj.left(); py=obj.top();
    // set velocity
    if (destX<px) vx=-Math.abs(vx); if (destY<py) vy=-Math.abs(vy);
    px+=vx*deltaT; py+=vy*deltaT;
    // test if reached destination
    if (vx<0) {if (px<=destX) {px=destX; vx=0;}}
    else  {if (px>=destX) {px=destX; vx=0;}}
    if (vy<0) {if (py<=destY) {py=destY; vy=0;}}
    else {if (py>=destY) {py=destY; vy=0;}}
    // move layer and do it all again
    obj.css.left=px; obj.css.top=py;
    //window.status = 'scrollTo:  ' + obj.id;
    if (vx!=0 || vy!=0) scrollTimer[obj.id]=setTimeout("scrollTo("+obj.id+","+destX+","+destY+","+vx+","+vy+")",deltaT);
}
function scrollToSpringy(obj,destX,destY,vx,vy) {
    var px,py,dx,dy;
    var deltaT = 30;
    var k=20, d=0.9;    // spring, damping constants
    clearTimeout(scrollTimer[obj.id]);
    // find position
    px=obj.left(); py=obj.top();
    // find seperation, acceleration, velocity, position
    dx = destX - px; dy = destY - py;
    ax = k * dx; ay = k * dy; // Hooke's law
    vx = (vx + ax*deltaT/1000)*d; vy = (vy + ay*deltaT/1000)*d;  // damping proportional to v
    px = parseInt(px + vx * deltaT/1000);
    py = parseInt(py + vy * deltaT/1000);
    // if dest-current is small, stop
    if ((Math.abs(destX-px)<2)&&(Math.abs(vx)<2)) vx=0;
    if ((Math.abs(destY-py)<2)&&(Math.abs(vy)<2)) vy=0;
    // move layer and do it all again
    obj.css.left=px; obj.css.top=py;
    if (vx!=0 || vy!=0) scrollTimer[obj.id]=setTimeout("scrollToSpringy("+obj.id+","+destX+","+destY+","+vx+","+vy+")",deltaT);
}

function scrollBy(obj,deltaX,deltaY,vx,vy){
    destX=obj.left()+deltaX; destY=obj.top()+deltaY;
    //if (!scrollTimer[obj.id])
    scrollTo(obj,destX,destY,vx,vy);
}

function scrollBySpringy(obj,deltaX,deltaY,vx,vy){
    destX=obj.left()+deltaX; destY=obj.top()+deltaY;
    scrollToSpringy(obj,destX,destY,vx,vy);
}

function scrollToDuration(obj,destX,destY,duration){
    // duration in milliseconds
    vx=(destX-obj.left())/duration;
    vy=(destY-obj.top())/duration;
    scrollTo(obj,destX,destY,vx,vy);
}

function scrollByDuration(obj,deltaX,deltaY,duration){
    // duration in milliseconds
    vx=deltaX/duration; vy=deltaY/duration;
    destX=obj.left()+deltaX; destY=obj.top()+deltaY;
    scrollTo(obj,destX,destY,vx,vy);
}



