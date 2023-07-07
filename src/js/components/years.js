import { checkboxComponent } from './checkbox.js';
import { addClass, closestElement, containsClass, removeClass, removeClassArray, resetAnswer, toggleClass } from './helpers.js';
import { blockVisible, btnShowMoreClick } from './visibleBlockAndBtnShowMore.js';

const yearsShowSelect = () => {
	let selectFrom = 0;
	let selectTo = 0;
	let isBetween = () => false;
	// let count = 0;

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

			answerMessage.dataset.multi = `от ${selectFrom} до ${selectTo}`;
		}
		// если задан from, а to=0, то показать всё, что больше from
		if (selectFrom > 0 && selectTo === 0) {
			// console.log('год от больше нуля:', selectFrom, 'год до=0:', selectTo);
			isBetween = checkboxBlock => selectFrom <= Number(checkboxBlock.dataset.from) || selectFrom <= Number(checkboxBlock.dataset.to);
			answerMessage.dataset.multi = `от ${selectFrom}`;
		}
		// если задан from=0, а to задан, то показать всё, что меньше to
		if (selectFrom === 0 && selectTo > 0) {
			// console.log('год от=нулю:', selectFrom, 'год до больше 0:', selectTo);
			isBetween = checkboxBlock => selectTo >= Number(checkboxBlock.dataset.to) || selectTo >= Number(checkboxBlock.dataset.from);
			answerMessage.dataset.multi = `до ${selectTo}`;
		}
		if (selectFrom === 0 && selectTo === 0) {
			// console.log('всё по нулям:', selectFrom, '-', selectTo);
			isBetween = () => false;
			answerMessage.dataset.multi = `Любой год`;
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
	const answerMessage = chatMessageBlock.querySelector('.btn-continue');
	answerMessage.dataset.multi = 'Любой год';

	selects.addEventListener('click', e => {
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
				// console.log('option====', YearsOption);
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
		}
		return;
	});

	// ======функция ОТВЕТА сообщения======
	const checkboxBlocks = document.querySelector('.years__checkbox');
	// input's
	const inputs = document.querySelectorAll('.years__select-item');
	const inputFrom = inputs[0];
	const inputTo = inputs[1];
	const inputFromText = inputFrom.querySelector('.input-years');
	const inputToText = inputTo.querySelector('.input-years');
	// options
	const optionFromInput = document.querySelectorAll('.select-from>.option');
	const optionToInput = document.querySelectorAll('.select-to>.option');
	let arrFrom = [];
	let arrTo = [];

	const updateCheckboxClick = checkboxBlock => {
		removeClassArray(optionFromInput, 'active');
		removeClassArray(optionToInput, 'active');
		inputFromText.innerText = '';
		inputToText.innerText = '';

		document.querySelectorAll('.years__checkbox-block').forEach(block => {
			if (block !== checkboxBlock && containsClass(block, 'active')) {
				arrFrom.push(Number(block.dataset.from));
				arrTo.push(Number(block.dataset.to));
			}
		});
		const checkboxFromMin = Math.min(...arrFrom);
		const checkboxToMax = Math.max(...arrTo);
		// console.log(arrFrom, checkboxFromMin, arrTo, checkboxToMax);
		if (arrFrom.length === 0 && arrTo.length === 0) {
			// answerMessage.innerText = `Любой год`;
			answerMessage.dataset.multi = `Любой год`;
		} else {
			selectFrom = checkboxFromMin;
			selectTo = checkboxToMax;
			answerMessage.dataset.multi = `от ${selectFrom} до ${selectTo}`;
		}
	};

	const checkboxBlockClick = e => {
		const checkboxBlock = closestElement(e.target, 'years__checkbox-block');
		if (checkboxBlock) {
			const checkboxFrom = Number(checkboxBlock.dataset.from);
			const checkboxTo = Number(checkboxBlock.dataset.to);

			// поставили галочку
			if (!containsClass(checkboxBlock, 'active')) {
				arrFrom = [checkboxFrom];
				arrTo = [checkboxTo];
				updateCheckboxClick(checkboxBlock);
				// console.log(selectFrom, '-', selectTo, 'active');
			}
			// убираем галочку
			if (containsClass(checkboxBlock, 'active')) {
				// checkboxFrom checkboxTo
				arrFrom = [];
				arrTo = [];
				updateCheckboxClick(checkboxBlock);
				// console.log(selectFrom, '-', selectTo, 'without active');
			}
		}
	};
	checkboxBlocks.addEventListener('click', checkboxBlockClick);

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

const yearsInit = () => {
	yearsShowSelect();
	checkboxComponent('years');
	const textOpen = 'Показать все поколения';
	document.querySelector('.years__show-more').addEventListener('click', btnShowMoreClick.bind(null, '.years__checkbox-block', 6, textOpen));
};

const yearsDefaultState = () => {
	document.querySelectorAll('.years__input').forEach(selectInput => {
		removeClass(selectInput, 'active');
		const selector = selectInput.nextElementSibling;
		removeClass(selector, 'active');
		const option = selector.querySelectorAll('.option');
		removeClassArray(option, 'active');
	});
	document.querySelector('.select-from>.clear').click();
	document.querySelector('.select-to>.clear').click();

	const textOpen = 'Показать все поколения';
	blockVisible('.years__checkbox-block', '.years__show-more', 6, textOpen);
	resetAnswer('years__block', 'Любой год');
};

// const resetYears = () => {
// const textOpen = 'Показать все поколения';
// blockVisible('.years__checkbox-block', '.years__show-more', 6, textOpen);
// };

export { yearsDefaultState, yearsInit, yearsShowSelect };
