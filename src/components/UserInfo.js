// =============================== Формирование класса с информацией о пользователе ===============================
export default class UserInfo {
    constructor({ userNameSelector, userAboutMeSelector, userAvatarSelector }) {
        this._userNameElement = document.querySelector(userNameSelector) ;
        this._userAboutMeElement = document.querySelector(userAboutMeSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    // Получение имени пользователя и инфо о себе
    getUserInfo() {
        this._userData = {
            name: this._userNameElement.textContent,
            about: this._userAboutMeElement.textContent
        }
        return this._userData;
    }

    // Корректировка данных пользователя на странице
    setUserInfo({ name, about, avatar, _id }) {
        this._userNameElement.textContent = name;
        this._userAboutMeElement.textContent = about;
        this._userAvatarElement.src = avatar;
        this._myId = _id;
    }

    // Передача ID пользователя
    handOverMyId() {
        return this._myId;
    }
}