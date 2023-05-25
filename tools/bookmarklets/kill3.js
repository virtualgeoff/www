(function kill() {
	var blocks = [];

	function walk(node, depth) {
		let child;
		switch (node.nodeType) {
			case 1:
				if ((getComputedStyle(node).display === 'block') ||
				  (getComputedStyle(node).position === 'sticky') ||
				  (getComputedStyle(node).position === 'fixed')) {
					blocks.push(node);
				}
			case 9:
			case 11:
				child = node.firstChild;
				while (child) {
					walk(child, depth++);
					child = child.nextSibling;
				}
				break;
		}
	}

	function addCloseLink() {
		blocks.forEach(b => {
			if (b.className === 'killIt') {
				b.remove();
			} else {
				if (getComputedStyle(b).position === 'static') { b.style.position = 'relative'; }
				let a = document.createElement('a');
				a.className = 'killIt';
				a.href = '#';
				a.innerHTML = '☒';
				a.setAttribute('style', 'display:block; position:absolute; right:0; top:0; line-height:0.7; font-size:1.5em; color:#f00; z-index:99;')
				a.onclick = function(e){ this.parentNode.remove(); e.preventDefault(); e.stopPropagation(); };
				b.insertBefore(a, b.firstChild);
			}
		});
	}

	walk(document.body, 0);
	addCloseLink();
}());
