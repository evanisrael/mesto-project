import './pages/index.css';
// import { closePopup, openPopup, updateProfile, fillEditPopup } from "./components/Popup.js";
// import { enableValidation } from "./components/FormValidator.js";
import { handleAddCardSubmit,
   handleAvatarFormSubmit } from "./components/utils";
import { api } from './components/Api.js';
import { Card } from './components/Card.js'
import { profileName, profileDescription, profileAvatar, cardTemplate,
   elementsList, avatarPopup, avatarEditButton, addPopup, addButton, editPopup,
   } from './components/consts.js';
import { PopupWithForm } from './components/PopupWithForm.js';
import { PopupWithImage } from './components/PopupWithImage.js';
import { updateProfile } from './components/UserInfo';


// let cards = null;


// enableValidation(configObject);






// popupEditForm.addEventListener('submit', updateProfile);
// popupAddForm.addEventListener('submit', handleAddCardSubmit);
// popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

const avatarPop = new PopupWithForm (
  avatarPopup, handleAvatarFormSubmit
);
const editPop = new PopupWithForm (
  editPopup, updateProfile
);
const addPop = new PopupWithForm (
  addPopup, handleAddCardSubmit
);
// const photoPop = new PopupWithImage (

// );
// const delPop = new Popup ();

avatarEditButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  avatarPop.openPopup();
});

addButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  addPop.openPopup();
});

editButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  fillEditPopup();
});

// function fillEditPopup () {
//   popupName.value = profileName.textContent;
//   popupDescription.value = profileDescription.textContent;
//   openPopup(editPopup);
// }

Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.src = userData.avatar;
  const myId = userData._id;
  const cardElements = cards.map((cardItem) => {
    const card = new Card ({name: cardItem.name, link: cardItem.link,
      likes: cardItem.likes, owner: cardItem.owner, _id: cardItem._id,
     cardTemplate: cardTemplate, myId: myId});
     return card.createCardElement();
  });
  cardElements.forEach(cardElement => {
    elementsList.appendChild(cardElement);
    const cardObject = JSON.parse(cardElement.dataset.cardObject);
    const likeButton = cardElement.querySelector('.element__button');
    if (cardObject.likes.map((item) => item._id).includes(myId)) {
      likeButton.classList.add('element__button_active');
    } else {
      likeButton.classList.remove('element__button_active');
    };
  });
})
.catch(err => {
  console.error(err);
});

// export { avatarPop, editPop, addPop, photoPop };




