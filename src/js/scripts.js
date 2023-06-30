import { chat2 } from './components/chat.js';
import { checkboxComponent } from './components/checkbox.js';
import { mileageInput } from './components/mileage.js';
import { owner } from './components/owner.js';
import stickyConsultant from './components/stickyConsultant.js';
import { blockVisible, btnShowMoreClick } from './components/visibleBlockAndBtnShowMore.js';
import { yearsShowSelect } from './components/years.js';

// NOTE:===========CHAT start===========
chat2();
// ========= sticky consultant при скролле страницы=========
window.addEventListener('scroll', stickyConsultant);
// NOTE: =================MODEL CHOICE===============
// ========================================

// NOTE: =================YEARS===============
yearsShowSelect();
// ====== обнуление инпута года выпуска/поколений ======
// // resetYears()
// ====== блоки с выбором года выпуска (поколений) ======
checkboxComponent('years');
// ====КНОПКА "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"=====
blockVisible('.years__checkbox-block', '.years__show-more', 6, 'Показать все поколения');
document
	.querySelector('.years__show-more')
	.addEventListener('click', btnShowMoreClick.bind(null, '.years__checkbox-block', 6, 'Показать все поколения'));

// // ======обнуление кнопки "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"======
// // для обнуления вызывать: =>
// // blockVisible('years__checkbox-block', 'years__show-more', 6, 'Показать все сведения');
// // =============================

// // NOTE: ===========ПРОБЕГ (mileage)========
// // ===========INPUT ПРОБЕГА===========
mileageInput();
// // ======CHECKBOX ПРОБЕГА======
checkboxComponent('mileage');
// // ======обнуление инпута пробега======
// // resetMileage()
// // ==================================

// // NOTE: ===========ВЛАДЕЛЕЦ===========
// // ======CHECKBOX владелец======
checkboxComponent('owner');
// // ======ответ сообщений владелец======
owner();
// // для обнуления вызывать: =>
// // resetOwner()
// // ================================

// // NOTE: ========CHOICE CAR=============
// // =============swiper============

// // ==========================
// // NOTE: ========= REPORT =========

// // ===========кнопка "показать все сведения" в секции report__info===========
blockVisible('.report__info-block', '.report__info-btn', 3, 'Показать все сведения');
document.querySelector('.report__info-btn').addEventListener('click', btnShowMoreClick.bind(null, '.report__info-block', 3, 'Показать все сведения'));
// // для обнуления вызывать: =>
// resetReport()
