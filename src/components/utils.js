import { deleteCard, toggleLike, handleCardClick, checkCardOwner } from './card.js';
import { cardTemplate, popupTitle, popupLink, elementsList, addPopup, popupAddForm, configObject, avatarPopup, popupAvatarForm, popupAvatarInput, profileAvatar } from "../index.js";
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
  evt.submitter.value = 'Сохранение...';
  const title = popupTitle.value;
  const link = popupLink.value;
  
  addCardToServer(title, link)
    .then(data => {
      const addedCard = createCardElement(data);
      elementsList.insertBefore(addedCard, elementsList.firstChild);
      closePopup(addPopup);
      popupAddForm.reset();
      evt.submitter.disabled = true;
      evt.submitter.classList.add(configObject.inactiveButtonClass);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      evt.submitter.value = 'Сохранить';
    });
};

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  evt.submitter.value = 'Сохранение...';
  const newAvatar = popupAvatarInput.value;

  updateAvatar(newAvatar)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closePopup(avatarPopup);
      popupAvatarForm.reset();
      evt.submitter.disabled = true;
      evt.submitter.classList.add(configObject.inactiveButtonClass);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      evt.submitter.value = 'Сохранить';
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