import modal from './components/modal.js';

// promo-header
modal('.promo__header-modal-payment', '.modal-payment', '.modal-payment .modal__close');
modal('.promo__header-modal-tradIn', '.modal-tradIn', '.modal-tradIn .modal__close');

// promo-actual
modal('.promo__header-modal-discount', '.modal-discount', '.modal-discount .modal__close');
modal('.promo__header-modal-tiresСasco', '.modal-tiresСasco', '.modal-tiresСasco .modal__close');
modal('.promo__header-modal-bestPrice', '.modal-bestPrice', '.modal-bestPrice .modal__close');

import validateForms from './components/validation.js';

document.querySelectorAll('.form').forEach(form => {
  validateForms(form);
  form.querySelectorAll('.form__input').forEach(input => {
    input.onblur = function (e) {
      if (this.classList.contains('input__tel')) {
        // console.log(e.target.inputmask.unmaskedvalue().length, 'blur tel');
        const targetLength = e.target.inputmask.unmaskedvalue().length;
        if (0 < targetLength && targetLength < 10) {
          this.classList.add('just-validate-error-field');
        } else if (0 < targetLength) {
          this.classList.add('just-validate-success-field');
        }
      }
      if (this.classList.contains('input__name')) {
        // console.log(e.target.value.length, 'blur name');
        const targetLength = e.target.value.length;
        if (0 < targetLength && targetLength < 3) {
          this.classList.add('just-validate-error-field');
        } else if (0 < targetLength) {
          this.classList.add('just-validate-success-field');
        }
      }
    };
    input.onfocus = function () {
      // if (this.classList.contains('input__tel')) {
      //   console.log(this.inputmask.unmaskedvalue(), 'focus tel');
      // }
      this.classList.contains('just-validate-error-field') && this.classList.remove('just-validate-error-field');
      this.classList.contains('just-validate-success-field') && this.classList.remove('just-validate-success-field');
      // if (this.classList.contains('input__name')) {
      //   console.log(this, 'focus name');
      // }
    };
  });
});
