import { photoPopupImage, photoPopupText, photoPopup, myId, cards } from "../index.js";
import { openPopup } from "./modal.js";
import { deleteSelectedCard, addLike, removeLike } from "./api.js";


function deleteCard(evt) {
  if (evt.target.classList.contains('element__trash-button')) {
    const card = evt.target.closest('.element');
    const cardId = card.dataset.cardId;
    deleteSelectedCard(cardId)
      .then(() => {
        card.remove();
      })
      .catch(error => console.error(error));
  }
}

function toggleLike(evt) {
  const likeButton = evt.target;
  if (likeButton.classList.contains('element__button')) {
    const card = likeButton.closest('.element');
    const cardId = card.dataset.cardId;
    const isLiked = likeButton.classList.contains('element__button_active');
    
    if (isLiked) {
      removeLike(cardId)
        .then(updatedCard => {
          likeButton.classList.remove('element__button_active');
          const likesNumber = updatedCard.likes.length;
          card.querySelector('.element__like-number').textContent = likesNumber;
        })
        .catch(error => console.error(error));
    } else {
      addLike(cardId)
        .then(updatedCard => {
          likeButton.classList.add('element__button_active');
          const likesNumber = updatedCard.likes.length;
          card.querySelector('.element__like-number').textContent = likesNumber;
        })
        .catch(error => console.error(error));
    }
  }
}

function handleCardClick(card) {
  const cardTitle = card.querySelector('.element__title').textContent;
  const cardImage = card.querySelector('.element__image').src;
  photoPopupImage.src = cardImage;
  photoPopupImage.alt = cardTitle;
  photoPopupText.textContent = cardTitle;
  openPopup(photoPopup);
}

function checkCardOwner(ownerId, cardTrashButton) {
  if (ownerId === myId) {
    cardTrashButton.style.visibility = 'visible';
  } else {
    cardTrashButton.style.visibility = 'hidden';
  }
}

export { deleteCard, toggleLike, handleCardClick, checkCardOwner };