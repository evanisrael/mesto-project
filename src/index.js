import './pages/index.css';
// import { closePopup, openPopup, updateProfile, fillEditPopup } from "./components/Popup.js";
// import { enableValidation } from "./components/FormValidator.js";
// import { createCardElement, handleAddCardSubmit, handleAvatarFormSubmit } from "./components/utils";
import { api } from './components/Api.js';
import { Card } from './components/Card.js'
import { profileName, profileDescription, profileAvatar, cardTemplate, elementsList } from './components/consts.js';


// let cards = null;


// enableValidation(configObject);


// editButton.addEventListener('click', (evt) => {
//   evt.stopPropagation();
//   fillEditPopup();
// });
// addButton.addEventListener('click', (evt) => {
//   evt.stopPropagation();
//   openPopup(addPopup);
// });
// avatarEditButton.addEventListener('click', (evt) => {
//   evt.stopPropagation();
//   openPopup(avatarPopup);
// });

// popupEditForm.addEventListener('submit', updateProfile);
// popupAddForm.addEventListener('submit', handleAddCardSubmit);
// popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit);



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






