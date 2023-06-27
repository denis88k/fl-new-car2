import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';

import { chat2 } from './components/chat.js';
import { checkboxComponent } from './components/checkbox.js';
import { addClass, answerChoice, closestElement, removeClassArray } from './components/helpers.js';
import { mileageInput, resetMileageInput } from './components/mileage.js';
import { owner, resetCheckboxOwner } from './components/owner.js';
import stickyConsultant from './components/stickyConsultant.js';
import { blockVisible, blockVisibleAndBtnShowMore, btnShowMoreClick } from './components/visibleBlockAndBtnShowMore.js';
import { resetYearsShowSelect, yearsShowSelect } from './components/years.js';

// ========= sticky consultant при скролле страницы=========
window.addEventListener('scroll', stickyConsultant);

// NOTE: =================MODEL CHOICE===============
// answerChoice('.car-card__blocks', 'car-card__block');
// ========================================

// NOTE: =================YEARS===============
yearsShowSelect();
// ====== обнуление инпута года выпуска/поколений ======
// resetYears()
// ====== блоки с выбором года выпуска (поколений) ======
checkboxComponent('years');
// ====КНОПКА "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"=====
blockVisible('.years__checkbox-block', '.years__show-more', 6, 'Показать все поколения');

document
	.querySelector('.years__show-more')
	.addEventListener('click', btnShowMoreClick.bind(null, '.years__checkbox-block', 6, 'Показать все поколения'));

// ======обнуление кнопки "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"======
// для обнуления вызывать: =>
// blockVisible('years__checkbox-block', 'years__show-more', 6, 'Показать все сведения');

// =============================

// NOTE: ===========ПРОБЕГ (mileage)========
// ===========INPUT ПРОБЕГА===========
mileageInput();
// ======CHECKBOX ПРОБЕГА======
checkboxComponent('mileage');
// ======обнуление инпута пробега======
// resetMileage()
// ==================================

// NOTE: ===========ВЛАДЕЛЕЦ===========
// ======CHECKBOX владелец======
checkboxComponent('owner');
// ======ответ сообщений владелец======
owner();
// для обнуления вызывать: =>
// resetOwner()
// ================================

// NOTE: ========CHOICE CAR=============
// =============swiper============
// ========= CHOICE-CAR ==========
// слайдер в choice-car
// const swipersChoice = document.querySelectorAll('.choice-car__swiper');
// swipersChoice.forEach(swiperChoice => {
// 	const swiperChc = new Swiper(swiperChoice, {
// 		modules: [Navigation, Pagination],
// 		loop: true,
// 		pagination: {
// 			el: '.choice-car__pagination',
// 		},
// 		navigation: {
// 			nextEl: '.choice-car__btn-next',
// 			prevEl: '.choice-car__btn-prev',
// 		},
// 	});
// });

// ==========================
// NOTE: ========= REPORT =========
// слайдер превью

const swiperReportMini = document.querySelector('.report__swiper-mini');
const swiperMini = new Swiper(swiperReportMini, {
	loop: true,
	freeMode: true,
	slidesPerView: 'auto',
});
// слайдер в report
const swiperReport = document.querySelector('.report__swiper');
const swiper = new Swiper(swiperReport, {
	modules: [Navigation, Thumbs],
	loop: true,
	navigation: {
		nextEl: '.report__btn-next',
		prevEl: '.report__btn-prev',
	},
	thumbs: {
		swiper: swiperMini,
	},
});
export { swiperMini, swiper };
// ===============================

// ===========кнопка "показать все сведения" в секции report__info===========
// document.querySelector('.years__show-more').removeEventListener('click', btnShowMoreClick.bind(null, 'years__show-more'));
blockVisible('.report__info-block', '.report__info-btn', 3, 'Показать все сведения');
document.querySelector('.report__info-btn').addEventListener('click', btnShowMoreClick.bind(null, '.report__info-block', 3, 'Показать все сведения'));

// blockVisibleAndBtnShowMore('.report__info-block', 3, '.report__info-btn', '', 'Показать все сведения');

// NOTE:===========CHAT start===========
chat2();
