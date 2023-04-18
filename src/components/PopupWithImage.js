import {Popup} from "./Popup";
import {photoPopupImage, photoPopupText} from "./consts";

class PopupWithImage extends Popup {
  constructor(popup, card) {
    super(popup);
    this.popup = popup
    this.card = card
  }

  openPopup() {
    // нужно вставлять в попап картинку с src изображения и подписью к картинке.
    const cardTitle = this.card.querySelector('.element__title').textContent;
    const cardImage = this.card.querySelector('.element__image').src;
    photoPopupImage.src = cardImage;
    photoPopupImage.alt = cardTitle;
    photoPopupText.textContent = cardTitle;
    super.openPopup();
  }
}

export {PopupWithImage}
