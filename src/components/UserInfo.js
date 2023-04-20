import { api } from "./Api"
import { profileName, profileDescription, profileAvatar } from "./consts"

class UserInfo {
    constructor({name, description}) {
        this.name = name
        this.description = description
    }
    getUserInfo() {

      return api.getUserInfo();

    }
    setUserInfo(evt){
        //  принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
      evt.preventDefault();
      evt.submitter.value = 'Сохранение...';
      const newName = popupName.value;
      const newAbout = popupDescription.value;

      api.updateUserInfo(newName, newAbout)
        .then((data) => {
        profileName.textContent = data.name;
        profileDescription.textContent = data.about;
        this.closePopup();
      })
      .catch((err) => {
      console.log(err);
      })
      .finally(() => {
      evt.submitter.value = 'Сохранить';
      });
    }

    renderUserInfo(userData) {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.src = userData.avatar;
    }
}

export { UserInfo }
