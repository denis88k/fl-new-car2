const addClass = (element, cls) => {
	element?.classList.add(cls);
};
const toggleClass = (element, cls) => {
	element?.classList.toggle(cls);
};
const removeClass = (element, cls) => {
	element?.classList.remove(cls);
};
const containsClass = (element, cls) => {
	return element?.classList.contains(cls);
};
const removeClassArray = (elements, cls) => {
	elements?.forEach(element => {
		element?.classList.remove(cls);
	});
};
const closestElement = (element, cls) => {
	document.querySelector(element).closest(cls);
};

export { addClass, closestElement, containsClass, removeClass, removeClassArray, toggleClass };
