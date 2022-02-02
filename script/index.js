// Исходный массив для формирования карточек
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

// Элемент-обертка карточек
const cards = document.querySelector('.elements');

// Элементы темплейт для формирования карточек
const cardTemplate = document.querySelector('#elements').content;

// Элементы блока редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

// Элементы блока с картточками
const placeAddBtn = document.querySelector('.profile__add-button');

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

// Элементы попапа с картинками 
const popupImage = document.querySelector('#popup-image');


// События открытия попапов и сохранения форм
profileEditBtn.addEventListener('click', openPopupEdit);
popupFormEditingProfile.addEventListener('submit', saveFormEdit);

placeAddBtn.addEventListener('click', openPopupAdd);
popupFormAddPlace.addEventListener('submit', saveFormAdd);


// Получение наименований мест и ссылок на картинки из исходного массива
function getCards(array) {
  array.reverse().forEach((item) => {
    createCard(item.name, item.link);
  });
}

// Создание новой карточки
function createCard(name, link) {
  const newCard = cardTemplate.cloneNode(true);
  newCard.querySelector('.element__image').src = link;
  newCard.querySelector('.element__image').alt = name;
  newCard.querySelector('.element__title').textContent = name;
  addCardListeners(newCard);
  cards.prepend(newCard);
}

function addCardListeners(element) {
  element.querySelector('.element__like-button').addEventListener('click', chooseLikeCard);
  element.querySelector('.element__delete-button').addEventListener('click', deleteCard);
  element.querySelector('.element__image-button').addEventListener('click', openPopupImage);
}

// Выбор понравившихся карточек
function chooseLikeCard(event) {
  event.target.classList.toggle('element__like-button_active');
}

// Удаление карточки
function deleteCard(event) {
  event.target.closest('.element').remove();
}

// Открытие попапов
function addClassPopup(element) {
  element.classList.add('popup_opened');
}

function openPopupImage(event) {
  document.querySelector('.popup__image').src = event.target.src;
  document.querySelector('.popup__image').alt = event.target.alt;
  document.querySelector('.popup__text').textContent = event.target.closest('.element').querySelector('.element__title').textContent;
  addClassPopup(event.target.closest('.page').querySelector('#popup-image'));
  addPopupListeners(popupImage);
}

function openPopupEdit() {
  addClassPopup(popupEdit);
  popupProfileName.value = profileName.textContent;
  popupProfileAboutMe.value = profileAboutMe.textContent;
  addPopupListeners(popupEdit);
}

function openPopupAdd() {
  popupPlaceTitle.value = '';
  popupPlaceLink.value = '';
  addClassPopup(popupAdd);
  addPopupListeners(popupAdd);
}

function addPopupListeners(element) {
  element.querySelector('.popup__close-button').addEventListener('click', closePopup);
}

// Закрытие попапов
function closePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
}

// Сохранение формы редактирования профиля
function saveFormEdit(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileAboutMe.textContent = popupProfileAboutMe.value;
  closePopup(event);
}

// Сохранение формы добавления новой карточки
function saveFormAdd(event) {
  event.preventDefault();
  createCard(popupPlaceTitle.value, popupPlaceLink.value);
  closePopup(event);
}

getCards(initialCards);