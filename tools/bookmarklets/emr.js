
	function walk(node) {
		// I stole this function from here:
		// http://is.gd/mwZp7E

		var child, next;

		switch (node.nodeType) {
 			// for a list of node types, see: https://developer.mozilla.org/en/docs/Web/API/Node/nodeType
			case 1:  // Element
			case 9:  // Document
			case 11: // Document fragment
				child = node.firstChild;
				while (child) {
					next = child.nextSibling;
					walk(child);
					child = next;
				}
				break;
			case 3: // Text node
				handleText(node);
				break;
		}
	}

	function handleText(textNode) {
		var v = textNode.nodeValue;
		v=v.replace((\bElastic MapReduce\b/g,'EMR')
		textNode.nodeValue = v;
	}

	window.addEventListener('DOMContentLoaded', function() {
		walk(document.body);
	}, false);

