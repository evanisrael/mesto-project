// Класс валидатор форм

class FormValidator {

  constructor({configObject, formElement}) {
    this._inputSelector = configObject.inputSelector
    this._submitButtonSelector = configObject.submitButtonSelector
    this._inactiveButtonClass = configObject.inactiveButtonClass
    this._inputErrorClass = configObject.inputErrorClass
    this._errorClass = configObject.errorClass
    this._formElement = formElement;
  }

  enableValidation = () => {
    this._submitElement = this._formElement.querySelector(this._submitButtonSelector)
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    // Валидация полей
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState();
       })
    })
    // Отключение кнопки сохраненния
    this._toggleButtonState()
    this._formElement.addEventListener('input', () => {
      this._toggleButtonState()
    })
    this._formElement.addEventListener('reset', () => {
      this._disableSubmit()
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

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _disableSubmit() {
    this._submitElement.classList.add(this._inactiveButtonClass);
    this._submitElement.disabled = true;
  }

  _enableSubmit() {
    this._submitElement.classList.remove(this._inactiveButtonClass);
    this._submitElement.disabled = false;
  }

  _toggleButtonState () {
    console.log(this._inputList)
    if (this._hasInvalidInput()) {
      this._disableSubmit()
    } else {
      this._enableSubmit()
    }
  }

}

export default FormValidator;
