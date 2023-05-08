// Попап для просмотра картинки

import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor({popup,  photoPopupImage, photoPopupText}) {
    super({popup: popup});
    this._photoPopupImage = photoPopupImage
    this._photoPopupText = photoPopupText
  }

  open({cardTitle, cardImage}) {
    this._photoPopupImage.src = cardImage;
    this._photoPopupImage.alt = cardTitle;
    this._photoPopupText.textContent = cardTitle;
    super.open();
  }
}

export default PopupWithImage
