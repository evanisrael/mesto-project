// Класс валидатор форм

class FormValidator {

  constructor({configObject, formElement}) {
    this._inputSelector = configObject.inputSelector
    this._submitButtonSelector = configObject.submitButtonSelector,
    this._inactiveButtonClass = configObject.inactiveButtonClass,
    this._inputErrorClass = configObject.inputErrorClass,
    this._errorClass = configObject.errorClass
    this._formElement = formElement;
  }

  enableValidation = () => {
    this._submitElement = this._formElement.querySelector(this._submitButtonSelector)
    // console.log(this._submitBtn)
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    // console.log(this._inputList)
    // Валидация полей
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => { this._checkInputValidity(inputElement) })
    })
    // Отключение кнопки сохраненния
    this._toggleButtonState(this._inputList, this._submitElement)
    this._formElement.addEventListener('input', () => {
      this._toggleButtonState(this._inputList, this._submitElement)
    })
    this._formElement.addEventListener('reset', () => {
      this._toggleButtonState(this._inputList, this._submitElement)
      this._inputList.forEach((inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
        this._hideInputError(inputElement, errorElement)
      })
    })

  };

  _showInputError = (inputElement, errorElement,  errorMessage) => {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };


  _hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity = (inputElement) => {
    const errorText = inputElement.dataset.errorText;
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.setCustomValidity(inputElement.validity.patternMismatch ? errorText : '');
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement, errorElement)
    } else {
      this._showInputError(inputElement, errorElement, inputElement.validationMessage);
    }
  };

  _setEventListeners = () => {
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        this._checkInputValidity(inputElement);
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
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
}

}

export default FormValidator;
