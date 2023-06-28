import { Carousel } from '@fancyapps/ui/dist/carousel/carousel.esm.js';
import { Thumbs } from '@fancyapps/ui/dist/carousel/carousel.thumbs.esm.js';

import { blockVisible } from './visibleBlockAndBtnShowMore.js';
const sliderCarousel = document.querySelector('.report__wrapper');
const options = {
	Dots: false,
	infinite: true,
	transition: 'slide',
	Thumbs: {
		type: 'classic',
	},
};

const sliderCarMain = new Carousel(sliderCarousel, options, { Thumbs });

const resetReport = () => {
	const textVisible = 'Показать все сведения';
	// swiperMini.update();
	// swiper.update();
	sliderCarMain.reInit();
	blockVisible('.report__info-block', '.report__info-btn', 3, textVisible);
};

export { resetReport };
