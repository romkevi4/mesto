// Все необходимые элементы DOM
const mainBlock = document.querySelector('.main');
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
const cards = document.createElement('section');
cards.classList.add('elements');
mainBlock.append(cards);

const cardTemplate = document.querySelector('#elements').content;
getCards();

// Элементы блока редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

// Элементы блока с картточками
const placeAddBtn = document.querySelector('.profile__add-button');
const placeLikeBtns = Array.from(document.querySelectorAll('.element__like-button'));
const placeDeleteBtns = Array.from(document.querySelectorAll('.element__delete-button'));
const placeImageBtns = Array.from(document.querySelectorAll('.element__image-button'));

// Элементы попапа редактирования профиля
const popupEdit = document.querySelector('#popup-edit');
const popupFormEditingProfile = document.forms.editingProfile;
const popupProfileName = popupFormEditingProfile.elements.popupName;
const popupProfileAboutMe = popupFormEditingProfile.elements.popupAboutMe;

// Элементы попапа добавления новой карточки
const popupAdd = document.querySelector('#popup-add');
const popupFormAddPlace = document.forms.addPlace;
const popupPlaceTitle = popupFormAddPlace.elements.popupTitle;
const popupPlaceLink = popupFormAddPlace.elements.popupLink;

// Попап с картинками
const popupImage = document.querySelector('#popup-image');

// Кнопки закрытия попапов
const closePopupBtns = Array.from(document.querySelectorAll('.popup__close-button'));

getLikeCards();
getDeleteCards();
getImageCards();
getClosePopup();


// События
profileEditBtn.addEventListener('click', openPopupEdit);
popupFormEditingProfile.addEventListener('submit', saveFormEdit);

placeAddBtn.addEventListener('click', openPopupAdd);
popupFormAddPlace.addEventListener('submit', saveFormAdd);


// Функции
// Получение карточек и относящихся к ним кнопок 
function getCards() {
  initialCards.reverse().forEach(addCard);
}

function getLikeCards() {
  placeLikeBtns.forEach((item) => {
    item.addEventListener('click', chooseLikeCard);
  });
}

function getDeleteCards() {
  placeDeleteBtns.forEach((item) => {
    item.addEventListener('click', deleteCard);
  });
}

function getImageCards() {
  placeImageBtns.forEach((item) => {
    item.addEventListener('click', openPopupImage);
  });
}

function getClosePopup() {
  closePopupBtns.forEach((item) => {
    item.addEventListener('click', closePopup);
  });
}

// Добавление карточки
function addCard(item, index, array) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__image').src = array[index].link;
  card.querySelector('.element__image').alt = array[index].name;
  card.querySelector('.element__title').textContent = array[index].name;
  card.querySelector('.popup__image').src = array[index].link;
  card.querySelector('.popup__text').textContent = array[index].name;
  cards.prepend(card);
}

// Всплывающие окна
function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  popupProfileName.value = profileName.textContent;
  popupProfileAboutMe.value = profileAboutMe.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}

function openPopupImage(event) {
  event.target.closest('.element').querySelector('.popup').classList.add('popup_opened');
}

function closePopup(element) {
  element.target.closest('.popup').classList.remove('popup_opened');
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
  createNewPlace();
  addCard(initialCards[initialCards.length - 1], initialCards.length - 1, initialCards);
  createNewPlaceLikeBtn();
  getLikeCards();
  createNewPlaceDeleteBtn();
  getDeleteCards();
  createNewPlaceImageBtn();
  getImageCards();
  createNewClosePopupBtn();
  getClosePopup();
  closePopup(event);
}

// Выбор понравившихся карточек
function chooseLikeCard(event) {
  event.target.classList.toggle('element__like-button_active');
}

// Удаление карточки
function deleteCard(event) {
  event.target.closest('.element').remove();
}

// Создание новых элементов кнопок и добавление в массивы
function createNewPlace() {
  const cardInfo = {};
  cardInfo.name = popupPlaceTitle.value;
  cardInfo.link = popupPlaceLink.value;
  initialCards.push(cardInfo);
}

function createNewPlaceLikeBtn() {
  const newPlaceLikeBtn = document.querySelector('.element__like-button');
  placeLikeBtns.push(newPlaceLikeBtn);
}

function createNewPlaceDeleteBtn() {
  const newPlaceDeleteBtn = document.querySelector('.element__delete-button');
  placeDeleteBtns.push(newPlaceDeleteBtn);
}

function createNewPlaceImageBtn() {
  const newPlaceImageBtn = document.querySelector('.element__image-button');
  placeImageBtns.push(newPlaceImageBtn);
}

function createNewClosePopupBtn() {
  const newClosePopupBtn = document.querySelector('.popup__close-button');
  closePopupBtns.push(newClosePopupBtn);
}