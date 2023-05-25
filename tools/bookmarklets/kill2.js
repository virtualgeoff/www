(function kill() {
	var blockNodes = [];

	function walk(node, depth) {
		var child;
		switch (node.nodeType) {
			case 1:
				if ((getComputedStyle(node).display === 'block') ||
				  (getComputedStyle(node).position === 'sticky') ||
				  (getComputedStyle(node).position === 'fixed')) {
					blockNodes.push(node);
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
		for (let i=0; i<blockNodes.length; i++) {
			if (blockNodes[i].querySelector('a.killIt')) {
				blockNodes[i].querySelector('a.killIt').remove();
			} else {
				if (getComputedStyle(blockNodes[i]).position === 'static') { blockNodes[i].style.position = 'relative'; }
				let a = document.createElement('a');
				a.className = 'killIt';
				a.href = '#';
				a.innerHTML = '☒';
				a.setAttribute('style', 'display:block; position:absolute; right:0; top:0; line-height:0.7; font-size:1.5em; color:#f00; z-index:99;')
				a.onclick = function(){ this.parentNode.remove(); };
				blockNodes[i].insertBefore(a, blockNodes[i].firstChild);
			}
		}
	}
	walk(document.body, 0);
	addCloseLink();
}());
