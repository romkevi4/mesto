// =============================== Формирование класса для попапа с картинкой ===============================
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({
            popupOpenedSelector,
            popupCloseBtnSelector,
            popupImageSelector,
            popupTextSelector
        },
        popupSelector
    ) {
        super({ popupOpenedSelector, popupCloseBtnSelector }, popupSelector);
        this._popupImage = document.querySelector(popupImageSelector);
        this._popupText = document.querySelector(popupTextSelector);
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