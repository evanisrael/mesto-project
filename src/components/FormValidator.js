
class FormValidator {

  constructor({configObject, formElement}) {
    this.configObject = configObject;
    this.formElement = formElement;
  }


  enableValidation () {
    const formList = Array.from(document.querySelectorAll(this.configObject.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  };

  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(this.configObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.configObject.errorClass);
  };


  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(this.configObject.inputErrorClass);
    errorElement.classList.remove(this.configObject.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (formElement, inputElement) => {
    const errorText = inputElement.dataset.errorText;
    const isValid = inputElement.validity.valid;
    inputElement.setCustomValidity(inputElement.validity.patternMismatch ? errorText : '');
    isValid ? this._hideInputError(formElement, inputElement) : this._showInputError(formElement, inputElement, inputElement.validationMessage);
  };


  _setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(this.configObject.inputSelector));
    const buttonElement = formElement.querySelector(this.configObject.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };


  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }


  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this.configObject.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this.configObject.inactiveButtonClass);
      buttonElement.disabled = false;
    }
}

}

export { FormValidator };