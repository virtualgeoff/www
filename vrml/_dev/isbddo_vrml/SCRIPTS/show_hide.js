
// created by Geoff Pack
// geoff@spike.com.au
//
// modified for Netscape 6:  june 2000

function show() {
    // shows mulitple layers
    // does not work in NS4 with nested layers
    var args = show.arguments;
    for (var i=0; i<(args.length); i++) {
		if (document.getElementById) { 		// IE5, NS6
			if (document.getElementById(args[i])) document.getElementById(args[i]).style.visibility = 'visible';
		} else if (document.all) { 			// IE4
            if (document.all[args[i]]) document.all[args[i]].style.visibility = 'visible';
        } else if (document.layers) {		// NS4
            if (document.layers[args[i]]) document.layers[args[i]].visibility = 'visible';
        }
    }
}
function hide() {
    // hides mulitple layers
    // does not work in NS4 with nested layers
    var args = hide.arguments;
    for (var i=0; i<(args.length); i++) {
		if (document.getElementById) { 		// IE5, NS6
			if (document.getElementById(args[i])) document.getElementById(args[i]).style.visibility = 'hidden';
		} else if (document.all) { 			// IE4
            if (document.all[args[i]]) document.all[args[i]].style.visibility = 'hidden';
        } else if (document.layers) {		// NS4
            if (document.layers[args[i]]) document.layers[args[i]].visibility = 'hidden';
        }
    }
}
function showX() {
    // shows mulitple (nested) layers
    // use makeScrollObj in scrolling.js to set up a layer object
    var args = showX.arguments;
    for (var i=0; i<(args.length); i++) {
        if (args[i]) args[i].css.visibility = 'visible';
    }
}
function hideX() {
    // hides mulitple (nested) layers
    // use makeScrollObj in scrolling.js to set up a layer object
    var args = hideX.arguments;
    for (var i=0; i<(args.length); i++) {
        if (args[i]) args[i].css.visibility = 'hidden';
    }
}
