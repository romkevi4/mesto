//
const checkFormSubmit = (event, form) => {
  event.preventDefault();
  if (form.checkValidity()) {
    form.reset();
  }
}

// Сброс тестов и стилей ошибок, если форма валидна
const setInputValid = (inputErrorClass, errorMessage, input) => {
  errorMessage.textContent = '';
  input.classList.remove(inputErrorClass);
}

// Добавление тестов и стилей ошибок, если форма не валидна
const setInputInvalid = (inputErrorClass, errorMessage, input) => {
  errorMessage.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

// Проверяем валидность поля
const checkInputValidity = ({ inputErrorClass }, form, input) => {
  const errorMessage = form.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    setInputInvalid(inputErrorClass, errorMessage, input);
  } else {
    setInputValid(inputErrorClass, errorMessage, input);
  }
}

// Сброс стилей конпки и её активация, если форма валидна
const setBtnValid = (inactiveBtnClass, btn) => {
  btn.removeAttribute('disabled');
  btn.classList.remove(inactiveBtnClass);
}

// Добавление стилей конпки и её деактивация, если форма не валидна
const setBtnInvalid = (inactiveBtnClass, btn) => {
  btn.setAttribute('disabled', true);
  btn.classList.add(inactiveBtnClass);
}

// Проверяем валидность кнопки отправки формы
const checkBtnValidity = ({ inactiveBtnClass }, form, btn) => {
  if (!form.checkValidity()) {
    setBtnInvalid(inactiveBtnClass, btn);
  } else {
    setBtnValid(inactiveBtnClass, btn);
  }
}

// Запуск валидации всей формы
function enableValidation({ formSelector, inputSelector, submitBtnSelector, textErrorClass, ...rest }) {
  const popupForms = document.querySelectorAll(formSelector);
  popupForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      checkFormSubmit(event, form);
    });

    const popupInputs = form.querySelectorAll(inputSelector);
    const popupBtn = form.querySelector(submitBtnSelector);

    form.addEventListener('reset', () => {
      setBtnValid(rest, popupBtn);
    });

    checkBtnValidity(rest, form, popupBtn);

    popupInputs.forEach( (input) => {
      input.addEventListener('input', (event) => {
        checkInputValidity(rest, form, input);
        checkBtnValidity(rest, form, popupBtn);
      });

      // TODO: нужен ли этот слушатель?
      form.addEventListener('reset', () => {
        setInputValid(rest, textErrorClass, input);
      });
    });
  });
}

enableValidation(classSettings);