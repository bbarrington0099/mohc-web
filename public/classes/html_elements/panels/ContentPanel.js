export class ContentPanel {
	#parentNode;
	#containerClass;

	constructor(parentNode, containerClass) {
		this.#parentNode = parentNode;
		this.#containerClass = containerClass;
	};

	injectPanel = () => {
		const panelContainer = document.createElement("div");
		panelContainer.classList.add(this.#containerClass);
		panelContainer.innerHTML = this.generatePanel();
		this.#parentNode.appendChild(panelContainer);
	};

	generatePanel = () => {
		return `Parent Class Implementation, Override in calling subclass`;
	};
}