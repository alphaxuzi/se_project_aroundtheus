import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import Section from "../components/Section.js";

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getCardView();
  return cardElement;
}

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

const cardListEl = document.querySelector(".cards__list");

const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const cardElement = createCard(cardData);
      cardListEl.prepend(cardElement);
    },
  },
  ".cards__list"
);

section.renderItems();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

userInfo.setUserInfo({ name: "Name", job: "Job" });

// Profile Section
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-profile");
const profileForm = profileEditModal.querySelector(".modal__form");
const modalTitleInput = document.querySelector("#modalTitle");
const modalDescriptionInput = document.querySelector("#modalDescription");
// const profileTitle = document.querySelector(".profile__title");
// const profileDescription = document.querySelector(".profile__description");

const popupProfileEdit = new PopupWithForm(
  "#edit-profile",
  handleProfileFormSubmit
);
popupProfileEdit.setEventListeners();

const popupAddPlace = new PopupWithForm("#add-place", handleAddPlaceFormSubmit);
popupAddPlace.setEventListeners();

// Event Listeners for Profile Editing
profileEditButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  modalTitleInput.textContent = name;
  modalDescriptionInput.textContent = job;
  popupProfileEdit.open();
});

function handleProfileFormSubmit({ title, description }) {
  userInfo.setUserInfo({ name: title, job: description });
  popupProfileEdit.close();
  profileForm.reset();
  validateProfile.toggleButtonState();
}

// Add Place Section
const addCardButton = document.querySelector(".profile__add-button");
const addPlaceForm = document.querySelector("#add-place-form");

addCardButton.addEventListener("click", () => {
  popupAddPlace.open();
});

function handleAddPlaceFormSubmit(data) {
  const { title, link } = data;
  const cardData = { name: title, link: link };
  const cardElement = createCard(cardData);

  section.addItem(cardElement);
  popupAddPlace.close();
  popupAddPlace.resetForm();
  validateAddPlace.toggleButtonState();
}

//initialization
const validateProfile = new FormValidator(config, profileForm);
validateProfile.enableValidation();

const validateAddPlace = new FormValidator(config, addPlaceForm);
validateAddPlace.enableValidation();

const popupWithImage = new PopupWithImage({ popupSelector: "#image-modal" });

// Cards Section
// const cardTitleInput = document.querySelector("#modal-title");
// const cardUrlInput = document.querySelector("#modal-description");

//  initialCards.forEach((cardData) => {
// const cardElement = createCard(cardData);
// cardListEl.prepend(cardElement);
// });

// section.renderItems();

popupWithImage.setEventListeners();
