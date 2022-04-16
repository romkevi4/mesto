// =============================== Формирование класса попапа ===============================
export default class Popup {
    constructor({ submitBtnSelector, popupOpenedSelector, popupCloseBtnSelector }, popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupOpenedSelector = popupOpenedSelector;
        this._popupCloseBtnSelector = popupCloseBtnSelector;
        this._submitBtn = this._popup.querySelector(submitBtnSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
    }


    // ---------- Управление открытием попапа ----------
    // Открытие попапа
    open() {
        this._addPopupClass();
        document.addEventListener('keydown', this._handleEscClose);
    }

    // Добавление класса попапу для его открытия
    _addPopupClass() {
        this._popup.classList.add(this._popupOpenedSelector);
    }


    // ---------- Управление закрытием попапа ----------
    // Закрытие попапа
    close() {
        this._deletePopupClass();
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // Удаление класса у попапа для его закрытия
    _deletePopupClass() {
        this._popup.classList.remove(this._popupOpenedSelector);
    }

    // Закрытие попапа с помощью клавиши Escape
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    // Закрытие попапа кнопкой и оверлеем
    _handleClickClose(event) {
        if (event.target === event.currentTarget || event.target.classList.contains(this._popupCloseBtnSelector)) {
            this.close();
        }
    }


    // ---------- Управление событиями ----------
    // Добавление событий закрытия попапа
    setEventListeners() {
        this._popup.addEventListener('mousedown', this._handleClickClose.bind(this));
    }
}