// Elements of the DOM
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

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAboutMe = document.querySelector('.profile__about-me');

const placeAddBtn = document.querySelector('.profile__add-button');
const placeLikeBtns = Array.from(document.querySelectorAll('.element__like-button'));
const placeDeleteBtns = Array.from(document.querySelectorAll('.element__delete-button'));
const placeImageBtns = Array.from(document.querySelectorAll('.element__image-button'));

const popupEdit = document.querySelector('#popup-edit');
const popupFormEditingProfile = document.forms.editingProfile;
const popupProfileName = popupFormEditingProfile.elements.popupName;
const popupProfileAboutMe = popupFormEditingProfile.elements.popupAboutMe;

const popupAdd = document.querySelector('#popup-add');
const popupFormAddPlace = document.forms.addPlace;
const popupPlaceTitle = popupFormAddPlace.elements.popupTitle;
const popupPlaceLink = popupFormAddPlace.elements.popupLink;

const popupImage = document.querySelector('#popup-image');

const closePopupBtns = Array.from(document.querySelectorAll('.popup__close-button'));

getLikeCards();
getDeleteCards();
getImageCards();


// Events
profileEditBtn.addEventListener('click', openPopupEdit);
popupFormEditingProfile.addEventListener('submit', saveFormEdit);

placeAddBtn.addEventListener('click', openPopupAdd);
popupFormAddPlace.addEventListener('submit', saveFormAdd);

closePopupBtns.forEach((item) => {
  item.addEventListener('click', closePopup);
});


// Functions
function getCards() {
  initialCards.reverse().forEach(addCard);
}

function getLikeCards() {
  placeLikeBtns.forEach((item) => {
    item.addEventListener('click', chooseLikeCards);
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

function addCard(item, index, array) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.element__image').src = array[index].link;
  card.querySelector('.element__image').alt = array[index].name;
  card.querySelector('.element__title').textContent = array[index].name;
  card.querySelector('.popup__image').src = array[index].link;
  cards.prepend(card);
}

function openPopupEdit() {
  popupEdit.classList.add('popup_opened');
  popupProfileName.value = profileName.textContent;
  popupProfileAboutMe.value = profileAboutMe.textContent;
}

function openPopupAdd() {
  popupAdd.classList.add('popup_opened');
}
// TODO: исправить нахождение соседнего элемента от event.target
function openPopupImage(event) {
  event.target.children('.popup').classList.add('popup_opened');
}

function closePopup(element) {
  element.target.closest('.popup').classList.remove('popup_opened');
}

function saveFormEdit(event) {
  event.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileAboutMe.textContent = popupProfileAboutMe.value;
  closePopup(event);
}

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
  closePopup(event);
}

function createNewPlace() {
  const cardInfo = {};
  cardInfo.name = popupPlaceTitle.value;
  cardInfo.link = popupPlaceLink.value;
  initialCards.push(cardInfo);
}

function chooseLikeCards(event) {
  event.target.classList.toggle('element__like-button_active');
}

function deleteCard(event) {
  event.target.closest('.element').remove();
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