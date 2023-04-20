import './pages/index.css';
// import { closePopup, openPopup, updateProfile, fillEditPopup } from "./components/Popup.js";
// import { enableValidation } from "./components/FormValidator.js";
import { handleAddCardSubmit,
   handleAvatarFormSubmit } from "./components/utils.js";
import { api } from './components/Api.js';
import { Card } from './components/Card.js'
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
  myId
} from './components/consts.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { UserInfo } from './components/UserInfo';
import { Section } from "./components/Section.js"


// enableValidation(configObject);

// popupAddForm.addEventListener('submit', handleAddCardSubmit);
// popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

//////////////////////////////////////////////////////////////////////
// Правка аватара
const avatarPop = new PopupWithForm (
  avatarPopup, handleAvatarFormSubmit
);
avatarEditButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  avatarPop.openPopup();
});
////////////////////////////////////////////////////////////////////////
// Добавление места
const addPop = new PopupWithForm (
  addPopup, handleAddCardSubmit
);
addButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  addPop.openPopup();
});
////////////////////////////////////////////////////////////////////////
// Правка профайла


const userInfo = new UserInfo (
  {name: null, description: null}
);


const editPop = new PopupWithForm (
  editPopup, userInfo.setUserInfo
);
editButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  editPop.openPopup()
});
////////////////////////////////////////////////////////////////////////



// const delPop = new Popup ();
////////////////////////////////////////////////////////////////////////

function createCardItem(cardItem, myId) {
  // console.log(myId)
  const card = new Card ({name: cardItem.name, link: cardItem.link,
    likes: cardItem.likes, owner: cardItem.owner, _id: cardItem._id,
    cardTemplate: cardTemplate, myId: myId});
    return card.createCardElement();
}


Promise.all([userInfo.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  myId.id = userData._id;
  const section = new Section (
  cards, createCardItem, elementsList, userData
  );
  section.renderItems()
  section.addItem()
  userInfo.renderUserInfo(userData)
  // profileName.textContent = userData.name;
  // profileDescription.textContent = userData.about;
  // profileAvatar.src = userData.avatar;
  // const myId = userData._id;
  // const cardElements = cards.map((cardItem) => {
  //   const card = new Card ({name: cardItem.name, link: cardItem.link,
  //     likes: cardItem.likes, owner: cardItem.owner, _id: cardItem._id,
  //    cardTemplate: cardTemplate, myId: myId});
  //    return card.createCardElement();
  // });
  // cardElements.forEach(cardElement => {
  //   elementsList.appendChild(cardElement);
  //   const cardObject = JSON.parse(cardElement.dataset.cardObject);
  //   const likeButton = cardElement.querySelector('.element__button');
  //   if (cardObject.likes.map((item) => item._id).includes(myId)) {
  //     likeButton.classList.add('element__button_active');
  //   } else {
  //     likeButton.classList.remove('element__button_active');
  //   };
  // });
})
.catch(err => {
  console.error(err);
});

// export { avatarPop, editPop, addPop, photoPop };




