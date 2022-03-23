// =============================== Формирование класса для попапа с картинкой ===============================
import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor({
            popupOpenedSelector,
            popupCloseBtnSelector,
            popupImageSelector,
            popupTextSelector
        }, {
        popup,
        openPopupImage
    }) {
        super({ popupOpenedSelector, popupCloseBtnSelector }, popup);
        this._popupImage = document.querySelector(popupImageSelector);
        this._popupText = document.querySelector(popupTextSelector);
        this._openPopupImage = openPopupImage;
    }


    // ---------- Управление открытием попапа ----------
    // Открытие попапа
    open() {
        super.open();

        this._popupImage.src = this._image;
        this._popupImage.alt = this._name;
        this._popupText.textContent = this._name;
        // openPopup(popupImage);
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
    // Добавление событий закрытия попапа
    setEventListeners() {
        super.setEventListeners();
    }

    // Удаление событий закрытия попапа
    deleteEventListeners() {
        super.deleteEventListeners();
    }

    // Добавление события для проверки положения курсора мыши на попапе
    setCheckingCursorPosition() {
        this._popup.addEventListener('mouseover', (event) => {
            this._changeCursorView(event, this._popupImage);
        });
    }

    // Удаление события для проверки положения курсора мыши на попапе
    deleteCheckingCursorPosition() {
        this._popup.removeEventListener('mouseover', (event) => {
            this._changeCursorView(event, this._popupImage);
        });
    }


    // ---------- Управление отображением курсора на странице ----------
    // Выбор вида корсора
    _changeCursorView(event, activeElement) {
        super._changeCursorView(event, activeElement);
    }
}