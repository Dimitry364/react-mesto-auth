class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getInitialData() {
    return Promise.all([this.getUser(), this.getInitialCards()]);
  }

  getUser() {
    return this._request(this._baseUrl + "/users/me", {
      method: "GET",
      headers: this._headers,
    });
  }

  setUser({ name, about }) {
    return this._request(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
  }

  updateAvatar(data) {
    return this._request(this._baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatarSrc,
      }),
    });
  }

  addCard({ name, link }) {
    return this._request(this._baseUrl + "/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  likeCard(cardId, isLiked) {
    return this._request(this._baseUrl + "/cards/likes/" + cardId, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    });
  }

  deleteCard(data) {
    return this._request(this._baseUrl + `/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  getInitialCards() {
    return this._request(this._baseUrl + "/cards", {
      method: "GET",
      headers: this._headers,
    });
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) return res.json();

    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-77",
  headers: {
    authorization: "1a5c2685-c177-4bf1-8fad-293b36b650f1",
    "Content-Type": "application/json",
  },
});

export default api;
