import { popupName, popupDescription, profileName, profileDescription, editPopup } from "../index.js";


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
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(editPopup);
}

function fillEditPopup () {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(editPopup);
}

export { openPopup, closePopup, updateProfile, fillEditPopup };