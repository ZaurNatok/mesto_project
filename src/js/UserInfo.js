export class UserInfo {
  constructor(name, profession, userEditForm, userNameTitle, userProfessionTitle, api, userAvatar) {
    this.userEditForm = userEditForm;
    this.userNameTitle = userNameTitle;
    this.userProfessionTitle = userProfessionTitle;
    this.name = name;
    this.profession = profession;
    this.userEditForm = userEditForm;
    this.api = api;
    this.userAvatar = userAvatar;
  }

  setUserInfo(data) {
    this.userNameTitle.textContent = data.name;
    this.userProfessionTitle.textContent = data.about;
    this.userAvatar.setAttribute('style', 'background-image:url(' + data.avatar + ');');
  }

  updateUserInfo(name, about) {
    this.userNameTitle.textContent = name;
    this.userProfessionTitle.textContent = about;
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  }

  updateUserAvatar(avatar) {
    this.userAvatar.setAttribute('style', 'background-image:url(' + avatar + ');');
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  }

  loadUserInfo() {
    this.api.getUserInfo()
    .then((data) => {
      this.setUserInfo(data);
    })
    .catch((err) => {
      console.log('Ошибка. Запрос не выполнен');
      });
  }
}





