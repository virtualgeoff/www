// common.js


function random(min, max) {
	// random number between min and max
	return (min + Math.random() * (max-min));
}

function toggleInfo() {
	// show or hide the info text
	document.querySelectorAll('#info1, #info2, #info3').forEach( (item) => {
		item.classList.toggle('hide');
	});
	return false;
}

function init() {
	// move #info1 down a bit, hide other info
	document.querySelector('#info1').style.top = '2.5em';
	document.querySelectorAll('#info1, #info2, #info3').forEach( (item) => {
		item.classList.add('hide');
	});

	// add info icon to page
	const p = document.createElement("p");
	p.id = 'info0';

	let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 40 40" version="1.1">
		<circle cx="20" cy="20" r="15" stroke="currentColor" stroke-width="3.5" fill="none"></circle>
		<circle cx="20" cy="12.5" r="2" stroke="none" fill="currentColor"></circle>
		<path stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none" d="M20.5 17.5 L20.5 26.5 M17.0 17.5 L20.0 17.5 M16.0 26.5 L25.0 26.5"></path>
	</svg>`;

	p.innerHTML = `<a href="#" onclick="return toggleInfo(this)">${icon}</a>`;
	document.body.insertBefore(p, document.body.firstChild);
}

document.addEventListener('DOMContentLoaded', init);
