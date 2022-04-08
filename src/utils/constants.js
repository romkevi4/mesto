// =============================== Получение элементов DOM ===============================
// Элементы блока редактирования профиля
const profileEditBtn = document.querySelector('.profile__edit-button');

// Элементы блока с карточками
const placeAddBtn = document.querySelector('.profile__add-button');

// Элементы попапа редактирования профиля
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupFormEditingProfile = popupEditProfile.querySelector('.popup__form');
const popupProfileName = popupFormEditingProfile.elements.name;
const popupProfileAboutMe = popupFormEditingProfile.elements.about;

// Элементы попапа добавления новой карточки
const popupAddCard = document.querySelector('#popup-add-card');
const popupFormAddPlace = popupAddCard.querySelector('.popup__form');

// Элементы попапа удаления карточки
const popupDeleteCard = document.querySelector('#popup-delete-card');

export {
    profileEditBtn,
    placeAddBtn,
    popupEditProfile,
    popupFormEditingProfile,
    popupProfileName,
    popupProfileAboutMe,
    popupAddCard,
    popupFormAddPlace,
    popupDeleteCard
};