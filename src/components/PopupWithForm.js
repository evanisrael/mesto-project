// Попапы с текстовыми полями

import Popup from "./Popup";

// class PopupWithForm extends Popup {
//   constructor({popup, handlerFormSubmit, section=null, closeButtonsSelector}) {
//     super({popup:popup, closeButtonsSelector: closeButtonsSelector});
//     this.popup = popup
//     this._handlerFormSubmit = handlerFormSubmit.bind(this)
//     this.section = section
//   }
//   openPopup() {
//     super.openPopup();
//     this.popup.querySelector('.popup__form').addEventListener('submit', this._handlerFormSubmit)
//   }
//   closePopup() {
//     const popupForm = this.popup.querySelector('.popup__form');
//     popupForm.reset();
//     popupForm.removeEventListener('submit', this._handlerFormSubmit)
//     super.closePopup();
//   }

// }



class PopupWithForm extends Popup {
  constructor({popup, handlerFormSubmit, closeButtonsSelector}) {
    super({popup:popup, closeButtonsSelector: closeButtonsSelector});
    this.popup = popup;
    this._handlerFormSubmit = handlerFormSubmit.bind(this);
    this._form = this.popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('input');
    // console.log(this._inputList)
  }

  openPopup() {
    super.openPopup();
    this._form.addEventListener('submit', this._handlerFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
    this._form.removeEventListener('submit', this._handlerFormSubmit);
  }

  getInputValues() {
    const _formData = {};
    this._inputList.forEach(input => {
      // _formData[input.name] = input.value;
      console.log(input)
    });

    return _formData;
  }

}





export default PopupWithForm
