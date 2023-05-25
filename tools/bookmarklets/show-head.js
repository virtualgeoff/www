
// displays document.head
// Geoff Pack, 2012

var showHead = function() {
	var node = document.createElement('link');
	node.rel = "stylesheet";
	node.type = "text/css";
	node.media = "screen";
	node.href = "//virtualgeoff/tools/bookmarklets/show-head.css";
	document.getElementsByTagName('head')[0].appendChild(node);
}();
