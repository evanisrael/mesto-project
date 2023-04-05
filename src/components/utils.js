import { deleteCard, toggleLike, handleCardClick, checkCardOwner } from './card.js';
import { cardTemplate, popupTitle, popupLink, elementsList, addPopup, popupAddForm, configObject, avatarPopup, popupAvatarForm } from "../index.js";
import { closePopup } from "./modal.js";
import { updateAvatar, addCardToServer } from "./api.js";

function createCardElement({ name, link, likes, owner, _id }) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.element');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  const cardLikeButton = cardElement.querySelector('.element__button');
  const cardTrashButton = cardElement.querySelector('.element__trash-button');
  const cardLikeNumber = cardElement.querySelector('.element__like-number');
  cardElement.dataset.cardId = _id;
  cardElement.dataset.cardObject = JSON.stringify({ name, link, likes, owner, _id });
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikeNumber.textContent = likes.length;
  cardLikeButton.addEventListener('click', toggleLike);
  cardTrashButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', (evt) => {
    evt.stopPropagation();
    handleCardClick(cardElement);
  });
  checkCardOwner(owner._id, cardTrashButton);
  return cardElement;
}


function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const submitButton = addPopup.querySelector('.popup__submit');
  submitButton.value = 'Сохранение...';
  const title = popupTitle.value;
  const link = popupLink.value;
  
  addCardToServer(title, link)
    .then(data => {
      const addedCard = createCardElement(data);
      elementsList.insertBefore(addedCard, elementsList.firstChild);
      closePopup(addPopup);
      popupAddForm.reset();
      submitButton.value = 'Сохранить';
      submitButton.disabled = true;
      submitButton.classList.add(configObject.inactiveButtonClass);
    })
    .catch(err => {
      console.log(err);
    });
};

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = avatarPopup.querySelector('.popup__submit');
  submitButton.value = 'Сохранение...';
  const input = popupAvatarForm.querySelector('.popup__input');
  const newAvatar = input.value;

  updateAvatar(newAvatar)
    .then((data) => {
      const avatarElement = document.querySelector('.profile__avatar');
      avatarElement.src = data.avatar;
      closePopup(avatarPopup);
      submitButton.value = 'Сохранить';
      popupAvatarForm.reset();
      submitButton.disabled = true;
      submitButton.classList.add(configObject.inactiveButtonClass);
    })
    .catch((err) => {
      console.error(err);
    });
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


export { createCardElement, handleAddCardSubmit, handleAvatarFormSubmit, checkResponse, request };