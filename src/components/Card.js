// =============================== Формирование класса карточки ===============================
export default class Card {
    constructor({ data, handleCardClick, handleDeleteCard }, cardSelector) {
        this._image = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._id = data._id;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
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
        this._element.querySelector('.element__like-number').textContent = this._likes.length;

        this._checkImageOwnership();

        return this._element;
    }

    // Добавление слушателей событий для карточки
    _addCardListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._chooseLikeCard();
        });

        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            // this._deleteCard();
            this._handleDeleteCard();
        });

        this._element.querySelector('.element__image-button').addEventListener('click', () => {
            this._handleCardClick(this._image, this._name);
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

    // Проверка принадлежности картинки пользователю
    // TODO: нужно определить добавлять кнопку удаления добавенной карточке или удалять у чужих
    _checkImageOwnership() {
        // if () {
        //     this._deleteDtn = this._element.querySelector('.element__delete-button');
        //     this._deleteDtn.remove();
        //     this._deleteDtn = null;
        // }
    }
}