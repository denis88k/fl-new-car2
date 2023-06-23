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
	return element.closest(`.${cls}`);
};
// msgBlock =chat__message-block-choice, chat__message-block
const resetAnswer = (cls, defaultAnswer, msgBlock) => {
	const block = document.querySelector(`.${cls}__block`);
	const chatMessageBlock = closestElement(block, msgBlock);
	const answerMessage = chatMessageBlock.nextElementSibling;
	answerMessage.innerText = defaultAnswer;
};

const answerChoice = blockMain => {
	const blockParent = document.querySelector(`.${blockMain}__blocks`);
	const blocks = blockParent.querySelectorAll(`.${blockMain}__block`);
	const chatMessageBlock = closestElement(blockParent, 'chat__message-block-choice');
	const answerMessage = chatMessageBlock.nextElementSibling;
	blockParent.addEventListener('click', e => {
		const block = closestElement(e.target, `${blockMain}__block`);
		removeClassArray(blocks, 'active');
		addClass(block, 'active');
		answerMessage.innerText = block.dataset.choice;
	});
};

export { addClass, answerChoice, closestElement, containsClass, removeClass, removeClassArray, resetAnswer, toggleClass };
