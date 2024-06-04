import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleDelete }) {
    super({ popupSelector });
    this._handleDelete = handleDelete;
  }

}

