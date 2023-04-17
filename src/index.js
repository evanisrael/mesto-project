import './pages/index.css';
import { closePopup, openPopup, updateProfile, fillEditPopup } from "./components/Popup.js";
import { enableValidation } from "./components/FormValidator.js";
import { createCardElement, handleAddCardSubmit, handleAvatarFormSubmit } from "./components/utils";
import { getInitialCards, getUserInfo } from './components/Api.js';


const content = document.querySelector('.page');
const editButton = content.querySelector('.profile__edit-button');
const editPopup = content.querySelector('#edit');
const popupName = content.querySelector('#popupName');
const popupDescription = content.querySelector('#popupDescription');
const popupEditForm = editPopup.querySelector('.popup__form');
const addButton = content.querySelector('.profile__add-button');
const addPopup = content.querySelector('#add');
const popupAddForm = addPopup.querySelector('.popup__form');
const photoPopup = content.querySelector('#photo');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupText = photoPopup.querySelector('.popup__image-text');
const cardTemplate = document.querySelector('#card-template');
const elementsList = document.querySelector('.elements__list');
const popupTitle = document.querySelector('#popupTitle');
const popupLink = document.querySelector('#popupImageLink');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileAvatar = document.querySelector(".profile__avatar");
const avatarEditButton = document.querySelector('.profile__edit-avatar-button');
const avatarPopup = document.querySelector('#avatar');
const popupAvatarForm = avatarPopup.querySelector('.popup__form');
const popupAvatarInput = popupAvatarForm.querySelector('.popup__input');
let myId = null;
let cards = null;
const configObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


enableValidation(configObject);


editButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  fillEditPopup();
});
addButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  openPopup(addPopup);
});
avatarEditButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  openPopup(avatarPopup);
});
closeButtons.forEach((button) => { 
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
popupEditForm.addEventListener('submit', updateProfile);
popupAddForm.addEventListener('submit', handleAddCardSubmit);
popupAvatarForm.addEventListener('submit', handleAvatarFormSubmit);


export { configObject, photoPopupImage, photoPopupText, photoPopup,
 cardTemplate, popupName, popupDescription, profileName, profileDescription,
 editPopup, popupTitle, popupLink, elementsList, addPopup, popupAddForm, avatarPopup, popupAvatarForm, myId, cards, popupAvatarInput, profileAvatar };


  Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    myId = userData._id;
    const cardElements = cards.map(createCardElement);
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






