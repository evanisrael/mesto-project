import {Popup} from "./Popup";

class PopupWithForm extends Popup {
    constructor(popup, hendlerFormSubmit) {
        super(popup);
        this.popup = popup
        this.hendlerFormSubmit = hendlerFormSubmit
    }
    _getInputValues() {
        // собирает данные всех полей формы.
        _obj = null
        return _obj
    }
    setEventListeners() {
        // Перезаписывает родительский метод
        super.setEventListeners() // вызов закрытия "X" + Esc + Outside
        this.hendlerFormSubmit(this._getInputValues())
    }
}

export {PopupWithForm}