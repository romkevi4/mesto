// Elements of the DOM
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
let profileEditBtn = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');

let placeAddBtn = document.querySelector('.profile__add-button');

let popupEdit = document.querySelector('#popup-edit');
let formEditingProfile = document.forms.editingProfile;
let popupProfileName = formEditingProfile.elements.popupName;
let popupProfileAboutMe = formEditingProfile.elements.popupAboutMe;

let popupAdd = document.querySelector('#popup-add');
let formAddPlace = document.forms.addPlace;
let popupPlaceTitle = formAddPlace.elements.popupTitle;
let popupPlaceLink = formAddPlace.elements.popupLink;

const popupCloseBtns = document.querySelectorAll('.popup__close-button');
// const popupSaveBtns = document.querySelectorAll('.popup__save-button');

const likeBtns = document.querySelectorAll('.element__like-button');


// Events
profileEditBtn.addEventListener('click', popupEditOpen);
placeAddBtn.addEventListener('click', popupEditOpen);
popupCloseBtns.forEach((element) => {
  element.addEventListener('click', popupClose);
});
formEditingProfile.addEventListener('submit', saveForm);

formAddPlace.addEventListener('submit', saveForm);


likeBtns.forEach((element) => {
  element.addEventListener('click', (elem) => {
    elem.target.classList.toggle('element__like-button_active');
  });
});


// Function
function popupEditOpen() {
  popupEdit.target.classList.add('popup_opened');
  popupProfileName.value = profileName.textContent;
  popupProfileAboutMe.value = profileAboutMe.textContent;
}


function popupClose(evt) {
  evt.target.classList.remove('popup_opened');
}

function saveForm(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileAboutMe.textContent = popupProfileAboutMe.value;
  popupClose();
}