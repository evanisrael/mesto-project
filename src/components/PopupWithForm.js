import {Popup} from "./Popup";

class PopupWithForm extends Popup {
    constructor(popup, handlerFormSubmit) {
        super(popup);
        this.popup = popup
        // console.log(this.popup)
        this.handlerFormSubmit = handlerFormSubmit
    }
    _getInputValues() {
        // собирает данные всех полей формы.
      const popup__input = this.popup.querySelectorAll('.popup__input')
      // console.log(popup__input)
      let values = {}
      popup__input.forEach(elem => {
        values[elem.id] = elem.value
      })
      // console.log(values)
      return popup__input
    }
    setEventListeners() {
        // Перезаписывает родительский метод
        super.setEventListeners() // вызов закрытия "X" + Esc + Outside
        this.handlerFormSubmit(this._getInputValues())
    }
}

export {PopupWithForm}
