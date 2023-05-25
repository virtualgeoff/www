(function blah() {
	var nodeCounter = 0;
	var maxDepth = 0;

	function walk(node, depth) {
		var child;

		// record level of recursion
		if (depth > maxDepth) {
			maxDepth = depth;
		}

		switch (node.nodeType) {
			// see: https://developer.mozilla.org/en/docs/Web/API/Node/nodeType
			case 1: 	// Element
			case 9: 	// Document
			case 11:	// Document fragment
				child = node.firstChild;
				while (child) {
					walk(child, depth++);
					child = child.nextSibling;
				}
				break;
			case 3: 	// Text node
				node.nodeValue = node.nodeValue.replace(/([a-zA-Z])\w+/g, 'blah');       // replace each word with 'blah'
				//node.nodeValue = node.nodeValue.replace(/([a-zA-Z])\w+/, nodeCounter++); // replace first word of each text block with the node count
				//node.nodeValue = node.nodeValue.replace(/([a-zA-Z])\w+/, depth);         // replace first word of each text block with the node depth
				break;
		}
	}

	walk(document.body, 0);
}());
