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
    return _request(`${this.config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }
  
  updateAvatar (newAvatar) {
    return _request(`${this.config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    });
  }
  
  addCardToServer (title, link) {
    return _request(`${this.config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: title,
        link: link
      })
    });
  }
  
   getInitialCards() {
    return _request(`${this.config.baseUrl}/cards`, {
      headers: config.headers,
    });
  };
  
   getUserInfo() {
    return _request(`${this.config.baseUrl}/users/me`, {
      headers: config.headers,
    });
  };
  
   deleteSelectedCard(cardId) {
    return _request(`${this.config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    });
  };
  
   addLike(cardId) {
    return _request(`${this.config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    });
  }
  
   removeLike(cardId) {
    return _request(`${this.config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    });
  }
}

const api = new Api ({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-22',
  headers: {
    authorization: 'b9b8ff59-f5f7-49b0-80ac-8e59386cec27',
    'Content-Type': 'application/json'
  }
})

export { api }

