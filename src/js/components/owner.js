import { closestElement, containsClass, removeClassArray, resetAnswer } from './helpers.js';

const owner = () => {
	const ownerBlock = document.querySelector('.owner__block');
	const chatMessageBlock = closestElement(ownerBlock, 'chat__message-block');
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
		if (arrOwner.length < 3 && arrOwner.length !== 0) {
			console.log(arrOwner.length);
			answerMessage.dataset.multi = arrOwner.join(', ');
		}
		if (arrOwner.length === 0) {
			answerMessage.dataset.multi = 'Любое количество';
		}
	});
};

const resetOwner = () => {
	removeClassArray(document.querySelectorAll('.owner__checkbox-block'), 'active');
	resetAnswer('owner__block', 'Любое количество');
};

export { owner, resetOwner };
