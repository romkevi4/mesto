// =============================== Формирование класса для попапа с картинкой ===============================
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({
            submitBtnSelector,
            popupOpenedSelector,
            popupCloseBtnSelector,
            popupImageSelector,
            popupTextSelector
        },
        popupSelector
    ) {
        super({ submitBtnSelector, popupOpenedSelector, popupCloseBtnSelector }, popupSelector);
        this._popupImage = this._popup.querySelector(popupImageSelector);
        this._popupText = this._popup.querySelector(popupTextSelector);
    }


    // ---------- Управление открытием попапа ----------
    // Открытие попапа
    open(activeImage, activeTitle) {
        super.open();

        this._popupImage.src = activeImage;
        this._popupImage.alt = activeTitle;
        this._popupText.textContent = activeTitle;
    }
}