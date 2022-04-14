// =============================== Блок исходной информации ===============================

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