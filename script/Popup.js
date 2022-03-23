// =============================== Формирование класса попапа ===============================
export default class Popup {
    constructor({ popupOpenedSelector, popupCloseBtnSelector }, popup) {
        this._popup = popup;
        this._popupOpenedSelector = popupOpenedSelector;
        this._popupCloseBtnSelector = popupCloseBtnSelector;
    }


    // ---------- Управление открытием попапа ----------
    // Открытие попапа
    open() {
        this._addPopupClass();
        this.setEventListeners();
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
        this._popup.addEventListener('click', (event) => {
            this._handleClickClose(event);
        });

        document.addEventListener('keydown', (event) => {
            this._handleEscClose(event);
        });
    }

    // Удаление событий закрытия попапа
    deleteEventListeners() {
        this._popup.removeEventListener('click', (event) => {
            this._handleClickClose(event);
        });

        document.removeEventListener('keydown', (event) => {
            this._handleEscClose(event);
        });
    }


    // ---------- Управление отображением курсора на странице ----------
    // Выбор вида корсора
    _changeCursorView(event, activeElement) {
        if (event.target !== activeElement) {
            this._popup.style.cursor = 'pointer';

        } else if (event.target === activeElement) {
            activeElement.style.cursor = 'default';
        }
    }
}