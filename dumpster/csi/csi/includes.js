/*
	Client-Side Includes
	Replace all elements with a data-include attribute with the contents of a file
	Geoff Pack, August 2022
*/

/* jshint esversion: 6 */

function includes() {
	document.querySelectorAll('[data-include]').forEach(function(element) {
		const myRequest = new Request(element.dataset.include);
		fetch(myRequest).then((response) => {
			if (response.status === 200) {
				return response.text();
			} else {
				throw new Error(`Not found: ${element.dataset.include}`);
			}
		}).then((text) => {
			element.innerHTML = text;
			element.replaceWith(element.firstChild);
		}).catch((error) => {
			console.error(error);
		});
	});
}

window.addEventListener('DOMContentLoaded', includes);

