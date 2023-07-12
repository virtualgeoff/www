
// csi.js
// Client-Side Includes
// Geoff Pack, November 2007


// these two functions from http://developer.mozilla.org/en/docs/AJAX:Getting_Started
function makeRequest(url, id) {
	var http_request = false;

	if (window.XMLHttpRequest) { // Mozilla, Safari,...
		http_request = new XMLHttpRequest();
		//if (http_request.overrideMimeType) {
		//	http_request.overrideMimeType('text/xml');
		//}
	} else if (window.ActiveXObject) { // IE
		try {
			http_request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
			http_request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {}
		}
	}
	if (!http_request) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
		return false;
	}
	//http_request.onreadystatechange = alertContents;
	http_request.onreadystatechange = function() { alertContents(url, http_request, id); };
	http_request.open('GET', url, true);
	http_request.send(null);
}

function alertContents(url, request, id) {
	if (request.readyState == 4) {
		if (request.status == 200) {
			//alert(url + ' exists!');
			document.getElementById(id).parentNode.innerHTML = request.responseText;
		} else {
			//alert(url + ' does not exist...');
		}
	}
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}
function getClientSideIncludes() {
	// find all links with class="include"
	var links = document.getElementsByTagName('A');

	for (var i=0, j=links.length; i<j; i++) {
		var link = links[i];
		if (link.className == 'include') {
			//if (getActiveStyleSheet() != 'handheld') {
				makeRequest(link.href, link.id);
			//}
		}
	}
}

// this function from http://alistapart.com/articles/alternate/
function getActiveStyleSheet() {
	var a = document.getElementsByTagName("link");
	for (var i=0, j=a.length; i<j; i++) {
		if ((a[i].getAttribute("rel").indexOf("style") != -1) && a[i].getAttribute("media")){
			alert(a[i].getAttribute("media") + ', ' + a[i].disabled);
		}
		//if (a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("media")) {
		//}
		//&& !a.disabled) return a.getAttribute("media");
	}
	return false;
}

addLoadEvent(getClientSideIncludes);
addLoadEvent(getActiveStyleSheet);