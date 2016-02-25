
// using <link rel=stylesheet> causes problems in NS
// better to just write the stylesheet

var imgURL = location.pathname;
var imgPath = "../images/blue.gif";
var loadWidth;

if ((imgURL.indexOf('tidewatch/time') != -1)|| (imgURL.indexOf('wetsuits_dummy/rightframe') != -1)){
    imgPath = "images/blue.gif"
}

loadWidth = (navigator.appVersion.indexOf("Mac") != -1) && (navigator.appName != "Netscape")? 1 : 100;

document.writeln('<style type="text/css">');

document.writeln('#shieldLayer	  {position:absolute; z-index:1000;  left: 0px; top: 0px;  	  width: 110%;  height: 100%; visibility: visible; background-image: url(images/x.gif); }');
document.writeln('#Loading	  	  {position:absolute; z-index:1001;  left: 300px; top: 30px;  width: 300px; height: 30px; visibility: visible; }');
document.writeln('#loadingClip    {position:absolute; z-index:1002; left:  300px; top: 50px;  width: '+loadWidth+'px; height: 15px; color:#005577; background-color:#005577; visibility: visible;}');

if ((navigator.appVersion.indexOf("Mac") != -1) && (navigator.appName == "Netscape")) {
    document.writeln('body            {background-color: #006b88; background-image: url('+imgPath+'); background-repeat: repeat-x; font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12pt; color: #FFFFFF}');
    document.writeln('p               {font-size: 10pt;}');
    document.writeln('td              {font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 10pt; color: #FFFFFF}');
    document.writeln('h3              {font: bold 12pt Verdana,Arial,Helvetica,sans-serif; color: #FFFFFF}');
    document.writeln('.menu           {font-size: 10pt; font-weight:bold;}');
    document.writeln('.smallText      {font-size: 10pt;}');
    document.writeln('.loading        {font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 12pt; color: #FFFFFF; font-weight:bold;}');
    document.writeln('small           {font-size: 8pt;}');
} else {
    document.writeln('body            {background-color: #006b88; background-image: url('+imgPath+'); background-repeat: repeat-x; font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 10pt; color: #FFFFFF}');
    document.writeln('p               {font-size: 8pt;}');
    document.writeln('td              {font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 8pt; color: #FFFFFF}');
    document.writeln('h3              {font: bold 10pt Verdana,Arial,Helvetica,sans-serif; color: #FFFFFF}');
    document.writeln('.menu           {font-size: 8pt; font-weight:bold;}');
    document.writeln('.smallText      {font-size: 8pt;}');
    document.writeln('.loading        {font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 10pt; color: #FFFFFF; font-weight:bold;}');
    document.writeln('small           {font-size: 7pt;}');
}

document.writeln('a               {text-decoration:none;}');
document.writeln('a:Visited       {color:#ffffff;}');
document.writeln('a:Active        {color:#ff9900;}');
document.writeln('a:Hover         {color:#ff9900;}');
document.writeln('</style>');

if (document.layers) {
    widthCheck = window.innerWidth;
    heightCheck = window.innerHeight;
    window.onResize = resizeFix;
}

function resizeFix() {
   if (widthCheck != window.innerWidth || heightCheck != window.innerHeight) {
	location.reload();
	}
}

function isLoaded() {
	hide('shieldLayer');
	hide('Loading');
	hide('loadingClip');
}

var layerRef="null",layerStyleRef="null",styleSwitch="null";
var widthClipSwitch="null";

		if (navigator.appName == "Netscape") {
                layerRef="document.layers";
                styleSwitch="";
                widthClipSwitch=".clip.right";
        }else{
                layerRef="document.all";
                styleSwitch=".style";
                widthClipSwitch=".posWidth";
        }
                                
function loadbar(layerName){
		if (eval(layerRef+'["'+layerName+'"]'+styleSwitch+ widthClipSwitch +'== 100')){
                eval(layerRef+'["'+layerName+'"]'+styleSwitch+widthClipSwitch+'=0');
        }else{
                eval(layerRef+'["'+layerName+'"]'+styleSwitch+widthClipSwitch+'+=2');   
        }
        setTimeout('loadbar("'+layerName+'")',30);
}