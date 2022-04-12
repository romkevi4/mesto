// =============================== Формирование класса с информацией о пользователе ===============================
export default class UserInfo {
    constructor({
            userNameSelector,
            userAboutMeSelector,
            userAvatarSelector
        }, {
        name,
        about,
        avatar,
        _id
    }) {
        this._userNameElement = document.querySelector(userNameSelector) ;
        this._userAboutMeElement = document.querySelector(userAboutMeSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
        this._name = name;
        this._about = about;
        this._avatar = avatar;
        this._id = _id;
    }

    // Заполнение разметки данными пользователя
    addUserDataToPage() {
        this._userNameElement.textContent = this._name;
        this._userAboutMeElement.textContent = this._about;
        this._userAvatarElement.src = this._avatar;
    }

    // Получение имени пользователя и инфо о себе
    getUserInfo() {
        this._userData = {
            userName: this._userNameElement.textContent,
            userAboutMe: this._userAboutMeElement.textContent
        }
        return this._userData;
    }

    // Получение id пользователя
    getUserId() {
        return this._id;
    }

    // Корректировка данных пользователя на странице
    setUserInfo({ nameNew, aboutNew }) {
        this._userNameElement.textContent = nameNew;
        this._userAboutMeElement.textContent = aboutNew;
    }

    // Корректировака аватара на странице
    setUserAvatar({ avatarNew }) {
        this._userAvatarElement.src = avatarNew;
    }


}