// =============================== Блок исходной информации ===============================
// ---------- Импорт данных ----------
// Исходные данные
import { classSettings, identificationData } from '../utils/initialData.js';

// Получение элементов DOM
import {
    profileEditBtn,
    profileEditAvatarBtn,
    placeAddBtn,
    popupFormEditingProfile,
    popupFormAddPlace,
    popupFormEditingAvatar
} from '../utils/constants.js';

// Создание новой карточки
import Card from '../components/Card.js';

// Создание валидации форм
import FormValidator from '../components/FormValidator.js';

// Управление попапами
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

// Отрисовка готовых элементов на странице
import Section from '../components/Section.js';

// Отображение информации о пользователе
import UserInfo from '../components/UserInfo.js';

// Управление работой с API
import Api from '../components/Api.js';

// Стили CSS
import './index.css';




// =============================== Блок экземпляров классов ===============================
// Запросы серверу
const api = new Api(identificationData);

// Данные пользователя
const userInfo = new UserInfo(classSettings);

// Рендеринг карточек
const section = new Section({
        items: [],
        renderer: (objectWithData) => {
            return createCard(objectWithData);
        }
    },
    classSettings
);




// =============================== Блок управления данными ===============================
// ---------- Получение данных пользователя и карточек ----------
let myData,
    myId;

Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
        controlUserData(userData);
        myData = userData;
        myId = userInfo.handOverMyId();

        section.setInitialCards(cards);
        section.renderItems();
    })
    .catch(err => {
        console.error(`Ошибка: ${err}`);
    });


// ---------- Получение попапапов ----------
// Попап редактирования профиля
const popupEditProfileActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-edit-profile',
    saveForm: (inputValues) => {
        popupEditProfileActive.renderLoading(true, 'Сохранить', 'Сохранение...');

        api.saveUserData(inputValues)
            .then(res => {
                controlUserData(res);
                popupEditProfileActive.close();
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupEditProfileActive.renderLoading(false, 'Сохранить', 'Сохранение...');
            })
    }
});

// Папап редактирования аватара
const popupEditAvatarActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-edit-avatar',
    saveForm: (inputValues) => {
        popupEditAvatarActive.renderLoading(true, 'Сохранить', 'Сохранение...');

        api.saveUserAvatar(inputValues.avatar)
            .then(res => {
                controlUserData(res);
                popupEditAvatarActive.close();
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupEditAvatarActive.renderLoading(false, 'Сохранить', 'Сохранение...');
            });
    }
});

// Попап добавления карточки
const popupAddCardActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-add-card',
    saveForm: (inputValues) => {
        popupAddCardActive.renderLoading(true, 'Сохранить', 'Сохранение...');

        api.saveNewCard(inputValues)
            .then(res => {
                section.addItem(createCard(res));
                popupAddCardActive.close();
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            })
            .finally(() => {
                popupAddCardActive.renderLoading(false, 'Сохранить', 'Сохранение...');
            })
    }
});

// Попап подтверждения удаления карточки
const popupDeleteCardActive = new PopupWithConfirmation(classSettings, {
    popupSelector: '#popup-delete-card',
    submitForm: (cardId, card) => {
        api.deleteCard(cardId)
            .then(() => {
                card.deleteCardItem();
                popupDeleteCardActive.close();
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            })
    }
});

// Попап с картинкой
const popupImageActive = new PopupWithImage(classSettings, '#popup-image');




// =============================== Блок фукнций ===============================
// ---------- Управление попапами ----------
function openPopupEditProfile() {
    formValidators[ popupFormEditingProfile.getAttribute('name') ].clearForm();
    popupEditProfileActive.setInputValues(userInfo.getUserInfo());
    popupEditProfileActive.open();

}

function openPopupEditAvatar() {
    formValidators[ popupFormEditingAvatar.getAttribute('name') ].clearForm();
    popupEditAvatarActive.open();
}

function openPopupAddCard() {
    formValidators[ popupFormAddPlace.getAttribute('name') ].clearForm();
    popupAddCardActive.open();
}


// ---------- Создание новой карточки ----------
function createCard(objectWithData) {
    const newCard = new Card({
            data: objectWithData,

            handleCardClick: (activeImage, activeTitle) => {
                popupImageActive.open(activeImage, activeTitle);
            },

            handlePopupDeleteCard: (cardId, card) => {
                popupDeleteCardActive.open(cardId, card);
            },

            chooseLikeCard: (cardId, user) => {
                if (!newCard.isLikedCard()) {
                    selectRequest({
                        apiRequest: api.addLikeOfCard(cardId, user),
                        instanceCard: newCard
                    });
                } else {
                    selectRequest({
                        apiRequest: api.removeLikeOfCard(cardId, user),
                        instanceCard: newCard
                    });
                }
            }
        }, {
        myData: myData,
        myId: myId,
        cardSelector: '#elements'
    });

    return newCard.fillCard();
}

// Выбор запроса на сервер
function selectRequest({
    apiRequest: apiRequest,
    instanceCard: instanceCard
}) {
        return apiRequest
            .then(res => {
                return res.likes;
            })
            .then(data => {
                instanceCard.changeLikesArray(data);
                instanceCard.countLikes(data);
                instanceCard.toggleLikeBtnClass();
            })
            .catch(err => {
                console.error(`Ошибка: ${err}`);
            });
}

// Управление данными пользователя
function controlUserData(data) {
    userInfo.setUserInfo(data);
}


// ---------- Управление валидацией форм ----------
const formValidators = {};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.popupFormSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        const formName = formElement.getAttribute('name');

        formValidators[formName] = validator;
        validator.enableValidation();
    });
}

enableValidation(classSettings);




// =============================== Блок основных событий ===============================
// События открытия попапов
profileEditBtn.addEventListener('click', openPopupEditProfile);
profileEditAvatarBtn.addEventListener('click', openPopupEditAvatar);
placeAddBtn.addEventListener('click', openPopupAddCard);


// События для взаимодействия с попапами
popupEditProfileActive.setEventListeners();
popupEditAvatarActive.setEventListeners();
popupAddCardActive.setEventListeners();
popupDeleteCardActive.setEventListeners();
popupImageActive.setEventListeners();