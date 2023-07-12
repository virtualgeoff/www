class HTMLInclude extends HTMLElement {
	constructor() {
		super();
		let src = this.getAttribute('src');
    	this.loadContent(src);
	}

	async loadContent(src) {
		if (!src) {
			throw new Error("No src attribute given.");
		}
		const response = await fetch(src);
		if (response.status !== 200) {
			throw new Error(`Could not load resource: ${src}`);
		}
		const content = await response.text();
		this.innerHTML = content;
		this.replaceWith(this.firstChild);
	}
}

customElements.define('html-include', HTMLInclude);
