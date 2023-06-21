const mileageInput = () => {
	// const mileageInputs = document.querySelectorAll('.mileage__input');
	const mileageInputs = document.querySelector('.mileage__inputs');
	const mileageCheckboxBlocks = document.querySelectorAll('.mileage__checkbox-block');
	const valueFrom = document.querySelector('.input-from');
	const valueTo = document.querySelector('.input-to');
	let inputFrom = 0;
	let inputTo = 0;
	let isMore100 = () => false;
	let isLess100 = () => false;
	mileageInputs.addEventListener('input', e => {
		removeClassArray(mileageCheckboxBlocks, 'active');
		inputFrom = Number(valueFrom.value.split(' ').join('').replace(/,/gi, '.'));
		inputTo = Number(valueTo.value.split(' ').join('').replace(/,/gi, '.'));
		// console.log(inputFrom, inputTo);
		// const inputValue = Number(e.target.value.split(' ').join('').replace(/,/gi, '.'));
		// console.log(inputValue, 'inputValue');
		e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
		// console.log(e.target.value);
		// inputFrom > inputTo, то [inputFrom, inputTo] = [inputTo, inputFrom]
		if (inputFrom > inputTo && inputTo !== 0) {
			console.log('деструктуризация');
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
			// console.log('isMore100');
		}
		if (isLess100()) {
			addClass(mileageCheckboxBlocks[0], 'active');
			// console.log('isLess100');
		}
		// console.log('inputFrom:', inputFrom, '-', inputTo, ':inputTo');
	});
};

const resetMileageInput = () => {
	document.querySelector('.input-from').value = '';
	document.querySelector('.input-to').value = '';
	removeClassArray(document.querySelectorAll('.mileage__checkbox-block'), 'active');
};

export { mileageInput, resetMileageInput };
