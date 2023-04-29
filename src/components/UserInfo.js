// Класс информации о пользователе

class UserInfo {
  constructor({api, profileName, profileDescription, profileAvatar}) {
    this.api = api
    this._profileName = profileName
    this._profileDescription = profileDescription
    this._profileAvatar = profileAvatar
  }
  getUserInfo = () => {
    return this.api.getUserInfo();
  }
  renderUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileDescription.textContent = userData.about;
    this._profileAvatar.src = userData.avatar;
  }
}

export default UserInfo
