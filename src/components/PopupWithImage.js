import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupImage = document.querySelector(".modal__image");
    this._popupImageDescription = document.querySelector(".modal__description");
  }

  open(data) {
    this._popupImage.setAttribute("src", data.link);
    this._popupImage.setAttribute("alt", data.name);
    this._popupImageDescription.textContent = data.name;
    super.open();
  }

}
