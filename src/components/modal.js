import { popupName, popupDescription, profileName, profileDescription, editPopup } from "../index.js";
import { updateUserInfo } from './api.js';


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscButton);
  popup.addEventListener('click', handleOutsideClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscButton);
  popup.removeEventListener('click', handleOutsideClick);
}

function handleEscButton (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function handleOutsideClick(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (openedPopup && !evt.target.closest('.popup__container') && !evt.target.closest('.popup__image-container')) {
    closePopup(openedPopup);
  }
}


function updateProfile(evt) {
  evt.preventDefault();
  const submitButton = editPopup.querySelector('.popup__submit');
  submitButton.value = 'Сохранение...';
  const newName = popupName.value;
  const newAbout = popupDescription.value;

  updateUserInfo(newName, newAbout)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editPopup);
      submitButton.value = 'Сохранить';
    })
    .catch((err) => {
      console.log(err);
    });
}


function fillEditPopup () {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(editPopup);
}

export { openPopup, closePopup, updateProfile, fillEditPopup };




