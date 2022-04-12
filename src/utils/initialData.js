// =============================== Блок исходной информации ===============================
// Массив для формирования карточек
// const initialCards = [
//     {
//         name: 'Сочи',
//         link: 'https://images.unsplash.com/photo-1612693730241-2faeb28d176f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
//     },
//     {
//         name: 'Челябинская область',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//     },
//     {
//         name: 'Иваново',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//     },
//     {
//         name: 'Камчатка',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//     },
//     {
//         name: 'Холмогорский район',
//         link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//     },
//     {
//         name: 'Байкал',
//         link: 'https://images.unsplash.com/photo-1612899028149-ddc7969d27cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
//     }
// ];

// Необходимые классы и селекторы элементов
const classSettings = {
    inputSelector: '.popup__item',
    submitBtnSelector: '.popup__save-button',
    inactiveBtnClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__item_type_error',
    popupOpenedSelector: 'popup_opened',
    popupCloseBtnSelector: 'popup__close-button',
    popupFormSelector: '.popup__form',
    elementsContainerSelector: '.elements',
    popupImageSelector: '.popup__image',
    popupTextSelector: '.popup__text',
    userNameSelector: '.profile__name',
    userAboutMeSelector: '.profile__about-me',
    userAvatarSelector: '.profile__avatar'
};

// Личный токен и идентификатор группы
const identificationData = {
    serverAddress: 'https://mesto.nomoreparties.co',
    token: '9ff2b918-e6cb-4167-93e4-8edb12eea460',
    cohort: 'cohort-39'
}

export { classSettings, identificationData };