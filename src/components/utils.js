import { popupTitle, popupLink, elementsList, addPopup, popupAddForm, configObject,
  avatarPopup, popupAvatarForm, popupAvatarInput, profileAvatar, cardTemplate, myId } from "./consts.js";
import { api } from "./Api.js";
import { Card } from "./Card.js"



function handleAddCardSubmit(evt) {
  evt.preventDefault();
  evt.submitter.value = 'Сохранение...';
  const title = popupTitle.value;
  const link = popupLink.value;

  api.addCardToServer(title, link)
    .then(data => {
      const addedCard = new Card (
        { name: data.name, link : data.link, likes: data.likes, owner: data.owner,
          _id: data._id, cardTemplate, myId: myId.id }
      ).createCardElement()
      elementsList.insertBefore(addedCard, elementsList.firstChild);
      this.closePopup();
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
      this.closePopup();
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
