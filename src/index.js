import './pages/index.css';
import { initialCards } from './components/card.js';
import { closePopup, openPopup, updateProfile, fillEditPopup } from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import { createCardElement, handleAddCardSubmit } from "./components/utils";


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
const configObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


const cardElements = initialCards.map(createCardElement);
cardElements.forEach(cardElement => elementsList.appendChild(cardElement));


enableValidation(configObject);


editButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  fillEditPopup();
});
addButton.addEventListener('click', (evt) => {
  evt.stopPropagation();
  openPopup(addPopup);
});
closeButtons.forEach((button) => { 
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
popupEditForm.addEventListener('submit', updateProfile);
popupAddForm.addEventListener('submit', handleAddCardSubmit);


export { configObject, photoPopupImage, photoPopupText, photoPopup,
 cardTemplate, popupName, popupDescription, profileName, profileDescription,
 editPopup, popupTitle, popupLink, elementsList, addPopup, popupAddForm };