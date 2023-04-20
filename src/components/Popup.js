const closeButtons = document.querySelectorAll('.popup__close-button');

class Popup {

  constructor (popup) {
    // console.dir(popup)
    this.popup = popup;
    this.closeButton = this.popup.querySelector('.popup__close-button')
  }

  openPopup() {
    // console.log(this.popup.classList);
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
      // const popup = document.querySelector('.popup_opened'); // fix
      console.dir(this)
      this.closePopup();
    }
  }

  _handleOutsideClick(evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup && !evt.target.closest('.popup__container') && !evt.target.closest('.popup__image-container')) {
      this.closePopup();
    }
  }

  // setEventListeners() {
    //добавляет слушатель клика иконке закрытия попапа. Модальное окно также закрывается при клике на затемнённую область вокруг формы.
    // closeButtons.forEach((button) => {
    //   const popup = button.closest('.popup');
    //   button.addEventListener('click', () => closePopup(popup));
    // });
  // }

}


export { Popup };




