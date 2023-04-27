// Попап для просмотра картинки

import Popup from "./Popup";
import {photoPopupImage, photoPopupText} from "./consts";

class PopupWithImage extends Popup {

  openPopup(card) {
    const cardTitle = card.querySelector('.element__title').textContent;
    const cardImage = card.querySelector('.element__image').src;
    photoPopupImage.src = cardImage;
    photoPopupImage.alt = cardTitle;
    photoPopupText.textContent = cardTitle;
    super.openPopup();
  }
}

export default PopupWithImage
