import { addClass, containsClass, removeClass, removeClassArray, toggleClass } from './helpers.js';

// =========кнопка показать ещё=========
// blocksShow - блоки, которые нужно отобразить
// btn - кнопка
// btnText - элемент где нужно отобразить текст: показать, скрыть
// countBlock - кол-во, которое отобразиться в первый раз 6/3
// textHidden - текст, когда спрятаны часть блоков
// textOpen - текст, когда отображены все блоки

// TODO: функция проверки кол-ва отображаемых блоков
// изначально удалить со всех блоков класс isVisible
// если кол-во блоков больше, чем требуется, то:
// 		1) отобразить требуемое кол-во блоков
// 		-2) кнопке btnShowMore сделать display: block;
// если кол-во блоков меньше, чем требуется, то:
// 		1) отобразить все элементы
// 		-2) кнопка btnShowMore сделать display: none;

// const checkLengthVisible = (blocksShow, countBlockVisible, btn) => {
// 	const blocks = document.querySelectorAll(blocksShow);
// 	removeClassArray(blocks, 'isVisible');

// 	if (blocks.length > countBlockVisible) {
// 		for (let i = 0; i < countBlockVisible; i++) {
// 			addClass(blocks[i], 'isVisible');
// 		}
// 	}
// 	if (blocks.length <= countBlockVisible) {
// 		blocks.forEach(block => addClass(block, 'isVisible'));
// 		btn.style.display = 'none';
// 	}
// };

// TODO: функция кнопки showMore
// переменная сделать глобальной isShowMore=false --- свернуто / отображены все
// удалить прослушку по кнопке
// если блоков больше, чем требуется, то:
// 		1) кнопке добавить надпись "показать все"
// 		2) display: block
// 		3) кнопке добавить прослушку
// если блоков меньше, чем требуется, то:
// 		1) display: none
// let isShowMoreYears = false;
// const btnShowMore = (blocksShow, countBlockVisible, btn, btnText = '', textHidden, textOpen) => {
// 	const blocks = document.querySelectorAll(blocksShow);
// 	const btnShowMore = document.querySelector(btn);
// 	btnShowMore.removeEventListener('click', btnShowMoreClick);
// 	if (blocks.length > countBlockVisible) {
// 		btnShowMore.style.display = 'block';
// 		let btnShowMoreText;
// 		btnText ? (btnShowMoreText = btnShowMore.querySelector(btnText)) : (btnShowMoreText = btnShowMore);
// 		btnShowMore.addEventListener('click', btnShowMoreClick);
// 	}
// 	if (blocks.length <= countBlockVisible) {
// 		btnShowMore.style.display = 'none';
// 	}
// };

// TODO: функция клика по кнопке:
// 		1) переменная isShowMore=!isShowMore
// 		2) показывает доп элементы или скрывает их
// 		3) меняет надпись в кнопке на "свернуть" или "показать все"
// const btnShowMoreClick = () => {
// 	for (let i = countBlockVisible; i <= blocks.length; i++) {
// 		isShowMore ? removeClass(blocks[i], 'isVisible') : addClass(blocks[i], 'isVisible');
// 	}
// 	isShowMore ? removeClass(btnShowMore, 'active') : addClass(btnShowMore, 'active');
// 	btnShowMoreText.innerHTML = isShowMore ? textOpen : textHidden;
// 	isShowMore = !isShowMore;
// };
// функция выполняемая при клике
// const btnShowMoreClick = () => {
// 	console.log(isShowMore);
// 	for (let i = countBlockVisible; i <= blocks.length; i++) {
// 		isShowMore ? removeClass(blocks[i], 'isVisible') : addClass(blocks[i], 'isVisible');
// 	}
// 	toggleClass(btnShowMore, 'active');
// 	// isShowMore ? removeClass(btnShowMore, 'active') : addClass(btnShowMore, 'active');
// 	btnShowMoreText.innerHTML = isShowMore ? textOpen : textHidden;
// 	isShowMore = !isShowMore;
// };

// const blockVisibleAndBtnShowMore = (...params) => {
// 	// checkLengthVisible(blocksShow, countBlockVisible, btn);
// 	// btnShowMore(blocksShow, countBlockVisible, btn, btnText='',textHidden, textOpen);
// }
// const blockVisibleAndBtnShowMore = (blocksShow, countBlockVisible, btn, btnText = '') => {

const countBlockVisibl = 6; // сколько блоков отобразить
// const textHidden = 'Свернуть';
// const textOpen = 'Показать все поколения';
// const btnShowMore = document.querySelector(btn);
// const btnShowMoreText = btnShowMore.querySelector('.show-more-text'); // куда вписывать текст кнопки
// let isShowMoreBtnYears = false;

const blockVisible = (blocksShow, btn, countBlockVisible, textOpen) => {
	// blocksShow - блоки
	const blocks = document.querySelectorAll(blocksShow);
	const btnShowMore = document.querySelector(btn);
	const btnShowMoreText = btnShowMore.querySelector('.show-more-text');
	removeClassArray(blocks, 'isVisible');

	if (blocks.length > countBlockVisible) {
		for (let i = 0; i < countBlockVisible; i++) {
			addClass(blocks[i], 'isVisible');
		}
		removeClass(btnShowMore, 'active');
		btnShowMore.style.display = 'flex';
		btnShowMoreText.innerText = textOpen;
	}

	if (blocks.length <= countBlockVisible) {
		// то показываем все блоки сразу
		blocks.forEach(block => addClass(block, 'isVisible'));
		btnShowMore.style.display = 'none';
	}
};

let count = 0;
const btnShowMoreClick = (blocksShow, countBlockVisible, textOpen, e) => {
	e.preventDefault();
	const blocks = document.querySelectorAll(blocksShow);

	const eCurrentTarget = e.currentTarget;
	const btnShowMoreText = eCurrentTarget.querySelector('.show-more-text');
	toggleClass(eCurrentTarget, 'active');

	// console.log(containsClass(eCurrentTarget, 'active'));
	for (let i = countBlockVisible; i <= blocks.length; i++) {
		containsClass(eCurrentTarget, 'active') ? addClass(blocks[i], 'isVisible') : removeClass(blocks[i], 'isVisible');
	}

	btnShowMoreText.innerText = containsClass(eCurrentTarget, 'active') ? 'Свернуть' : textOpen;
	count++;
	// console.log(count);
};

// btnShowMore.addEventListener('click', btnShowMoreClick);

// const blockVisibleAndBtnShowMore = (...params) => {
// 	const [blocksShow, btnText = ''] = params;

// 	blocks = document.querySelectorAll(blocksShow);
// 	// удаляем со всех элементов класс, который их показывает
// 	removeClassArray(blocks, 'isVisible');
// 	// если кол-во блоков больше, чем их надо показать, то:
// 	if (blocks.length > countBlockVisible) {
// 		// то показываем требуемое кол-во блоков
// 		for (let i = 0; i < countBlockVisible; i++) {
// 			addClass(blocks[i], 'isVisible');
// 		}
// 		removeClass(btnShowMore, 'active');
// 		btnShowMore.style.display = 'flex';

// 		btnText ? (btnShowMoreText = btnShowMore.querySelector(btnText)) : (btnShowMoreText = btnShowMore);
// 		btnShowMoreText.innerText = textOpen;
// 	}
// 	// если кол-во блоков меньше, чем требуется, то:
// 	if (blocks.length <= countBlockVisible) {
// 		// то показываем все блоки сразу
// 		blocks.forEach(block => addClass(block, 'isVisible'));
// 		btnShowMore.style.display = 'none';
// 	}
// };

// const btnShowMoreClick = e => {
// 	e.preventDefault();
// 	for (let i = countBlockVisible; i <= blocks.length; i++) {
// 		isShowMoreBtnYears ? removeClass(blocks[i], 'isVisible') : addClass(blocks[i], 'isVisible');
// 	}
// 	toggleClass(btnShowMore, 'active');
// 	btnShowMoreText.innerText = isShowMoreBtnYears ? textOpen : textHidden;
// 	isShowMoreBtnYears = !isShowMoreBtnYears;
// };

// btnShowMore.removeEventListener('click', btnShowMoreClick);
// btnShowMore.addEventListener('click', btnShowMoreClick);

// const blockVisibleAndBtnShowMore = (...params) => {
// 	const [blocksShow, countBlockVisible, btn, btnText = '', textOpen] = params;
// 	const textHidden = 'Свернуть';
// 	const blocks = document.querySelectorAll(blocksShow);
// 	const btnShowMore = document.querySelector(btn);
// 	removeClassArray(blocks, 'isVisible');
// 	console.log(btnText, 'inner');
// 	if (blocks.length > countBlockVisible) {
// 		let isShowMore = false;

// 		for (let i = 0; i < countBlockVisible; i++) {
// 			addClass(blocks[i], 'isVisible');
// 		}
// 		removeClass(btnShowMore, 'active');
// 		btnShowMore.style.display = 'flex';
// 		let btnShowMoreText;
// 		btnText ? (btnShowMoreText = btnShowMore.querySelector(btnText)) : (btnShowMoreText = btnShowMore);
// 		btnShowMoreText.innerText = textOpen;
// 		let count = 0;
// 		const btnShowMoreClick = e => {
// 			// console.log(isShowMore);
// 			count++;
// 			console.log(count, 'count');
// 			e.preventDefault();
// 			for (let i = countBlockVisible; i <= blocks.length; i++) {
// 				isShowMore ? removeClass(blocks[i], 'isVisible') : addClass(blocks[i], 'isVisible');
// 			}
// 			toggleClass(btnShowMore, 'active');
// 			btnShowMoreText.innerText = isShowMore ? textOpen : textHidden;
// 			isShowMore = !isShowMore;
// 		};
// 		btnShowMore.removeEventListener('click', btnShowMoreClick);
// 		btnShowMore.addEventListener('click', btnShowMoreClick);
// 	}
// 	if (blocks.length <= countBlockVisible) {
// 		blocks.forEach(block => addClass(block, 'isVisible'));
// 		btn.style.display = 'none';
// 	}
// };

export { blockVisible, btnShowMoreClick };
