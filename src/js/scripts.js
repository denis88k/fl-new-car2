import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';

import { chat2 } from './components/chat.js';
import { checkboxComponent } from './components/checkbox.js';
import { addClass, answerChoice, closestElement, removeClassArray } from './components/helpers.js';
import { mileageInput, resetMileageInput } from './components/mileage.js';
import { owner, resetCheckboxOwner } from './components/owner.js';
import stickyConsultant from './components/stickyConsultant.js';
import { blockVisibleAndBtnShowMore } from './components/visibleBlockAndBtnShowMore.js';
import { resetYearsShowSelect, yearsShowSelect } from './components/years.js';

// ========= sticky consultant при скроле страницы=========
window.addEventListener('scroll', stickyConsultant);

// / =================MODEL CHOICE===============
// answerChoice('.car-card__blocks', 'car-card__block');
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
// answerChoice('.choice-car__blocks', 'choice-car__block');
// TODO: доделать
// const answerChoiceChoiceCar = () => {
// 	const blockParent = document.querySelector('.choice-car__blocks');
// 	const blocks = blockParent.querySelectorAll('.choice-car__block');
// 	const chatMessageBlock = closestElement(blockParent, 'chat__message-block-choice');
// 	const answerMessage = chatMessageBlock.nextElementSibling;
// 	blockParent.addEventListener('click', e => {
// 		const blockTitle = closestElement(e.target, 'choice-car__title');
// 		if (blockTitle) {
// 			const block = closestElement(blockTitle, 'choice-car__block');
// 			removeClassArray(blocks, 'active');
// 			addClass(block, 'active');
// 			answerMessage.innerText = blockTitle.dataset.choice;
// 		}
// 	});
// };
// answerChoiceChoiceCar();
// ===============================

// ===========кнопка "показать все сведения" в секции report__info===========
blockVisibleAndBtnShowMore('.report__info-block', 3, '.report__info-btn', '', 'Показать все сведения');

// ===========CHAT start===========
chat2();
