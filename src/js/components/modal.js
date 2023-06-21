import { addClass, removeClass } from './helpers.js';

const modalErrorDelete = modal => {
	modal.querySelectorAll('.form__input')?.forEach(input => {
		removeClass(input, 'just-validate-error-field');
	});
	modal.querySelectorAll('.just-validate-error-label')?.forEach(errorElement => errorElement.remove());
};

const removeActiveClassModale = () => {
	removeClass(body, '_lock');
	removeClass(modal, 'active');
	modalErrorDelete(modal);
};

const modal = (btnOpen, modal, btnClose) => {
	btnOpen = document.querySelector(btnOpen);
	modal = document.querySelector(modal);
	btnClose = document.querySelector(btnClose);
	const body = document.body;

	// открытие модального окна
	btnOpen?.addEventListener('click', e => {
		e.preventDefault();
		addClass(body, '_lock');
		addClass(modal, 'active');
		// body.classList.add('_lock');
		// modal.classList.add('active');
	});
	// закрытие модального окна: по кнопке
	btnClose?.addEventListener('click', () => {
		// removeClass(body, '_lock')
		// removeClass(modal, 'active')
		// body.classList.remove('_lock');
		// modal.classList.remove('active');
		// modalErrorDelete(modal);
		removeActiveClassModale();
	});
	// закрытие модального окна: по области вокруг модального окна
	modal?.addEventListener('click', e => {
		if (e.target === modal) {
			removeActiveClassModale();
			// body.classList.remove('_lock');
			// modal.classList.remove('active');
			// modalErrorDelete(modal);
		}
	});
};
// btnOpen --- класс кнопки, при клике на которую будет ОТКРЫВАТЬСЯ модальное окно
// modal --- класс открываемого модального окна
// btnClose --- класс кнопки, при клике на которую будет ЗАКРЫВАТЬСЯ модальное окно
export default modal;
