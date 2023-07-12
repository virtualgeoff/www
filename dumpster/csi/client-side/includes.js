
// client-side include script

function loadInclude(obj) {
	var xhr = new XMLHttpRequest(),
		id = obj.id,
		src = obj.getAttribute('data-src');

	console.log('loading ' + id + ' (' + src + ')');

	/*
	xhr.onreadystatechange = function() {
		console.log(xhr.readyState, xhr.status, xhr.responseType, xhr.response);

		if (xhr.readyState === 1) {
			console.log('Request sent...');
		} else if (xhr.readyState === 4) {
			obj.innerHTML = ((xhr.status === 200)||(xhr.status === 400)) ? (xhr.response) : 'Error getting include';
		}
	}
	*/
	
	xhr.open('GET', src);
	xhr.overrideMimeType('text/html');
	xhr.addEventListener('load', function(){ obj.innerHTML=xhr.response }, false);
	xhr.send();						
}

function init() {
	var includes = document.getElementsByClassName('include');

	for (var i=0; i<includes.length; i++) {
		loadInclude(includes[i]);
	}
}

document.addEventListener('DOMContentLoaded', init, false);