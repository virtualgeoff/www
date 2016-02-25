var viewportWidth;
var viewportHeight;

if (typeof window.innerWidth != 'undefined') {
	// standards compliant browsers (Mozilla/Safari/Netscape/Opera/IE8+)
	viewportWidth = window.innerWidth;
	viewportHeight = window.innerHeight;
} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth !== 0) {
	// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
	viewportWidth = document.documentElement.clientWidth;
	viewportHeight = document.documentElement.clientHeight;	
} else {
	viewportWidth = document.getElementsByTagName('body')[0].clientWidth;
	viewportHeight = document.getElementsByTagName('body')[0].clientHeight;
}