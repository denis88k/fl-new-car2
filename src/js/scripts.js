import { chat2 } from './components/chat.js';
import { mileageInit } from './components/mileage.js';
import { ownerInit } from './components/owner.js';
// import { sliderMethod } from './components/report.js';
import stickyConsultant from './components/stickyConsultant.js';
import { blockVisible, btnShowMoreClick } from './components/visibleBlockAndBtnShowMore.js';
import { yearsInit } from './components/years.js';

// NOTE:===========CHAT start===========
chat2();
// ========= sticky consultant при скролле страницы=========
window.addEventListener('scroll', stickyConsultant);
// NOTE: =================MODEL CHOICE===============
// ========================================

// NOTE: =================YEARS===============

yearsInit();
//* yearsShowSelect();
// ====== обнуление инпута года выпуска/поколений ======
// // resetYears()
// ====== блоки с выбором года выпуска (поколений) ======
//* checkboxComponent('years');
// ====КНОПКА "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"=====
//* blockVisible('.years__checkbox-block', '.years__show-more', 6, 'Показать все поколения');
//* document
//* 	.querySelector('.years__show-more')
//* 	.addEventListener('click', btnShowMoreClick.bind(null, '.years__checkbox-block', 6, 'Показать все поколения'));

// // ======обнуление кнопки "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"======
// // для обнуления вызывать: =>
// // blockVisible('years__checkbox-block', 'years__show-more', 6, 'Показать все сведения');
// // =============================

// // NOTE: ===========ПРОБЕГ (mileage)========
// // ===========INPUT ПРОБЕГА===========
mileageInit();
// mileageInput();
// // ======CHECKBOX ПРОБЕГА======
// checkboxComponent('mileage');
// // ======обнуление инпута пробега======
// // resetMileage()
// // ==================================

// // NOTE: ===========ВЛАДЕЛЕЦ (owner)===========
ownerInit();
// // ======CHECKBOX владелец======
// checkboxComponent('owner');
// // ======ответ сообщений владелец======
// owner();
// // для обнуления вызывать: =>
// // resetOwner()
// // ================================

// // NOTE: ========CHOICE CAR=============
// // =============swiper============
// заменён на fancy box-carousel
// sliderMethod.init();
// // ==========================
// // NOTE: ========= REPORT =========

// // ===========кнопка "показать все сведения" в секции report__info===========
const textVisible = 'Показать все сведения';
blockVisible('.report__info-block', '.report__info-btn', 3, textVisible);
// // для обнуления вызывать: =>
// resetReport()

document.querySelector('.report__info-btn').addEventListener('click', btnShowMoreClick.bind(null, '.report__info-block', 3, 'Показать все сведения'));
