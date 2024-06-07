import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleDelete, loadingButtonText = "Deleting...") {
    super({ popupSelector });
    this._handleDelete = handleDelete;
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

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      if (this._handleDeleteCallback) {
        this._handleDeleteCallback();
      }
    });
  }

  open(handleDeleteCallback) {
    this._handleDeleteCallback = handleDeleteCallback;
    super.open();
  }
}