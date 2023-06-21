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

export { chatLogic };
