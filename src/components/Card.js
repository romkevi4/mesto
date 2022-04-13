// =============================== Формирование класса карточки ===============================
export default class Card {
    constructor({
            data,
            handleCardClick,
            handlePopupDeleteCard,
            chooseLikeCard
        },{
        myData,
        myId,
        cardSelector
    }) {
        this._image = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._cardId = data._id;
        this._userId = data.owner._id;
        this._myData = myData;
        this._myId = myId;
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

        if (this._userId === this._myId) {
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
        this.countLikes(this._likes);

        return this._element;
    }

    // Добавление слушателей событий для карточки
    _addCardListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._chooseLikeCard(this._cardId, this._myData);
        });

        this._deleteBtn = this._element.querySelector('.element__delete-button');
        if (this._deleteBtn) {
            this._deleteBtn.addEventListener('click', () => {
                this._handlePopupDeleteCard(this._cardId, this);
            });
        }

        this._element.querySelector('.element__image-button').addEventListener('click', () => {
            this._handleCardClick(this._image, this._name);
        });
    }

    // Счетчик лайков
    countLikes(likesArray) {
        return this._element.querySelector('.element__like-number').textContent = likesArray.length;
    }

    // Проверка массива с лайками
    isLikedCard() {
        return this._likes.some(item => item._id === this._myId);
    }

    changeLikesArray(likesArray) {
        return this._likes = likesArray;
    }

    // Добавление класса у кнопки лайка карточки
    addLikeBtnClass() {
        this._element.querySelector('.element__like-button').classList.add('element__like-button_active');
    }

    // Удаление класса у кнопки лайка карточки
    removeLikeBtnClass() {
        this._element.querySelector('.element__like-button').classList.remove('element__like-button_active');
    }

    // Удаление карточки
    deleteCardItem() {
        this._element.remove();
        this._element = null;
    }
}