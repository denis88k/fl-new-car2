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
const blockVisibleAndBtnShowMore = (...params) => {
	const [blocksShow, countBlockVisible, btn, btnText = '', textOpen] = params;
	const textHidden = 'Свернуть';
	const blocks = document.querySelectorAll(blocksShow);
	const btnShowMore = document.querySelector(btn);
	removeClassArray(blocks, 'isVisible');

	if (blocks.length > countBlockVisible) {
		let isShowMore = false;

		for (let i = 0; i < countBlockVisible; i++) {
			addClass(blocks[i], 'isVisible');
		}

		btnShowMore.style.display = 'flex';
		let btnShowMoreText;
		btnText ? (btnShowMoreText = btnShowMore.querySelector(btnText)) : (btnShowMoreText = btnShowMore);
		btnShowMoreText.innerText = textOpen;

		const btnShowMoreClick = e => {
			// console.log(isShowMore);
			e.preventDefault();
			for (let i = countBlockVisible; i <= blocks.length; i++) {
				isShowMore ? removeClass(blocks[i], 'isVisible') : addClass(blocks[i], 'isVisible');
			}
			toggleClass(btnShowMore, 'active');
			btnShowMoreText.innerText = isShowMore ? textOpen : textHidden;
			isShowMore = !isShowMore;
		};
		btnShowMore.removeEventListener('click', btnShowMoreClick);
		btnShowMore.addEventListener('click', btnShowMoreClick);
	}
	if (blocks.length <= countBlockVisible) {
		blocks.forEach(block => addClass(block, 'isVisible'));
		btn.style.display = 'none';
	}
};

export { blockVisibleAndBtnShowMore };
// =======проверка кол-ва первых видимых блоков=======
// старая версия
// ====обнуление кнопки "ПОКАЗАТЬ ЕЩЁ" и проверка длины первых видимых блоков=====
// const resetBtnShowMore = (btn, blocksShow, countBlockVisible) => {
// 	const btnClick = document.querySelector(btn);
// 	containsClass(btnClick, 'active') && btnClick.click();
// 	checkLengthFirstVisible(blocksShow, countBlockVisible, btnClick);
// };

// const btnShowMore = (blocksShow, btn, btnText = '', countBlockVisible, textHidden, textOpen) => {
// 	// checkboxBlocks->blocks
// 	const blocks = document.querySelectorAll(blocksShow);
// 	const btnShowMore = document.querySelector(btn);
// 	let btnShowMoreText;
// 	let isShowMore = false;
// 	let countBlock = countBlockVisible; // сколько в начале отобразить шт

// 	btnText ? (btnShowMoreText = btnShowMore.querySelector(btnText)) : (btnShowMoreText = btnShowMore);

// 	const toggleClassActive = isShowMore => {
// 		for (let i = countBlock + 1; i < blocks.length; i++) {
// 			isShowMore ? removeClass(blocks[i], 'isVisible') : addClass(blocks[i], 'isVisible');
// 		}
// 		isShowMore ? removeClass(btnShowMore, 'active') : addClass(btnShowMore, 'active');
// 	};

// 	const toggleBtnText = isShowMore => {
// 		btnShowMoreText.innerHTML = isShowMore ? textOpen : textHidden;
// 	};

// 	if (blocks.length > countBlock) {
// 		for (let i = 0; i <= countBlock; i++) {
// 			addClass(blocks[i], 'isVisible');
// 		}
// 		btnShowMore.addEventListener('click', () => {
// 			toggleClassActive(isShowMore);
// 			toggleBtnText(isShowMore);
// 			isShowMore = !isShowMore;
// 		});
// 	}
// 	// checkLengthFirstVisible(blocksShow, countBlockVisible, btn);
// 	if (blocks.length <= countBlockVisible) {
// 		blocks.forEach(block => addClass(block, 'isVisible'));
// 		btnShowMore.style.display = 'none';
// 	}
// };
