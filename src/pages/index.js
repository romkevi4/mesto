// =============================== Блок исходной информации ===============================
// ---------- Импорт данных ----------
// Исходные данные
import { initialCards, classSettings } from '../utils/initialData.js';

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

// Стили CSS
// import './index.css';


// ---------- Получение элементов DOM ----------
// Элементы блока редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');

// Элементы блока с карточками
const placeAddBtn = document.querySelector('.profile__add-button');

// Элементы попапа редактирования профиля
const popupEdit = document.querySelector('#popup-edit-profile');
const popupFormEditingProfile = popupEdit.querySelector('.popup__form');
const popupProfileName = popupFormEditingProfile.elements.userName;
const popupProfileAboutMe = popupFormEditingProfile.elements.userAboutMe;

// Элементы попапа добавления новой карточки
const popupAdd = document.querySelector('#popup-add');
const popupFormAddPlace = popupAdd.querySelector('.popup__form');


// ---------- Получение инфо о пользователе ----------
const userInfo = new UserInfo(classSettings);


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

const popupAddActive = new PopupWithForm(classSettings, {
    popupSelector: '#popup-add',
    saveForm: (inputValues) => {
        const iCard = createCard(inputValues);
        cardList.addItem(iCard);

        popupAddActive.close();
    }
});
popupAddActive.setEventListeners();

// Попап с картинкой
const popupImageActive = new PopupWithImage(classSettings, '#popup-image');
popupImageActive.setEventListeners();


// ---------- Получение карточек ----------
const cardList = new Section({
        items: initialCards,
        renderer: (cardItem) => {
            const iCard = createCard(cardItem);
            return iCard;
        }
    },
    classSettings
);
cardList.renderItems();




// =============================== Блок фукнций ===============================
// ---------- Управление попапами ----------
function openPopupEdit() {
    formEditingProfile.clearForm();

    popupProfileName.value = userInfo.getUserInfo().userName;
    popupProfileAboutMe.value = userInfo.getUserInfo().userAboutMe;

    popupEditActive.open();
}

function openPopupAdd() {
    formAddPlace.clearForm();

    popupAddActive.open();
}

// Создание новой карточки
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

deleteCardBtn.addEventListener('click', () => {
    popupDelete.classList.add('popup_opened');
});

editAvatar.addEventListener('click', () => {
    popupEditAvatar.classList.add('popup_opened');
});

