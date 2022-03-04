// Импорты из модуля index.js
import { openPopup, popupImage, activePopupImage, activePopupText } from './index.js';

// Создание новой карточки
export class Card {
    constructor(data, cardSelector) {
        this._image = data.link;
        this._name = data.name;
        this._cardSelector = cardSelector;
    }

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

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__image').alt = this._name;
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
        this._element.querySelector('.element__delete-button').closest('.element').remove();
    }

    // Открытие попапа с картинкой
    _openPopupImage() {
        activePopupImage.src = this._image;
        activePopupImage.alt = this._name;
        activePopupText.textContent = this._name;
        openPopup(popupImage);
    }
}