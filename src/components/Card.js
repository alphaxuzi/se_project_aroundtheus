export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    setIsLiked,
    handleDelete
  ) {
    this._cardData = cardData;
    this.id = cardData._id;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._isLiked = cardData.isLiked;
    this._setIsLiked = setIsLiked;
    this._handleDelete = handleDelete;
  }

  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    const cardImageEl = this._cardElement.querySelector(".card__image");

    likeButton.addEventListener("click", () => {
      this._setIsLiked(this);
    });

    deleteButton.addEventListener("click", () => {
      this._handleDelete(this);
    });

    cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._cardData);
    });
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  setIsLiked(isLiked) {
    this._isLiked = isLiked;
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
