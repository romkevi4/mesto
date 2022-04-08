// =============================== Формирование класса для попапа с формой ===============================
import Popup from './Popup.js';

export default class PopupDeleteCard extends Popup {
    constructor({
            popupOpenedSelector,
            popupCloseBtnSelector,
            // popupFormSelector,
            // submitBtnSelector
        },
        popupSelector,
        // saveForm
    ) {
        super({ popupOpenedSelector, popupCloseBtnSelector }, popupSelector);
        // this._popupForm = this._popup.querySelector(popupFormSelector);
        // this._popupBtn = this._popup.querySelector(submitBtnSelector);
        // this._saveForm = saveForm;
    }


    // ---------- Управление событиями ----------
    // Добавление событий
    setEventListeners() {
        super.setEventListeners();

        // this._popupForm.addEventListener('submit', this._setSubmitDeleteCard.bind(this));
    }

    // Действия при отправке формы
    _setSubmitDeleteCard(event) {
        event.preventDefault();

    }
}