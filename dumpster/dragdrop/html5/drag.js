/**
*
*  Virtualgeoff drag and drop script
*  added constraints, max and min values, snapping, callback function
*  works for relative positioning as well as absolute & fixed
*
**/

dragDrop = {
	draggedObject: null,
	
	attach: function (element, callback, constrainX, constrainY, minX, maxX, minY, maxY, snapX, snapY) {
		if (typeof element == 'string') {element = document.getElementById(element);}

		element.constrainX = constrainX; // boolean
		element.constrainY = constrainY; // boolean
		element.minX = parseInt(minX);
		element.maxX = parseInt(maxX);
		element.minY = parseInt(minY);
		element.maxY = parseInt(maxY);
		element.snapX = parseInt(snapX);
		element.snapY = parseInt(snapY);

		element.onmousedown = dragDrop.mousedown;		
		element.callback = (callback) ? callback : function(){}; // callbacks (empty function if no callback)
		return element;
	},
  
	mousedown: function(e) {
		var element = dragDrop.draggedObject = e.target;
		element.initX = parseInt(getComputedStyle(element).left);
		element.initY = parseInt(getComputedStyle(element).top);		
		
 		if (isNaN(element.initX)) { element.initX = 0; }
		if (isNaN(element.initY)) { element.initY = 0; }

		// get initial mouse position
		element.initMouseX = e.clientX;
		element.initMouseY = e.clientY;

		// add a drag class
		element.classList.add('dragged');

		// add events
		document.addEventListener('mousemove', dragDrop.mousemove);
		document.addEventListener('mouseup',   dragDrop.mouseup);

		// add callback
		element.callback(element, 'mousedown', e.clientX, e.clientY, element.initX, element.initY);
		return false;
	},
  
	mousemove: function(e) {
		var element = dragDrop.draggedObject;
 
		element.X = e.clientX - (element.initMouseX - element.initX);
		element.Y = e.clientY - (element.initMouseY - element.initY);

		// apply constaints and limits 
 		if (!(element.constrainX)) {
			if (!(isNaN(element.minX))) {
				if (element.X < element.minX) {element.X = element.minX;}
			}
			if (!(isNaN(element.maxX))) {
				if (element.X > element.maxX) {element.X = element.maxX;}
			}
			element.style.left = element.X + 'px';
		}
		if (!(element.constrainY)) {
			if (!(isNaN(element.minY))) {
				if (element.Y < element.minY) {element.Y = element.minY;}
			}
			if (!(isNaN(element.maxY))) {
				if (element.Y > element.maxY) {element.Y = element.maxY;}
			}
			element.style.top = element.Y + 'px';
		}
		
		element.callback(element, 'mousemove', e.clientX, e.clientY, element.X, element.Y); 
		return false;
	},
  
	mouseup: function() {
		var element = dragDrop.draggedObject;

		// apply snaps
		if (!(isNaN(element.snapX)) && (element.snapX > 0) && !(element.constrainX)) {
			element.X = Math.round(element.X / element.snapX) * element.snapX;
			element.style.left = element.X + 'px';
		}
		if (!(isNaN(element.snapY)) && (element.snapY > 0) && !(element.constrainY)) {
			element.Y = Math.round(element.Y / element.snapY) * element.snapY;
			element.style.top = element.Y + 'px';
		}

		// remove events		
		document.removeEventListener('mousemove', dragDrop.mousemove);
		document.removeEventListener('mouseup',   dragDrop.mouseup);

		// remove drag class, do callback
		element.classList.remove('dragged');
		element.callback(element, 'mouseup', null, null, element.X, element.Y); 
		
		dragDrop.draggedObject = null;
		return false;
	} 
}