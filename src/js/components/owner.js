import { closestElement, containsClass, removeClassArray, resetAnswer } from './helpers.js';

const owner = () => {
	const ownerBlock = document.querySelector('.owner__block');
	const chatMessageBlock = closestElement(ownerBlock, 'chat__message-block');
	// const answerMessage = chatMessageBlock.nextElementSibling;
	const answerMessage = chatMessageBlock.querySelector('.btn-continue');
	const ownerCheckboxBlock = document.querySelector('.owner__checkbox');
	answerMessage.dataset.multi = 'Любое количество';
	let arrOwner = [];
	ownerCheckboxBlock.addEventListener('click', e => {
		arrOwner = [];
		document.querySelectorAll('.owner__checkbox-block').forEach(block => {
			if (containsClass(block, 'active')) {
				arrOwner.push(block.dataset.owner);
			}
		});
		if (arrOwner.length < 3) {
			// answerMessage.innerText = arrOwner.join(', ');
			answerMessage.dataset.multi = arrOwner.join(', ');
		} else {
			// answerMessage.innerText = 'Любое количество';
			answerMessage.dataset.multi = 'Любое количество';
		}
	});
};

const resetOwner = () => {
	removeClassArray(document.querySelectorAll('.owner__checkbox-block'), 'active');
	// resetAnswer('owner', 'Любое количество', 'chat__message-block');
	resetAnswer('owner__block', 'Любое количество');
	// const ownerBlock = document.querySelector('.owner__block');
	// const chatMessageBlock = closestElement(ownerBlock, 'chat__message-block');
	// const answerMessage = chatMessageBlock.nextElementSibling;
	// answerMessage.innerText = 'Любой пробег';
};

export { owner, resetOwner };
