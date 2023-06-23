import { closestElement, containsClass, resetAnswer } from './helpers.js';

const owner = () => {
	const ownerBlock = document.querySelector('.owner__block');
	const chatMessageBlock = closestElement(ownerBlock, 'chat__message-block');
	const answerMessage = chatMessageBlock.nextElementSibling;
	const ownerCheckboxBlock = document.querySelector('.owner__checkbox');
	let arrOwner = [];
	ownerCheckboxBlock.addEventListener('click', e => {
		arrOwner = [];
		document.querySelectorAll('.owner__checkbox-block').forEach(block => {
			if (containsClass(block, 'active')) {
				arrOwner.push(block.dataset.owner);
			}
		});
		if (arrOwner.length < 3) {
			answerMessage.innerText = arrOwner.join(', ');
		} else {
			answerMessage.innerText = 'Любое количество';
		}
	});
};

const resetOwner = () => {
	removeClassArray(document.querySelectorAll('.owner__checkbox-block'), 'active');
	resetAnswer('owner', 'Любое количество', 'chat__message-block');
	// const ownerBlock = document.querySelector('.owner__block');
	// const chatMessageBlock = closestElement(ownerBlock, 'chat__message-block');
	// const answerMessage = chatMessageBlock.nextElementSibling;
	// answerMessage.innerText = 'Любой пробег';
};

export { owner, resetOwner };
