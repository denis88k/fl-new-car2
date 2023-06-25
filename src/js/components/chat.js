// прокрутка до определённого сообщения
// https://learn.javascript.ru/size-and-scroll-window
// false - elem внизу
// true - elem вверху
// elem.scrollIntoView(false)

import { addClass, closestElement, containsClass, removeClass, removeClassArray } from './helpers.js';
import { resetMileage } from './mileage.js';
import { resetOwner } from './owner.js';
import { resetReport } from './report.js';
import { blockVisibleAndBtnShowMore } from './visibleBlockAndBtnShowMore.js';
import { resetYears } from './years.js';

// ==============CHAT "GIGA"===================

// resetMulti
// 1 --- resetYears(); blockVisibleAndBtnShowMore('.years__checkbox-block', 6, '.years__show-more', '.years__show-more-text', 'Показать все поколения')
// 2 --- resetMileage()
// 3 --- resetOwner()
// 6 --- blockVisibleAndBtnShowMore('.report__info-block', 3, '.report__info-btn', '', 'Показать все сведения');

// чат
// необходимые переменные:
// номер чата --- numberChat
// блок с чатом, который определяется от data-chat --- chat
// блок с чатом -> блоки с вопросами
// блок с чатом -> блок с выбором, которое появляется как сообщения чата --- msgBlocksChoiceElement
// блок с выбором -> блоки для выбора --- blockChoiceElement
// блок с выбором -> блоки для выбора -> выбранный блок добавляется класс active чтобы подсветить выбранный элемент

// =========скроллы========
// скролл до начала сообщения от консультанта +10px вверх
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

// const chatInner = document.querySelector('.chat__inner');

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

// ===========сам GIGA CHATIC==========
let numberChat = 0; // необходим, т.к. будем сравнивать текущий чат, с другой относительной позицией чата, чтобы вернуться к прошлому чату
let processWork;

const chatMain = document.querySelector('.chat');
const chats = document.querySelectorAll('.chat-messages');
const chatLength = chats.length; // длина блоков чата 8

const scrollEndChat = () => {
	chatMain.scrollIntoView(scrollIntoViewOptions);
};
// NOTE: последние чаты
const chatBlock = chatMain.querySelectorAll('.chat__block');
const promoFooterInner = document.querySelector('.promo__footer-inner');
const footer = document.querySelector('.footer');

const showLastChat = chat => {
	console.log(numberChat, 'show-chat');
	setTimeout(() => {
		addClass(chatBlock[1], 'msg-show'); // 6
		addClass(chatBlock[2], 'msg-show'); // 7
		addClass(promoFooterInner, 'active');
		addClass(footer, 'active');
		scrollChat(chat);
	}, 3800);
};
const hiddenLastChat = () => {
	removeClass(chatBlock[1], 'msg-show'); // 6
	removeClass(chatBlock[2], 'msg-show'); // 7
	removeClass(promoFooterInner, 'active');
	removeClass(footer, 'active');
};

// NOTE: удаление активных классов с чатов, которые отображены, дальше той секции блока, в котором произошёл клик
const resetActiveAllBlock = currentNumber => {
	for (let i = currentNumber + 1; i < chatLength - 2; i++) {
		// ====NOTE: chat__message-block====
		// ====получаем кол-во блоков сообщений: анимация печати + вопрос консультанта
		const msgBlocks = chats[i].querySelectorAll('.chat__message-block');
		// блоки с анимацией печатания и с сообщениями консультанта --- удаляем в них активные классы
		msgBlocks.forEach(msgBlock => {
			// анимация печатания
			const msgPrint = msgBlock.querySelector('.chat__message-print'); // анимация печатания
			// сообщение с вопросом консультанта
			const msgChatConsultant = msgBlock.querySelector('.chat__message-consultant');
			// удаление активных классов
			removeClass(msgPrint, 'msg-print-show');
			removeClass(msgChatConsultant, 'msg-show');
		});
		// NOTE: блок CHOICE
		const msgBlocksChoice = chats[i].querySelector('.chat__message-block-choice');
		if (msgBlocksChoice) {
			// блок с выборами
			removeClass(msgBlocksChoice, 'msg-show');
			// блоки с вариантами выбора
			const BlocksChoice = msgBlocksChoice.querySelectorAll('.block-choice');
			BlocksChoice && removeClassArray(BlocksChoice, 'active');
		}
		// NOTE: блок MULTi
		if (chats[i].querySelector('.chat__choice-multi')) {
			switch (i) {
				case 1:
					resetYears();
				case 2:
					resetMileage();
				case 3:
					resetOwner();
				case 5:
			}
		}

		// сообщение ответа клиента
		const msgClient = chats[i].querySelector('.chat__message-client');
		removeClass(msgClient, 'msg-show');

		// если тема чата это предпоследний чат, то нужно скрыть:
		//  два последних чата и actual-promo и footer
		if (i === chatLength - 3) {
			hiddenLastChat();
			resetReport();
		}
	}
};

// =====ЛОГИКА ЧАТА2=====
const chat2 = () => {
	console.log(numberChat, 'numberChat');
	processWork = true;
	// получаем блок чата
	// ====NOTE: chat=№
	const chat = document.querySelector(`.chat-messages[data-chat="${numberChat}"]`);
	// ====NOTE: chat__message-block====
	// ====получаем кол-во блоков сообщений: анимация печати + вопрос консультанта
	const msgBlocks = chat.querySelectorAll('.chat__message-block');
	// показ сообщений консультанта
	msgBlocks.forEach((msgBlock, index) => {
		// анимация печатания
		const msgPrint = msgBlock.querySelector('.chat__message-print');
		// сообщение с вопросом консультанта
		const msgConsult = msgBlock.querySelector('.chat__message-consultant');

		setTimeout(() => {
			// анимация 'Ольга печатает...', задержка появления в 500мс
			setTimeout(() => {
				// !msgPrint.classList.contains('msg-print-show') && msgPrint.classList.add('msg-print-show');
				addClass(msgPrint, 'msg-print-show');
				// если это не первая секция чата, то плавный скролл на высоту сообщения от консультанта
				numberChat && scrollMsg(msgPrint);
			}, 600);
			// скрытие о печатании консультанта
			// показ вопроса от консультанта
			// с задержкой в 2,5с + 550мс
			setTimeout(() => {
				// удаление анимации печатания
				removeClass(msgPrint, 'msg-print-show');
				// показ сообщение вопроса консультанта
				addClass(msgConsult, 'msg-show');
				// если это не первая секция чата, то плавный скролл на высоту сообщения от консультанта
				numberChat && msgConsult && scrollMsg(msgConsult);
				// console.log(msgConsult, msgConsult.offsetHeight);
			}, 2500);
		}, index * 2500 + 650);
		// 2500 + 550:
		//						--- 550(500) - с запасом взятое время появления анимации печати,
		//						--- 2500 - время удаления + появления вопроса консультанта
		// итого время показа одного блока сообщений консультанта "2500+550=3050мс"
	});

	// ====если номер чата равен 6 (отчёт авто/report),
	// то нужно показать эти блоки и выйти
	if (numberChat === chatLength - 3) {
		console.log('last');
		showLastChat(chat);
		setTimeout(() => {
			processWork = false;
		});
		return;
	}
	// сообщение ответ клиента
	const msgAnswer = chat.querySelector('.chat__message-client');
	// блок choice
	const msgBlockChoice = chat.querySelector('.chat__message-block-choice');
	// блок multi
	const msgBlockMulti = chat.querySelector('.chat__choice-multi');

	// ====текущий чат, эта переменная необходима, чтобы она замкнулась в прослушке функции следящая за блоком выборов и для блоков с multi
	const currentNumber = Number(chat.dataset.chat);
	// const currentNumber = numberChat;
	setTimeout(() => {
		// блок с выборами появляется, если он есть в секции чата
		msgBlockChoice && addClass(msgBlockChoice, 'msg-show');
		setTimeout(() => {
			// плавный скролл до начала нового блока чата с отступом
			numberChat && scrollChat(chat);
		});
		// появление всех блоков завершено
		setTimeout(() => {
			processWork = false;
		});
	}, 2500 * msgBlocks.length + 950);

	// ======NOTE: "блок с выборами"
	if (msgBlockChoice) {
		// ====NOTE: блок с выборами (choice)
		console.log('choice');

		// блоки c вариантами выбора, за которыми нужно следить
		// родитель блоков выбора
		const blocksChoice = msgBlockChoice.querySelector('.blocks-choice');
		// сами блоки выбора
		const blockChoiceAll = msgBlockChoice.querySelectorAll('.block-choice');

		const blockChoiceClick = e => {
			console.log(processWork, 'choice');
			// не фиксировать нажатия на кнопки slider'а
			if (containsClass(e.target, 'choice-car__btn-next') || containsClass(e.target, 'choice-car__btn-prev')) {
				return;
			}

			// блок на который нажали
			const block = closestElement(e.target, 'block-choice');
			// если текущий чат совпадает с глобальным номером чата,
			// то есть нажали на выбор в последнем доступном чате, то:
			if (currentNumber === numberChat && block) {
				console.log('currentNumber === numberChat');
				removeClassArray(blockChoiceAll, 'active');
				// доб. класс active на нажатый выбор
				addClass(block, 'active');
				// ответ берём из data блока на который нажали
				msgAnswer.innerText = block.dataset.choice;
				// показываем сообщение ответ клиента
				addClass(msgAnswer, 'msg-show');
				// прокрутка вниз, до сообщения с ответом клиента, т.е. внизу окажется сообщение ответ клиента
				scrollEndChat();
				// увеличиваем счётчик чата, чтобы запустить следующий чат
				numberChat++;
				chat2();
			} else {
				// NOTE: когда меняем ответ в чате
				// но нас не пустит, пока process work не станет === false
				// он меняется выше, после появление последнего блока
				if (!processWork) {
					// срабатывает когда нажимаешь на блок с выборами, на другой вариант
					// и тогда удаляются все активные классы в других темах чата
					console.log('заново choice');
					// ====скрываем сообщение ответ клиента:
					removeClass(msgAnswer, 'msg-show');
					msgAnswer.innerText = block.dataset.choice;

					// удаляем активные классы с данного choice
					removeClassArray(blockChoiceAll, 'active');
					// доб. активный класс на тот блок, который нажали
					addClass(block, 'active');

					// ====NOTE: пройдёмся по всем секциям чата, которые отображены, дальше той секции блока, в котором произошёл клик
					resetActiveAllBlock(currentNumber);

					setTimeout(() => {
						// появляется сообщение клиента
						addClass(msgAnswer, 'msg-show');
						// скролл до конца сообщения клиента
						// прокрутка вниз, до сообщения с ответом клиента
						console.log(currentNumber, 'last');
						scrollEndChat();
						// NOTE: должен же запускаться number= currentNumber+1
						// запускаем секцию чата, в которой произошёл клик, заново
						numberChat = currentNumber + 1;
						console.log(numberChat, 'новый счёт');
						chat2();
					}, 200);
				} else return;
			}
		};

		blocksChoice.addEventListener('click', blockChoiceClick);
	}

	// ======NOTE: БЛОК MULTI
	if (msgBlockMulti) {
		console.log('multi');

		const btnContinue = chat.querySelector('.btn-continue');
		const btnContinueClick = () => {
			console.log(processWork, 'MULTI');
			if (currentNumber === numberChat) {
				// ответ берём из data кнопки на которую нажали
				msgAnswer.innerText = btnContinue.dataset.multi;
				// сообщение ответ клиента
				addClass(msgAnswer, 'msg-show');
				// прокрутка вниз, до сообщения с ответом клиента
				scrollEndChat();

				// увеличиваем счётчик чата, чтобы запустить следующий чат
				numberChat++;
				chat2();
			} else {
				if (!processWork) {
					console.log('заново multi');

					// ====скрываем сообщение ответ клиента:
					removeClass(msgAnswer, 'msg-show');
					msgAnswer.innerText = btnContinue.dataset.multi;

					// ====NOTE: пройдёмся по всем секциям чата, которые отображены, дальше той секции блока, в котором произошёл клик
					resetActiveAllBlock(currentNumber);

					setTimeout(() => {
						// появляется сообщение клиента
						addClass(msgAnswer, 'msg-show');
						// скролл до конца сообщения клиента
						// прокрутка вниз, до сообщения с ответом клиента
						// chatInner.scrollIntoView(scrollIntoViewOptions);

						scrollEndChat();
						numberChat = currentNumber + 1;
						console.log(numberChat, 'новый счёт');
						// NOTE: должен же запускаться number= currentNumber+1
						// запускаем секцию чата, в которой произошёл клик, заново
						chat2();
					}, 200);
				}
			}
		};
		btnContinue.addEventListener('click', btnContinueClick);
	}
};

// ==========
// =======
// =======
// =======
// ==========

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

export { chat2 };
