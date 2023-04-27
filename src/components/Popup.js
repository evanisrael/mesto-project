// Базовый класс попапа
import {closeButtonsSelector} from './consts'

class Popup {
  constructor (popup) {
    this.popup = popup;
    this.closeButton = this.popup.querySelector(closeButtonsSelector)
  }

  openPopup() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscButton(evt));
    this.popup.addEventListener('click', (evt) => this._handleOutsideClick(evt));
    this.closeButton.addEventListener('click', () => this.closePopup())
  }

  closePopup() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscButton(evt));
    this.popup.removeEventListener('click', (evt) => this._handleOutsideClick(evt));
    this.closeButton.removeEventListener('click', () => this.closePopup())
  }

  _handleEscButton (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleOutsideClick(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup && !evt.target.closest('.popup__container') && !evt.target.closest('.popup__image-container')) {
      this.closePopup();
    }
  }

}

export default Popup;




