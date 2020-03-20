export class Popup {
  constructor(createValidator, userEditForm, userNameTitle, userProfessionTitle, loading) {
    this.userEditForm = userEditForm;
    this.userNameTitle = userNameTitle;
    this.userProfessionTitle = userProfessionTitle;
    this.createValidator = createValidator;
    this.loading = loading;
    this.open = this.open.bind(this);
  }

  openPopup(popUp) {
    popUp.classList.add('popup_is-opened');
    if(!popUp.classList.contains('popup-image')) {
      this.createValidator(popUp);
    }
    if(popUp.classList.contains('popup-user')) {
      popUp.querySelector('.popup-user__button').removeAttribute('disabled');
    }
  }

  open(event) {
    
//Открываем попап добавления новой карточки
    if(event.target.classList.contains('user-info__button')) {
      this.openPopup(document.querySelector('.popup_place'));
      this.loading(false);
    }
//Открываем попап редактирования данных пользователя
    if(event.target.classList.contains('user-info__edit-button')) {
      this.openPopup(document.querySelector('.popup-user'));
      this.userEditForm.elements.name.value = this.userNameTitle.textContent;
      this.userEditForm.elements.profession.value = this.userProfessionTitle.textContent;
      this.loading(false);
    }
//Открываем попап с увеличенной картинкой
    if(event.target.classList.contains('place-card__image')) {
      this.openPopup(document.querySelector('.popup-image'));
      
      const popUpImageSrc = document.querySelector('.popup-image__image');
      const imageValueSrc = event.target.attributes.style.value;

      popUpImageSrc.setAttribute('src', imageValueSrc.slice(22, -2));
    }
  //Открываем попап изменения аватара
  if(event.target.classList.contains('user-info__cover')) {
    this.openPopup(document.querySelector('.popup-avatar'));
    this.loading(false);
  }
}

  close(event) {
    if(event.type ==='submit') {
      event.target.closest('.popup').classList.remove('popup_is-opened');
      event.preventDefault();
    }

    if(event.key === 'Escape') {
      document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
      event.preventDefault();
    }

    if(event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
      event.target.closest('.popup').classList.remove('popup_is-opened');
      event.preventDefault();
    }
  }

}



