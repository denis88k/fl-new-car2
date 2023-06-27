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
const containsAndRemove = (element, cls) => {
	element?.classList.contains(cls) && element.classList.remove(cls);
};
const removeClassArray = (elements, cls) => {
	elements?.forEach(element => {
		element?.classList.remove(cls);
	});
};
const closestElement = (element, cls) => {
	return element?.closest(`.${cls}`);
};

const resetAnswer = (cls, defaultAnswer) => {
	const block = document.querySelector(`.${cls}`);
	const answerMessage = block.querySelector('.btn-continue');
	answerMessage.dataset.multi = defaultAnswer;
};

const answerChoice = (blockMain, blockChoice) => {
	const blockParent = document.querySelector(blockMain);
	const blocks = blockParent.querySelectorAll(blockChoice);
	const chatMessageBlock = closestElement(blockParent, 'chat__message-block-choice');
	const answerMessage = chatMessageBlock.nextElementSibling;
	blockParent.addEventListener('click', e => {
		const block = closestElement(e.target, blockChoice);
		removeClassArray(blocks, 'active');
		addClass(block, 'active');
		answerMessage.innerText = block.dataset.choice;
	});
};

export { addClass, answerChoice, closestElement, containsClass, removeClass, removeClassArray, resetAnswer, toggleClass, containsAndRemove };
