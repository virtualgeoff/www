// To Do 3D
// version 0.1
// Geoff Pack, November 2017

/*
	To Do:
	------

	List:	
		√ store items in list
		√ add new items	
		√ save items to localStorage
		√ read items from localStorage
		√ remove items
		√ add importance, urgency, effort
		√ mark items as done / open
		√ add status line
		√ show/hide completed items
		√ edit items
		•• toggle to switch between 2D and 3D view ???

	3D:
		√ plot items in 3D with CSS-3D
		√ free rotation
		•• control key to rotate
		• counter rotation of item - so always aligned with screen
		• set views: i-u, i-e, u-e
		• add axes?

*/

var ToDo = function() {

	var list,	// an unordered list (in the DOM)
		items,  // array of items, stored in browser local storage
		showCompleted = true;

	// write list to page
	function writeList() {
		var li, i;
		var addNew = document.querySelector('#addNew');
		var template = list.querySelector('.template');
		var completed = 0;
	
		// remove all items
		while (list.children.length > 0) {
			list.removeChild(list.firstChild);
		}	
	
		// add all items
		for (i=0; i<items.length; i++) {
			li = template.cloneNode(true);
			li.id = 'item-' + i;
			li.className = '';		
		
			if (items[i].status === 'done') {
				li.querySelector('[type="checkbox"]').checked = 'checked';
				li.className = 'done';
				if (!showCompleted) { li.classList.add('hide'); };	
				completed++;
			}
			li.querySelector('.title').innerText =  items[i].title;
			li.querySelector('.importance').innerText =  items[i].importance;
			li.querySelector('.urgency').innerText =  items[i].urgency;
			li.querySelector('.effort').innerText =  items[i].effort;
			list.appendChild(li);
		}

		// add new item and template back
		list.appendChild(template);
		list.appendChild(addNew);
	
		// update local storage
		localStorage.setItem("ToDoItems", JSON.stringify(items));
	
		// update status line
		document.querySelector('#listStatus').innerText = completed + ' of ' + items.length + ' items done.';
	
		// make 3D list!
		makeBoxes(items);
	}

	// add new (or edited) item
	function addItem(form) {	
		var value = form.title.value,
			n;

		if (value !== '') {
			if (form.parentNode.id == 'addNew') {
				// adding new item
				items.push({
					'title' : value,
					'importance' : form.importance.value,
					'urgency' : form.urgency.value,
					'effort' : form.effort.value,
				});
			} else {
				// editing existing item
				n = parseInt(form.parentNode.id.split('-')[1]);
				items[n].title = form.title.value;
				items[n].importance = form.importance.value;
				items[n].urgency = form.urgency.value;
				items[n].effort = form.effort.value;
				// move form back to end of list
				list.querySelector('#addNew').appendChild(form);
			}
			// reset values		
			form.title.value = '';
			form.importance.value = 5;
			form.urgency.value = 5;
			form.effort.value = 5;
			form.importance.nextSibling.innerText = 5;
			form.urgency.nextSibling.innerText = 5;
			form.effort.nextSibling.innerText = 5;
			form.querySelector('[type="submit"]').value = 'Add item';
			writeList();
		}
		form.title.focus();
		event.preventDefault();
	}

	// check item - mark as completed
	function checkItem(obj) {
		var n = parseInt(obj.parentNode.id.split('-')[1]);
		if (obj.checked) {
			items[n].status = 'done';	
		} else {
			items[n].status = 'open';
		}
		writeList();
		event.preventDefault();
	}

	// edit item
	function editItem(obj) {				
		// replace item contents with form and fill in values
		var li = obj.parentNode.parentNode,
			n = parseInt(li.id.split('-')[1]),
			form = list.querySelector('#addNew form');

		if (!form) {
			// if form not there, another item is being edited
			alert('Please update previous item before editing new one.');
			return;
		}
		form.title.value = items[n].title;
		form.importance.value = items[n].importance;
		form.urgency.value = items[n].urgency;
		form.effort.value = items[n].effort;
		form.importance.nextSibling.innerText = items[n].importance;
		form.urgency.nextSibling.innerText = items[n].urgency;
		form.effort.nextSibling.innerText = items[n].effort;
		form.querySelector('[type="submit"]').value = 'Update item';

		li.innerHTML = '';
		li.appendChild(form);
		form.title.focus();
		event.preventDefault();
	}

	// delete item
	function deleteItem(obj) {
		var n = parseInt(obj.parentNode.parentNode.id.split('-')[1]);
		items.splice(n, 1);
		writeList();
		event.preventDefault();
	}

	// show or hide completed items
	function showHideCompleted(button) {
		if (showCompleted) {
			showCompleted = false;
			button.innerText = 'Show completed items';	
		} else {
			showCompleted = true;
			button.innerText = 'Hide completed items';
		}
		writeList();
		event.preventDefault();
	}

	// range sliders changed
	function rangeChanged(input) {
		input.nextSibling.innerText = input.value
	}
	
	// start
	function init() {
		list = document.getElementById('ToDoList');
		items = JSON.parse(localStorage.getItem("ToDoItems")) || []; // get items from local storage	
		writeList();
	}
	
	return {
		init: init,
		addItem: addItem,
		checkItem: checkItem,
		editItem: editItem,
		deleteItem: deleteItem,
		showHideCompleted: showHideCompleted,
		rangeChanged: rangeChanged
	}
}();

window.addEventListener("load", ToDo.init, false);
