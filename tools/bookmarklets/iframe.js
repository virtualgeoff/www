(function iframe() {	
	var iframe = document.getElementsByTagName('iframe')[0];
	var style = document.createElement('style');
	style.textContent =
	  'body {color: #f00 !important; background: #ff0;}' + 
	  'body a:link {color:#f00 !important;}' +
	  'body p {color:#f00 !important;}' +
	  'div {background: #ff0 !important;}';
	iframe.contentDocument.head.appendChild(style);
}());

