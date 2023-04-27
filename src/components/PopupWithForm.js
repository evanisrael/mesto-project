// Попапы с текстовыми полями

import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor(popup, handlerFormSubmit) {
        super(popup);
        this.popup = popup
        // console.log(this.popup)
        this.handlerFormSubmit = handlerFormSubmit
    }
    openPopup() {
      super.openPopup();
      this.popup.querySelector('.popup__form').addEventListener('submit', (evt) => this.handlerFormSubmit(evt))
    }
    closePopup() {
      this.popup.querySelector('.popup__form').removeEventListener('submit', (evt) => this.handlerFormSubmit(evt))
      super.closePopup();
    }

}

export default PopupWithForm
