// Класс карточки

class Card {
  constructor({ name, link, likes, owner, _id, cardTemplate, myId, api, photoPopup }) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this.owner = owner;
    this._id = _id;
    this.cardTemplate = cardTemplate;
    this._myId = myId;
    this.api = api
    this.photoPopup = photoPopup
  }

  deleteCard = (evt) => {
    if (evt.target.classList.contains('element__trash-button')) {
      const card = evt.target.closest('.element');
      this.api.deleteSelectedCard(this._id)
        .then(() => {
          card.remove();
        })
        .catch(error => console.error(error));
    }
  }

  toggleLike = (evt) => {
    const likeButton = evt.target;
    if (likeButton.classList.contains('element__button')) {
      const card = likeButton.closest('.element');
      const isLiked = likeButton.classList.contains('element__button_active');

      if (isLiked) {
        this.api.removeLike(this._id)
          .then(updatedCard => {
            likeButton.classList.remove('element__button_active');
            const likesNumber = updatedCard.likes.length;
            card.querySelector('.element__like-number').textContent = likesNumber;
          })
          .catch(error => console.error(error));
      } else {
        console.log(this)
        this.api.addLike(this._id)
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
    if (ownerId === this._myId) {
      cardTrashButton.style.visibility = 'visible';
    } else {
      cardTrashButton.style.visibility = 'hidden';
    }
  }

  createCardElement() {
    const cardElement = this.cardTemplate.content.cloneNode(true).querySelector('.element');
    const cardTitle = cardElement.querySelector('.element__title');
    const cardImage = cardElement.querySelector('.element__image');
    const cardLikeButton = cardElement.querySelector('.element__button');
    const cardTrashButton = cardElement.querySelector('.element__trash-button');
    const cardLikeNumber = cardElement.querySelector('.element__like-number');
    this._likes.forEach(elem => { // Поиск своих лайков
      if(elem._id === this._myId) {  cardLikeButton.classList.add('element__button_active') }
    })
    cardTitle.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardLikeNumber.textContent = this._likes.length;
    cardLikeButton.addEventListener('click', this.toggleLike);
    cardTrashButton.addEventListener('click', this.deleteCard);
    cardImage.addEventListener('click', (evt) => {
      evt.stopPropagation();
      this.photoPopup.openPopup(cardElement)
    });
    this.checkCardOwner(this.owner._id, cardTrashButton);
    return cardElement;
  }
}

export default Card;
