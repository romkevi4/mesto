// =============================== Формирование класса валидации формы ===============================
export default class FormValidator {
    constructor({ inactiveBtnClass, inputErrorClass, inputSelector, submitBtnSelector }, form) {
        this._inactiveBtnClass = inactiveBtnClass;
        this._inputErrorClass = inputErrorClass;
        this._inputList = form.querySelectorAll(inputSelector);
        this._submitBtn = form.querySelector(submitBtnSelector);
        this._form = form;
    }


    // ---------- Проверка правильности заполнения полей формы ----------
    // Сброс текстов и стилей ошибок, если форма валидна
    _setInputValid(input) {
        const errorMessage = this._form.querySelector(`.${input.id}-error`);
        errorMessage.textContent = '';

        input.classList.remove(this._inputErrorClass);
    }

    // Добавление текстов и стилей ошибок, если форма не валидна
    _setInputInvalid(input) {
        const errorMessage = this._form.querySelector(`.${input.id}-error`);
        errorMessage.textContent = input.validationMessage;

        input.classList.add(this._inputErrorClass);
    }

    // Проверка валидности
    _checkInputValidity(input) {
        !input.validity.valid ? this._setInputInvalid(input) : this._setInputValid(input);
    }


    // ---------- Изменение состояния кнопки отправки формы ----------
    // Активация кнопки, если форма валидна
    _setBtnValid() {
        this._submitBtn.removeAttribute('disabled');
        this._submitBtn.classList.remove(this._inactiveBtnClass);
    }

    // Деактивация кнопки, если форма не валидна
    _setBtnInvalid() {
        this._submitBtn.setAttribute('disabled', '');
        this._submitBtn.classList.add(this._inactiveBtnClass);
    }

    // Проверка валидности кнопки отправки формы
    _checkBtnValidity() {
        this._form.checkValidity() ? this._setBtnValid() : this._setBtnInvalid();
    }


    // ---------- Управление процессом валидации ----------
    // Запуск валидации всей формы
    enableValidation() {
        this._form.addEventListener('reset', () => {
            this._setBtnInvalid();
        });

        this._checkBtnValidity();

        this._inputList.forEach( (input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._checkBtnValidity();
            });
        });
    }


    // ---------- Сброс ошибок ----------
    // Очистка текстов и стилей ошибок, деактивация кнопки
    clearForm() {
        this._inputList.forEach((input) => {
            this._setInputValid(input);
        });

        this._setBtnInvalid();
    }
}