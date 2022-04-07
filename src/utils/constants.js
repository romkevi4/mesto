// =============================== Получение элементов DOM ===============================
// Элементы блока редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');

// Элементы блока с карточками
const placeAddBtn = document.querySelector('.profile__add-button');

// Элементы попапа редактирования профиля
const popupEdit = document.querySelector('#popup-edit-profile');
const popupFormEditingProfile = popupEdit.querySelector('.popup__form');
const popupProfileName = popupFormEditingProfile.elements.userName;
const popupProfileAboutMe = popupFormEditingProfile.elements.userAboutMe;

// Элементы попапа добавления новой карточки
const popupAdd = document.querySelector('#popup-add-card');
const popupFormAddPlace = popupAdd.querySelector('.popup__form');

export {
    profileEditBtn,
    placeAddBtn,
    popupEdit,
    popupFormEditingProfile,
    popupProfileName,
    popupProfileAboutMe,
    popupAdd,
    popupFormAddPlace
};