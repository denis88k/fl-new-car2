// =============swiper=============
import Swiper, { Navigation, Pagination, Thumbs } from 'swiper';

// слайдер в choice-car
const swipersChoice = document.querySelectorAll('.choice-car__swiper');
swipersChoice.forEach(swiperChoice => {
	const swiper = new Swiper(swiperChoice, {
		modules: [Navigation, Pagination],
		loop: true,
		pagination: {
			el: '.choice-car__pagination',
		},
		navigation: {
			nextEl: '.choice-car__btn-next',
			prevEl: '.choice-car__btn-prev',
		},
	});
});

// слайдер превью
const swiperReportMini = document.querySelector('.report__swiper-mini');
const swiperMini = new Swiper(swiperReportMini, {
	loop: true,
	freeMode: true,
	slidesPerView: 'auto',
});
// слайдер в report
const swiperReport = document.querySelector('.report__swiper');
const swiper = new Swiper(swiperReport, {
	modules: [Navigation, Thumbs],
	loop: true,
	navigation: {
		nextEl: '.report__btn-next',
		prevEl: '.report__btn-prev',
	},
	thumbs: {
		swiper: swiperMini,
	},
});

// =====================

const addClass = (element, cls) => {
	element?.classList.add(cls);
};
const toggleClass = (element, cls) => {
	element?.classList.toggle(cls);
};
const removeClass = (element, cls) => {
	element?.classList.remove(cls);
};
const containsClass = (element, cls) => {
	return element?.classList.contains(cls);
};
const removeClassArray = (elements, cls) => {
	elements?.forEach(element => {
		element?.classList.remove(cls);
	});
};
const closestElement = (element, cls) => {
	document.querySelectorAll(element)[0].closest(cls);
};
// console.log(closestElement('.years__checkbox-block', 'isVisible'));

// функция компонент для проставления галочек на checkboxBlock'ы
const checkboxComponent = block => {
	const componentCheckbox = document.querySelector(`.${block}__checkbox`);
	componentCheckbox.addEventListener('click', e => {
		const componentCheckboxBlock = e.target.closest(`.${block}__checkbox-block`);
		if (!componentCheckboxBlock) {
			// console.log('вне componentCheckboxBlock');
			return;
		}
		toggleClass(componentCheckboxBlock, 'active');
	});
};

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
// const blockVisibleAndBtnShowMore = (blocksShow, countBlockVisible, btn, btnText = '') => {
const blockVisibleAndBtnShowMore = (...params) => {
	// checkLengthVisible(blocksShow, countBlockVisible, btn);
	// btnShowMore(blocksShow, countBlockVisible, btn, btnText='',textHidden, textOpen);

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

		// btnShowMore.addEventListener('click', btnShowMoreClick.bind(null, countBlockVisible, blocks, btnShowMore, btnShowMoreText, textOpen, textHidden));
		const btnShowMoreClick = () => {
			console.log(isShowMore);
			for (let i = countBlockVisible; i <= blocks.length; i++) {
				isShowMore ? removeClass(blocks[i], 'isVisible') : addClass(blocks[i], 'isVisible');
			}
			toggleClass(btnShowMore, 'active');
			// isShowMore ? removeClass(btnShowMore, 'active') : addClass(btnShowMore, 'active');
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

// =======проверка кол-ва первых видимых блоков=======

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

// фиксация шапки консультанта
const consultSticky = document.querySelector('.consultant_sticky');
const chatConsultant = document.querySelector('.chat__consultant');
const TopChatConsultant = chatConsultant.getBoundingClientRect().top; // высота до верхней точки страница (не экрана, а СТРАНИЦЫ)
// console.log(TopChatConsultant);
window.addEventListener('scroll', () => {
	// console.log(window.scrollY);
	if (window.scrollY > TopChatConsultant * 1.03) {
		addClass(consultSticky, 'show');
	} else {
		containsClass(consultSticky, 'show') && removeClass(consultSticky, 'show');
	}
});

// =================years===============
const yearsShowSelect = () => {
	let selectFrom = 0;
	let selectTo = 0;
	let isBetween = () => false;
	// let count = 0;
	// функция проверяющая подходит ли checkboxBlock под условия
	const updateCheckboxActive = (checkboxBlocks, selectFrom, selectTo) => {
		// если задан from и to, то в промежутке
		if (selectFrom > 0 && selectTo > 0) {
			console.log(selectFrom, selectTo, 'оба больше нуля');
			// если from > to, то selectFrom = to, selectTo = from
			if (selectFrom > selectTo) {
				[selectFrom, selectTo] = [selectTo, selectFrom];
			}
			isBetween = checkboxBlock =>
				(selectFrom <= Number(checkboxBlock.dataset.from) && Number(checkboxBlock.dataset.from) <= selectTo) ||
				(selectFrom <= Number(checkboxBlock.dataset.to) && Number(checkboxBlock.dataset.to) <= selectTo);
		}
		// если задан from, а to=0, то показать всё, что больше from
		if (selectFrom > 0 && selectTo === 0) {
			console.log('год от больше нуля:', selectFrom, 'год до=0:', selectTo);
			isBetween = checkboxBlock => selectFrom <= Number(checkboxBlock.dataset.from) || selectFrom <= Number(checkboxBlock.dataset.to);
		}
		// если задан from=0, а to задан, то показать всё, что меньше to
		if (selectFrom === 0 && selectTo > 0) {
			console.log('год от=нулю:', selectFrom, 'год до больше 0:', selectTo);
			isBetween = checkboxBlock => selectTo >= Number(checkboxBlock.dataset.to) || selectTo >= Number(checkboxBlock.dataset.from);
		}
		if (selectFrom === 0 && selectTo === 0) {
			console.log('всё по нулям:', selectFrom, '-', selectTo);
			isBetween = () => false;
		}
		console.log(isBetween);
		// removeClassArray(checkboxBlocks, 'active');
		checkboxBlocks.forEach(checkboxBlock => {
			if (isBetween(checkboxBlock)) {
				// console.log(checkboxBlock);
				// const dataBetween = {
				// 	selectFrom: selectFrom,
				// 	selectTo: selectTo,
				// 	checkboxBlockFrom: Number(checkboxBlock.dataset.from),
				// 	checkboxBlockTo: Number(checkboxBlock.dataset.to),
				// };
				// console.table(dataBetween);
				addClass(checkboxBlock, 'active');
			} else {
				containsClass(checkboxBlock, 'active') && removeClass(checkboxBlock, 'active');
			}
		});
	};

	const selects = document.querySelector('.years__selects');
	selects.addEventListener('click', e => {
		const selectInput = e.target.closest('.years__input');
		const YearsOption = e.target.closest('.years__option');

		if (selectInput) {
			console.log('selectInput====');
			// count++;
			const selector = selectInput.nextElementSibling; // блок со списком годов
			toggleClass(selectInput, 'active');
			toggleClass(selector, 'active');
			// console.log(selectFrom, '-', selectTo, 'count:', count);
		}

		if (YearsOption) {
			const selector = YearsOption.closest('.years__select');
			const options = selector.querySelectorAll('.option');
			removeClassArray(options, 'active');
			const selectInput = selector.previousElementSibling;
			const inputYears = selectInput.querySelector('.input-years'); // вписывается год при выборе года
			const optionContainsFrom = containsClass(YearsOption.parentElement, 'select-from');
			const optionContainsTo = containsClass(YearsOption.parentElement, 'select-to');
			const checkboxBlocks = document.querySelectorAll('.years__checkbox-block'); // блоки checkbox с поколениями
			if (containsClass(YearsOption, 'option')) {
				console.log('option====');
				// count++;
				const option = YearsOption.closest('.option');
				addClass(option, 'active');
				inputYears.innerHTML = option.dataset.value;

				if (optionContainsFrom) {
					selectFrom = Number(option.dataset.value);
				}
				if (optionContainsTo) {
					selectTo = Number(option.dataset.value);
				}

				updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
				// console.log(selectFrom, '-', selectTo, 'count:', count);
			}

			if (containsClass(YearsOption, 'clear')) {
				console.log('optionClear====');
				// count++;

				inputYears.innerHTML = '';
				if (optionContainsFrom) {
					selectFrom = 0;
					updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
				}
				if (optionContainsTo) {
					selectTo = 0;
					updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
				}
				// console.log(selectFrom, '-', selectTo, 'count:', count);
			}
		}
		return;
	});
	// ====спрятать список годов====
	document.addEventListener('click', function (e) {
		if (!e.target.closest('.years__input')) {
			// console.log(e.target, selectInput);
			document.querySelectorAll('.years__input').forEach(selectInput => {
				removeClass(selectInput, 'active');
				removeClass(selectInput.nextElementSibling, 'active');
			});
			// console.log('глобал ин');
		}
		// console.log('глобал');
	});
};
yearsShowSelect();
// ======обнуление инпута года выпуска/поколений======
const resetYearsShowSelect = () => {
	document.querySelector('.select-from>.clear').click();
	document.querySelector('.select-to>.clear').click();
};

// ====блоки с выбором года выпуска (поколений) ====
// const yearsCheckbox = () => {
// 	const yearsCheckbox = document.querySelector('.years__checkbox');
// 	yearsCheckbox.addEventListener('click', e => {
// 		const yearsCheckboxBlock = e.target.closest('.years__checkbox-block');
// 		if (!yearsCheckboxBlock) {
// 			console.log('вне yearsCheckboxBlock');
// 			return;
// 		}
// 		toggleClass(yearsCheckboxBlock, 'active');
// 	});
// };
// yearsCheckbox();
checkboxComponent('years');

// ====КНОПКА "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"=====
// btnShowMore('.years__checkbox-block', '.years__show-more', '.years__show-more-text', 5, 'Свернуть', 'Показать все поколения');
blockVisibleAndBtnShowMore('.years__checkbox-block', 6, '.years__show-more', '.years__show-more-text', 'Показать все поколения');

// ======обнуление кнопки "ПОКАЗАТЬ ВСЕ ПОКОЛЕНИЯ"======
// resetBtnShowMore('.years__show-more', '.years__checkbox-block', 5);

// ===========ПРОБЕГ===========
// ======CHECKBOX ПРОБЕГА======
// const mileageCheckbox = () => {
// 	const mileageCheckbox = document.querySelector('.mileage__checkbox');
// 	mileageCheckbox.addEventListener('click', e => {
// 		const mileageCheckboxBlock = e.target.closest('.mileage__checkbox-block');
// 		if (!mileageCheckboxBlock) {
// 			console.log('вне mileageCheckboxBlock');
// 			return;
// 		}
// 		toggleClass(mileageCheckboxBlock, 'active');
// 	});
// };
// mileageCheckbox();
checkboxComponent('mileage');

// ======INPUT ПРОБЕГА======
const mileageInput = () => {
	// const mileageInputs = document.querySelectorAll('.mileage__input');
	const mileageInputs = document.querySelector('.mileage__inputs');
	const mileageCheckboxBlocks = document.querySelectorAll('.mileage__checkbox-block');
	const valueFrom = document.querySelector('.input-from');
	const valueTo = document.querySelector('.input-to');
	let inputFrom = 0;
	let inputTo = 0;
	let isMore100 = () => false;
	let isLess100 = () => false;
	mileageInputs.addEventListener('input', e => {
		removeClassArray(mileageCheckboxBlocks, 'active');
		inputFrom = Number(valueFrom.value.split(' ').join('').replace(/,/gi, '.'));
		inputTo = Number(valueTo.value.split(' ').join('').replace(/,/gi, '.'));
		// console.log(inputFrom, inputTo);
		// const inputValue = Number(e.target.value.split(' ').join('').replace(/,/gi, '.'));
		// console.log(inputValue, 'inputValue');
		e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
		// console.log(e.target.value);
		// inputFrom > inputTo, то [inputFrom, inputTo] = [inputTo, inputFrom]
		if (inputFrom > inputTo && inputTo !== 0) {
			console.log('деструктуризация');
			[inputFrom, inputTo] = [inputTo, inputFrom];
		}
		// inputFrom < 100k, inputTo > 100k, то ничего
		// inputFrom = 100k, inputTo = 100k, то ничего
		if (
			(inputFrom < 100_000 && inputFrom !== 0 && inputTo > 100_000) ||
			(inputFrom === 100_000 && inputTo === 100_000) ||
			(inputFrom === 0 && inputTo === 0)
		) {
			// console.log('ни один из вариантов');
			return;
		}
		// =====от=====
		// inputFrom >= 100k inputTo=0, то от 100к
		// inputFrom=0 inputTo>100, то от 100к
		// inputFrom > 100k, inputTo > 100k, то от 100к
		// inputFrom = 100k, inputTo > 100k, то от 100к
		isMore100 = () => {
			return (
				(inputFrom >= 100_000 && inputTo === 0) ||
				(inputFrom === 0 && inputTo > 100_000) ||
				(inputFrom > 100_000 && inputTo > 100_000) ||
				(inputFrom === 100_000 && inputTo > 100_000)
			);
		};
		// console.log(inputFrom >= 100_000 && inputTo === 0);
		// console.log(inputFrom === 0 && inputTo > 100_000);
		// console.log(inputFrom > 100_000 && inputTo > 100_000);
		// console.log(inputFrom === 100_000 && inputTo > 100_000);
		// =====до=====
		// inputFrom < 100k inputTo=0, то до 100к
		// inputFrom=0 inputTo<=100, то до 100к
		// inputFrom < 100k, inputTo < 100k, то до 100к
		// inputFrom < 100k, inputTo = 100k, то до 100к
		isLess100 = () => {
			return (
				(inputFrom < 100_000 && inputFrom !== 0 && inputTo === 0) ||
				(inputFrom === 0 && inputTo <= 100_000) ||
				(inputFrom < 100_000 && inputFrom !== 0 && inputTo < 100_000 && inputTo !== 0) ||
				(inputFrom < 100_000 && inputTo === 100_000)
			);
		};
		// console.log('=====');
		// console.log(inputFrom < 100_000 && inputFrom !== 0 && inputTo === 0);
		// console.log(inputFrom === 0 && inputTo <= 100_000);
		// console.log(inputFrom < 100_000 && inputFrom !== 0 && inputTo < 100_000 && inputTo !== 0);
		// console.log(inputFrom < 100_000 && inputTo === 100_000);

		if (isMore100()) {
			addClass(mileageCheckboxBlocks[1], 'active');
			// console.log('isMore100');
		}
		if (isLess100()) {
			addClass(mileageCheckboxBlocks[0], 'active');
			// console.log('isLess100');
		}
		// console.log('inputFrom:', inputFrom, '-', inputTo, ':inputTo');
	});
};
mileageInput();

// ======обнуление инпута пробега======
const resetMileageInput = () => {
	document.querySelector('.input-from').value = '';
	document.querySelector('.input-to').value = '';
	removeClassArray(document.querySelectorAll('.mileage__checkbox-block'), 'active');
};

// ===========ВЛАДЕЛЕЦ===========
// ======CHECKBOX владелец======
// const ownerCheckbox = () => {
// 	const ownerCheckbox = document.querySelector('.owner__checkbox');
// 	ownerCheckbox.addEventListener('click', e => {
// 		const ownerCheckboxBlock = e.target.closest('.owner__checkbox-block');
// 		if (!ownerCheckboxBlock) {
// 			console.log('вне ownerCheckboxBlock');
// 			return;
// 		}
// 		toggleClass(ownerCheckboxBlock, 'active');
// 	});
// };
// ownerCheckbox();
checkboxComponent('owner');
const resetCheckboxOwner = () => {
	removeClassArray(document.querySelectorAll('.owner__checkbox-block'), 'active');
};

// ===========кнопка "сведения все сведения" в секции report__info===========
// btnShowMore('.report__info-block', '.report__info-btn', '', 2, 'Свернуть', 'Показать все сведения');
blockVisibleAndBtnShowMore('.report__info-block', 3, '.report__info-btn', '', 'Показать все сведения');

// прокрутка до определённого сообщения
// https://learn.javascript.ru/size-and-scroll-window
// false - elem внизу
// true - elem вверху
// elem.scrollIntoView(false)

// ===========================Логика чата===================

// чат
// необходимые переменные:
// номер чата --- numberChat
// блок с чатом, который определяется от data-chat --- chat
// блок с чатом -> блоки с вопросами
// блок с чатом -> блок с выбором, которое появляется как сообщения чата --- msgBlocksChoiceElement
// блок с выбором -> блоки для выбора --- blockChoiceElement
// блок с выбором -> блоки для выбора -> выбранный блок добавляется класс active чтобы подсветить выбранный элемент

// скроллы
const scrollMsg = msg => {
	window.scrollBy({
		top: msg.offsetHeight + 10, // скролл на высоту сообщения консультанта
		behavior: 'smooth',
	});
};
// скролл до конца сообщения клиента
const scrollIntoViewOptions = {
	behavior: 'smooth',
	block: 'end',
	inline: 'nearest',
};

// скролл до начала новой темы чата, после того, как все сообщения появились
const scrollChat = chat => {
	const elementPosition = chat.getBoundingClientRect().top; //расстояние от элемента до верхней части экрана
	const consultantSticky = document.querySelector('.consultant_sticky');
	// если consultantSticky виден, то скроллится с учётом высоты этого стики, если нет, то без учёта
	const offsetPosition = elementPosition - (consultantSticky ? consultantSticky.offsetHeight : 0); // насколько нужно скролить
	window.scrollBy({
		top: offsetPosition,
		behavior: 'smooth',
	});
};

// ===================================сам чатик==========
let numberChat = 0;
let processWork;

const chats = document.querySelectorAll('.chat-messages');
const chatLength = chats.length; // длина блоков чата
// логика работы
const chatLogic = numberChat => {
	// timerId = setTimeout(() => {
	processWork = true;
	const chat = document.querySelector(`.chat-messages[data-chat="${numberChat}"]`); // блок чата
	const msgBlocks = chat.querySelectorAll('.chat__message-block'); // блок сообщений консультанта + анимация печатания
	// блоки с сообщениями консультанта
	msgBlocks.forEach((msgBlock, index) => {
		const msgPrint = msgBlock.querySelector('.chat__message-print'); // анимация печатания
		const msgConsult = msgBlock.querySelector('.chat__message-consultant'); // сообщение консультанта

		setTimeout(() => {
			// добавление надписи о том, что консультант печатает, с задержкой в 550мс
			setTimeout(() => {
				!msgPrint.classList.contains('msg-print-show') && msgPrint.classList.add('msg-print-show');
				numberChat && scrollMsg(msgPrint); // плавный автоматический скролл до анимации печатания
			}, 500);
			// скрытие о печатании консультанта
			// показ сообщения от консультанта
			// с задержкой в 2,5с
			setTimeout(() => {
				msgPrint.classList.remove('msg-print-show'); // удаление анимации печатания
				msgConsult.classList.add('msg-show'); // появление сообщения консультанта
				numberChat && scrollMsg(msgConsult); // плавный автоматический скролл до сообщения консультанта
				// console.log(msgConsult, msgConsult.offsetHeight);
			}, 2500);
		}, index * 2500 + 550);
	});

	// блок с выборами
	const msgBlocksChoice = chat.querySelector('.chat__message-block-choice');
	setTimeout(() => {
		msgBlocksChoice?.classList.add('msg-show'); // блок с выборами появляется

		// numberChat && chat.scrollIntoView(scrollIntoViewOptionsChat);
		if (numberChat === chatLength - 1) {
			document.querySelector('.promo__footer-inner').classList.add('active');
			document.querySelector('.footer').classList.add('active');
		}
		setTimeout(() => {
			numberChat && scrollChat(chat); // плавный скролл до начала нового блока чата с отступом
		});
		// появление всех блоков завершено
		setTimeout(() => {
			processWork = false;
		});
	}, 2500 * msgBlocks.length + 950);

	// блоки c вариантами выбора, за которыми нужно следить
	const blocksChoice = msgBlocksChoice.querySelectorAll('.block-choice');
	if (blocksChoice) {
		const msgAnswer = chat.querySelector('.chat__message-client');

		const clickNextChat = e => {
			// console.log(e.currentTarget.dataset.car);

			// console.log(processWork);
			let currentNumber = Number(chat.dataset.chat);
			// console.log(currentNumber, 'chat', numberChat, 'numberChat');
			if (currentNumber === numberChat) {
				// console.log('currentNumber === numberChat', currentNumber, numberChat);

				blocksChoice.forEach(block => block.classList.remove('active'));
				e.currentTarget.classList.add('active');
				msgAnswer.innerHTML = e.currentTarget.dataset.choice;
				msgAnswer.classList.add('msg-show-client'); // показать сообщение клиента
				document.querySelector('.chat__inner').scrollIntoView(scrollIntoViewOptions); // прокрутка вниз, до сообщения с ответом клиента

				numberChat++;
				chatLogic(numberChat);
			} else {
				if (!processWork) {
					// срабатывает когда нажимаешь на блок с выборами, на другой вариант
					// и тогда удаляются все активные классы в других темах чата
					// console.log('заново');
					blocksChoice.forEach(block => block.classList.remove('active'));
					e.currentTarget.classList.add('active');

					// а теперь пройдёмся по всем темам чата, которые уже открыты
					for (let i = currentNumber + 1; i < chatLength; i++) {
						const msgBlocks = chats[i].querySelectorAll('.chat__message-block'); // блок сообщений консультанта + анимация печатания
						// блоки с анимацией печатания и с сообщениями консультанта
						msgBlocks.forEach(msgBlock => {
							const msgPrint = msgBlock.querySelector('.chat__message-print'); // анимация печатания
							msgPrint.classList.contains('msg-print-show') && msgPrint.classList.add('msg-print-show');

							const msgChatConsultant = msgBlock.querySelector('.chat__message-consultant');
							msgChatConsultant.classList.contains('msg-show') && msgChatConsultant.classList.remove('msg-show');
						});

						// блок с выборами
						const msgBlocksChoice = chats[i].querySelector('.msg-blocks-choice');
						msgBlocksChoice.classList.contains('msg-show') && msgBlocksChoice?.classList.remove('msg-show');

						// блоки с вариантами выбора
						const BlocksChoice = msgBlocksChoice.querySelectorAll('.block-choice');
						if (BlocksChoice) {
							BlocksChoice.forEach(blockChoice => {
								blockChoice.classList.contains('active') && blockChoice.classList.remove('active');
							});
						}

						// ответы клиента
						const msgClient = chats[i].querySelector('.chat__message-client'); // сообщение клиента
						msgClient?.classList.contains('msg-show-client') && msgClient.classList.remove('msg-show-client'); // если ответ клиента отображён, то удалить этот класс

						// если следующая тема чата это последний чат, то нужно скрыть actual-promo и footer
						if (i === chatLength - 1) {
							document.querySelector('.promo__footer-inner').classList.remove('active');
							document.querySelector('.footer').classList.remove('active');
						}
					}

					// если ответ клиента отображён, то удалить этот класс:
					msgAnswer.classList.contains('msg-show-client') && msgAnswer.classList.remove('msg-show-client');
					msgAnswer.innerHTML = e.currentTarget.dataset.choice;
					setTimeout(() => {
						msgAnswer.classList.add('msg-show-client');
						document.querySelector('.chat__inner').scrollIntoView(scrollIntoViewOptions); // прокрутка вниз, до сообщения с ответом клиента
						// console.log(numberChat, 'новый счёт');
						chatLogic(numberChat);
					}, 200);
				} else return;
			}
		};

		blocksChoice.forEach(block => {
			block.addEventListener('click', clickNextChat);
		});
	}
};

// chatLogic(numberChat);
