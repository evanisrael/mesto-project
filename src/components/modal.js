import { popupName, popupDescription, profileName, profileDescription, editPopup } from "../index.js";
import { updateUserInfo } from './api.js';
import { renderLoading, handleSubmit } from "./utils.js";


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
  evt.submitter.value = 'Сохранение...';
  const newName = popupName.value;
  const newAbout = popupDescription.value;

  updateUserInfo(newName, newAbout)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(editPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.value = 'Сохранить';
    });
}


function fillEditPopup () {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(editPopup);
}

export { openPopup, closePopup, updateProfile, fillEditPopup };




