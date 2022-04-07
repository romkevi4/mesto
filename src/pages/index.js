// =============================== Блок исходной информации ===============================
// ---------- Импорт данных ----------
// Исходные данные
import { classSettings, identificationData } from '../utils/initialData.js';

// Получение элементов DOM
import {
    profileEditBtn,
    placeAddBtn,
    popupEdit,
    popupFormEditingProfile,
    popupProfileName,
    popupProfileAboutMe,
    popupAdd,
    popupFormAddPlace
} from '../utils/constants.js';

// Создание новой карточки
import Card from '../components/Card.js';

// Создание валидации форм
import FormValidator from '../components/FormValidator.js';

// Управление попапами
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

// Отрисовка готовых элементов на странице
import Section from '../components/Section.js';

// Отображение информации о пользователе
import UserInfo from '../components/UserInfo.js';

// Управление работой с API
import Api from '../components/Api.js';

// Стили CSS
// import './index.css';




// =============================== Блок экземпляров классов ===============================
// ---------- Получение данных пользователя ----------
const userInfo = new UserInfo(classSettings);
const api = new Api(identificationData);
api.getUserData()
    .then(res => {
        userInfo.setUserInfo(res);
    })
    .catch(err => {
        console.log(`Ошибка: ${err}`);
    });


// ---------- Получение карточек ----------
api.getInitialCards()
    .then(res => {
        const cardList = new Section({
                items: res,
                renderer: (cardItem) => {
                    const iCard = createCard(cardItem);
                    return iCard;
                }
            },
            classSettings
        );
        cardList.renderItems();
    })
    .catch(err => {
        console.log(`Ошибочка: ${err}`);
    });




// ---------- Получение попапов ----------
// Попапы с формой
const popupEditActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-edit-profile',
    saveForm: (inputValues) => {
        userInfo.setUserInfo(inputValues);

        popupEditActive.close();
    }
});
popupEditActive.setEventListeners();

const popupAddCard = new PopupWithForm(classSettings, {
    popupSelector: '#popup-add-card',
    saveForm: (inputValues) => {
        const iCard = createCard(inputValues);
        cardList.addItem(iCard);

        popupAddCard.close();
    }
});
popupAddCard.setEventListeners();

// Попап с картинкой
const popupImageActive = new PopupWithImage(classSettings, '#popup-image');
popupImageActive.setEventListeners();







// =============================== Блок фукнций ===============================
// ---------- Управление попапами ----------
function openPopupEdit() {
    formEditingProfile.clearForm();

    // popupProfileAboutMe.value = userInfo.getUserInfo().userAboutMe;
    // popupProfileAboutMe.value = userInfo.getUserInfo().userAboutMe;
    popupProfileName.value = api.getUserData().name;
    popupProfileName.value = userInfo.getUserInfo().userName;

    popupEditActive.open();
}

function openPopupAdd() {
    formAddPlace.clearForm();

    popupAddCard.open();
}


// ---------- Создание новой карточки ----------
function createCard(objectWithData) {
    const newCard = new Card({
            data: objectWithData,
            handleCardClick: (activeImage, activeTitle) => {
                popupImageActive.open(activeImage, activeTitle);
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




// =============================== Блок валидации форм ===============================
// Старт процесса валидации
const formEditingProfile = new FormValidator(classSettings, popupFormEditingProfile);
formEditingProfile.enableValidation();

const formAddPlace = new FormValidator(classSettings, popupFormAddPlace);
formAddPlace.enableValidation();




// Временный блок ====================================================================
const popupDelete = document.querySelector('#popup-card-delete');
const deleteCardBtn = document.querySelector('.element__title');
const editAvatar = document.querySelector('.profile__avatar-btn');
const popupEditAvatar = document.querySelector('#popup-edit-avatar');
const popupFormEditingAvatar = popupEdit.querySelector('.popup__form');
const popupAvatar = popupFormEditingProfile.elements.userName;

// deleteCardBtn.addEventListener('click', () => {
//     popupDelete.classList.add('popup_opened');
// });
//
// editAvatar.addEventListener('click', () => {
//     popupEditAvatar.classList.add('popup_opened');
// });

