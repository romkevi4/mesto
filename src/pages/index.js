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
    saveFormProfileBtn,
    popupFormAddPlace,
    saveFormAddPlaceBtn,
    popupFormEditingAvatar,
    saveFormAvatarBtn,
    saveFormDeleteCardBtn
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
        controlUserData(userData.name, userData.about);
        controlUserAvatar(userData.avatar);
        userInfo.getMyId(userData._id);
        myData = userData;
        myId = userInfo.handOverMyId();

        section.getInitialCards(cards);
        section.renderItems();
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`);
    });


// ---------- Получение попапапов ----------
// Попап редактирования профиля
const popupEditProfileActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-edit-profile',
    saveForm: (inputValues) => {
        const textSaveBtn = saveFormProfileBtn.textContent;
        saveFormProfileBtn.textContent = 'Сохранение...';

        api.saveUserData(inputValues)
            .then(res => {
                controlUserData(res.name, res.about);
                popupEditProfileActive.close();
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                saveFormProfileBtn.textContent = textSaveBtn;
            })
    }
});

// Папап редактирования аватара
const popupEditAvatarActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-edit-avatar',
    saveForm: (inputValues) => {
        const textSaveBtn = saveFormAvatarBtn.textContent;
        saveFormAvatarBtn.textContent = 'Сохранение...';

        api.saveUserAvatar(inputValues.avatar)
            .then(res => {
                controlUserAvatar(res.avatar);
                popupEditAvatarActive.close();
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                saveFormAvatarBtn.textContent = textSaveBtn;
            });
    }
});

// Попап добавления карточки
const popupAddCardActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-add-card',
    saveForm: (inputValues) => {
        const textSaveBtn = saveFormAddPlaceBtn.textContent;
        saveFormAddPlaceBtn.textContent = 'Создание...';

        api.saveNewCard(inputValues)
            .then(res => {
                section.addItem(createCard(res));
                popupAddCardActive.close();
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                saveFormAddPlaceBtn.textContent = textSaveBtn;
            })
    }
});

// Попап подтверждения удаления карточки
const popupDeleteCardActive = new PopupWithConfirmation(classSettings, {
    popupSelector: '#popup-delete-card',
    submitForm: (cardId, card) => {
        const textSaveBtn = saveFormDeleteCardBtn.textContent;
        saveFormDeleteCardBtn.textContent = 'Да...';

        api.deleteCard(cardId)
            .then(() => {
                card.deleteCardItem();
                popupDeleteCardActive.close();
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                saveFormDeleteCardBtn.textContent = textSaveBtn;
            })
    }
});

// Попап с картинкой
const popupImageActive = new PopupWithImage(classSettings, '#popup-image');




// =============================== Блок фукнций ===============================
// ---------- Управление попапами ----------
function openPopupEdit() {
    formEditingProfile.clearForm();
    popupEditProfileActive.open();
}

function openPopupEditAvatar() {
    formEditingAvatar.clearForm();
    popupEditAvatarActive.open();
}

function openPopupAdd() {
    formAddPlace.clearForm();
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

                    newCard.addLikeBtnClass();
                } else {
                    selectRequest({
                        apiRequest: api.removeLikeOfCard(cardId, user),
                        instanceCard: newCard
                    });

                    newCard.removeLikeBtnClass();
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
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });
}

// Управление данными пользователя
function controlUserData(name, about) {
    userInfo.setUserInfo(name, about);
}

// Управление аватаром пользователя
function controlUserAvatar(avatarUrl) {
    userInfo.setUserAvatar(avatarUrl);
}



// =============================== Блок основных событий ===============================
// События открытия попапов
profileEditBtn.addEventListener('click', openPopupEdit);
profileEditAvatarBtn.addEventListener('click', openPopupEditAvatar);
placeAddBtn.addEventListener('click', openPopupAdd);


// События для взаимодействия с попапами
popupEditProfileActive.setEventListeners();
popupEditAvatarActive.setEventListeners();
popupAddCardActive.setEventListeners();
popupDeleteCardActive.setEventListeners();
popupImageActive.setEventListeners();




// =============================== Блок валидации форм ===============================
// Старт процесса валидации
const formEditingProfile = new FormValidator(classSettings, popupFormEditingProfile);
formEditingProfile.enableValidation();

const formEditingAvatar = new FormValidator(classSettings, popupFormEditingAvatar);
formEditingAvatar.enableValidation();

const formAddPlace = new FormValidator(classSettings, popupFormAddPlace);
formAddPlace.enableValidation();
