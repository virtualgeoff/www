
// Bookmarklets

// for small scripts, simply wrap the code in a javascript url and add to a bookmark:
// Safari will automatically escape whatever characters need to be escaped — no need to remove spaces or linebreaks

javascript:(function(){
	/* code here */
})();

// use to ABC Bundle preview
javascript:(function(){window.location=(window.location+((window.location.search)?'&':'?')+'abcbundle=preview')})();



// for longer scripts, upload the script to a server and add it to the page like this:
// note if page is https, script also needs to be
javascript:(function(){
	document.body.appendChild(document.createElement('script')).src='http://example.com/path/script.js';
})();

// img:
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://wwwdev.abc.net.au/innovation/tools/bookmarklets/img.js';})();

// blah:
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://wwwdev.abc.net.au/innovation/tools/bookmarklets/blah.js';})();

// iframe:
javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://wwwdev.abc.net.au/innovation/tools/bookmarklets/iframe.js';})();

// 960 grid:
javascript:(function(){document.body.appendChild(document.createElement('script')).src='http://gridder.andreehansson.se/releases/latest/960.gridder.js';})();



// ------------------------------


// use to ABC Bundle preview
javascript:(function(){window.location=(window.location+((window.location.search)?'&':'?')+'abcbundle=preview')})();


// replace links to wwwdev with links to www
javascript:(function(){
	var links=document.getElementsByTagName('a');
	var n=0;
	for (var i=0;i<links.length;i++){
		if (links[i].href.match(/wwwdev/)) {
			n++;
			links[i].href = links[i].href.replace('wwwdev','www')
			console.log(links[i].href);
		}
	}
	alert(n + ' links replaced');
})();

// ------------------------------

// load a stylesheet
javascript:(function(){
var link = window.document.createElement("link");
var now = new Date();
link.setAttribute("rel","stylesheet");
link.setAttribute("href","http://localdev.abc.net.au/wordpress/wp-content/themes/abcdls/style-tours.css?"+now);
window.document.head.appendChild(link);
})();

javascript:(function(){
var now = new Date();
document.body.appendChild(document.createElement('script')).src=('http://localdev.abc.net.au/wordpress/wp-content/themes/abcdls/js/toursforms.js?'+now);
})();


// ------------------------------



// sakura.css:
javascript:(function(){(function(){"use strict";function e(e){return Array.prototype.slice.call(window.document.querySelectorAll(e))}function t(){alert("Sorry, sakura styles could not be applied to this page.")}function r(){var t=e("link").filter(function(e){return"stylesheet"===e.getAttribute("rel")&&e!==n}),r=e("style"),o=t.concat(r);o.forEach(function(e){e.parentElement.removeChild(e)})}var n=window.document.createElement("link");n.addEventListener("error",t),n.addEventListener("load",r),n.setAttribute("rel","stylesheet"),n.setAttribute("href","https://unpkg.com/sakura.css/css/sakura.css"),window.document.head.appendChild(n)})();})()

// KillCSS:
javascript:(function(){function d(a,b){a.setAttribute("data-css-storage",b)}function e(a){var b=a.getAttribute("data-css-storage");a.removeAttribute("data-css-storage");return b}var c=[];(function(){var a=document.body,b=a.hasAttribute("data-css-disabled");b?a.removeAttribute("data-css-disabled"):a.setAttribute("data-css-disabled","");return b})()?(c=document.querySelectorAll("[data-css-storage]"),[].slice.call(c).forEach(function(a){"STYLE"===a.tagName?a.innerHTML=e(a):"LINK"===a.tagName?a.disabled=!1:a.style.cssText=e(a)})):(c=document.querySelectorAll("[style], link, style"),[].slice.call(c).forEach(function(a){"STYLE"===a.tagName?(d(a,a.innerHTML),a.innerHTML=""):"LINK"===a.tagName?(d(a,""),a.disabled=!0):(d(a,a.style.cssText),a.style.cssText="")}))})();
javascript:(function r(d){for(let l of d.querySelectorAll(`link[rel=stylesheet][href]`)){let h=new URL(l.href);h.searchParams.set(`forceReload`,Date.now());l.href=h;}for(let i of d.querySelectorAll(`iframe`)){i.contentDocument&&r(i.contentDocument);}})(document)

// RefreshCSS:
javascript:(function r(d){for(let l of d.querySelectorAll(`link[rel=stylesheet][href]`)){let h=new URL(l.href);h.searchParams.set(`forceReload`,Date.now());l.href=h;}for(let i of d.querySelectorAll(`iframe`)){i.contentDocument&&r(i.contentDocument);}})(document)


// HN:
javascript:(function(){var n=window.document.createElement("style");n.setAttribute("type","text/css");n.innerText="html{font-size:1.2em!important;line-height:1.2!important;}body,table,tr,td,.default,.comment,.comhead,.pagetop,.c00{font-size:inherit!important;line-height:inherit!important;}.comhead,.pagetop,.title{font-size:1.2em!important;}";window.document.head.appendChild(n)})()

// Expanded:
javascript:(function(){
	var n=window.document.createElement("style");
	n.setAttribute("type","text/css");
	n.innerText="
		html{font-size:1.2em!important;line-height:1.2!important;}
		body,table,tr,td,.default,.comment,.comhead,.pagetop,.c00{font-size:inherit!important;line-height:inherit!important;}
		.comhead,.pagetop,.title{font-size:1.2em!important;}
	";
	window.document.head.appendChild(n)
})()

// Need to URL ecnode this one for it to work
// (notes app does it if pasted in)

// javascript:(function(){
	var n=window.document.createElement("style");
	n.setAttribute("type","text/css");
	n.innerText="
		html{font-size:1.2em!important;line-height:1.3!important;}
		body,table,tr,td,.default,.comment,.comhead,.pagetop,span.pagetop b,.c00,.yclinks{font-size:inherit!important;line-height:inherit!important;}
		.pagetop,.title{font-size:1.2em!important;}
		table#hnmain{width:100%!important;}
		body{margin:0;}
	";
	window.document.head.appendChild(n)
})()




