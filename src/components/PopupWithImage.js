// =============================== Формирование класса для попапа с картинкой ===============================
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({
            popupOpenedSelector,
            popupCloseBtnSelector,
            popupImageSelector,
            popupTextSelector
        },
        popup
    ) {
        super({ popupOpenedSelector, popupCloseBtnSelector }, popup);
        this._popupImage = document.querySelector(popupImageSelector);
        this._popupText = document.querySelector(popupTextSelector);
    }


    // ---------- Управление открытием попапа ----------
    // Открытие попапа
    open() {
        super.open();
    }

    // Добавление класса попапу для его открытия
    _addPopupClass() {
        super._addPopupClass();
    }


    // ---------- Управление закрытием попапа ----------
    // Закрытие попапа
    close() {
        super.close();
    }

    // Удаление класса у попапа для его закрытия
    _deletePopupClass() {
        super._deletePopupClass();
    }

    // Закрытие попапа с помощью клавиши Escape
    _handleEscClose(event) {
        super._handleEscClose(event);
    }

    // Закрытие попапа кнопкой и оверлеем
    _handleClickClose(event) {
        super._handleClickClose(event);
    }


    // ---------- Управление событиями ----------
    // Добавление событий
    setEventListeners() {
        super.setEventListeners();

        this._popup.addEventListener('mouseover', (event) => {
            this._changeCursorView(event, this._popupImage);
        });
    }

    // Удаление событий
    deleteEventListeners() {
        super.deleteEventListeners();

        this._popup.removeEventListener('mouseover', (event) => {
            this._changeCursorView(event, this._popupImage);
        });
    }


    // ---------- Управление отображением курсора на странице ----------
    // Выбор вида курсора
    _changeCursorView(event, activeElement) {
        super._changeCursorView(event, activeElement);
    }


    // ---------- Передача данных картинки в попап ----------
    setElementValues(activeImage, activeTitle) {
        this._popupImage.src = activeImage;
        this._popupImage.alt = activeTitle;
        this._popupText.textContent = activeTitle;
    }
}