import './pages/index.css';
import {
  profileName,
  profileDescription,
  profileAvatar,
  cardTemplate,
  elementsList,
  avatarPopup,
  avatarEditButton,
  addPopup,
  addButton,
  editPopup,
  editButton,
  popupName,
  popupDescription,
  popupTitle,
  popupLink,
  popupAddForm,
  configObject,
  popupAvatarForm,
  popupAvatarInput,
  photoPopup,
  popupEditForm,
  closeButtonsSelector,
  photoPopupImage,
  photoPopupText,
} from './utils/consts.js';

import FormValidator from "./components/FormValidator.js";
import Card from './components/Card.js'
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from "./components/PopupWithImage";
import UserInfo from './components/UserInfo';
import Section from "./components/Section.js"
//-------------------------------------------------------------
import apiConfig from './apiConfig.json'
import Api from './components/Api'
const api = new Api ({
  baseUrl: apiConfig.baseUrl,
  headers: apiConfig.headers
})
//-------------------------------------------------------------
let myId = null
//-------------------------------------------------------------
function handleAddCardSubmit(evt) {
  // Обработка сохранения новой карточки
  evt.preventDefault();
  evt.submitter.value = 'Сохранение...';
  const title = popupTitle.value;
  const link = popupLink.value;

  api.addCardToServer(title, link)
    .then(data => {
      this.section.prependItem(createCardItem(data, myId))
      this.closePopup();
      popupAddForm.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.value = 'Сохранить';
    });
}
//-------------------------------------------------------------
function handleAvatarFormSubmit(evt) {
  // Обработка сохранения нового аватара
  evt.preventDefault();
  evt.submitter.value = 'Сохранение...';
  const newAvatar = popupAvatarInput.value;
  api.updateAvatar(newAvatar)
    .then((data) => {
      profileAvatar.src = data.avatar;
      this.closePopup();
      popupAvatarForm.reset();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      evt.submitter.value = 'Сохранить';
    });
}
//-------------------------------------------------------------
function handleSetUserInfo(evt) {
  //  Обработка сохранения новых данных пользователя
  evt.preventDefault();
  evt.submitter.value = 'Сохранение...';
  const newName = popupName.value;
  const newAbout = popupDescription.value;
  api.updateUserInfo(newName, newAbout)
    .then((data) => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    editPop.closePopup();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
  evt.submitter.value = 'Сохранить';
  });
}

const createCardItem = function createCardItem(cardItem, myId) {
  //
  const card = new Card ({name: cardItem.name, link: cardItem.link,
    likes: cardItem.likes, owner: cardItem.owner, _id: cardItem._id,
    cardTemplate: cardTemplate, myId: myId, api: api, photoPopup: photoPop});
    return card.createCardElement();
}

const section = new Section({
  renderer: createCardItem,
  container: elementsList
})

//////////////////////////////////////////////////////////////////////
// Правка аватара
const avatarPop = new PopupWithForm ({popup:avatarPopup, handlerFormSubmit:handleAvatarFormSubmit, closeButtonsSelector: closeButtonsSelector});
new FormValidator({configObject: configObject, formElement: popupAvatarForm}).enableValidation()
avatarEditButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  avatarPop.openPopup();
});
////////////////////////////////////////////////////////////////////////
// Добавление места
const addPop = new PopupWithForm ({popup:addPopup, handlerFormSubmit:handleAddCardSubmit, section:section, closeButtonsSelector: closeButtonsSelector});
new FormValidator({configObject: configObject, formElement: popupAddForm}).enableValidation()
addButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  addPop.openPopup();
});
////////////////////////////////////////////////////////////////////////
// Правка профайла
const userInfo = new UserInfo({api: api, profileName:profileName, profileDescription:profileDescription, profileAvatar:profileAvatar});
const editPop = new PopupWithForm({popup:editPopup, handlerFormSubmit:handleSetUserInfo, closeButtonsSelector:closeButtonsSelector});
new FormValidator({configObject: configObject, formElement: popupEditForm}).enableValidation()
editButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  editPop.openPopup()
});
////////////////////////////////////////////////////////////////////////
// Просмотр изображений
const photoPop = new PopupWithImage(
  { popup:photoPopup,
    closeButtonsSelector: closeButtonsSelector,
    photoPopupImage:photoPopupImage,
    photoPopupText:photoPopupText
  })
////////////////////////////////////////////////////////////////////////
// Подтверждение удаления карточки
// const delPop = new Popup ();
////////////////////////////////////////////////////////////////////////

// Первичное заполнение
Promise.all([userInfo.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  myId = userData._id;
  userInfo.renderUserInfo(userData)
  section.renderItems({items: cards, userData: userData})
})
.catch(err => {
  console.error(err);
});





