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

function addInfo() {
	// add info to page

	// move #info1 down a bit, hide other info
	document.querySelector('#info1').style.top = '2.5em';
	document.querySelectorAll('#info1, #info2, #info3').forEach( (item) => {
		item.classList.add('hide');
	});

	// add info icon to page
	const nav = document.createElement("nav");
	nav.id = 'nav1';

	let icon = `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 40 40" version="1.1">
		<circle cx="20" cy="20" r="15" stroke="currentColor" stroke-width="3.5" fill="none"></circle>
		<circle cx="20" cy="12.5" r="2" stroke="none" fill="currentColor"></circle>
		<path stroke="currentColor" stroke-width="3" stroke-linecap="round" fill="none" d="M20.5 17.5 L20.5 26.5 M17.0 17.5 L20.0 17.5 M16.0 26.5 L25.0 26.5"></path>
	</svg>`;

	nav.innerHTML = `<a href="#" onclick="return toggleInfo(this)">${icon}</a>`;
	document.body.insertBefore(nav, document.body.firstChild);
}

document.addEventListener('DOMContentLoaded', addInfo);


/* --- Canvas --- */
function setCanvasSize() {
	let canvas = document.querySelector('canvas');
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	document.querySelector('#info3').innerText = `${canvas.width} × ${canvas.height} px`;
}

document.addEventListener('DOMContentLoaded', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

