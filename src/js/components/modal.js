const modalErrorDelete = modal => {
  modal.querySelectorAll('.form__input')?.forEach(input => {
    input.classList.remove('just-validate-error-field');
  });
  modal.querySelectorAll('.just-validate-error-label')?.forEach(errorElement => errorElement.remove());
};

const modal = (btnOpen, modal, btnClose) => {
  btnOpen = document.querySelector(btnOpen);
  modal = document.querySelector(modal);
  btnClose = document.querySelector(btnClose);
  const body = document.body;

  // открытие модального окна
  btnOpen?.addEventListener('click', e => {
    e.preventDefault();
    body.classList.add('_lock');
    modal.classList.add('active');
  });
  // закрытие модального окна: по кнопке
  btnClose?.addEventListener('click', () => {
    body.classList.remove('_lock');
    modal.classList.remove('active');
    modalErrorDelete(modal);
  });
  // открытие модального окна: по области вокруг модального окна
  modal?.addEventListener('click', e => {
    if (e.target === modal) {
      body.classList.remove('_lock');
      modal.classList.remove('active');
      modalErrorDelete(modal);
    }
  });
};
// btnOpen --- класс кнопки, при клике на которую будет ОТКРЫВАТЬСЯ модальное окно
// modal --- класс открываемого модального окна
// btnClose --- класс кнопки, при клике на которую будет ЗАКРЫВАТЬСЯ модальное окно
export default modal;
