
var info;
var wrapper2, field, style, transform;

function mouseMove(e) {
	var eX, eY, theta, phi;
	
	eX = e.pageX;
	eY = e.pageY;
	info.innerHTML = eX + ', ' + eY;
	
	theta = (eX / window.innerWidth  * 360 - 180) * 1;
	phi   = (eY / window.innerHeight * 360 - 180) * -1;

	console.log('theta: ' + theta);
	console.log('phi: ' + phi);

	// rotate frames
	wrapper2.style.transform = 'rotateY(' + theta + 'deg)';
	field.style.transform = 'rotateX(' + phi + 'deg)';

	style = window.getComputedStyle(wrapper2, null);
	transform = style.getPropertyValue("transform") || "fail";
	console.log('transform: ' + transform);

	// rotate each box in opposite direction ???
	// need to add more nested elements
	// or calculate total translation + rotation and apply to box in one go

}

function init() {
	info = document.getElementById('info');
	wrapper2 = document.getElementById('wrapper2');
	field = document.getElementById('field');
}

window.addEventListener('load', init, false);
window.addEventListener("mousemove", mouseMove, false);
