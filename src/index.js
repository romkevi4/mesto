// =============================== Блок исходной информации ===============================
// ---------- Импорт данных ----------
// Исходные данные
import { initialCards, classSettings } from './components/initialData.js';

// Создание новой карточки
import Card from './components/Card.js';

// Создание валидации форм
import FormValidator from './components/FormValidator.js';

// Управление попапами
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';

// Отрисовка готовых элементов на странице
import Section from './components/Section.js';

// Отображение информации о пользователе
import UserInfo from './components/UserInfo.js';

// Стили CSS
import './pages/index.css';


// ---------- Получение элементов DOM ----------
// Элементы блока редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');

// Элементы блока с карточками
const placeAddBtn = document.querySelector('.profile__add-button');

// Элементы попапа редактирования профиля
const popupEdit = document.querySelector('#popup-edit');
const popupFormEditingProfile = popupEdit.querySelector('.popup__form');
const popupProfileName = popupFormEditingProfile.elements.userName;
const popupProfileAboutMe = popupFormEditingProfile.elements.userAboutMe;

// Элементы попапа добавления новой карточки
const popupAdd = document.querySelector('#popup-add');
const popupFormAddPlace = popupAdd.querySelector('.popup__form');
const popupPlaceTitle = popupFormAddPlace.elements.name;
const popupPlaceLink = popupFormAddPlace.elements.link;

// Элементы попапа с картинками
const popupImage = document.querySelector('#popup-image');


// ---------- Получение инфо о пользователе ----------
const userInfo = new UserInfo(classSettings);


// ---------- Получение попапов ----------
// Попапы с формой
const popupEditActive = new PopupWithForm(classSettings, {
    popup: popupEdit,
    saveForm: (inputValues) => {
        userInfo.setUserInfo(inputValues);

        popupEditActive.close();
    }
});

const popupAddActive = new PopupWithForm(classSettings, {
    popup: popupAdd,
    saveForm: (inputValues) => {
        const newCard = new Card({
                data: inputValues,
                handleCardClick: (activeImage, activeTitle) => {
                    popupImageActive.setElementValues(activeImage, activeTitle);
                    popupImageActive.open();
                }
            },
            '#elements'
        );
        newCard.fillCard();
        cardList.addItem(newCard.fillCard());

        popupAddActive.close();
    }
});

// Попап с картинкой
const popupImageActive = new PopupWithImage(classSettings, popupImage);


// ---------- Получение карточек ----------
const cardList = new Section({
        items: initialCards,
        renderer: (cardItem) => {
            const iCard = new Card({
                    data: cardItem,
                    handleCardClick: (activeImage, activeTitle) => {
                        popupImageActive.setElementValues(activeImage, activeTitle);
                        popupImageActive.open();
                    }
                },
                '#elements'
            );
            return iCard.fillCard();
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

    popupPlaceTitle.value = '';
    popupPlaceLink.value = '';

    popupAddActive.open();
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