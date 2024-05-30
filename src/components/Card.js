import { api } from "../pages/index.js";
import { popupConfirmDeleteCard } from "../pages/index.js";

export default class Card {
  constructor(cardData, cardSelector, handleImageClick) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    const cardImageEl = this._cardElement.querySelector(".card__image");

    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    deleteButton.addEventListener("click", () => {
      popupConfirmDeleteCard.open();
      const popupConfirmButton = document.querySelector("#confirm-delete-button");
      const handleConfirmDelete = () => {
        this._handleDeleteCard();
        popupConfirmButton.removeEventListener(
          "click",
          this.handleConfirmDelete
        );
        popupConfirmDeleteCard.close();
      };
      popupConfirmButton.addEventListener("click", handleConfirmDelete);
    });

    cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._cardData);
    });
  }

  _handleLikeIcon() {
    const cardId = this._cardData._id;
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const isLiked = likeButton.classList.contains("card__like-button_active");

    if (cardId.isLiked) {
      api
        .dislikeCard(cardId)
        .then(() => {
          likeButton.classList.remove("card__like-button_active");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .likeCard(cardId)
        .then(() => {
          likeButton.classList.add("card__like-button_active");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  _handleDeleteCard() {
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
  }

  getCardView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");

    cardImageEl.setAttribute("src", this._cardData.link);
    cardImageEl.setAttribute("alt", `Photo of ${this._cardData.name}`);
    cardTitleEl.textContent = this._cardData.name;

    this._setEventListeners();

    return this._cardElement;
  }
}
