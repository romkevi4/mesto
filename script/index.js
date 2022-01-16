let editBtn = document.querySelector('.profile__edit-button');
let addBtn = document.querySelector('.profile__add-button');
let likeBtn = document.querySelector('.element__like-button');
let closeBtn = document.querySelector('.popup__close-button');
let saveBtn = document.querySelector('.popup__save-button');
let popup = document.querySelector('.popup');


editBtn.addEventListener('click', () => {
  popup.classList.add('popup_opened');
});

closeBtn.addEventListener('click', () => {
  popup.classList.remove('popup_opened');
});

likeBtn.addEventListener('click', () => {
  likeBtn.classList.toggle('element__like-button_active');
});
