// Базовый класс попапа

class Popup {
  constructor ({popup}) {
    this.popup = popup;
    this.closeButton = this.popup.querySelector('.popup__close-button')
    this._handleEscButton = this._handleEscButton.bind(this)
    this._handleOutsideClick = this._handleOutsideClick.bind(this)
    this.closePopup = this.closePopup.bind(this)
  }

  openPopup() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscButton);
    this.popup.addEventListener('click', this._handleOutsideClick);
    this.closeButton.addEventListener('click',  this.closePopup)
  }

  closePopup() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscButton);
    this.popup.removeEventListener('click', this._handleOutsideClick);
    this.closeButton.removeEventListener('click', this.closePopup)
  }

  _handleEscButton (evt) {
    if (evt.key === 'Escape') {
      this.closePopup();
    }
  }

  _handleOutsideClick(evt) {
    if (!evt.target.closest('.popup__container') && !evt.target.closest('.popup__image-container')) {
      this.closePopup();
    }
  }

}

export default Popup;




