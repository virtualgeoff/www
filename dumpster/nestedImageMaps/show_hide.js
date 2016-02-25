
// created by Geoff Pack
// geoff@virtualgeoff.com
//
// modified for Netscape 6:  june 2000

function show() {
    // shows multitple layers
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
    // hides multitple layers
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
