import { addClass, closestElement, containsClass, removeClass, removeClassArray, toggleClass } from './helpers.js';

const yearsShowSelect = () => {
	let selectFrom = 0;
	let selectTo = 0;
	let answerMsgFrom = 0;
	let answerMsgTo = 0;
	let isBetween = () => false;
	// let count = 0;

	// функция ответа сообщения
	const checkboxBlock = document.querySelector('.years__checkbox');
	// input's
	const input = document.querySelectorAll('.years__select-item');
	const inputFrom = input[0];
	const inputTo = input[1];
	const inputFromText = inputFrom.querySelector('.input-years');
	const inputToText = inputTo.querySelector('.input-years');
	// options
	const optionFromInput = document.querySelectorAll('.select-from>.option');
	const optionToInput = document.querySelectorAll('.select-to>.option');
	const checkboxBlockClick = e => {
		const checkboxBlock = closestElement(e.target, 'years__checkbox-block');
		if (!containsClass(checkboxBlock, 'active')) {
			console.log(checkboxBlock);
			// answerMsgFrom = selectFrom;
			// answerMsgTo = selectTo;
			const checkboxFrom = Number(checkboxBlock.dataset.from);
			const checkboxTo = Number(checkboxBlock.dataset.to);
			// console.log(selectFrom, selectTo);

			// TODO:
			// selectFrom > checkboxFrom => selectFrom = checkboxFrom
			// selectFrom <= checkboxFrom => return
			// selectTo >= checkboxTo => return
			// selectTo < checkboxTo => selectTo = checkboxTo
			if (selectFrom > checkboxFrom || (selectFrom <= checkboxFrom && selectFrom === 0)) {
				selectFrom = checkboxFrom;
				inputFromText.innerText = selectFrom;
				optionFromInput.forEach(option => {
					if (Number(option.dataset.value) === selectFrom) {
						console.log('optionFromInput');
						option.click();
						// addClass(option, 'active')
					} else {
						// containsClass(option, 'active') && removeClass(option, 'active')
					}
				});
			}
			if (selectFrom <= checkboxFrom && selectFrom !== 0) selectFrom;
			if (selectTo >= checkboxTo) selectTo;
			if (selectTo < checkboxTo) {
				selectTo = checkboxTo;
				inputToText.innerText = selectTo;
				optionToInput.forEach(option => {
					if (Number(option.dataset.value) === selectTo) {
						console.log('optionToInput');
						option.click();
						// addClass(option, 'active')
					} else {
						// containsClass(option, 'active') && removeClass(option, 'active')
					}
				});
			}

			// if (
			// 	(selectFrom < checkboxFrom && selectFrom === 0 && answerMsgFrom > checkboxFrom) ||
			// 	(selectFrom > checkboxFrom && answerMsgFrom > checkboxFrom)
			// ) {
			// 	answerMsgFrom = checkboxFrom;
			// }
			// if (selectTo < checkboxTo && answerMsgTo < checkboxTo) {
			// 	answerMsgTo = checkboxTo;
			// }
			// if (answerMsgFrom > 0 && answerMsgTo > 0) {
			// 	answerMessage.innerText = `${answerMsgFrom} - ${answerMsgTo}`;
			// }
			// if (answerMsgFrom > 0 && answerMsgTo === 0) {
			// 	answerMessage.innerText = `${answerMsgFrom}`;
			// }
			// if (answerMsgFrom === 0 && answerMsgTo > 0) {
			// 	answerMessage.innerText = `${answerMsgTo}`;
			// }
			console.log(selectFrom, selectTo, '-', answerMsgFrom, answerMsgTo);
		}
	};
	checkboxBlock.addEventListener('click', checkboxBlockClick);

	// функция проверяющая подходит ли checkboxBlock под условия
	const updateCheckboxActive = (checkboxBlocks, selectFrom, selectTo, answerMessage) => {
		// если задан from и to, то в промежутке
		if (selectFrom > 0 && selectTo > 0) {
			// console.log(selectFrom, selectTo, 'оба больше нуля');
			// если from > to, то selectFrom = to, selectTo = from
			if (selectFrom > selectTo) {
				[selectFrom, selectTo] = [selectTo, selectFrom];
			}

			isBetween = checkboxBlock =>
				(selectFrom <= Number(checkboxBlock.dataset.from) && Number(checkboxBlock.dataset.from) <= selectTo) ||
				(selectFrom <= Number(checkboxBlock.dataset.to) && Number(checkboxBlock.dataset.to) <= selectTo);

			answerMessage.innerText = `от ${selectFrom} до ${selectTo}`;

			// if (selectFrom < answerMsgFrom && selectTo > answerMsgTo) {
			// 	answerMessage.innerText = `${selectFrom} - ${selectTo}`;
			// }
			// if (selectFrom > answerMsgFrom && selectTo < answerMsgTo) {
			// 	answerMessage.innerText = `${answerMsgFrom} - ${selectTo}`;
			// }
			// if(selectFrom > answerMsgFrom && selectTo < answerMsgTo){
			// 	answerMessage.innerText = `${answerMsgFrom} - ${selectTo}`;
			// }
		}
		// если задан from, а to=0, то показать всё, что больше from
		if (selectFrom > 0 && selectTo === 0) {
			// console.log('год от больше нуля:', selectFrom, 'год до=0:', selectTo);
			isBetween = checkboxBlock => selectFrom <= Number(checkboxBlock.dataset.from) || selectFrom <= Number(checkboxBlock.dataset.to);
			answerMessage.innerText = `от ${selectFrom}`;
		}
		// если задан from=0, а to задан, то показать всё, что меньше to
		if (selectFrom === 0 && selectTo > 0) {
			// console.log('год от=нулю:', selectFrom, 'год до больше 0:', selectTo);
			isBetween = checkboxBlock => selectTo >= Number(checkboxBlock.dataset.to) || selectTo >= Number(checkboxBlock.dataset.from);
			answerMessage.innerText = `до ${selectTo}`;
		}
		if (selectFrom === 0 && selectTo === 0) {
			// console.log('всё по нулям:', selectFrom, '-', selectTo);
			isBetween = () => false;
			answerMessage.innerText = `Любой год`;
		}
		// console.log(isBetween);
		checkboxBlocks.forEach(checkboxBlock => {
			if (isBetween(checkboxBlock)) {
				// console.log(checkboxBlock);
				// const dataBetween = {
				// 	selectFrom: selectFrom,
				// 	selectTo: selectTo,
				// 	checkboxBlockFrom: Number(checkboxBlock.dataset.from),
				// 	checkboxBlockTo: Number(checkboxBlock.dataset.to),
				// };
				// console.table(dataBetween);
				addClass(checkboxBlock, 'active');
			} else {
				containsClass(checkboxBlock, 'active') && removeClass(checkboxBlock, 'active');
			}
		});
	};

	const selects = document.querySelector('.years__selects');
	const chatMessageBlock = closestElement(selects, 'chat__message-block');
	const answerMessage = chatMessageBlock.nextElementSibling;
	answerMessage.innerText = '';

	selects.addEventListener('click', e => {
		// const selectInput = e.target.closest('.years__input');
		// const YearsOption = e.target.closest('.years__option');
		const selectInput = closestElement(e.target, 'years__input');
		const YearsOption = closestElement(e.target, 'years__option');

		if (selectInput) {
			// console.log('selectInput====');
			// count++;
			const selector = selectInput.nextElementSibling; // блок со списком годов
			toggleClass(selectInput, 'active');
			toggleClass(selector, 'active');
			// console.log(selectFrom, '-', selectTo, 'count:', count);
		}

		if (YearsOption) {
			const selector = YearsOption.closest('.years__select');
			const options = selector.querySelectorAll('.option');
			removeClassArray(options, 'active');
			const selectInput = selector.previousElementSibling;
			const inputYears = selectInput.querySelector('.input-years'); // вписывается год при выборе года
			const optionContainsFrom = containsClass(YearsOption.parentElement, 'select-from');
			const optionContainsTo = containsClass(YearsOption.parentElement, 'select-to');
			const checkboxBlocks = document.querySelectorAll('.years__checkbox-block'); // блоки checkbox с поколениями
			if (containsClass(YearsOption, 'option')) {
				console.log('option====');
				// count++;
				const option = YearsOption.closest('.option');
				addClass(option, 'active');
				inputYears.innerHTML = option.dataset.value;

				if (optionContainsFrom) {
					selectFrom = Number(option.dataset.value);
				}
				if (optionContainsTo) {
					selectTo = Number(option.dataset.value);
				}

				updateCheckboxActive(checkboxBlocks, selectFrom, selectTo, answerMessage);
				// console.log(selectFrom, '-', selectTo, 'count:', count);
			}

			if (containsClass(YearsOption, 'clear')) {
				// console.log('optionClear====');
				// count++;

				inputYears.innerHTML = '';
				if (optionContainsFrom) {
					selectFrom = 0;
					updateCheckboxActive(checkboxBlocks, selectFrom, selectTo, answerMessage);
				}
				if (optionContainsTo) {
					selectTo = 0;
					updateCheckboxActive(checkboxBlocks, selectFrom, selectTo, answerMessage);
				}
				// console.log(selectFrom, '-', selectTo, 'count:', count);
			}
			// если есть selectFrom, selectTo, то 1-2
			// если нет
		}
		return;
	});
	// ====спрятать список годов====
	document.addEventListener('click', function (e) {
		if (!e.target.closest('.years__input')) {
			// console.log(e.target, selectInput);
			document.querySelectorAll('.years__input').forEach(selectInput => {
				removeClass(selectInput, 'active');
				removeClass(selectInput.nextElementSibling, 'active');
			});
			// console.log('глобал ин');
		}
		// console.log('глобал');
	});
};

const resetYearsShowSelect = () => {
	document.querySelectorAll('.years__input').forEach(selectInput => {
		removeClass(selectInput, 'active');
		removeClass(selectInput.nextElementSibling, 'active');
	});
	document.querySelector('.select-from>.clear').click();
	document.querySelector('.select-to>.clear').click();
};

export { resetYearsShowSelect, yearsShowSelect };
