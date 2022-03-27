// =============================== Формирование класса попапа ===============================
export default class Popup {
    constructor({ popupOpenedSelector, popupCloseBtnSelector }, popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._popupOpenedSelector = popupOpenedSelector;
        this._popupCloseBtnSelector = popupCloseBtnSelector;
    }


    // ---------- Управление открытием попапа ----------
    // Открытие попапа
    open() {
        this._addPopupClass();
    }

    // Добавление класса попапу для его открытия
    _addPopupClass() {
        this._popup.classList.add(this._popupOpenedSelector);
    }


    // ---------- Управление закрытием попапа ----------
    // Закрытие попапа
    close() {
        this._deletePopupClass();
        this.deleteEventListeners();
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
        this._popup.addEventListener('click', this._handleClickClose.bind(this));

        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    // Удаление событий закрытия попапа
    deleteEventListeners() {
        this._popup.removeEventListener('click', this._handleClickClose.bind(this));

        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }
}