import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';

import { chatLogic } from './components/chat.js';
import { checkboxComponent } from './components/checkbox.js';
import { addClass, answerChoice, closestElement, containsClass, removeClass, removeClassArray, toggleClass } from './components/helpers.js';
import { mileageInput, resetMileageInput } from './components/mileage.js';
import { owner, resetCheckboxOwner } from './components/owner.js';
import stickyConsultant from './components/stickyConsultant.js';
import { blockVisibleAndBtnShowMore } from './components/visibleBlockAndBtnShowMore.js';
import { resetYearsShowSelect, yearsShowSelect } from './components/years.js';

// ========= sticky consultant при скроле страницы=========
window.addEventListener('scroll', stickyConsultant);

// / =================MODEL CHOICE===============
answerChoice('car-card');
// ========================================

// =================YEARS===============
yearsShowSelect();
// ====== обнуление инпута года выпуска/поколений ======
// resetYears()
// ====== блоки с выбором года выпуска (поколений) ======
checkboxComponent('years');
// ====КНОПКА "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"=====
blockVisibleAndBtnShowMore('.years__checkbox-block', 6, '.years__show-more', '.years__show-more-text', 'Показать все поколения');
// ======обнуление кнопки "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"======
// для обнуления вызывать: =>
//  blockVisibleAndBtnShowMore('.years__checkbox-block', 6, '.years__show-more', '.years__show-more-text', 'Показать все поколения')
// =============================

// ===========ПРОБЕГ (mileage)===========
// ===========INPUT ПРОБЕГА===========
mileageInput();
// ======CHECKBOX ПРОБЕГА======
checkboxComponent('mileage');
// ======обнуление инпута пробега======
// resetMileage()
// ==================================

// ===========ВЛАДЕЛЕЦ===========
// ======CHECKBOX владелец======
checkboxComponent('owner');
// ======ответ сообщений владелец======
owner();
// для обнуления вызывать: =>
// resetOwner()
// ================================

// ========CHOICE CAR===========

// =============swiper=============
// ========= CHOICE-CAR =========
// слайдер в choice-car
const swipersChoice = document.querySelectorAll('.choice-car__swiper');
swipersChoice.forEach(swiperChoice => {
	const swiper = new Swiper(swiperChoice, {
		modules: [Navigation, Pagination],
		loop: true,
		pagination: {
			el: '.choice-car__pagination',
		},
		navigation: {
			nextEl: '.choice-car__btn-next',
			prevEl: '.choice-car__btn-prev',
		},
	});
});
// ========= REPORT =========
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
answerChoice('choice-car');
// ===============================

// ===========кнопка "показать все сведения" в секции report__info===========
// btnShowMore('.report__info-block', '.report__info-btn', '', 2, 'Свернуть', 'Показать все сведения');
blockVisibleAndBtnShowMore('.report__info-block', 3, '.report__info-btn', '', 'Показать все сведения');

// ===========CHAT LOGIC===========
// chatLogic(0);
