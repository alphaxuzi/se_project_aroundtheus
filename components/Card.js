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
    this._cardImageElement = this._cardElement.querySelector(".card__image");

    likeButton.addEventListener("click", () => {
      this._handleLikeIcon();
    });

    deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._cardData);
    });
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
  }

  _handleImageClick() {
    this._cardImageEl = cardElement.querySelector(".card__image");
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
