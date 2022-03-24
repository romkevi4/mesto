// =============================== Формирование класса для попапа с формой ===============================
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({
            inputSelector,
            popupOpenedSelector,
            popupCloseBtnSelector,
            popupFormSelector,
            popupTitleSelector,
        }, {
        popup,
        saveForm
    }) {
        super({ popupOpenedSelector, popupCloseBtnSelector }, popup);
        this._popupTitleSelector = popupTitleSelector;
        this._inputSelector = inputSelector;
        this._popupForm = this._popup.querySelector(popupFormSelector);
        this._saveForm = saveForm;
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
        this._popupForm.reset();
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
            this._changeCursorView(event, this._popupForm);
        });

        this._popupForm.addEventListener('input', () => {
            this._inputValues = this._getInputValues();
        });

        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this._saveForm(this._inputValues);
        });
    }

    // Удаление событий
    deleteEventListeners() {
        super.deleteEventListeners();

        this._popup.removeEventListener('mouseover', (event) => {
            this._changeCursorView(event, this._popupForm);
        });

        this._popupForm.removeEventListener('input', () => {
            this._inputValues = this._getInputValues();
        });

        this._popupForm.removeEventListener('submit', (event) => {
            event.preventDefault();
            this._saveForm(this._inputValues);
        });

    }


    // ---------- Управление отображением курсора на странице ----------
    // Выбор вида курсора
    _changeCursorView(event, activeElement) {
        if (event.target !== activeElement) {
            this._popup.style.cursor = 'pointer';

        } else if (event.target === activeElement || event.target === this._popup.querySelector(this._popupTitleSelector)) {
            activeElement.style.cursor = 'default';
        }
    }


    // ---------- Управление сбором данных со всех полей формы ----------
    // Получение данных
    _getInputValues() {
        this._inputs = this._popupForm.querySelectorAll(this._inputSelector);
        this._inputData = {};

        this._inputs.forEach((input) => {
            this._inputData[input.name] = input.value;
        });

        return this._inputData;
    }
}