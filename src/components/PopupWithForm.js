// =============================== Формирование класса для попапа с формой ===============================
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({
            submitBtnSelector,
            inputSelector,
            popupOpenedSelector,
            popupCloseBtnSelector,
            popupFormSelector
        }, {
        popupSelector,
        saveForm
    }) {
        super({ submitBtnSelector, popupOpenedSelector, popupCloseBtnSelector }, popupSelector);
        this._popupForm = this._popup.querySelector(popupFormSelector);
        this._saveForm = saveForm;
        this._inputs = this._popup.querySelectorAll(inputSelector);

    }


    // ---------- Управление закрытием попапа ----------
    // Закрытие попапа
    close() {
        super.close();
        this._popupForm.reset();
    }


    // ---------- Управление событиями ----------
    // Добавление событий
    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', this._setSubmitAction.bind(this));
    }


    // ---------- Управление сбором данных со всех полей формы ----------
    // Получение данных
    _getInputValues() {
        this._inputData = {};

        this._inputs.forEach(input => {
            this._inputData[input.name] = input.value;
        });

        return this._inputData;
    }

    // Действия при отправке формы
    _setSubmitAction(event) {
        event.preventDefault();
        this._saveForm(this._getInputValues());
    }

    // Внесение значений в поля формы
    setInputValues(data) {
        this._inputs.forEach(input => {
          input.value = data[input.name];
        });
    }

    renderLoading(isLoading, btnText, btnTextInProcess) {
        isLoading
            ? this._submitBtn.textContent = btnTextInProcess
            : this._submitBtn.textContent = btnText;
    }
}