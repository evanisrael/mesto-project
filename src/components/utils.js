import { popupTitle, popupLink, elementsList, addPopup, popupAddForm, configObject,
  avatarPopup, popupAvatarForm, popupAvatarInput, profileAvatar } from "./consts.js";
import { api } from "./Api.js";

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.value = 'Сохранение...';
  const title = popupTitle.value;
  const link = popupLink.value;

  api.addCardToServer(title, link)
    .then(data => {
      const addedCard = createCardElement(data);
      elementsList.insertBefore(addedCard, elementsList.firstChild);
      closePopup(addPopup);
      popupAddForm.reset();
      evt.submitter.disabled = true;
      evt.submitter.classList.add(configObject.inactiveButtonClass);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.value = 'Сохранить';
    });
};

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.value = 'Сохранение...';
  const newAvatar = popupAvatarInput.value;

  api.updateAvatar(newAvatar)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(avatarPopup);
      popupAvatarForm.reset();
      evt.submitter.disabled = true;
      evt.submitter.classList.add(configObject.inactiveButtonClass);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      evt.submitter.value = 'Сохранить';
    });
}

export {  handleAddCardSubmit, handleAvatarFormSubmit };
