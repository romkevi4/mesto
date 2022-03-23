// =============================== Блок исходной информации ===============================
// ---------- Импорт данных из других модулей .js ----------
// Исходные данные
import { initialCards, classSettings } from './initialData.js';

// Функции открытия и закрытия попапов
// import { openPopup, closePopup } from './utils.js';

// Создание новой карточки
import Card from './Card.js';

// Создание валидации форм
import FormValidator from './FormValidator.js';

// Управление попапами
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

// Отрисовка готовых элементов на странице
import Section from './Section.js';

// Отображение информации о пользователе
import UserInfo from './UserInfo.js';


// ---------- Получение элементов DOM ----------
// Элемент-обертка карточек
const cards = document.querySelector('.elements');

// Элементы блока редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

// Элементы блока с карточками
const placeAddBtn = document.querySelector('.profile__add-button');

// Все попапы
const popups = document.querySelectorAll('.popup');

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

        popupEditActive.deleteCheckingCursorPosition();
        popupEditActive.close();
        console.log(inputValues);
    }
});

const popupAddActive = new PopupWithForm(classSettings, {
    popup: popupAdd,
    saveForm: (inputValues) => {
        saveFormAdd(inputValues);
    }
});

// Попап с картинкой
const popupImageActive = new PopupWithImage(classSettings, {
    popup: popupImage,
    openPopupImage: () => {
        this._popupImage.src = this._image;
        this.popupImage.alt = this._name;
        this.popupText.textContent = this._name;
        openPopup(popupImage);
    }
});


// ---------- Получение карточек ----------
const cardList = new Section({
        items: initialCards,
        renderer: (cardItem) => {
            const iCard = new Card(cardItem, '#elements');
            return iCard.fillCard();
        }
    },
    classSettings
);
cardList.renderItems();




// =============================== Блок фукнций ===============================
// ---------- Управление карточками ----------
// // Визуализация карточки на странице
// function renderCard(element, wrapper) {
//     wrapper.prepend(element);
// }
//
// // Получение наименований мест и ссылок на картинки из исходного массива
// function getCards(array) {
//     array.reverse().forEach((item) => {
//         const iCardElement = createCard(item, '#elements');
//         renderCard(iCardElement, cards);
//     });
// }
//
// // Создание карточки
// function createCard(data, selector) {
//     const iCard = new Card(data, selector);
//
//     return iCard.fillCard();
// }



// ---------- Управление попапами ----------
function openPopupEdit() {
    formEditingProfile.clearForm();

    popupProfileName.value = userInfo.getUserInfo().userName;
    popupProfileAboutMe.value = userInfo.getUserInfo().userAboutMe;

    popupEditActive.open();
    popupEditActive.setCheckingCursorPosition();
}

function openPopupAdd() {
    formAddPlace.clearForm();

    popupPlaceTitle.value = '';
    popupPlaceLink.value = '';

    popupAddActive.setCheckingCursorPosition();
    popupAddActive.open();
}


// ---------- Управление отправкой форм ----------
// Сохранение формы редактирования профиля
function saveFormEdit(inputValues) {
    // console.log(popupProfileName.value);
    // const inputValues = popupEditActive.getInputValues();
    // console.log(inputValues);

    // profileName.textContent = inputValues[0];
    // profileAboutMe.textContent = inputValues[1];

    // profileName.textContent = inputValues.userName;
    // profileAboutMe.textContent = inputValues.userAboutMe;

}

// Сохранение формы добавления новой карточки
function saveFormAdd(inputValues) {


    // const inputValues = popupAddActive.getInputValues();
    // // console.log(inputValues);
    //
    // const newCard = {
    //     name: inputValues[0],
    //     link: inputValues[1]
    // }

    // userInfo.setUserInfo(inputValues);
    const newCard = new Card(inputValues, '#elements');
    newCard.fillCard();
    cardList.addItem(newCard.fillCard());


    popupAddActive.close();
    popupAddActive.deleteCheckingCursorPosition();
}




// =============================== Блок основных событий ===============================
// События открытия попапов
profileEditBtn.addEventListener('click', openPopupEdit);
placeAddBtn.addEventListener('click', openPopupAdd);

// События закрытия попапов
// popups.forEach((popup) => {
//     checkingCursorPosition(popup);
//
//     popup.addEventListener('click', (event) => {
//         if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
//             closePopup(popup);
//         }
//     });
// });

// События сохранения форм
// popupFormEditingProfile.addEventListener('submit', saveFormEdit);
// popupFormAddPlace.addEventListener('submit', saveFormAdd);

// Старт отрисовки карточек
// getCards(initialCards);




// =============================== Блок валидации форм ===============================
// Старт процесса валидации
const formEditingProfile = new FormValidator(classSettings, popupFormEditingProfile);
formEditingProfile.enableValidation();

const formAddPlace = new FormValidator(classSettings, popupFormAddPlace);
formAddPlace.enableValidation();