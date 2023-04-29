// Попапы с текстовыми полями

import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({popup, handlerFormSubmit, section=null, closeButtonsSelector}) {
    // console.log(closeButtonsSelector)
    super({popup:popup, closeButtonsSelector: closeButtonsSelector});
    this.popup = popup
    this._handlerFormSubmit = handlerFormSubmit.bind(this)
    this.section = section
  }
  openPopup() {
    super.openPopup();
    this.popup.querySelector('.popup__form').addEventListener('submit', this._handlerFormSubmit)
  }
  closePopup() {
    const popupForm = this.popup.querySelector('.popup__form');
    popupForm.reset();
    popupForm.removeEventListener('submit', this._handlerFormSubmit)
    super.closePopup();
  }

}

export default PopupWithForm
