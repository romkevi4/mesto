// =============================== Получение элементов DOM ===============================
// Элементы блока редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileEditAvatarBtn = document.querySelector('.profile__avatar-btn');

// Элементы блока с карточками
const placeAddBtn = document.querySelector('.profile__add-button');

// Элементы попапа редактирования профиля
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupFormEditingProfile = popupEditProfile.querySelector('.popup__form');
const saveFormProfileBtn = popupFormEditingProfile.querySelector('.popup__save-button');

// Элементы попапа добавления новой карточки
const popupAddCard = document.querySelector('#popup-add-card');
const popupFormAddPlace = popupAddCard.querySelector('.popup__form');
const saveFormAddPlaceBtn = popupFormAddPlace.querySelector('.popup__save-button');

// Элементы попапа редактирования аватара
const popupEditAvatar = document.querySelector('#popup-edit-avatar');
const popupFormEditingAvatar = popupEditAvatar.querySelector('.popup__form');
const saveFormAvatarBtn = popupFormEditingAvatar.querySelector('.popup__save-button');

//
const popupDeleteCard = document.querySelector('#popup-delete-card');
const popupFormDeleteCard = popupDeleteCard.querySelector('.popup__form');
const saveFormDeleteCardBtn = popupFormDeleteCard.querySelector('.popup__save-button');

export {
    profileEditBtn,
    profileEditAvatarBtn,
    placeAddBtn,
    popupFormEditingProfile,
    saveFormProfileBtn,
    popupFormAddPlace,
    saveFormAddPlaceBtn,
    popupFormEditingAvatar,
    saveFormAvatarBtn,
    saveFormDeleteCardBtn
};