// Класс информации о пользователе

// class UserInfo {
//   constructor({api, profileName, profileDescription, profileAvatar}) {
//     this.api = api
//     this._profileName = profileName
//     this._profileDescription = profileDescription
//     this._profileAvatar = profileAvatar
//   }

//   getUserInfo = () => {
//     return this.api.getUserInfo();
//   }

//   renderUserInfo(userData) {
//     this._profileName.textContent = userData.name;
//     this._profileDescription.textContent = userData.about;
//     this._profileAvatar.src = userData.avatar;
//   }
// }




class UserInfo {
  // теперь все данные пользователя устанавливаются тут, включая аватар
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._profileAvatar = document.querySelector(profileAvatar);
  }

  // метод getUserInfo должен возвращать данные из профиля, взяв их из `textContent`.
  getUserInfo = () => {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      userId: this._userId,  // _id тоже можно тут получать, чтобы испольозовать в `index.js` для создания карточек
    }
  }
  // метод `setUserInfo` должен получать в вызов все данные пользователя и устанавливать их внутри
  setUserInfo = ({ name, about, avatar, _id }) =>  {
    this._profileName.textContent = name
    this._profileDescription.textContent = about
    this._profileAvatar.src = avatar
    this._userId = _id
  }
}


export default UserInfo
