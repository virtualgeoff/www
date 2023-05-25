
// shows properties of links in console
// Geoff Pack, 2014

function showLinkProperties(anchor) {
	var i, n, atts, str = '';

	str += '\n\nLink Properties:'
		+ '\nhref: ' + anchor.href 
		+ '\nprotocol: '  + anchor.protocol
		+ '\nhostname: '  + anchor.hostname
		+ ((anchor.port) ? ('\nport: '+ anchor.port) : '')
		+ '\npathname: '  + anchor.pathname
		+ ((anchor.search) ? ('\nsearch: ' + anchor.search) : '')
		+ ((anchor.hash) ? ('\nhash: ' + anchor.hash) : '');

	str += '\n\nAttributes:'

	for (i=0, atts=anchor.attributes, n=atts.length; i<n; i++){
		str += '\n' + atts[i].name + ': ' + atts[i].value;
	}
	if (window.console) { window.console.log(str); }
}

(function getLinks() {
	var i, anchors = document.getElementsByTagName('A');
		
	for (i=0; i<anchors.length; i++) {
		anchors[i].onclick = function(e) {
			showLinkProperties(this);
			e.preventDefault();
		}
	}
	window.alert(i + ' links. Open web console and click a link for info.');
})();


