// =============================== Блок утилит ===============================
// ---------- Получение элементов DOM ----------
// Элементы попапа с картинками
const popupImage = document.querySelector('#popup-image');
const activePopupImage = popupImage.querySelector('.popup__image');
const activePopupText = popupImage.querySelector('.popup__text');


// ---------- Управление попапами ----------
// Открытие попапов
// function openPopup(element) {
//     element.classList.add('popup_opened');
//     document.addEventListener('keydown', closePopupByEscape);
// }

// Закрытие попапов
// function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.removeEventListener('keydown', closePopupByEscape);
// }

// function closePopupByEscape(event) {
//     if (event.key === 'Escape') {
//         const openedPopup = document.querySelector('.popup_opened');
//         closePopup(openedPopup);
//     }
// }

// ---------- Экспорт данных ----------
// export { popupImage, activePopupImage, activePopupText, openPopup, closePopup };