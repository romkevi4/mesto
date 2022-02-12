



// Вывод ошибок на экран
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__item_type_error');
  errorElement.textContent = errorMessage;

}

// Скрытие ошибок на экране
function hideInputError() {

}

// Проверяем валидность поля
function isValid() {

}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
