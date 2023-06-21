// функция компонент для проставления галочек на checkboxBlock'ы
const checkboxComponent = block => {
	const componentCheckbox = document.querySelector(`.${block}__checkbox`);
	componentCheckbox.addEventListener('click', e => {
		const componentCheckboxBlock = e.target.closest(`.${block}__checkbox-block`);
		if (!componentCheckboxBlock) {
			// console.log('вне componentCheckboxBlock');
			return;
		}
		toggleClass(componentCheckboxBlock, 'active');
	});
};

export { checkboxComponent };
