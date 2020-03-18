export class FormValidator {
  constructor(currentPopup) {
    this.popup = currentPopup;

      let clearErrors = currentPopup.querySelector('form').querySelectorAll('.popup__error');
      for(let i = 0; i < clearErrors.length; i++) {
        clearErrors[i].textContent = '';
        clearErrors[i].classList.remove('popup__error_show');
      }
    this.setEventListeners(currentPopup);
    this.setSubmitButtons(currentPopup);
  }

  setEventListeners(form) {
    const formElements = form.querySelectorAll('input');

    for(let i = 0; i < formElements.length; i++) {
      const input = formElements[i];
      const errorBox = input.nextElementSibling;
      input.addEventListener('input', this.checkInputValidity(input, errorBox));
      input.addEventListener('input', this.setSubmitButtons);
   }
}

  checkInputValidity(input, errorBox) {
    input.addEventListener('input', function() {

      const inputLength = input.value.length;
      const hasErrors = (errorBox.textContent.length !== 0);
      const isUrl = (input.name === 'link');
      const urlReg = new RegExp('^http.', 'gi');
      const errors = {
         valueLength: 'Должно быть от 2 до 30 символов',
         noValue: 'Это обязательное поле',
         urlValue: 'Здесь должна быть ссылка'
      }
    
      if(isUrl) {
        if(!input.value.match(urlReg)) {
          errorBox.textContent = errors.urlValue;
          errorBox.classList.add('popup__error_show');
        }
    
        if(!inputLength) {
          errorBox.textContent = errors.noValue;
          errorBox.classList.add('popup__error_show');
        }
    
        if(input.value.match(urlReg)) {
          if(hasErrors) {
            errorBox.textContent = '';
      errorBox.classList.remove('popup__error_show');
           }
          
        }
       } else {
      if((inputLength && inputLength < 2) || inputLength > 30) {
        errorBox.textContent = errors.valueLength;
              if(!hasErrors) {
               errorBox.textContent = errors.valueLength;
         errorBox.classList.add('popup__error_show');
               }
      
            }
            if(!inputLength) {
        errorBox.textContent = errors.noValue;
               if(!hasErrors) {
                 errorBox.textContent = errors.noValue;
           errorBox.classList.add('popup__error_show');
                }
      }
      if (inputLength >= 2 && inputLength < 30) {
               if(hasErrors) {
                 errorBox.textContent = '';
           errorBox.classList.remove('popup__error_show');
                }
      }
        }
    })

  }

  setSubmitButtons() {
    const thisForm = document.querySelector('.popup_is-opened');
    const errMessLength = thisForm.querySelectorAll('.popup__error_show').length;
    const submitButton = thisForm.querySelector('.popup__button');
    const buttonEnabled = (submitButton.disabled === false);
    const inputs = thisForm.querySelectorAll('input');
    let isNotFilled = false;
  
    for(let i = 0; i < inputs.length; i++) {
        if(!inputs[i].value) { isNotFilled = true; }
    }
  
    if(errMessLength > 0 && buttonEnabled) {
        submitButton.setAttribute('disabled', true);
        return false;
    }
  
    if(isNotFilled && buttonEnabled) {
        submitButton.setAttribute('disabled', true);
        return false;
    }
  
    if(errMessLength === 0 && !buttonEnabled && !isNotFilled) {
      submitButton.removeAttribute('disabled');
      return true;
    }
  }
}


