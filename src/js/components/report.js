import { swiper, swiperMini } from '../scripts.js';

import { blockVisible } from './visibleBlockAndBtnShowMore.js';

const resetReport = () => {
	const textVisible = 'Показать все сведения';
	// const btn = document.querySelector('.report__info-btn');
	swiperMini.update();
	swiper.update();
	// btn.removeEventListener('click', btnShowMoreClick);

	blockVisible('.report__info-block', '.report__info-btn', 3, textVisible);

	// btn.addEventListener('click', btnShowMoreClick.bind(null, '.report__info-btn', 3, textVisible));
};

export { resetReport };
