// Класс информации о пользователе

import { profileName, profileDescription, profileAvatar } from "./consts"

class UserInfo {
  constructor({api}) {
    this.api = api
  }
  getUserInfo = () => {
    return this.api.getUserInfo();
  }
  renderUserInfo(userData) {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
  }
}

export default UserInfo
