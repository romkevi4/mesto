// =============================== Блок исходной информации ===============================
// ---------- Импорт данных ----------
// Исходные данные
import { classSettings, identificationData } from '../utils/initialData.js';

// Получение элементов DOM
import {
    profileEditBtn,
    placeAddBtn,
    popupEditProfile,
    popupFormEditingProfile,
    popupProfileName,
    popupProfileAboutMe,
    popupAddCard,
    popupFormAddPlace,
    popupDeleteCard
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
// import './index.css';




// =============================== Блок экземпляров классов ===============================
const api = new Api(identificationData);


// ---------- Управление данными пользователя ----------
// const userInfo = new UserInfo(classSettings);
api.getUserData()
    .then(res => {
        return new UserInfo(classSettings, res);
    })
    .then(data => {
        return data.addUserDataToPage();
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`);
    });


// ---------- Управление карточками ----------
api.getInitialCards()
    .then(res => {
        return new Section({
                items: res,
                renderer: (res) => {
                    const iCard = createCard(res);
                    return iCard;
                }
            },
            classSettings
        );
    })
    .then(data => {
        return data.renderItems();
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`);
    });


// ---------- Управление попапами ----------
// Попапы с формой
const popupEditProfileActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-edit-profile',
    saveForm: (inputValues) => {
        api.saveUserData(inputValues)
            .then(res => {
                return new UserInfo(classSettings, res);
            })
            .then(data => {
                return data.addUserDataToPage();
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });

        popupEditProfileActive.close();
    }
});

const popupAddCardActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-add-card',
    saveForm: (inputValues) => {
        api.saveNewCard(inputValues)
            .then(res => {
                const iCard = createCard(res);

                const cardList = new Section({
                        items: res,
                        renderer: () => {
                            return iCard;
                        }
                    },
                    classSettings
                );

                cardList.addItem(iCard);
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });

        popupAddCardActive.close();
    }
});

const popupDeleteCardActive = new PopupWithConfirmation(classSettings, {
    popupSelector: '#popup-delete-card',
    submitForm: (cardId, card) => {
        api.deleteCard(cardId)
            .then(res => res)
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });

        card.deleteCardItem();

        popupDeleteCardActive.close();
    }
});

// Попап с картинкой
const popupImageActive = new PopupWithImage(classSettings, '#popup-image');


// ---------- Управление лайками карточки ----------




// =============================== Блок фукнций ===============================
// ---------- Управление попапами ----------
function openPopupEdit() {
    formEditingProfile.clearForm();

    // popupProfileName.value = userInfo.getUserInfo().userName;
    // popupProfileAboutMe.value = userInfo.getUserInfo().userAboutMe;

    popupEditProfileActive.open();
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
            chooseLikeCard: (cardId, newLikes) => {
                if (!newCard.isLikedCard()) {
                    api.addLikeOfCard(cardId, newLikes)
                        .then(res => {
                            //TODO: добавить в массив с карточками пользователя из UserInfo
                            return res.likes;
                        })
                        .then(data => {
                            data.push(user);
                            return api.addUserInLikeList(cardId, data)
                                .then(res => {

                                })
                                .catch(err => {
                                    console.log(`Ошибка: ${err}`);
                                });
                        })
                        .catch(err => {
                            console.log(`Ошибка: ${err}`);
                        });

                    newCard.toggleLikeBtnClass();
                } else {
                    api.removeLikeOfCard(cardId)
                        .then(res => res)
                        .catch(err => {
                            console.log(`Ошибка: ${err}`);
                        });

                    newCard.toggleLikeBtnClass();
                }
            }
        },
        '#elements'
    );

    return newCard.fillCard();
}




// =============================== Блок основных событий ===============================
// События открытия попапов
profileEditBtn.addEventListener('click', openPopupEdit);
placeAddBtn.addEventListener('click', openPopupAdd);

// События для взаимодействия с попапами
popupEditProfileActive.setEventListeners();
popupAddCardActive.setEventListeners();
popupDeleteCardActive.setEventListeners();
popupImageActive.setEventListeners();




// =============================== Блок валидации форм ===============================
// Старт процесса валидации
const formEditingProfile = new FormValidator(classSettings, popupFormEditingProfile);
formEditingProfile.enableValidation();

const formAddPlace = new FormValidator(classSettings, popupFormAddPlace);
formAddPlace.enableValidation();




// Временный блок ====================================================================
// const popupDelete = document.querySelector('#popup-card-delete');
// const deleteCardBtn = document.querySelector('.element__title');
// const editAvatar = document.querySelector('.profile__avatar-btn');
// const popupEditAvatar = document.querySelector('#popup-edit-avatar');
// const popupFormEditingAvatar = popupEdit.querySelector('.popup__form');
// const popupAvatar = popupFormEditingProfile.elements.userName;

// deleteCardBtn.addEventListener('click', () => {
//     popupDelete.classList.add('popup_opened');
// });
//
// editAvatar.addEventListener('click', () => {
//     popupEditAvatar.classList.add('popup_opened');
// });

