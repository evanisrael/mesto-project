// Попапы с текстовыми полями

import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({popup, handlerFormSubmit}) {
    super({popup:popup});
    this.popup = popup;
    this._handlerFormSubmit = handlerFormSubmit.bind(this);
    this._form = this.popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('input');
    this._submitBtn = this._form.querySelector('.popup__submit')
    this._submitBtnText = this._submitBtn.value
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      if(input.name !== 'submit') {
        input.value = data[input.name];
      }
    });
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitBtn.value = loadingText;
    } else {
      this._submitBtn.value = this._submitBtnText;
    }
  }

  open() {
    super.open();
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
      _formData[input.name] = input.value
    });
    return _formData;
  }

}

export default PopupWithForm
