// Simple To Do List
// Geoff Pack, November 2017

var ToDo = function() {

	var list,	// an unordered list (in the DOM)
		items,  // array of items, stored in browser local storage
		showCompleted = true;

	// write list to page
	function writeList() {
		var li, i,
			addNew = document.querySelector('#addNew'),
			template = list.querySelector('li.template'),
			completed = 0;
	
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
			list.appendChild(li);
		}

		// add new item and template back
		list.appendChild(template);
		list.appendChild(addNew);
	
		// update local storage
		localStorage.setItem("ToDoItems", JSON.stringify(items));
	
		// update status line
		document.querySelector('#listStatus').innerText = completed + ' of ' + items.length + ' items done.';
	}

	// add new (or edited) item
	function addItem(form) {	
		var value = form.title.value,
			n;

		if (value !== '') {
			if (form.parentNode.id == 'addNew') {
				// adding new item
				items.push({ 'title' : value });
			} else {
				// editing existing item
				n = parseInt(form.parentNode.id.split('-')[1]);
				items[n].title = form.title.value;
				// move form back to end of list
				list.querySelector('#addNew').appendChild(form);
			}		
			// reset values		
			form.title.value = '';
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
		var li = obj.parentNode.parentNode,
			n = parseInt(li.id.split('-')[1]),
			form = list.querySelector('#addNew form');

		if (!form) {
			// if form not there, another item is being edited
			alert('Please update previous item before editing new one.');
			return;
		}

		// copy item values to form
		form.title.value = items[n].title;
		form.querySelector('[type="submit"]').value = 'Update item';

		// replace item contents with the form
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
		showHideCompleted: showHideCompleted
	}
}();

window.addEventListener("load", ToDo.init, false);
