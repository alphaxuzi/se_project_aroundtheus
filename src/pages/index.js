import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "../utils/constants.js";
import { config } from "../utils/constants.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import Popup from "../components/Popup.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

let section;

export const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "953ea6cd-2c01-4d7b-be00-e077aa224921",
    "Content-Type": "application/json",
  },
});

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    setIsLiked,
    handleDelete
  );
  const cardElement = card.getCardView();

  return cardElement;
}

function setIsLiked(card) {
  const cardId = card._cardData._id;

  if (card.isLiked()) {
    api.dislikeCard(cardId).then((res) => {
      card.setIsLiked(false);
    });
  } else {
    api.likeCard(cardId).then((res) => card.setIsLiked(true));
  }
}

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}


function handleDelete(card) {
  popupConfirmDeleteCard.open();
  const confirmButton = document.querySelector(".confirm-delete-button");
  confirmButton.addEventListener("click", () => {
    api
      .deleteCard(card.id)
      .then((card) => {
        card._handleDeleteCard();
        popupConfirmDeleteCard.close();
      })
      .catch((err) => {
        console.error(err);
        // alert(`${err}, something went wrong`);
      });
  });
}

api
  .getInitialCards()
  .then((cards) => {
    section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const cardElement = createCard(cardData);
          section.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error(err);
    // alert(`${err}, something went wrong`);
  });

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

api
  .loadUserInfo()
  .then((data) => {
    userInfo.setUserInfo({
      name: data.name,
      job: data.about,
    });
  })
  .catch((err) => {
    console.error(err);
    // alert(`${err}, something went wrong`);
  });

// Profile Section
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-profile");
const profileForm = profileEditModal.querySelector(".modal__form");
const modalTitleInput = document.querySelector("#modalTitle");
const modalDescriptionInput = document.querySelector("#modalDescription");

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
  modalTitleInput.value = name;
  modalDescriptionInput.value = job;
  popupProfileEdit.open();
});

function handleProfileFormSubmit({ title, description }) {
  const saveButton = document.querySelector("#profile-submit-button");
  const originalText = saveButton.textContent;

  saveButton.textContent = "Saving...";

  api
    .updateUserInfo(title, description)
    .then(() => {
      userInfo.setUserInfo({ name: title, job: description });
      popupProfileEdit.close();
      validateProfile.toggleButtonState();
    })
    .catch((err) => {
      console.error(err);
      // alert(`${err}, something went wrong`);
    })
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

// Add Place Section
const addCardButton = document.querySelector(".profile__add-button");
const addPlaceForm = document.querySelector("#add-place-form");

addCardButton.addEventListener("click", () => {
  popupAddPlace.open();
});

function handleAddPlaceFormSubmit(data) {
  const saveButton = document.querySelector("#card-submit-button");
  const originalText = saveButton.textContent;

  saveButton.textContent = "Saving...";
  const { name, link } = data;
  api
    .addCard(name, link)
    .then((cardData) => {
      console.log(cardData);
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
      popupAddPlace.close();
      popupAddPlace.resetForm();
      validateAddPlace.toggleButtonState();
    })
    .catch((err) => {
      console.error(err);
      // alert(`${err}, something went wrong`);
    })
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

//initialization
const validateProfile = new FormValidator(config, profileForm);
validateProfile.enableValidation();

const validateAddPlace = new FormValidator(config, addPlaceForm);
validateAddPlace.enableValidation();

const popupWithImage = new PopupWithImage({ popupSelector: "#image-modal" });
popupWithImage.setEventListeners();

// Avatar
const updateAvatarModal = document.querySelector("#update-avatar");
const avatarForm = updateAvatarModal.querySelector(".modal__form");
const updateAvatarButton = document.querySelector(".profile__image_edit-icon");

const validateUpdateAvatar = new FormValidator(config, avatarForm);
validateUpdateAvatar.enableValidation();

const popupUpdateAvatar = new PopupWithForm(
  "#update-avatar",
  handleUpdateAvatar
);
popupUpdateAvatar.setEventListeners();

function handleUpdateAvatar({ link }) {
  const saveButton = document.querySelector("#avatar-submit-button");
  const originalText = saveButton.textContent;

  saveButton.textContent = "Saving...";
  api
    .updateAvatar(link)
    .then((data) => {
      userInfo.setAvatar(data.avatar);
      popupUpdateAvatar.close();
      avatarForm.reset();
      validateUpdateAvatar.toggleButtonState();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      saveButton.textContent = originalText;
    });
}

updateAvatarButton.addEventListener("click", () => {
  popupUpdateAvatar.open();
});

// Confirm delete Card
export const popupConfirmDeleteCard = new PopupWithConfirmation(
  "#confirm-modal",
  (card) => handleDelete(card)
);
popupConfirmDeleteCard.setEventListeners();
