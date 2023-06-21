const yearsShowSelect = () => {
	let selectFrom = 0;
	let selectTo = 0;
	let isBetween = () => false;
	// let count = 0;
	// функция проверяющая подходит ли checkboxBlock под условия
	const updateCheckboxActive = (checkboxBlocks, selectFrom, selectTo) => {
		// если задан from и to, то в промежутке
		if (selectFrom > 0 && selectTo > 0) {
			console.log(selectFrom, selectTo, 'оба больше нуля');
			// если from > to, то selectFrom = to, selectTo = from
			if (selectFrom > selectTo) {
				[selectFrom, selectTo] = [selectTo, selectFrom];
			}
			isBetween = checkboxBlock =>
				(selectFrom <= Number(checkboxBlock.dataset.from) && Number(checkboxBlock.dataset.from) <= selectTo) ||
				(selectFrom <= Number(checkboxBlock.dataset.to) && Number(checkboxBlock.dataset.to) <= selectTo);
		}
		// если задан from, а to=0, то показать всё, что больше from
		if (selectFrom > 0 && selectTo === 0) {
			console.log('год от больше нуля:', selectFrom, 'год до=0:', selectTo);
			isBetween = checkboxBlock => selectFrom <= Number(checkboxBlock.dataset.from) || selectFrom <= Number(checkboxBlock.dataset.to);
		}
		// если задан from=0, а to задан, то показать всё, что меньше to
		if (selectFrom === 0 && selectTo > 0) {
			console.log('год от=нулю:', selectFrom, 'год до больше 0:', selectTo);
			isBetween = checkboxBlock => selectTo >= Number(checkboxBlock.dataset.to) || selectTo >= Number(checkboxBlock.dataset.from);
		}
		if (selectFrom === 0 && selectTo === 0) {
			console.log('всё по нулям:', selectFrom, '-', selectTo);
			isBetween = () => false;
		}
		console.log(isBetween);
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
	selects.addEventListener('click', e => {
		const selectInput = e.target.closest('.years__input');
		const YearsOption = e.target.closest('.years__option');

		if (selectInput) {
			console.log('selectInput====');
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

				updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
				// console.log(selectFrom, '-', selectTo, 'count:', count);
			}

			if (containsClass(YearsOption, 'clear')) {
				console.log('optionClear====');
				// count++;

				inputYears.innerHTML = '';
				if (optionContainsFrom) {
					selectFrom = 0;
					updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
				}
				if (optionContainsTo) {
					selectTo = 0;
					updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
				}
				// console.log(selectFrom, '-', selectTo, 'count:', count);
			}
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
	document.querySelector('.select-from>.clear').click();
	document.querySelector('.select-to>.clear').click();
};

export { resetYearsShowSelect, yearsShowSelect };
