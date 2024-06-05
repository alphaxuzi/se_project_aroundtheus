import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    handleFormSubmit,
    loadingButtonText = "Saving..."
  ) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._buttonText = this._submitButton.textContent;
    this._loadingButtonText = loadingButtonText;
  }

  showLoading() {
    this._submitButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._submitButton.textContent = this._buttonText;
  }

  _getInputValues() {
    const inputValues = {};
    const inputList = Array.from(
      this._popupForm.querySelectorAll(".modal__input")
    );
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.showLoading();
      this._handleFormSubmit(this._getInputValues()).finally(() =>
        this.hideLoading()
      );
    });
  }

  resetForm() {
    this._popupForm.reset();
  }
}
