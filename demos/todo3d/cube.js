
var windowWidth  = window.innerWidth,
	windowHeight = window.innerHeight;

function makeBoxes(items) {
	var i, j, k, m=0,
		r, g, b,
		tx, ty, tz,
		centerX = windowWidth/2,
		centerY = windowHeight/2,
		centerZ = 0,
		cubeSize = windowHeight/1.5, // width of cube
		box, boxSize = 40,
		N=10,
		items = items;
		
	var field = document.getElementById('field');
	
	// remove all items
	while (field.children.length > 0) {
		field.removeChild(field.firstChild);
	}	

	for (var p=0; p<items.length; p++) {
		i =  items[p].importance;
		j =  items[p].urgency;
		k =  items[p].effort;

		box = document.createElement('P');
		box.id = "box_"+ i + '_' + j + '_' + k;
		box.className = 'box';

		// translation
		tx = centerX - (cubeSize/2) + (i/N * cubeSize) - boxSize/2 + 'px';
		ty = centerY + (cubeSize/2) - (j/N * cubeSize) - boxSize/2 + 'px';
		tz = centerZ - (cubeSize/2) + (k/N * cubeSize) + 'px';						
		box.style.webkitTransform = 'translate3d(' + tx + ',' + ty + ',' + tz +')';
		
		// colors
		r = parseInt(255/N*i);
		g = parseInt(255/N*j);
		b = parseInt(255/N*k);

		box.innerHTML = items[p].title;//m + "<br><small>(" + r + "," + g + "," + b + ")</small>";
		box.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
		if (r < 125 && g < 125) {
			// make text white if red and green < half
			box.style.color = "#ccc";
		}
		
		field.appendChild(box);
		m++;
	}
}

function init() {
	document.getElementById('wrapper').style.height = (windowHeight) + "px";
	document.getElementById('wrapper2').style.height = (windowHeight) + "px";

	//makeBoxes();
}

window.addEventListener('load', init, false);

