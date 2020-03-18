import "./pages/index.css";
import {Api} from './js/Api.js';
import {CardList} from './js/CardList.js';
import {UserInfo} from './js/UserInfo.js';
import {Popup} from './js/Popup.js';
import {Card} from './js/Card.js';
console.log(NODE_ENV);

const api = new Api({
    baseUrl: NODE_ENV==='development' ? 'http://praktikum.tk/cohort8' : 'https://praktikum.tk/cohort8',
    headers: {
      authorization: '3eabab26-bde3-4392-9782-efedf7b23f60',
      'Content-Type': 'application/json'
    }
  });
  const placesContainer = document.querySelector('.places-list');
  const addForm = document.forms.new;
  const userEditForm = document.forms.userinfo;
  const userAvatarForm = document.forms.useravatar;
  const userNameTitle = document.querySelector('.user-info__name');
  const userProfessionTitle = document.querySelector('.user-info__job');
  const userAvatar = document.querySelector('.user-info__photo');
  const sort = document.querySelector('.filter__button_sort');
  const sortReverse = document.querySelector('.filter__button_sortReverse');
  const find = document.querySelector('.filter__find');
  
  function renderLoading(isLoading) {
    if(isLoading) {
      document.querySelector('.popup_is-opened').querySelector('.button_default').style.display = 'none';
      document.querySelector('.popup_is-opened').querySelector('.button_loading').style.display = 'block';
    }
    else {
      document.querySelector('.popup_is-opened').querySelector('.button_default').style.display = 'block';
      document.querySelector('.popup_is-opened').querySelector('.button_loading').style.display = 'none';
    }
  }
  // Вешаем слушатели
  addForm.addEventListener('submit', function () {
    event.preventDefault();
    renderLoading(true);
    api.addNewCard(addForm.elements.name.value, addForm.elements.link.value, '')
    .then((newCardData) => {
      cardlist.addCard(addForm.elements.name.value, addForm.elements.link.value, '', newCardData._id);
      addForm.reset();
    })
  });
  
  userEditForm.addEventListener('submit', function (event) {
    event.preventDefault();
    renderLoading(true);
    api.updateUserInfo(userEditForm.elements.name.value, userEditForm.elements.profession.value)
    .then((newUserData) => {
      userinfo.updateUserInfo(userEditForm.elements.name.value, userEditForm.elements.profession.value);
      
    })
    .catch(() => {
      //сюда попадаем если запрос завершился ошибкой
      console.log('Ошибка. Запрос не выполнен');
    }) 
  });
  
  userAvatarForm.addEventListener('submit', function (event) {
    event.preventDefault();
    renderLoading(true);
    api.userAvatarUpdate(userAvatarForm.elements.link.value)
    .then((newAvatar) => {
      userinfo.updateUserAvatar(userAvatarForm.elements.link.value);
      userAvatarForm.reset();
    })
    .catch(() => {
      //сюда попадаем если запрос завершился ошибкой
      console.log('Ошибка. Запрос не выполнен');
    })
  });
  
  
  
  // Создание экземпляров классов
  const createCard = (name, link, placesContainer, likes, id, api, owner) => new Card(name, link, placesContainer, likes, id, api, owner);
  const cardlist = new CardList(placesContainer, createCard, api);
  const userinfo = new UserInfo(userEditForm.elements.name.value, userEditForm.elements.profession.value, userEditForm, userNameTitle, userProfessionTitle, api, userAvatar);
  const createValidator = (popUp) => new FormValidator(popUp);
  const popup = new Popup(createValidator, userEditForm, userNameTitle, userProfessionTitle, renderLoading);
  
  document.addEventListener('click', popup.open);
  document.addEventListener('click', popup.close);
  document.addEventListener('keydown', popup.close);
  sort.addEventListener('click', cardlist.sort);
  sortReverse.addEventListener('click', cardlist.sortReverse);
  find.addEventListener('input', cardlist.find);
  
  // Вызов метода отрисовки карточек при загрузке страницы
  cardlist.firstLoad();
  // Вызов метода получения данных пользователя
  userinfo.loadUserInfo();