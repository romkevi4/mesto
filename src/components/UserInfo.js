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
            userName: this._userNameElement.textContent,
            userAboutMe: this._userAboutMeElement.textContent
        }
        return this._userData;
    }

    // Корректировка данных пользователя на странице
    setUserInfo(name, about) {
        this._userNameElement.textContent = name;
        this._userAboutMeElement.textContent = about;
    }

    // Получение ID пользователя
    getMyId(myId) {
        this._myId = myId;
    }

    // Передача ID пользователя
    handOverMyId() {
        return this._myId;
    }

    // Корректировака ссылки аватара на странице
    setUserAvatar(avatarUrl) {
        this._userAvatarElement.src = avatarUrl;
    }
}