var a = 0, b = 0;var D = 2;var p = [];var i = 0;for (X = -D; X <= D; X++) {	for (Y = -D; Y <= D; Y++) {		for (Z = -D; Z <= D; Z++) {			p[i] = {};			p[i].x = X;			p[i].y = Y;			p[i].z = Z;			document.write('<b id="l' + i + '">&middot;</b>');			i++		}	}}function plotPoints() {	for (var j=0; j<p.length; j++) {		u = p[j].x;		v = p[j].y;		w = p[j].z;		u2 = u * Math.cos(a) - v * Math.sin(a);		v2 = u * Math.sin(a) + v * Math.cos(a);		w2 = w;		u = u2; v = v2; w = w2;		u2 = u;		v2 = v * Math.cos(b) - w * Math.sin(b);		w2 = v * Math.sin(b) + w * Math.cos(b);		u = u2; v = v2; w = w2;		var c = Math.round((w + 2) * 70);		if (c < 0) c = 0;		if (c > 255) c = 255;				with (document.all('l' + j).style) {			left = 500 + u * (w + 2) * 60/D;			top  = 300 + v * (w + 2) * 60/D;			color = 'rgb(' + c + ', ' + c + ', ' + c + ')';			fontSize = (w + 2) * 16 + "px";		}	}}function mouseMove(e) {	a = e.pageX/60;	b = e.pageY/60;}setInterval('plotPoints()', 25);window.onmousemove = mouseMove;