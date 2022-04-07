// =============================== Формирование класса с информацией о пользователе ===============================
export default class UserInfo {
    constructor({ userName, userAboutMe, userAvatar }) {
        this._userName = document.querySelector(userName) ;
        this._userAboutMe = document.querySelector(userAboutMe);
        this._userAvatar = document.querySelector(userAvatar);
    }

    getUserInfo() {
        this._userData = {
            userName: this._userName.textContent,
            userAboutMe: this._userAboutMe.textContent
        }
        return this._userData;
    }

    setUserInfo({ name, about, avatar }) {
        this._userName.textContent = name;
        this._userAboutMe.textContent = about;
        this._userAvatar.src = avatar;
    }
}