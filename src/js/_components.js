import modal from './components/modal.js';

// promo-header
modal('.promo__header-modal-payment', '.modal-payment', '.modal-payment .modal__close');
modal('.promo__header-modal-tradIn', '.modal-tradIn', '.modal-tradIn .modal__close');

// promo-actual
modal('.promo__header-modal-discount', '.modal-discount', '.modal-discount .modal__close');
modal('.promo__header-modal-tiresСasco', '.modal-tiresСasco', '.modal-tiresСasco .modal__close');
modal('.promo__header-modal-bestPrice', '.modal-bestPrice', '.modal-bestPrice .modal__close');
modal('.report__about-btn-red', '.modal-btnUnderCar', '.modal-btnUnderCar .modal__close');
modal('.report__about-btn-white', '.modal-btnUnderCar', '.modal-btnUnderCar .modal__close');

import validateForms from './components/validation.js';
import initY from './components/yMap.js';

document.querySelectorAll('.form').forEach(form => {
	validateForms(form);
	form.querySelectorAll('.form__input').forEach(input => {
		input.onblur = function (e) {
			if (this.classList.contains('input__tel')) {
				// console.log(e.target.inputmask.unmaskedvalue().length, 'blur tel');
				const targetLength = e.target.inputmask.unmaskedvalue().length;
				if (0 < targetLength && targetLength < 10) {
					this.classList.add('just-validate-error-field');
				} else if (0 < targetLength) {
					this.classList.add('just-validate-success-field');
				}
			}
			if (this.classList.contains('input__name')) {
				// console.log(e.target.value.length, 'blur name');
				const targetLength = e.target.value.length;
				if (0 < targetLength && targetLength < 3) {
					this.classList.add('just-validate-error-field');
				} else if (0 < targetLength) {
					this.classList.add('just-validate-success-field');
				}
			}
		};
		input.onfocus = function () {
			// if (this.classList.contains('input__tel')) {
			//   console.log(this.inputmask.unmaskedvalue(), 'focus tel');
			// }
			this.classList.contains('just-validate-error-field') && this.classList.remove('just-validate-error-field');
			this.classList.contains('just-validate-success-field') && this.classList.remove('just-validate-success-field');
			// if (this.classList.contains('input__name')) {
			//   console.log(this, 'focus name');
			// }
		};
	});
});

// карта яндекс
// import yandexiniti from './components/yMap.js';
// ymaps3.ready.then(init);
// ymaps.ready(init);
// yandexiniti();
// function yandexiniti() {
// 	// Функция ymaps.ready() будет вызвана, когда
// 	// загрузятся все компоненты API, а также когда будет готово DOM-дерево.

// 	function init() {
// 		let iconimage_default =
// 			"data:image/svg+xml,%3Csvg width='29' height='38' viewBox='0 0 29 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.7' d='M14.5 1.125C10.9362 1.12501 7.51828 2.57367 4.99826 5.15229C2.47824 7.73091 1.06251 11.2283 1.0625 14.875C1.0625 27.25 14.5 36.875 14.5 36.875C14.5 36.875 27.9375 27.25 27.9375 14.875C27.9375 11.2283 26.5218 7.73091 24.0017 5.15229C21.4817 2.57367 18.0638 1.12501 14.5 1.125ZM14.5 20.375C13.4369 20.375 12.3977 20.0524 11.5138 19.4481C10.6299 18.8437 9.94097 17.9848 9.53415 16.9798C9.12733 15.9748 9.02088 14.8689 9.22828 13.802C9.43567 12.7351 9.94759 11.7551 10.6993 10.9859C11.451 10.2167 12.4087 9.6929 13.4514 9.48068C14.494 9.26846 15.5748 9.37738 16.5569 9.79366C17.5391 10.2099 18.3785 10.9149 18.9691 11.8194C19.5598 12.7238 19.875 13.7872 19.875 14.875C19.875 16.3337 19.3087 17.7326 18.3007 18.7641C17.2927 19.7955 15.9255 20.375 14.5 20.375V20.375Z' fill='red'/%3E%3Cpath d='M14.5 20.375C17.4685 20.375 19.875 17.9126 19.875 14.875C19.875 11.8374 17.4685 9.375 14.5 9.375C11.5315 9.375 9.125 11.8374 9.125 14.875C9.125 17.9126 11.5315 20.375 14.5 20.375Z' stroke='%234594F0' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M27.9375 14.875C27.9375 27.25 14.5 36.875 14.5 36.875C14.5 36.875 1.0625 27.25 1.0625 14.875C1.0625 11.2283 2.47823 7.73091 4.99825 5.15228C7.51827 2.57366 10.9362 1.125 14.5 1.125C18.0638 1.125 21.4817 2.57366 24.0017 5.15228C26.5218 7.73091 27.9375 11.2283 27.9375 14.875V14.875Z' stroke='%234594F0' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A";
// 		const zoom_value = 16;
// 		const center = [54.99507, 82.83208];

// 		let myMap = new ymaps.Map(
// 			'map',
// 			{
// 				center: center,
// 				zoom: zoom_value,
// 				suppressMapOpenBlock: true,
// 				controls: [],
// 			},
// 			{
// 				suppressMapOpenBlock: true,
// 			},
// 		);

// 		let zoomControl = new ymaps.control.ZoomControl({
// 			options: {
// 				size: 'small',
// 				adjustMapMargin: true,
// 				position: {
// 					right: 10,
// 					bottom: 50,
// 				},
// 			},
// 		});

// 		let myPlacemark_1 = new ymaps.Placemark(
// 			center,
// 			{
// 				// Хинт показывается при наведении мышкой на иконку метки.
// 				hintContent: 'City,Address',
// 				// Балун откроется при клике по метке.
// 				balloonContent: 'City, address<br><a target="_blank" href="https://yandex.ru/maps/?rtext=~52.294413,104.308912">Как добраться</a>',
// 			},
// 			{
// 				// Опции.
// 				// Необходимо указать данный тип макета.
// 				iconLayout: 'default#image',
// 				// Своё изображение иконки метки.
// 				iconImageHref: iconimage_default,
// 				// Размеры метки.
// 				iconImageSize: [29, 38],
// 				// Смещение левого верхнего угла иконки относительно
// 				// её "ножки" (точки привязки).
// 				iconImageOffset: [-15, -38],
// 			},
// 		);

// 		//После того как метка была создана, добавляем её на карту.
// 		myMap.geoObjects.add(myPlacemark_1);

// 		myMap.controls.add(zoomControl);
// 		myMap.behaviors.disable('scrollZoom');
// 	}
// 	ymaps.ready(init);
// }
// yandexiniti();
// ymaps.ready(initY);
