import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';

import { blockVisible } from './visibleBlockAndBtnShowMore.js';

const sliderCarousel = document.querySelector('.report__wrapper');
const reportSlide = sliderCarousel.querySelectorAll('.report__slide');
const reportSlideImg = reportSlide[0].querySelector('img');
const options = {
	Dots: false,
	infinite: true,
	transition: 'slide',
	Thumbs: {
		type: 'classic',
	},
};
let sliderCarMain;

const sliderStart = () => {
	const sliderCarousel = document.querySelector('.report__wrapper');
	new Carousel(sliderCarousel, options, { Thumbs });
};
// если есть картинка при первой загрузки страницы, то инициализируется слайдер
// для git
if (reportSlideImg.dataset.lazySrc) {
	sliderCarMain = new Carousel(sliderCarousel, options, { Thumbs });
}

const resetReport = () => {
	// для prod
	// sliderStart();
	const textVisible = 'Показать все сведения';
	blockVisible('.report__info-block', '.report__info-btn', 3, textVisible);
};

export { resetReport };
