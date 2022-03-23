
// =============================== Формирование класса карточки ===============================
// import { popupImage, activePopupImage, activePopupText, openPopup } from './utils.js';

export default class Card {
    constructor(data, cardSelector) {
        this._image = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
    }


    // ---------- Создание новой карточки ----------
    // Получение разметки новой карточки из template
    _getCardFromTemplate() {
        const newCard = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return newCard;
    }

    // Заполнение разметки карточки данными
    fillCard() {
        this._element = this._getCardFromTemplate();
        this._addCardListeners();

        const elementImage = this._element.querySelector('.element__image');

        elementImage.src = this._image;
        elementImage.alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    // Добавление слушателей событий для карточки
    _addCardListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._chooseLikeCard();
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.element__image-button').addEventListener('click', () => {
            this._openPopupImage();
        });
    }

    // Выбор понравившихся карточек
    _chooseLikeCard() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    // Удаление карточки
    _deleteCard() {
        this._element.remove();
        this._element = null;
    }

    // Открытие попапа с картинкой
    // _openPopupImage() {
    //     activePopupImage.src = this._image;
    //     activePopupImage.alt = this._name;
    //     activePopupText.textContent = this._name;
    //     openPopup(popupImage);
    // }
}