import { addClass, containsClass, removeClass } from './helpers.js';

// фиксация шапки консультанта
const consultSticky = document.querySelector('.consultant_sticky');
const chatConsultant = document.querySelector('.chat__consultant');
const TopChatConsultant = chatConsultant.getBoundingClientRect().top; // высота до верхней точки страница (не экрана, а СТРАНИЦЫ)
// console.log(TopChatConsultant);

function stickyConsultant() {
	// console.log(window.scrollY);
	if (window.scrollY > TopChatConsultant * 1.03) {
		addClass(consultSticky, 'show');
	} else {
		containsClass(consultSticky, 'show') && removeClass(consultSticky, 'show');
	}
}

export default stickyConsultant;
