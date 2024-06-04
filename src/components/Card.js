import { api } from "../pages/index.js";
import { popupConfirmDeleteCard } from "../pages/index.js";

export default class Card {
  constructor(cardData, cardSelector, handleImageClick, setIsLiked) {
    this._cardData = cardData;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._isLiked = cardData.isLiked;
    this._setIsLiked = setIsLiked;
  }


  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    const cardImageEl = this._cardElement.querySelector(".card__image");

    likeButton.addEventListener("click", () => {
      this.setIsLiked(this);
    });

    deleteButton.addEventListener("click", () => {
      popupConfirmDeleteCard.open();
      const popupConfirmButton = document.querySelector(
        "#confirm-delete-button"
      );
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

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  setIsLiked(isLiked) {
    this._isLiked = !isLiked;
    this._renderLikes();
  }

  isLiked() {
    return this._isLiked;
  }

  _renderLikes() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  getCardView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    const cardImageEl = this._cardElement.querySelector(".card__image");
    const cardTitleEl = this._cardElement.querySelector(".card__title");
    const likeButton = this._cardElement.querySelector(".card__like-button");

    cardImageEl.setAttribute("src", this._cardData.link);
    cardImageEl.setAttribute("alt", `Photo of ${this._cardData.name}`);
    cardTitleEl.textContent = this._cardData.name;

    this._setEventListeners();
    this._renderLikes();

    return this._cardElement;
  }
}
