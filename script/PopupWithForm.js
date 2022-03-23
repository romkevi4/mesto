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

        // this._popupForm = this._popup.querySelector(this._popupFormSelector);


        this._popupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            // this._saveForm(this._getInputValues());
            const inputValues = this._getInputValues();
            this._saveForm.bind(inputValues);
        });
    }

    // Удаление событий закрытия попапа
    deleteEventListeners() {
        super.deleteEventListeners();

        this._popupForm.removeEventListener('submit', (event) => {
            event.preventDefault();
            const inputValues = this._getInputValues();
            this._saveForm.bind(inputValues);
        });

    }

    // Добавление события для проверки положения курсора мыши на попапе
    setCheckingCursorPosition() {
        this._popup.addEventListener('mouseover', (event) => {
            this._changeCursorView(event, this._popupForm);
        });
    }

    // Удаление события для проверки положения курсора мыши на попапе
    deleteCheckingCursorPosition() {
        this._popup.removeEventListener('mouseover', (event) => {
            this._changeCursorView(event, this._popupForm);
        });
    }


    // ---------- Управление отображением курсора на странице ----------
    // Выбор вида корсора
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
        // console.log(this._inputData);
        return this._inputData;
    }
}