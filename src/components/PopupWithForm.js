// =============================== Формирование класса для попапа с формой ===============================
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({
            inputSelector,
            popupOpenedSelector,
            popupCloseBtnSelector,
            popupFormSelector,
        }, {
        popupSelector,
        saveForm
    }) {
        super({ popupOpenedSelector, popupCloseBtnSelector }, popupSelector);
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

    // Удаление событий закрытия попапа
    deleteEventListeners() {
        super.deleteEventListeners();

        this._popupForm.removeEventListener('submit', this._setSubmitAction.bind(this));
    }


    // ---------- Управление сбором данных со всех полей формы ----------
    // Получение данных
    _getInputValues() {
        this._inputData = {};

        this._inputs.forEach((input) => {
            this._inputData[input.name] = input.value;
        });

        return this._inputData;
    }

    // Действия при отправке формы
    _setSubmitAction(event) {
        event.preventDefault();
        this._saveForm(this._getInputValues());
    }
}