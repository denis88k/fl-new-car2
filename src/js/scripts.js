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
	// const selectInputs = document.querySelectorAll('.years__input'); // год от/ год до
	let selectFrom = 0;
	let selectTo = 0;
	let isBetween = () => false;
	let count = 0;

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
		if (!selectInput) {
			// console.log('вне инпута');
			return;
		}
		// console.log(e.target, selectInput, 'в инпут');
		const selector = selectInput.nextElementSibling; // блок со списком годов 'years__select'
		toggleClass(selectInput, 'active');
		toggleClass(selector, 'active');
		const checkboxBlocks = document.querySelectorAll('.years__checkbox-block');
		const inputYears = selectInput.querySelector('.input-years'); // вписывается год при выборе года
		selector.addEventListener(
			'click',
			function (e) {
				// console.dir(e.target.closest, 'option');
				const option = e.target.closest('.option');
				if (!option) {
					console.log('вне option');
					return;
				}
				const options = selector.querySelectorAll('.option');
				removeClassArray(options, 'active');
				inputYears.innerHTML = option.dataset.value;
				addClass(option, 'active');
				// console.log(option.parentElement.classList.contains('select-from'), 'option');
				const optionContainsFrom = containsClass(option.parentElement, 'select-from');
				const optionContainsTo = containsClass(option.parentElement, 'select-to');
				if (optionContainsFrom) {
					selectFrom = Number(option.dataset.value);
				}
				if (optionContainsTo) {
					selectTo = Number(option.dataset.value);
				}
				updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
				count++;
				console.log(selectInput, 'selectInput');
				console.log(selectFrom, '-', selectTo, 'option', count);

				const btnClearYears = selector.querySelector('.clear'); // кнопка сбросить выбор года
				btnClearYears.addEventListener('click', e => {
					removeClassArray(options, 'active');
					inputYears.innerHTML = '';
					if (optionContainsFrom) {
						selectFrom = 0;
						updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
					}
					if (optionContainsTo) {
						selectTo = 0;
						updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
					}

					count++;
					console.log(btnClearYears, 'btnClearYears');
					console.log(selectFrom, '-', selectTo, 'clearBtn', count);
				});
			},
			{ once: true },
		);
		// ====спрятать список годов====
	});

	// selectInputs.forEach(selectInput => {
	// 	const selector = selectInput.nextElementSibling; // блок со списком годов
	// 	selectInput.addEventListener('click', () => {
	// 		// toggleClass(selectInput, 'active');
	// 		// toggleClass(selector, 'active');

	// 		const checkboxBlocks = document.querySelectorAll('.years__checkbox-block');
	// 		const inputYears = selectInput.querySelector('.input-years'); // вписывается год при выборе года
	// 		const options = selector.querySelectorAll('.option'); // года
	// 		options.forEach(option => {
	// 			option.addEventListener('click', e => {
	// 				removeClassArray(options, 'active');
	// 				inputYears.innerHTML = e.target.dataset.value;
	// 				addClass(e.target, 'active');

	// 				if (containsClass(e.target.parentElement, 'select-from')) {
	// 					selectFrom = Number(e.target.dataset.value);
	// 				}

	// 				if (containsClass(e.target.parentElement, 'select-to')) {
	// 					selectTo = Number(e.target.dataset.value);
	// 				}
	// 				updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
	// 				count++;
	// 				console.log(selectInput, 'selectInput');
	// 				console.log(selectFrom, '-', selectTo, 'option', count);
	// 			});
	// 		});

	// 		const btnClearYears = selector.querySelector('.clear'); // кнопка сбросить выбор года
	// 		btnClearYears.addEventListener('click', e => {
	// 			removeClassArray(options, 'active');
	// 			inputYears.innerHTML = '';
	// 			if (containsClass(e.target.parentElement, 'select-from')) {
	// 				selectFrom = 0;
	// 				updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
	// 			}
	// 			if (containsClass(e.target.parentElement, 'select-to')) {
	// 				selectTo = 0;
	// 				updateCheckboxActive(checkboxBlocks, selectFrom, selectTo);
	// 			}

	// 			count++;
	// 			console.log(btnClearYears, 'btnClearYears');
	// 			console.log(selectFrom, '-', selectTo, 'clearBtn', count);
	// 		});
	// 	});
	// 	// ====спрятать список годов====
	// 	document.addEventListener('click', e => {
	// 		if (e.target !== selectInput) {
	// 			// console.log(e.target, selectInput);
	// 			[selectInput, selectInput.nextElementSibling].forEach(elem => removeClass(elem, 'active'));
	// 		}
	// 	});
	// });
};
document.addEventListener('click', function (e) {
	if (!e.target.closest('.years__input')) {
		// console.log(e.target, selectInput);
		document.querySelectorAll('.years__input').forEach(selectInput => {
			removeClass(selectInput, 'active');
			removeClass(selectInput.nextElementSibling, 'active');
		});
		// [selectInput, selectInput.nextElementSibling].forEach(elem => removeClass(elem, 'active'));
		// console.log('глобал ин');
	}
	// console.log('глобал');
});

yearsShowSelect();

// ====блоки с выбором года пробега====
const yearsCheckboxSelect = () => {
	const checkboxBlocks = document.querySelectorAll('.years__checkbox-block');
	removeClassArray(checkboxBlocks, 'active');
	checkboxBlocks.forEach(checkboxBlock => {
		checkboxBlock.addEventListener('click', () => {
			toggleClass(checkboxBlock, 'active');
		});
	});
	const btnShowMore = document.querySelector('.years__show-more');
	const btnShowMoreText = btnShowMore.querySelector('.years__show-more-text');
	let countCheckboxBlock = 5; // 6 шт
	// console.log(checkboxBlocks.length, 'checkboxBlocks.length');
	let isShowMore = false;
	if (checkboxBlocks.length > countCheckboxBlock) {
		for (let i = 0; i <= countCheckboxBlock; i++) {
			addClass(checkboxBlocks[i], 'isVisible');
		}

		btnShowMore.addEventListener('click', () => {
			if (!isShowMore) {
				// если другие поколения больше 6 не показаны
				for (let i = countCheckboxBlock + 1; i < checkboxBlocks.length; i++) {
					addClass(checkboxBlocks[i], 'isVisible');
				}
				btnShowMoreText.innerHTML = 'Свернуть';
				isShowMore = true;
				addClass(btnShowMore, 'active');
			} else if (isShowMore) {
				// если отображены все другие поколения
				for (let i = countCheckboxBlock + 1; i < checkboxBlocks.length; i++) {
					removeClass(checkboxBlocks[i], 'isVisible');
				}
				btnShowMoreText.innerHTML = 'Показать все поколения';
				isShowMore = false;
				removeClass(btnShowMore, 'active');
			}
		});
	}
	if (checkboxBlocks.length <= 5) {
		checkboxBlocks.forEach(checkboxBlock => addClass(checkboxBlock, 'isVisible'));
		btnShowMore.style.display = 'none';
	}
};

yearsCheckboxSelect();

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
