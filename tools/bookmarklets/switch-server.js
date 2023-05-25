
// switch web server - switches between dev, test and live servers
// Geoff Pack, 2012

var switchServer = function() {
	str=window.location.toString();
	str2=str.split('abc.net.au/');
	if (str.indexOf('localhost')!=-1) {
		window.location='http://nmdev.abc.net.au/'+str2[1]
	} else if (str.indexOf('nmdev')!=-1) {
		window.location='http://wwwdev.abc.net.au/'+str2[1]
	} else if (str.indexOf('wwwdev')!=-1) {
		window.location='http://www.abc.net.au/'+str2[1]
	} else {
		window.location='http://localhost.abc.net.au/'+str2[1]
	}
}();
