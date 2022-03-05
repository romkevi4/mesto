// =============================== Валидация форм ===============================
export class FormValidator {
    constructor(data, form) {
        this._formSelector = data.formSelector;
        this._inputSelector = data.inputSelector;
        this._submitBtnSelector = data.submitBtnSelector;
        this._inactiveBtnClass = data.inactiveBtnClass;
        this._inputErrorClass = data.inputErrorClass;
        this._form = form;
    }

    // Сброс полей формы до исходного состояния
    _checkFormSubmit(event) {
        event.preventDefault();

        if (this._form.checkValidity()) {
            this._form.reset();
        }
    }


    // ---------- Проверка правильности заполнения полей формы ----------
    // Сброс тестов и стилей ошибок, если форма валидна
    _setInputValid() {
        const errorMessage = this._form.querySelector(`.${this._element.id}-error`);
        errorMessage.textContent = '';

        this._element.classList.remove(this._inputErrorClass);
    }

    // Добавление тестов и стилей ошибок, если форма не валидна
    _setInputInvalid() {
        const errorMessage = this._form.querySelector(`.${this._element.id}-error`);
        errorMessage.textContent = this._element.validationMessage;

        this._element.classList.add(this._inputErrorClass);
    }

    // Проверка валидности
    _checkInputValidity() {
        !this._element.validity.valid ? this._setInputInvalid() : this._setInputValid();
    }


    // ---------- Изменение состояния кнопки отправки формы ----------
    // Активация кнопки, если форма валидна
    _setBtnValid() {
        const popupBtn = this._form.querySelector(this._submitBtnSelector);

        popupBtn.removeAttribute('disabled');
        popupBtn.classList.remove(this._inactiveBtnClass);
    }

    // Деактивация кнопки, если форма не валидна
    _setBtnInvalid() {
        const popupBtn = this._form.querySelector(this._submitBtnSelector);

        popupBtn.setAttribute('disabled', '');
        popupBtn.classList.add(this._inactiveBtnClass);
    }

    // Проверка валидности кнопки отправки формы
    _checkBtnValidity () {
        this._form.checkValidity() ? this._setBtnValid() : this._setBtnInvalid();
    }


    // ---------- Управление процессом валидации ----------
    // Запуск валидации всей формы
    enableValidation() {
        this._form.addEventListener('submit', (event) => {
            this._checkFormSubmit(event);
        });

        const popupInputs = this._form.querySelectorAll(this._inputSelector);

        this._form.addEventListener('reset', () => {
            this._setBtnInvalid();
        });

        this._checkBtnValidity();

        popupInputs.forEach( (input) => {
            input.addEventListener('input', () => {
                this._element = input;

                this._checkInputValidity();
                this._checkBtnValidity();
            });
        });
    }
}


