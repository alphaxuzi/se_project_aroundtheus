import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupSelector = document.querySelector('#confirm-modal')
  }
}


const cardId = this._cardData._id;
    api
      .deleteCard(cardId)
      .then(() => {
        this._cardElement.remove();
      })
      .catch((err) => {
        console.error(err);
        // alert(`${err}, something went wrong`);
      });