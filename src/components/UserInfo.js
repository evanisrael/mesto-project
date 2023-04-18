import { api } from "./Api"

class UserInfo {
    constructor({name, description}) {
        this.name = name
        this.description = description
    }
    getUserInfo() {
        // api

        return userData
    }
    setUserInfo({name, description}){
        //  принимает новые данные пользователя, отправляет их на сервер и добавляет их на страницу.
    }
}

function updateProfile(evt) {
  evt.preventDefault();
  evt.submitter.value = 'Сохранение...';
  const newName = popupName.value;
  const newAbout = popupDescription.value;

  updateUserInfo(newName, newAbout)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.value = 'Сохранить';
    });
}

export { updateProfile }
