import { checkboxComponent } from './checkbox.js';
import { closestElement, containsClass, removeClassArray, resetAnswer } from './helpers.js';

const owner = () => {
	const ownerBlock = document.querySelector('.owner__block');
	const chatMessageBlock = closestElement(ownerBlock, 'chat__message-block');
	const answerMessage = chatMessageBlock.querySelector('.btn-continue');
	const ownerCheckboxBlock = document.querySelector('.owner__checkbox');
	const answerTextAny = 'Любое количество';
	answerMessage.dataset.multi = answerTextAny;
	let arrOwner = [];
	// let count = 0;
	ownerCheckboxBlock.addEventListener('click', e => {
		arrOwner = [];
		// console.log(e.target);
		// const checkbox = closestElement(e.target, 'owner__checkbox-block');
		// if (checkbox) {
		// 	console.log(checkbox.classList);
		// 	setTimeout(() => {});
		// 	document.querySelectorAll('.owner__checkbox-block').forEach(block => {
		// 		// console.log(block.classList);
		// 	});
		// }
		// console.log(containsClass(checkbox, 'active'));
		// console.log(checkbox);

		document.querySelectorAll('.owner__checkbox-block').forEach(block => {
			if (containsClass(block, 'active')) {
				arrOwner.push(block.dataset.owner);
			}
		});
		if (arrOwner.length < 3 && arrOwner.length !== 0) {
			answerMessage.dataset.multi = arrOwner.join(', ');
			return;
		}
		if (arrOwner.length === 0 || arrOwner.length === 3) {
			answerMessage.dataset.multi = answerTextAny;
			return;
		}
		// count++;
		// console.log(count, 'count');
		// console.log(arrOwner.length, 'владельцы');
	});
};

const ownerInit = () => {
	checkboxComponent('owner');
	owner();
};

// const resetOwner = () => {
const ownerDefaultState = () => {
	removeClassArray(document.querySelectorAll('.owner__checkbox-block'), 'active');

	resetAnswer('owner__block', 'Любое количество');
};

export { owner, ownerInit, ownerDefaultState };
