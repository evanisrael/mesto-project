// Базовый класс попапа

class Popup {
  constructor ({popup}) {
    this.popup = popup;
    this._closeButton = this.popup.querySelector('.popup__close-button')
    this._handleEscButton = this._handleEscButton.bind(this)
    this._handleOutsideClick = this._handleOutsideClick.bind(this)
    this.close = this.close.bind(this)
  }

  open() {
    this.popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscButton);
    this.popup.addEventListener('click', this._handleOutsideClick);
    this._closeButton.addEventListener('click', this.close)
  }

  close() {
    this.popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscButton);
    this.popup.removeEventListener('click', this._handleOutsideClick);
    this._closeButton.removeEventListener('click', this.close)
  }

  _handleEscButton (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOutsideClick(evt) {
    if (!evt.target.closest('.popup__container') && !evt.target.closest('.popup__image-container')) {
      this.close();
    }
  }

}

export default Popup;




