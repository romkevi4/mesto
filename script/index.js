// Elements of the DOM
let profileEditBtn = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let popup = document.querySelector('.popup');
let formEditingProfile = popup.querySelector('.popup__form');
let popupCloseBtn = popup.querySelector('.popup__close-button');
let popupSaveBtn = popup.querySelector('.popup__save-button');
let popupProfileName = popup.querySelector('#popup__item-name');
let popupProfileAboutMe = popup.querySelector('#popup__item-about-me');


// Events
profileEditBtn.addEventListener('click', popupOpen);
popupCloseBtn.addEventListener('click', popupClose);
formEditingProfile.addEventListener('submit', saveFormEditingProfile);


// Function
function popupOpen() {
  popup.classList.add('popup_opened');
  popupProfileName.value = profileName.textContent;
  popupProfileAboutMe.value = profileAboutMe.textContent;
}

function popupClose() {
  popup.classList.remove('popup_opened');
}

function saveFormEditingProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupProfileName.value;
  profileAboutMe.textContent = popupProfileAboutMe.value;
  popupClose();
}