// home.js
// animates the nav list items

/* jshint esversion: 6 */

const Particles = (function() {
	let moving = true;
	let dragging = false;
	let p = [];      // array of points
	let dx, dy, dr;  // distance deltas
	let dt, then;    // time deltas

	const K = 15;    // spring constant
	const R = 50000; // repulsion constant
	const D = 0.96;  // damping constant

	function move(now) {
		if (!then) { then = now; }
		dt = (now - then) / 1000;

		if (moving && (dt > 0)) {
			// rule one: follow the leader (p[0]) - F ∝ r
			for (let i=1; i<p.length; i++) {
				dx = p[0].x - p[i].x;
				dy = p[0].y - p[i].y;
				dr = Math.sqrt(dx*dx + dy*dy);
				if ((dr < 1) && (dr >= 0)) dr = 1;
				if ((dr > -1) && (dr <= 0)) dr = -1;
				p[i].vx += K * dx/dr;
				p[i].vy += K * dy/dr;
				p[i].vx *= D;
				p[i].vy *= D;
			}
			// rule two: avoid each other - F ∝ 1/r²
			for (let i=0; i<p.length; i++) {
				for (let j=i+1; j<p.length; j++) {
					dx = p[j].x - p[i].x;
					dy = p[j].y - p[i].y;
					dr = Math.sqrt(dx*dx + dy*dy);
					if ((dr < 1) && (dr >= 0)) {
						dr = 1;
					} else if ((dr > -1) && (dr <= 0)) {
						dr = -1;
					}
					if ((dx < 1) && (dx >= 0)) {
						dx = 1;
					} else if ((dx > -1) && (dx <= 0)) {
						dx = -1;
					}
					if ((dy < 1) && (dy >= 0)) {
						dy = 1;
					} else if ((dy > -1) && (dy <= 0)) {
						dy = -1;
					}
					p[i].vx += -R * dx/(dr*dr*dr);
					p[i].vy += -R * dy/(dr*dr*dr);
					p[j].vx +=  R * dx/(dr*dr*dr);
					p[j].vy +=  R * dy/(dr*dr*dr);
				}
			}

			// update positions
			for (let i=1; i<p.length; i++) {
				p[i].x += p[i].vx * dt;
				p[i].y += p[i].vy * dt;
			}

			// plot positions
			for (let i=0; i<p.length; i++) {
				p[i].domObj.style.left = p[i].x + 'px';
				p[i].domObj.style.top  = p[i].y + 'px';
			}

			// are any points still moving?
			moving = false;
			for (let i=1; i<p.length; i++) {
				if ((Math.abs(p[i].vx) > 0.5) || (Math.abs(p[i].vy) > 0.5)) {
					moving = true;
					break;
				}
			}
		}

		// repeat
		then = now;
		window.requestAnimationFrame(move);
	}

	function pause() {
		if (!dragging) { moving = false; }
	}

	function resume() {
		moving = true;
	}

	function drag(e) {
		e.preventDefault();
		p[0].domObj.classList.add('dragging');
		document.onpointermove = (e) => {
			// move
			e.preventDefault();
			moving = true;
			dragging = true;
			p[0].x = e.clientX - 8;
			p[0].y = e.clientY - 8;
		};
		document.onpointerup = (e) => {
			// end
			e.preventDefault();
			dragging = false;
			document.onpointermove = null;
			p[0].domObj.classList.remove('dragging');
		};
	}

	function init() {
		// add nav items to array
		let listItems = document.querySelectorAll('nav ul li');
		listItems.forEach((item) => {
			p.push({x:0, y:0, vx:0, vy:0, domObj:item});
		});

		// replace the first nav item with orange square
		p[0].x = window.innerWidth/2;
		p[0].y = window.innerHeight/2;
		p[0].domObj.id = 'p0';
		p[0].domObj.innerHTML = '';
		p[0].domObj.onpointerdown = drag;

		// initialise the other points
		for (let i=1; i<p.length; i++) {
			p[i].x = window.innerWidth  * Math.random();
			p[i].y = window.innerHeight * Math.random();
			p[i].domObj.onpointerover = pause;
			p[i].domObj.onpointerout  = resume;
		}

		// animate
		window.requestAnimationFrame(move);
	}

	window.addEventListener('load', init);
})();
