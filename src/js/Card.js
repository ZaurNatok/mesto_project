export class Card {
  constructor(name, link, placesContainer, likes, id, api, owner) {
    this.api = api;
    this.remove = this.remove.bind(this);
    this.like = this.like.bind(this);
    this.placesContainer = placesContainer;
    this.likes = likes;
    this.id = id;
    this.owner = owner;
    this.placeContainer = this.create(name, link, likes, owner);
    this.placeContainer
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.like);
    this.placeContainer
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this.remove);
  }

  create(titleValue, imageValue, likes, owner) {
   
    const placeContainer = document.createElement('div');
    const imageElement = document.createElement('div');
    const deleteElement = document.createElement('button');
    const descriptionElement = document.createElement('div');
    const titleElement = document.createElement('h3');
    const likeElement = document.createElement('div');
    const likeButton = document.createElement('button');
    const likeCounter = document.createElement('p');

    placeContainer.classList.add('place-card');
    imageElement.classList.add('place-card__image');
    deleteElement.classList.add('place-card__delete-icon');
    descriptionElement.classList.add('place-card__description');
    titleElement.classList.add('place-card__name');
    likeButton.classList.add('place-card__like-icon');
    likeElement.classList.add('place-card__like-element');
    likeCounter.classList.add('place-card__like-counter');

    this.placesContainer.appendChild(placeContainer);
    placeContainer.appendChild(imageElement);
    placeContainer.appendChild(descriptionElement);
    placeContainer.appendChild(deleteElement);
    descriptionElement.appendChild(titleElement);
    likeElement.appendChild(likeButton);
    descriptionElement.appendChild(likeElement);
    likeElement.appendChild(likeCounter);

    if(likes) {
    if(likes.find(owner => owner._id === '09e8b877e6c2f975d4c45272' )) {
      likeButton.classList.add('place-card__like-icon_liked');
    };

    if(owner === '09e8b877e6c2f975d4c45272') {
      deleteElement.classList.add('delete-icon-show');
    }
  
    }

    likeCounter.textContent = likes.length;
    titleElement.textContent = titleValue;
    imageElement.setAttribute('style', 'background-image: url(' + imageValue + ');');
    this.api;
  return placeContainer;
  }

  like(event) {
    if(!event.target.classList.contains('place-card__like-icon_liked')) {
      this.api.likeCard(this.id);
      event.target.classList.add('place-card__like-icon_liked');
      let count = parseInt(event.target.nextElementSibling.textContent, 10);
      event.target.nextElementSibling.textContent = count + 1;
    }
    else {
      this.api.deleteLikeCard(this.id);
      event.target.classList.remove('place-card__like-icon_liked');
      let count = parseInt(event.target.nextElementSibling.textContent, 10);
      event.target.nextElementSibling.textContent = count - 1;
    }
  }

  remove(event) {
    if (window.confirm("Вы действительно хотите удалить эту карточку?")) { 
      this.api.deleteCard(this.id);
      this.placesContainer.removeChild(event.target.parentElement);
    }
  }
}

