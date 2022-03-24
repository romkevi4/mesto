// =============================== Формирование класса с информацией о пользователе ===============================
export default class UserInfo {
    constructor({ userName, userAboutMe }) {
        this._userName = document.querySelector(userName) ;
        this._userAboutMe = document.querySelector(userAboutMe);
    }

    getUserInfo() {
        this._userData = {
            userName: this._userName.textContent,
            userAboutMe: this._userAboutMe.textContent
        }
        return this._userData;
    }

    setUserInfo(data) {
        this._userName.textContent = data.userName;
        this._userAboutMe.textContent = data.userAboutMe;
    }
}