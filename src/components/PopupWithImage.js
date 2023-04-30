// Попап для просмотра картинки

import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor({popup, closeButtonsSelector, photoPopupImage, photoPopupText}) {
    super({popup: popup, closeButtonsSelector: closeButtonsSelector});
    this._photoPopupImage = photoPopupImage
    this._photoPopupText = photoPopupText
  }
  // openPopup(card) {
  //   const cardTitle = card.querySelector('.element__title').textContent;
  //   const cardImage = card.querySelector('.element__image').src;
  //   this._photoPopupImage.src = cardImage;
  //   this._photoPopupImage.alt = cardTitle;
  //   this._photoPopupText.textContent = cardTitle;
  //   super.openPopup();
  // }

  openPopup(cardTitle, cardImage) {
    this._photoPopupImage.src = cardImage;
    this._photoPopupImage.alt = cardTitle;
    this._photoPopupText.textContent = cardTitle;
    super.openPopup();
  }
}

export default PopupWithImage
