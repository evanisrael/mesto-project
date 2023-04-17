import {Popup} from "./Popup";

class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this.popup = popup
    }

    openPopup() {
        super.openPopup();
        // нужно вставлять в попап картинку с src изображения и подписью к картинке.
    }
}

export {PopupWithImage}