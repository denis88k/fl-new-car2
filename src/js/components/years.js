import { addClass, closestElement, containsClass, removeClass, removeClassArray, toggleClass } from './helpers.js';

const yearsShowSelect = () => {
	let selectFrom = 0;
	let selectTo = 0;
	let answMsgFrom = 0;
	let answMsgTo = 0;
	let isBetween = () => false;
	// let count = 0;

	// функция ответа сообщения
	const checkboxBlock = document.querySelector('.years__checkbox');
	const checkboxBlockClick = e => {
		const checkboxBlock = closestElement(e.target, 'years__checkbox-block');
		if (!containsClass(checkboxBlock, 'active')) {
			console.log(checkboxBlock);
			// answMsgFrom = selectFrom;
			// answMsgTo = selectTo;
			const checkboxFrom = Number(checkboxBlock.dataset.from);
			const checkboxTo = Number(checkboxBlock.dataset.to);
			if (
				(selectFrom < checkboxFrom && selectFrom === 0 && answMsgFrom > checkboxFrom) ||
				(selectFrom > checkboxFrom && answMsgFrom > checkboxFrom)
			) {
				answMsgFrom = checkboxFrom;
			}
			if (selectTo < checkboxTo && answMsgTo < checkboxTo) {
				answMsgTo = checkboxTo;
			}
			if (answMsgFrom > 0 && answMsgTo > 0) {
				answMessage.innerText = `${answMsgFrom} - ${answMsgTo}`;
			}
			if (answMsgFrom > 0 && answMsgTo === 0) {
				answMessage.innerText = `${answMsgFrom}`;
			}
			if (answMsgFrom === 0 && answMsgTo > 0) {
				answMessage.innerText = `${answMsgTo}`;
			}
			console.log(selectFrom, selectTo, '-', answMsgFrom, answMsgTo);
		}
	};
	checkboxBlock.addEventListener('click', checkboxBlockClick);

	// функция проверяющая подходит ли checkboxBlock под условия
	const updateCheckboxActive = (checkboxBlocks, selectFrom, selectTo, answMessage) => {
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
			answMessage.innerText = `${selectFrom} - ${selectTo}`;
		}
		// если задан from, а to=0, то показать всё, что больше from
		if (selectFrom > 0 && selectTo === 0) {
			// console.log('год от больше нуля:', selectFrom, 'год до=0:', selectTo);
			isBetween = checkboxBlock => selectFrom <= Number(checkboxBlock.dataset.from) || selectFrom <= Number(checkboxBlock.dataset.to);
			answMessage.innerText = `${selectFrom}`;
		}
		// если задан from=0, а to задан, то показать всё, что меньше to
		if (selectFrom === 0 && selectTo > 0) {
			// console.log('год от=нулю:', selectFrom, 'год до больше 0:', selectTo);
			isBetween = checkboxBlock => selectTo >= Number(checkboxBlock.dataset.to) || selectTo >= Number(checkboxBlock.dataset.from);
			answMessage.innerText = `${selectTo}`;
		}
		if (selectFrom === 0 && selectTo === 0) {
			// console.log('всё по нулям:', selectFrom, '-', selectTo);
			isBetween = () => false;
			// answMessage.innerText = `Любой`;
		}
		// console.log(isBetween);
		// removeClassArray(checkboxBlocks, 'active');
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
	const answMessage = chatMessageBlock.nextElementSibling;
	answMessage.innerText = '';

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
				// console.log('option====');
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

				updateCheckboxActive(checkboxBlocks, selectFrom, selectTo, answMessage);
				// console.log(selectFrom, '-', selectTo, 'count:', count);
			}

			if (containsClass(YearsOption, 'clear')) {
				// console.log('optionClear====');
				// count++;

				inputYears.innerHTML = '';
				if (optionContainsFrom) {
					selectFrom = 0;
					updateCheckboxActive(checkboxBlocks, selectFrom, selectTo, answMessage);
				}
				if (optionContainsTo) {
					selectTo = 0;
					updateCheckboxActive(checkboxBlocks, selectFrom, selectTo, answMessage);
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
