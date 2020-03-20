export class Api {
    constructor(options) {
      this.options = options;
      
    }

    getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`); 
        }
        return res.json();
    }
  
    //Получение карточек с сервера
    getInitialCards() {
        console.log(this.options.baseUrl);
        return fetch(`${this.options.baseUrl}/cards`, {
            headers: this.options.headers
        })
        .then((res) => this.getResponseData(res));
    }
    
    //Получение данных пользователя с сервера
    getUserInfo() {
        return fetch(`${this.options.baseUrl}/users/me`, {
            headers: this.options.headers
        })
        .then((res) => this.getResponseData(res));
    }
    
    //Обновляем данные пользователя
    updateUserInfo(name, about) {
        return fetch(`${this.options.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                name: name,
                about: about
              })
        })
        .then((res) => this.getResponseData(res));
    }

    //Добавление новой карточки методом POST
    addNewCard(name, link, likes) {
        return fetch(`${this.options.baseUrl}/cards`, {
            method: 'POST',
            headers: this.options.headers,
            body: JSON.stringify({
                name: name,
                link: link,
                likes: likes
              })
        })
        .then((res) => this.getResponseData(res));
    }

    //Изменение аватара
    userAvatarUpdate(link) {
        return fetch(`${this.options.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.options.headers,
            body: JSON.stringify({
                avatar: link
              })
        })
        .then((res) => this.getResponseData(res));
    }

    deleteCard(id) {
        return fetch(`${this.options.baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this.options.headers
        })
        .then((res) => this.getResponseData(res));
    }

    likeCard(id) {
        return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
            method: 'PUT',
            headers: this.options.headers
        })
        .then((res) => this.getResponseData(res))
    }

    deleteLikeCard(id) {
        return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
            method: 'DELETE',
            headers: this.options.headers
        })
        .then((res) => this.getResponseData(res));
    }

    //Позже дополню функциями удаления, лайка и прелодера
}

