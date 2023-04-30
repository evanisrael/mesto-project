// Класс карточки

class Card {
  constructor({ name, link, likes, owner, _id, cardTemplate, myId, api, photoPopup }) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._owner = owner;
    this._id = _id;
    this._cardTemplate = cardTemplate;
    this._myId = myId;
    this._api = api
    this._photoPopup = photoPopup
  }

  _deleteCard = (evt) => {
    if (evt.target.classList.contains('element__trash-button')) {
      this._api.deleteSelectedCard(this._id)
        .then(() => {
          this._cardElement.remove();
        })
        .catch(error => console.error(error));
    }
  }

  _toggleLike = () => {
    if (this._cardLikeButton.classList.contains('element__button_active')) {
      this._api.removeLike(this._id)
        .then(updatedCard => {
          this._cardLikeButton.classList.remove('element__button_active');
          this._cardLikeNumber.textContent = updatedCard.likes.length;
        })
        .catch(error => console.error(error));
    } else {
      this._api.addLike(this._id)
        .then(updatedCard => {
          this._cardLikeButton.classList.add('element__button_active');
          this._cardLikeNumber.textContent = updatedCard.likes.length;
        })
        .catch(error => console.error(error));
    }
  }

  _checkCardOwner(ownerId, cardTrashButton) {
    if (ownerId === this._myId) {
      cardTrashButton.style.visibility = 'visible';
    } else {
      cardTrashButton.style.visibility = 'hidden';
    }
  }

  createCardElement() {
    this._cardElement = this._cardTemplate.content.cloneNode(true).querySelector('.element');
    this._cardLikeButton = this._cardElement.querySelector('.element__button');
    this._cardLikeNumber = this._cardElement.querySelector('.element__like-number');
    const cardTitle = this._cardElement.querySelector('.element__title');
    const cardImage = this._cardElement.querySelector('.element__image');
    const cardTrashButton = this._cardElement.querySelector('.element__trash-button');
    this._likes.forEach(elem => { // Поиск своих лайков
      if(elem._id === this._myId) {this._cardLikeButton.classList.add('element__button_active')}
    })
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._cardLikeNumber.textContent = this._likes.length;
    this._cardLikeButton.addEventListener('click', this._toggleLike);
    cardTrashButton.addEventListener('click', this._deleteCard);
    cardImage.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this._photoPopup.open({cardTitle: this._name, cardImage: this._link})
    });
    this._checkCardOwner(this._owner._id, cardTrashButton);
    return this._cardElement;
  }
}

export default Card;
