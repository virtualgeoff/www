
// created by Geoff Pack
// geoff@spike.com.au
//
// creates and associative array of name/value pairs from 
// the search parameters sent to a page.

var searchStr = location.search;
var section = location.hash.substring(1,location.hash.length);
var searchArray = new Array();

while (searchStr!='') {
	var name, value;
	// strip off leading ? or &
	if ((searchStr.charAt(0)=='?')||(searchStr.charAt(0)=='&')) searchStr = searchStr.substring(1,searchStr.length);
	// find name
	name = searchStr.substring(0,searchStr.indexOf('='));
	// find value
	if (searchStr.indexOf('&')!=-1) value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.indexOf('&'));
	else value = searchStr.substring(searchStr.indexOf('=')+1,searchStr.length);
	// add pair to search array
	searchArray[name] = value;
	// cut first pair from string
	if (searchStr.indexOf('&')!=-1) searchStr =  searchStr.substring(searchStr.indexOf('&')+1,searchStr.length);
	else searchStr = '';
	// debug step
	//document.write(name + ': ' + value + ': ' + searchStr + '<br>');	
}

/*

// debug step
for (var name in searchArray) {
	document.write(name + ': ' + searchArray[name] + '<br>');	
}

if (section!='') document.write('<p>#: ' + section + '<p>');

*/