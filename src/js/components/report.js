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

// если есть картинка при первой загрузки страницы, то инициализируется слайдер
if (reportSlideImg.dataset.lazySrc) {
	sliderCarMain = new Carousel(sliderCarousel, options, { Thumbs });
}

const resetReport = () => {
	const textVisible = 'Показать все сведения';
	// swiperMini.update();
	// swiper.update();
	// sliderCarMain.reInit();
	blockVisible('.report__info-block', '.report__info-btn', 3, textVisible);
};

export { resetReport };
