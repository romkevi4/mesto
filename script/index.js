let profileEditBtn = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAboutMe = document.querySelector('.profile__about-me');
let popup = document.querySelector('.popup');
let formEditingProfile = popup.querySelector('.popup__form');
let popupCloseBtn = popup.querySelector('.popup__close-button');
let popupSaveBtn = popup.querySelector('.popup__save-button');
let popupProfileName = popup.querySelector('#popup__item-name');
let popupProfileAboutMe = popup.querySelector('#popup__item-about-me');


profileEditBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  popup.classList.add('popup_opened');
  popupProfileName.value = profileName.textContent;
  popupProfileAboutMe.value = profileAboutMe.textContent;
});
popupCloseBtn.addEventListener('click', popupClose);
popupSaveBtn.addEventListener('click', saveFormEditingProfile);
document.addEventListener('keyup', (evt) => {
  if (evt.code === 'Enter') {
    saveFormEditingProfile();
  }
});
formEditingProfile.addEventListener('submit', saveFormEditingProfile);


function popupClose() {
  popup.classList.remove('popup_opened');
}

function saveFormEditingProfile(evt) {
  evt.preventDefault();
  let valuePopupProfileName = popupProfileName.value,
      valuePopupProfileAboutMe = popupProfileAboutMe.value;

  profileName.textContent = valuePopupProfileName;
  profileAboutMe.textContent = valuePopupProfileAboutMe;
  popupClose();
}