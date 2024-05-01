import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Shibuya Streets",
    link: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Malibu Beach",
    link: "https://images.unsplash.com/photo-1568418038101-646e9a156c2e?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Las Vegas",
    link: "https://images.unsplash.com/photo-1623107935331-7164fb0d6978?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "African Elephants",
    link: "https://images.unsplash.com/photo-1525535816528-974e4b19eb51?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Arctic Fox",
    link: "https://images.unsplash.com/photo-1549926345-dd490df47bd2?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Great Wall of China",
    link: "https://plus.unsplash.com/premium_photo-1664304488525-44a96338c0cc?q=80&w=2950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function handleImageClick(cardData) {
}

const editProfileFormElement = document.querySelector("#edit-profile");

let validateProfile = new FormValidator(
  {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_disabled",
    inputErrorClass: "modal__error",
    errorClass: "modal__error_visible",
  },
  editProfileFormElement
);

validateProfile.enableValidation();

const addPlaceFormElement = document.querySelector("#add-place");

let validateAddPlace = new FormValidator(
  {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_disabled",
    inputErrorClass: "modal__error",
    errorClass: "modal__error_visible",
  },
  addPlaceFormElement
);

validateAddPlace.enableValidation();

// Profile Section
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-profile");
const profileExitButton = profileEditModal.querySelector(".modal__exit-button");
const profileForm = profileEditModal.querySelector(".modal__form");
const modalTitleInput = document.querySelector("#modalTitle");
const modalDescriptionInput = document.querySelector("#modalDescription");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Function for open/close
const modal = document.querySelectorAll(".modal");

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalWithEsc);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalWithEsc);
}

function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

modal.forEach((modalEl) => {
  modalEl.addEventListener("mousedown", closeModalOnRemoteClick);
});

function closeModalWithEsc(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

// Event Listeners for Profile Editing
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  modalDescriptionInput.value = profileDescription.textContent;
  modalTitleInput.value = profileTitle.textContent;
});

profileExitButton.addEventListener("click", () => {
  closeModal(profileEditModal);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closeModal(profileEditModal);
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
  evt.target.reset();
});

// Add Place Section
const addPlaceModal = document.querySelector("#add-place");
const profileAddButton = document.querySelector(".profile__add-button");
const modalExitButton2 = document.querySelector("#exit-button");
const addPlaceForm = document.querySelector("#add-place-form");

// Add Place Event Listeners
profileAddButton.addEventListener("click", () => {
  openModal(addPlaceModal);
});

modalExitButton2.addEventListener("click", () => {
  closeModal(addPlaceModal);
});

addPlaceForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardData = { name, link };
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getCardView();
  cardListEl.prepend(cardElement);
  closeModal(addPlaceModal);
  evt.target.reset();
});

// Cards Section
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = document.querySelector("#modal-title");
const cardUrlInput = document.querySelector("#modal-description");

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const cardElement = card.getCardView();
  const cardImageEl = cardElement.querySelector(".card__image");
  const modalDescription = document.querySelector(".modal__description");
  const modalImage = document.querySelector(".modal__image");

  cardImageEl.addEventListener("click", () => {
    modalImage.setAttribute("src", cardData.link);
    modalImage.setAttribute("alt", cardData.name);
    modalDescription.textContent = cardData.name;
    openModal(pictureModal);
  });

  cardListEl.prepend(cardElement);
});

const pictureModal = document.querySelector("#image-modal");
const modalImgExitButton = document.querySelector("#image-exit-button");

modalImgExitButton.addEventListener("click", () => {
  closeModal(pictureModal);
});
