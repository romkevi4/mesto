// ---------- Управление карточками ----------
class Card {
    constructor(data) {
        this._image = data.link;
        this._name = data.name;
    }


    // Получение разметки новой карточки из template
    _getCardFromTemplate() {
        const newCard = document
            .querySelector('#elements')
            .content
            .querySelector('.element')
            .cloneNode(true);
        // newCard.querySelector('.element__image').src = this.image;
        // newCard.querySelector('.element__image').alt = this.name;
        // newCard.querySelector('.element__title').textContent = this.name;
        // addCardListeners(newCard);
        return newCard;
    }

    //Заполнение разметки карточки данными
    fillCard() {
        this._element = this._getCardFromTemplate();
        this._addCardListeners();

        this._element.querySelector('.element__image').src = this._image;
        this._element.querySelector('.element__image').alt = this._name;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }

    _addCardListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._chooseLikeCard();
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.element__image-button').addEventListener('click', ()  => {
            openPopupImage();
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

    // Визуализация карточки на странице
    renderCard(element, wrapper) {
        wrapper.prepend(element);
    }
}

const initialCards = [
    {
        name: 'Сочи',
        link: 'https://images.unsplash.com/photo-1612693730241-2faeb28d176f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://images.unsplash.com/photo-1612899028149-ddc7969d27cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
];

// Получение наименований мест и ссылок на картинки из исходного массива
initialCards.reverse().forEach((item) => {
    const card = new Card(item);
    const cardElement = card.fillCard();
    document.querySelector('.elements').prepend(cardElement);
});