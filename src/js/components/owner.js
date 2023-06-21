const resetCheckboxOwner = () => {
	removeClassArray(document.querySelectorAll('.owner__checkbox-block'), 'active');
};

export { resetCheckboxOwner };
