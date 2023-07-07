import { checkboxComponent } from './checkbox.js';
import { addClass, closestElement, containsClass, removeClassArray, resetAnswer } from './helpers.js';

const mileageInput = () => {
	const mileageInputs = document.querySelector('.mileage__inputs');
	const mileageCheckboxBlocks = document.querySelectorAll('.mileage__checkbox-block');
	const valueFrom = document.querySelector('.input-from');
	const valueTo = document.querySelector('.input-to');
	let inputFrom = 0;
	let inputTo = 0;
	let isMore100 = () => false;
	let isLess100 = () => false;
	const answerTextMore = 'Больше 100 000 км';
	const answerTextLess = 'Меньше 100 000 км';
	const answerTextAny = 'Любой пробег';

	const chatMessageBlock = closestElement(mileageInputs, 'chat__message-block');
	const answerMessage = chatMessageBlock.querySelector('.btn-continue');
	answerMessage.dataset.multi = 'Любой пробег';

	mileageInputs.addEventListener('input', e => {
		removeClassArray(mileageCheckboxBlocks, 'active');
		inputFrom = Number(valueFrom.value.split(' ').join('').replace(/,/gi, '.'));
		inputTo = Number(valueTo.value.split(' ').join('').replace(/,/gi, '.'));
		e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+$)/g, '$1 ');

		// inputFrom > inputTo, то [inputFrom, inputTo] = [inputTo, inputFrom]
		if (inputFrom > inputTo && inputTo !== 0) {
			// console.log('деструктуризация');
			[inputFrom, inputTo] = [inputTo, inputFrom];
		}
		// inputFrom < 100k, inputTo > 100k, то ничего
		// inputFrom = 100k, inputTo = 100k, то ничего
		if (
			(inputFrom < 100_000 && inputFrom !== 0 && inputTo > 100_000) ||
			(inputFrom === 100_000 && inputTo === 100_000) ||
			(inputFrom === 0 && inputTo === 0)
		) {
			// console.log('ни один из вариантов');
			answerMessage.dataset.multi = answerTextAny;
			return;
		}
		// =====от=====
		// inputFrom >= 100k inputTo=0, то от 100к
		// inputFrom=0 inputTo>100, то от 100к
		// inputFrom > 100k, inputTo > 100k, то от 100к
		// inputFrom = 100k, inputTo > 100k, то от 100к
		isMore100 = () => {
			return (
				(inputFrom >= 100_000 && inputTo === 0) ||
				(inputFrom === 0 && inputTo > 100_000) ||
				(inputFrom > 100_000 && inputTo > 100_000) ||
				(inputFrom === 100_000 && inputTo > 100_000)
			);
		};
		// console.log(inputFrom >= 100_000 && inputTo === 0);
		// console.log(inputFrom === 0 && inputTo > 100_000);
		// console.log(inputFrom > 100_000 && inputTo > 100_000);
		// console.log(inputFrom === 100_000 && inputTo > 100_000);
		// =====до=====
		// inputFrom < 100k inputTo=0, то до 100к
		// inputFrom=0 inputTo<=100, то до 100к
		// inputFrom < 100k, inputTo < 100k, то до 100к
		// inputFrom < 100k, inputTo = 100k, то до 100к
		isLess100 = () => {
			return (
				(inputFrom < 100_000 && inputFrom !== 0 && inputTo === 0) ||
				(inputFrom === 0 && inputTo <= 100_000) ||
				(inputFrom < 100_000 && inputFrom !== 0 && inputTo < 100_000 && inputTo !== 0) ||
				(inputFrom < 100_000 && inputTo === 100_000)
			);
		};
		// console.log('=====');
		// console.log(inputFrom < 100_000 && inputFrom !== 0 && inputTo === 0);
		// console.log(inputFrom === 0 && inputTo <= 100_000);
		// console.log(inputFrom < 100_000 && inputFrom !== 0 && inputTo < 100_000 && inputTo !== 0);
		// console.log(inputFrom < 100_000 && inputTo === 100_000);

		if (isMore100()) {
			addClass(mileageCheckboxBlocks[1], 'active');
			answerMessage.dataset.multi = answerTextMore;
			// console.log('isMore100');
		}
		if (isLess100()) {
			addClass(mileageCheckboxBlocks[0], 'active');
			answerMessage.dataset.multi = answerTextLess;
			// console.log('isLess100');
		}
		// console.log('inputFrom:', inputFrom, '-', inputTo, ':inputTo');
	});

	const mileageCheckboxBlock = document.querySelector('.mileage__checkbox');
	mileageCheckboxBlock.addEventListener('click', e => {
		const blockTo = closestElement(e.target, 'mileage__checkbox-block[data-value="to"]');
		const blockFrom = closestElement(e.target, 'mileage__checkbox-block[data-value="from"]');
		// console.log(e.target);
		if (blockTo) {
			if (!containsClass(blockTo, 'active')) {
				// console.log(blockTo, 'blockTo');
				if (containsClass(blockTo.nextElementSibling, 'active')) {
					// console.log(1);
					answerMessage.dataset.multi = answerTextAny;
				} else {
					// console.log(2);
					answerMessage.dataset.multi = answerTextLess;
				}
			} else {
				if (containsClass(blockTo.nextElementSibling, 'active')) {
					answerMessage.dataset.multi = answerTextMore;
					// console.log(3);
				} else {
					answerMessage.dataset.multi = answerTextAny;
					// console.log(4);
				}
			}
		}

		if (blockFrom) {
			if (!containsClass(blockFrom, 'active')) {
				// console.log(blockFrom, 'blockFrom');
				if (containsClass(blockFrom.previousElementSibling, 'active')) {
					answerMessage.dataset.multi = answerTextAny;
					// console.log(5);
				} else {
					answerMessage.dataset.multi = answerTextMore;
					// console.log(6);
				}
			} else {
				if (containsClass(blockFrom.previousElementSibling, 'active')) {
					answerMessage.dataset.multi = answerTextLess;
					// console.log(7);
				} else {
					answerMessage.dataset.multi = answerTextAny;
					// console.log(8);
				}
			}
		}
	});
};

const mileageInit = () => {
	mileageInput();
	checkboxComponent('mileage');
};

// const resetMileage = () => {
const mileageDefaultState = () => {
	document.querySelector('.input-from').value = '';
	document.querySelector('.input-to').value = '';
	removeClassArray(document.querySelectorAll('.mileage__checkbox-block'), 'active');

	resetAnswer('mileage__block', 'Любой пробег');
};

export { mileageInit, mileageInput, mileageDefaultState };
