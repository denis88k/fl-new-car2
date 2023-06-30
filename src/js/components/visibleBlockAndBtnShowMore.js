import { addClass, containsClass, removeClass, removeClassArray, toggleClass } from './helpers.js';

// =========кнопка показать ещё=========
const countBlockVisibl = 6; // сколько блоков отобразить
// blocksShow - блоки, которые нужно отобразить
// btn - кнопка
// textOpen - текст, когда отображены все блоки

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

export { blockVisible, btnShowMoreClick };
