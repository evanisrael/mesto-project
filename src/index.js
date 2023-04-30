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
  popupAddForm,
  configObject,
  popupAvatarForm,
  photoPopup,
  popupEditForm,
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

function handleSubmit(evt, request, popupInstance, loadingText = "Сохранение...") {
  // Базовый обработчик сабмита
  evt.preventDefault();
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close()
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}
//-------------------------------------------------------------
function handleAddCardSubmit(evt) {
   // Обработка сохранения новой карточки
  const inputs = addPop.getInputValues()
  function makeRequest(){
    return api.addCardToServer({title:inputs.title, link:inputs.ImageLink})
      .then(data => {section.prependItem(createCardItem(data))})
  }
  handleSubmit(evt, makeRequest, addPop)
}
//-------------------------------------------------------------
function handleAvatarFormSubmit(evt) {
  // Обработка сохранения нового аватара
  function makeRequest(){
    return api.updateAvatar({newAvatar: avatarPop.getInputValues().avatar})
      .then(data => {userInfo.setAvatar({avatar: data.avatar})})
  }
  handleSubmit(evt, makeRequest, avatarPop)
}
//-------------------------------------------------------------
function handleSetUserInfo(evt) {
  //  Обработка сохранения новых данных пользователя
  const dataEditPop = editPop.getInputValues()
  function makeRequest() {
    return api.updateUserInfo({name: dataEditPop.name, about: dataEditPop.description})
      .then(data => {
        userInfo.setUserInfo(data)
      })
  }
  handleSubmit(evt, makeRequest, editPop)
}
//-------------------------------------------------------------
const createCardItem = function createCardItem(cardItem) {
  // создание новой карточки
  const card = new Card ({name: cardItem.name, link: cardItem.link,
    likes: cardItem.likes, owner: cardItem.owner, _id: cardItem._id,
    cardTemplate: cardTemplate, myId: userInfo.getUserInfo().userId, api: api, photoPopup: photoPop});
    return card.createCardElement();
}

const section = new Section({
  renderer: createCardItem,
  container: elementsList
})

//////////////////////////////////////////////////////////////////////
// Правка аватара
const avatarPop = new PopupWithForm ({popup:avatarPopup, handlerFormSubmit:handleAvatarFormSubmit});
new FormValidator({configObject: configObject, formElement: popupAvatarForm}).enableValidation()
avatarEditButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  avatarPop.open();
});
////////////////////////////////////////////////////////////////////////
// Добавление места
const addPop = new PopupWithForm ({popup:addPopup, handlerFormSubmit:handleAddCardSubmit });
new FormValidator({configObject: configObject, formElement: popupAddForm}).enableValidation()
addButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  addPop.open();
});
////////////////////////////////////////////////////////////////////////
// Правка профайла
const userInfo = new UserInfo({profileName:profileName, profileDescription:profileDescription, profileAvatar:profileAvatar});
const editPop = new PopupWithForm({popup:editPopup, handlerFormSubmit:handleSetUserInfo});
new FormValidator({configObject: configObject, formElement: popupEditForm}).enableValidation()
editButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  const { name, about } = userInfo.getUserInfo();
  editPop.setInputValues({name: name, description: about})
  editPop.open()
});
////////////////////////////////////////////////////////////////////////
// Просмотр изображений
const photoPop = new PopupWithImage({ popup:photoPopup, photoPopupImage:photoPopupImage, photoPopupText:photoPopupText})
////////////////////////////////////////////////////////////////////////
// Подтверждение удаления карточки
// const delPop = new Popup ();
////////////////////////////////////////////////////////////////////////

// Первичное заполнение
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  userInfo.setUserInfo(userData)
  section.renderItems({items: cards, userData: userData})
})
.catch(err => {
  console.error(err);
});





