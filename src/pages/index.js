import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

userInfo.getUserInfo();

userInfo.setUserInfo({ name: "Name", job: "Job" });

// Profile Section
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-profile");
const profileForm = profileEditModal.querySelector(".modal__form");
const modalTitleInput = document.querySelector("#modalTitle");
const modalDescriptionInput = document.querySelector("#modalDescription");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupProfileEdit = new PopupWithForm(
  "#edit-profile",
  handleProfileFormSubmit
);
popupProfileEdit.setEventListeners();

const popupAddPlace = new PopupWithForm("#add-place", handleAddPlaceFormSubmit);
popupAddPlace.setEventListeners();

// Event Listeners for Profile Editing
profileEditButton.addEventListener("click", () => {
  popupProfileEdit.open();
  modalDescriptionInput.value = profileDescription.textContent;
  modalTitleInput.value = profileTitle.textContent;
});

function handleProfileFormSubmit({ title, description }) {
  profileTitle.textContent = title;
  profileDescription.textContent = description;
  popupProfileEdit.close();
  validateProfile.toggleButtonState();
}

// Add Place Section
const addCardButton = document.querySelector(".profile__add-button");
const addPlaceForm = document.querySelector("#add-place-form");

addCardButton.addEventListener("click", () => {
  popupAddPlace.open();
});

function handleAddPlaceFormSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardData = { name, link };
  const cardElement = createCard(cardData);

  cardListEl.prepend(cardElement);
  popupAddPlace.close();
  validateAddPlace.toggleButtonState();
}

//initialization

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__error",
  errorClass: "modal__error_visible",
};

const validateProfile = new FormValidator(config, profileForm);
validateProfile.enableValidation();

const validateAddPlace = new FormValidator(config, addPlaceForm);
validateAddPlace.enableValidation();

const popupWithImage = new PopupWithImage({ popupSelector: "#image-modal" });

// Cards Section
const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = document.querySelector("#modal-title");
const cardUrlInput = document.querySelector("#modal-description");

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getCardView();

  function handleImageClick(cardData) {
    popupWithImage.open(cardData);
    popupWithImage.setEventListeners();
  }
  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
});
