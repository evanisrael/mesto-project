import { api } from "./Api.js";
import {photoPopup} from "../index";



class Card {
  constructor({ name, link, likes, owner, _id, cardTemplate, myId }) {
    this.name = name;
    this.link = link;
    this.likes = likes;
    this.owner = owner;
    this._id = _id;
    this.cardTemplate = cardTemplate;
    this.myId = myId;
  }


  deleteCard(evt) {
    if (evt.target.classList.contains('element__trash-button')) {
      const card = evt.target.closest('.element');
      const cardId = card.dataset.cardId;
      api.deleteSelectedCard(cardId)
        .then(() => {
          card.remove();
        })
        .catch(error => console.error(error));
    }
  }

  toggleLike(evt) {
    const likeButton = evt.target;
    if (likeButton.classList.contains('element__button')) {
      const card = likeButton.closest('.element');
      const cardId = card.dataset.cardId;
      const isLiked = likeButton.classList.contains('element__button_active');
      
      if (isLiked) {
        api.removeLike(cardId)
          .then(updatedCard => {
            likeButton.classList.remove('element__button_active');
            const likesNumber = updatedCard.likes.length;
            card.querySelector('.element__like-number').textContent = likesNumber;
          })
          .catch(error => console.error(error));
      } else {
        api.addLike(cardId)
          .then(updatedCard => {
            likeButton.classList.add('element__button_active');
            const likesNumber = updatedCard.likes.length;
            card.querySelector('.element__like-number').textContent = likesNumber;
          })
          .catch(error => console.error(error));
      }
    }
  }

  checkCardOwner(ownerId, cardTrashButton) {
    if (ownerId === this.myId) {
      cardTrashButton.style.visibility = 'visible';
    } else {
      cardTrashButton.style.visibility = 'hidden';
    }
  }
  _handleCardClick(card) {
      const cardTitle = card.querySelector('.element__title').textContent;
      const cardImage = card.querySelector('.element__image').src;
      const photoPopupImage = document.querySelector('.popup__image');
      const photoPopupText = document.querySelector('.popup__image-text');
      photoPopupImage.src = cardImage;
      photoPopupImage.alt = cardTitle;
      photoPopupText.textContent = cardTitle;
      openPopup(photoPopup);
  }

  createCardElement({ name, link, likes, owner, _id }) {
    const cardElement = this.cardTemplate.content.cloneNode(true).querySelector('.element');
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
    cardLikeButton.addEventListener('click', this.toggleLike);
    cardTrashButton.addEventListener('click', this.deleteCard);
    cardImage.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._handleCardClick(cardElement);
    });
    this.checkCardOwner(owner._id, cardTrashButton);
    return cardElement;
  }
}

export { Card };