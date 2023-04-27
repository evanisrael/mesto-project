// Класс для работы с HTTP REST API

class Api {
  constructor (options) {
    this.config = options
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  updateUserInfo (name, about) {
    return this._request(`${this.config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  updateAvatar (newAvatar) {
    return this._request(`${this.config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.config.headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    });
  }

  addCardToServer (title, link) {
    return this._request(`${this.config.baseUrl}/cards`, {
      method: 'POST',
      headers: this.config.headers,
      body: JSON.stringify({
        name: title,
        link: link
      })
    });
  }

   getInitialCards() {
    return this._request(`${this.config.baseUrl}/cards`, {
      headers: this.config.headers,
    });
  };

   getUserInfo() {
    return this._request(`${this.config.baseUrl}/users/me`, {
      headers: this.config.headers,
    });
  };

   deleteSelectedCard(cardId) {
    return this._request(`${this.config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.config.headers,
    });
  };

   addLike(cardId) {
    return this._request(`${this.config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.config.headers,
    });
  }

   removeLike(cardId) {
    return this._request(`${this.config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.config.headers,
    });
  }
}

export default Api

