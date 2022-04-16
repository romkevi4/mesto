// =============================== Формирование класса для попапа с формой ===============================
import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
    constructor({
            submitBtnSelector,
            popupOpenedSelector,
            popupCloseBtnSelector,
            popupFormSelector,
        }, {
        popupSelector,
        submitForm
    }) {
        super({ submitBtnSelector, popupOpenedSelector, popupCloseBtnSelector }, popupSelector);
        this._popupForm = this._popup.querySelector(popupFormSelector);
        this._submitForm = submitForm;
    }


    // ---------- Управление открытием попапа ----------
    // Открытие попапа
    open(cardId, card) {
        super.open();

        this._cardId = cardId;
        this._card = card;
    }


    // ---------- Управление событиями ----------
    // Добавление событий
    setEventListeners() {
        super.setEventListeners();

        this._popupForm.addEventListener('submit', this._setSubmitDeleteCard.bind(this));
    }


    // ---------- Действия при отправке формы ----------
    _setSubmitDeleteCard(event) {
        event.preventDefault();
        this._submitForm(this._cardId, this._card);
    }
}