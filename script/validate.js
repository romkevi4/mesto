// =============================== Валидация форм ===============================
// Сброс полей формы до исходного состояния
const checkFormSubmit = (event, form) => {
  event.preventDefault();
  if (form.checkValidity()) {
    form.reset();
  }
}


// ---------- Проверка правильности заполнения полей формы ----------
// Сброс тестов и стилей ошибок, если форма валидна
const setInputValid = ({ inputErrorClass }, errorMessage, input) => {
  errorMessage.textContent = '';
  input.classList.remove(inputErrorClass);
}

// Добавление тестов и стилей ошибок, если форма не валидна
const setInputInvalid = (inputErrorClass, errorMessage, input) => {
  errorMessage.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
}

// Проверка валидности
const checkInputValidity = ({ inputErrorClass }, form, input) => {
  const errorMessage = form.querySelector(`.${input.id}-error`);

  if (!input.validity.valid) {
    setInputInvalid(inputErrorClass, errorMessage, input);
  } else {
    setInputValid(inputErrorClass, errorMessage, input);
  }
}


// ---------- Изменение состояния кнопки отправки формы ----------
// Активация кнопки, если форма валидна
const setBtnValid = (inactiveBtnClass, btn) => {
  btn.removeAttribute('disabled');
  btn.classList.remove(inactiveBtnClass);
}

// Деактивация кнопки, если форма не валидна
const setBtnInvalid = ({ inactiveBtnClass }, btn) => {
  btn.setAttribute('disabled', true);
  btn.classList.add(inactiveBtnClass);
}

// Проверка валидности кнопки отправки формы
const checkBtnValidity = ({ inactiveBtnClass }, form, btn) => {
  if (form.checkValidity()) {
    setBtnValid(inactiveBtnClass, btn);
  } else {
    setBtnInvalid(inactiveBtnClass, btn);
  }
}


// ---------- Управление процессом валидации ----------
// Запуск валидации всей формы
function enableValidation({ formSelector, inputSelector, submitBtnSelector, ...rest }) {
  const popupForms = document.querySelectorAll(formSelector);
  popupForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      checkFormSubmit(event, form);
      console.log(event);
    });

    const popupInputs = form.querySelectorAll(inputSelector);
    const popupBtn = form.querySelector(submitBtnSelector);

    form.addEventListener('reset', () => {
      setBtnInvalid(rest, popupBtn);
    });

    checkBtnValidity(rest, form, popupBtn);

    popupInputs.forEach( (input) => {
      input.addEventListener('input', (event) => {
        checkInputValidity(rest, form, input);
        checkBtnValidity(rest, form, popupBtn);
      });
    });
  });
}

// Старт процесса валидации
enableValidation(classSettings);