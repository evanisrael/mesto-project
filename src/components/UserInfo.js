// Класс информации о пользователе

class UserInfo {
  // теперь все данные пользователя устанавливаются тут, включая аватар
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._profileName = document.querySelector(profileName);
    this._profileDescription = document.querySelector(profileDescription);
    this._profileAvatar = document.querySelector(profileAvatar);
  }


  getUserInfo = () => {
    // возвращает данные из профиля, взяв их из `textContent`.
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
      userId: this._userId,
    }
  }

  setUserInfo = ({ name, about, avatar, _id }) =>  {
    // получает в вызов все данные пользователя и устанавливать их внутри разметки
    this._profileName.textContent = name
    this._profileDescription.textContent = about
    this._profileAvatar.src = avatar
    this._userId = _id
  }

  setAvatar = ({avatar}) => {
    this._profileAvatar.src = avatar
  }
}


export default UserInfo
