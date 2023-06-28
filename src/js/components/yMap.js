function initY() {
	const center = [54.99507, 82.83208];
	const zoom_value = 16;
	const iconimage_default =
		"data:image/svg+xml,%3Csvg width='29' height='38' viewBox='0 0 29 38' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath opacity='0.7' d='M14.5 1.125C10.9362 1.12501 7.51828 2.57367 4.99826 5.15229C2.47824 7.73091 1.06251 11.2283 1.0625 14.875C1.0625 27.25 14.5 36.875 14.5 36.875C14.5 36.875 27.9375 27.25 27.9375 14.875C27.9375 11.2283 26.5218 7.73091 24.0017 5.15229C21.4817 2.57367 18.0638 1.12501 14.5 1.125ZM14.5 20.375C13.4369 20.375 12.3977 20.0524 11.5138 19.4481C10.6299 18.8437 9.94097 17.9848 9.53415 16.9798C9.12733 15.9748 9.02088 14.8689 9.22828 13.802C9.43567 12.7351 9.94759 11.7551 10.6993 10.9859C11.451 10.2167 12.4087 9.6929 13.4514 9.48068C14.494 9.26846 15.5748 9.37738 16.5569 9.79366C17.5391 10.2099 18.3785 10.9149 18.9691 11.8194C19.5598 12.7238 19.875 13.7872 19.875 14.875C19.875 16.3337 19.3087 17.7326 18.3007 18.7641C17.2927 19.7955 15.9255 20.375 14.5 20.375V20.375Z' fill='red'/%3E%3Cpath d='M14.5 20.375C17.4685 20.375 19.875 17.9126 19.875 14.875C19.875 11.8374 17.4685 9.375 14.5 9.375C11.5315 9.375 9.125 11.8374 9.125 14.875C9.125 17.9126 11.5315 20.375 14.5 20.375Z' stroke='%234594F0' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M27.9375 14.875C27.9375 27.25 14.5 36.875 14.5 36.875C14.5 36.875 1.0625 27.25 1.0625 14.875C1.0625 11.2283 2.47823 7.73091 4.99825 5.15228C7.51827 2.57366 10.9362 1.125 14.5 1.125C18.0638 1.125 21.4817 2.57366 24.0017 5.15228C26.5218 7.73091 27.9375 11.2283 27.9375 14.875V14.875Z' stroke='%234594F0' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A";
	let map = new ymaps.Map(
		'map',
		{
			center: center,
			zoom: zoom_value,
			suppressMapOpenBlock: true,
			controls: [],
		},
		{
			suppressMapOpenBlock: true,
		},
	);

	// маркер на карте
	const placemark1 = new ymaps.Placemark(
		center,
		// {
		// 	balloonContent: `
		// 	<div class="balloon">
		// 		<div class="balloon__address">г. Париж</div>
		// 		<div class="balloon__contacts">
		// 			<a href="tel:+7999999999">+7999999999</a>
		// 		</div>
		// 	</div>
		// `,
		// },
		// {
		// 	hintContent: 'Новосибирск, Бетонный переезд, 2',
		// 	balloonContent:
		// 		'Новосибирск, Бетонный переезд, 2<br><a target="_blank" href="https://yandex.ru/maps/?rtext=~54.995070, 82.832080">Как добраться</a>',
		// },
		{
			balloonContentHeader: 'Новосибирск, Бетонный переезд, 2',
			balloonContentBody:
				'Новосибирск, Бетонный переезд, 2<br><a target="_blank" href="https://yandex.ru/maps/?rtext=~54.995070, 82.832080">Как добраться</a>',
			balloonContentFooter: 'АВТО В НАЛИЧИИ В АВТОСАЛОНЕ',
		},
		{
			iconLayout: 'default#image',
			iconImageHref: iconimage_default,
			iconImageSize: [29, 38],
			iconImageOffset: [-15, -38],
		},
	);

	const zoomControl = new ymaps.control.ZoomControl({
		options: {
			size: 'small',
			adjustMapMargin: true,
			position: {
				right: 10,
				bottom: 50,
			},
		},
	});

	map.controls.remove('geolocationControl'); // удаляем геолокацию
	map.controls.remove('searchControl'); // удаляем поиск
	map.controls.remove('trafficControl'); // удаляем контроль трафика
	map.controls.remove('typeSelector'); // удаляем тип
	map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	// map.controls.remove('zoomControl'); // удаляем контрол зуммирования
	map.controls.remove('rulerControl'); // удаляем контрол правил
	map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

	// map.geoObjects.add(placemark);
	map.controls.add(zoomControl);
	map.geoObjects.add(placemark1);
	// placemark1.balloon.open(); // открытый балун с подсказкой
}

// export default initY;
// ymaps.ready(initY);
