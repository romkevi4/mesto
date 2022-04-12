// =============================== Формирование класса карточки ===============================
export default class Card {
    constructor({ data, handleCardClick, handlePopupDeleteCard, chooseLikeCard }, cardSelector) {
        this._image = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._cardId = data._id;
        this._userId = data.owner._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handlePopupDeleteCard = handlePopupDeleteCard;
        this._chooseLikeCard = chooseLikeCard;
    }


    // ---------- Создание новой карточки ----------
    // Получение разметки новой карточки из template
    _getCardFromTemplate() {
        const newCard = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        if (this._userId === '36f1c5c10cd192147377a36e') {
            newCard.insertAdjacentHTML(
                'beforeend',
                '<button aria-label="Удалить" type="button" class="element__delete-button"></button>'
            );
        }

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
        this._element.querySelector('.element__like-number').textContent = this._likes.length;

        return this._element;
    }

    // Добавление слушателей событий для карточки
    _addCardListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._controlLikeBtn();
        });

        if (this._element.querySelector('.element__delete-button')) {
            this._deleteBtn = this._element.querySelector('.element__delete-button');

            this._deleteBtn.addEventListener('click', () => {
                this._handlePopupDeleteCard(this._cardId, this);
            });
        }

        this._element.querySelector('.element__image-button').addEventListener('click', () => {
            this._handleCardClick(this._image, this._name);
        });
    }



    _controlLikeBtn() {
        // return this._likeBtnActive = this._element.classList.contains('.element__like-button_active');
        this._chooseLikeCard(this._cardId, this._likes);
    }

    isLikedCard() {
        return this._likes.some(item => item === this._userId);
    }

    // Переключение класса у кнопки лайка карточки
    toggleLikeBtnClass() {
        this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
    }

    // Удаление карточки
    deleteCardItem() {
        this._element.remove();
        this._element = null;
    }
}