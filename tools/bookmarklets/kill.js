(function kill() {
	var nodeCounter = 0;
	var maxDepth = 0;
	var blockNodes = [];

	function walk(node, depth) {
		var child;

		// record level of recursion
		if (depth > maxDepth) {
			maxDepth = depth;
		}

		switch (node.nodeType) {
			// see: https://developer.mozilla.org/en/docs/Web/API/Node/nodeType
			case 1: 	// Element
				if ((getComputedStyle(node).display === 'block') ||
				  (getComputedStyle(node).position === 'sticky') ||
				  (getComputedStyle(node).position === 'fixed')) {
					blockNodes.push(node);
				}
			case 9: 	// Document
			case 11:	// Document fragment
				child = node.firstChild;
				while (child) {
					walk(child, depth++);
					child = child.nextSibling;
				}
				break;
			case 3: 	// Text node
				//node.nodeValue = node.nodeValue.replace(/([a-zA-Z])\w+/g, 'blah');       // replace each word with 'blah'
				//node.nodeValue = node.nodeValue.replace(/([a-zA-Z])\w+/, nodeCounter++); // replace first word of each text block with the node count
				//node.nodeValue = node.nodeValue.replace(/([a-zA-Z])\w+/, depth);         // replace first word of each text block with the node depth
				break;
		}
	}

	function addCloseLink() {
		for (let i=0; i<blockNodes.length; i++) {
			if (blockNodes[i].querySelector('a.killIt')) {
				// remove close link
				blockNodes[i].querySelector('a.killIt').remove();
			} else {
				// add close link
				if (getComputedStyle(blockNodes[i]).position === 'static') { blockNodes[i].style.position = 'relative'; }
				let a = document.createElement('a');
				a.className = 'killIt';
				a.href = '#';
				a.innerHTML = '☒'; //'⊠⧆⧇⧈⧄●■◆◼︎◉⦿★❖';
				a.setAttribute('style', 'display:block; position:absolute; right:0; top:0; line-height:0.7; font-size:1.5em; color:#f00; z-index:99;')
				a.onclick = function(e){ this.parentNode.remove(); e.preventDefault(); e.stopPropagation();};
				blockNodes[i].insertBefore(a, blockNodes[i].firstChild);
			}
		}
	}

	walk(document.body, 0);
	addCloseLink();
}());
