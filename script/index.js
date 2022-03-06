// =============================== Блок исходной информации ===============================
// ---------- Импорт данных из других модулей .js ----------
// Исходные данные
import { initialCards, classSettings } from "./initialData.js";

// Функции открытия и закрытия попапов
import { openPopup, closePopup } from './utils.js';

// Создание новой карточки
import { Card } from './Card.js';

// Создание валидации форм
import { FormValidator } from './FormValidator.js';


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
const popupProfileName = popupFormEditingProfile.elements.popupName;
const popupProfileAboutMe = popupFormEditingProfile.elements.popupAboutMe;

// Элементы попапа добавления новой карточки
const popupAdd = document.querySelector('#popup-add');
const popupFormAddPlace = popupAdd.querySelector('.popup__form');
const popupPlaceTitle = popupFormAddPlace.elements.popupTitle;
const popupPlaceLink = popupFormAddPlace.elements.popupLink;




// =============================== Блок фукнций ===============================
// ---------- Управление карточками ----------
// Визуализация карточки на странице
function renderCard(element, wrapper) {
    wrapper.prepend(element);
}

// Получение наименований мест и ссылок на картинки из исходного массива
function getCards(array) {
    array.reverse().forEach((item) => {
        const iCardElement = createCard(item, '#elements');
        renderCard(iCardElement, cards);
    });
}

// Создание карточки
function createCard(data, selector) {
    const iCard = new Card(data, selector);

    return iCard.fillCard();
}


// ---------- Управление попапами ----------
function openPopupEdit() {
    popupProfileName.value = profileName.textContent;
    popupProfileAboutMe.value = profileAboutMe.textContent;
    openPopup(popupEdit);
    formEditingProfile.clearForm();
}

function openPopupAdd() {
    popupPlaceTitle.value = '';
    popupPlaceLink.value = '';
    openPopup(popupAdd);
    formAddPlace.clearForm();
}

// Проверка положения курсора мыши на попапе
function checkingCursorPosition(popup) {
    if (popup.classList.contains('popup_opacity')) {
        popup.addEventListener('mouseover', (evt) => {
            const activePopupImage = popup.querySelector('.popup__image');

            if (evt.target !== activePopupImage) {
                popup.style.cursor = 'pointer';

            } else if (evt.target === activePopupImage) {
                activePopupImage.style.cursor = 'default';
            }
        });

    } else {
        popup.addEventListener('mouseover', (evt) => {
            const activePopupForm = popup.querySelector('.popup__form');

            if (evt.target !== activePopupForm) {
                popup.style.cursor = 'pointer';

            } else if (evt.target === activePopupForm || evt.target === popup.querySelector('.popup__title')) {
                activePopupForm.style.cursor = 'default';
            }
        });
    }
}


// ---------- Управление отправкой форм ----------
// Сохранение формы редактирования профиля
function saveFormEdit(event) {
    event.preventDefault();

    profileName.textContent = popupProfileName.value;
    profileAboutMe.textContent = popupProfileAboutMe.value;

    closePopup(event.target.closest('.popup'));
}

// Сохранение формы добавления новой карточки
function saveFormAdd(event) {
    event.preventDefault();

    const newCard = {
        name: popupPlaceTitle.value,
        link: popupPlaceLink.value
    }

    const iCardElement = createCard(newCard, '#elements');
    renderCard(iCardElement, cards);

    closePopup(event.target.closest('.popup'));
}




// =============================== Блок основных событий ===============================
// События открытия попапов
profileEditBtn.addEventListener('click', openPopupEdit);
placeAddBtn.addEventListener('click', openPopupAdd);

// События закрытия попапов
popups.forEach((popup) => {
    checkingCursorPosition(popup);

    popup.addEventListener('click', (event) => {
        if (event.target === event.currentTarget || event.target.classList.contains('popup__close-button')) {
            closePopup(popup);
        }
    });
});

// События сохранения форм
popupFormEditingProfile.addEventListener('submit', saveFormEdit);
popupFormAddPlace.addEventListener('submit', saveFormAdd);

// Старт отрисовки карточек
getCards(initialCards);



// =============================== Блок валидации форм ===============================
// Старт процесса валидации
const formEditingProfile = new FormValidator(classSettings, popupFormEditingProfile);
formEditingProfile.enableValidation();

const formAddPlace = new FormValidator(classSettings, popupFormAddPlace);
formAddPlace.enableValidation();