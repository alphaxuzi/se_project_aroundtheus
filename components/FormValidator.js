let config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

export default class FormValidator {
    constructor(settings, formElement) {
      this._settings = settings;
      this._formElement = formElement;
    }
  
    _showInputError(inputElement, errorMessage) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(this._settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._settings.errorClass);
    }
  
    _hideInputError(inputElement) {
      const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this._settings.inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._settings.errorClass);
    }
  
    _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  
    _checkFormValidity() {
      const inputElements = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
      
      return inputElements.every(inputElement => inputElement.validity.valid);
    }
  
    _toggleButtonState() {
      const submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
      const isFormValid = this._checkFormValidity();
  
      if (isFormValid) {
        submitButton.classList.remove(this._settings.inactiveButtonClass);
        submitButton.disabled = false;
      } else {
        submitButton.classList.add(this._settings.inactiveButtonClass);
        submitButton.disabled = true;
      }
    }

    _setEventListeners() {
        const inputElements = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
        const submitButton = this._formElement.querySelector(this._settings.submitButtonSelector);
    
        inputElements.forEach(inputElement => {
          inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(submitButton);
          });
        });
      }
    
      enableValidation() {
        this._formElement.addEventListener("submit", evt => {
          evt.preventDefault();
        });

        this._setEventListeners();
      }
    }

    