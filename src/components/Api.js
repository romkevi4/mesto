// =============================== Формирование класса для работы с API ===============================
export default class Api {
    constructor({ serverAddress, token, cohort }) {
        this.serverAddress = serverAddress;
        this.token = token;
        this.cohort = cohort;
    }

    _processResponseData(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Что-то пошло не так, ошибка: ${res.status}`)
    }

    getUserData() {
        return fetch(`${this.serverAddress}/v1/${this.cohort}/users/me`, {
            method: 'GET',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._processResponseData);
    }

    getInitialCards() {
        return fetch(`${this.serverAddress}/v1/${this.cohort}/cards`, {
            method: 'GET',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            }
        })
            .then(this._processResponseData);
    }
}