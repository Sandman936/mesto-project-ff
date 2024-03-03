//

const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-8',
    headers: {
      authorization: '16d9fcd2-6486-4fff-bda9-31ea0dd0b509',
      'Content-Type': 'application/json'
    }
}

//Получение данных профиля с сервера

function profileInit () {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then( (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Код ошибки: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });
};

//Получение карточек с сервера

function cardsInit () {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then( (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Код ошибки: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });
};

//Проверка получения данных с сервера

export function dataInit () {
    return Promise.all([profileInit(), cardsInit()]);
};

//Обновление информации профиля на сервере

export function profileDataPatch (profileName, profileAbout) {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profileName,
            about: profileAbout
          })
    })
    .then( (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Код ошибки: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });
};

//Отправка новой карточки на сервер

export function newCardDataPost (cardName, cardLink) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
          })
    })
    .then( (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Код ошибки: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });
};

//Удаление карточки с сервера

export function removeCardDataDelete (cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then( (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Код ошибки: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });
};

//Лайк карточки

export function likeCardDataPut (cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then( (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Код ошибки: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });
};

//Снятие лайка карточки

export function likeCardDataDelete (cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then( (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Код ошибки: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });
};

//Обновление аватара профиля

export function profileAvatarDataPatch (link) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: link
          })
    })
    .then( (res) => {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Код ошибки: ${res.status}`);
    })
    .catch((err) => {
        console.error(err);
    });
};