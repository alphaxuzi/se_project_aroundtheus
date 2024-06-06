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
  if (card.isLiked()) {
    api.dislikeCard(card.getCardId()).then((res) => {
      card.setIsLiked(false),
        (err) => {
          console.error(err);
          alert(`${err}, something went wrong`);
        };
    });
  } else {
    api.likeCard(card.getCardId()).then(
      (res) => card.setIsLiked(true),
      (err) => {
        console.error(err);
        alert(`${err}, something went wrong`);
      }
    );
  }
}

function handleImageClick(cardData) {
  popupWithImage.open(cardData);
}

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

Promise.all([api.loadUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    userInfo.setAvatar(userData.avatar);
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
    alert(`${err}, something went wrong`);
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
  popupProfileEdit.showLoading();
  return api
    .updateUserInfo(title, description)
    .then(() => {
      popupProfileEdit.showLoading();
      userInfo.setUserInfo({ name: title, job: description });
      popupProfileEdit.close();
      validateProfile.toggleButtonState();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}, something went wrong`);
    })
    .finally(() => {
      popupProfileEdit.hideLoading();
    });
}

// Add Place Section
const addCardButton = document.querySelector(".profile__add-button");
const addPlaceForm = document.querySelector("#add-place-form");

addCardButton.addEventListener("click", () => {
  popupAddPlace.open();
});

function handleAddPlaceFormSubmit(data) {
  popupAddPlace.showLoading();
  const { name, link } = data;
  return api
    .addCard(name, link)
    .then((cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
      popupAddPlace.close();
      popupAddPlace.resetForm();
      validateAddPlace.toggleButtonState();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}, something went wrong`);
    })
    .finally(() => {
      popupAddPlace.hideLoading();
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
  popupUpdateAvatar.showLoading();
  return api
    .updateAvatar(link)
    .then((data) => {
      userInfo.setAvatar(data.avatar);
      popupUpdateAvatar.close();
      avatarForm.reset();
      validateUpdateAvatar.toggleButtonState();
    })
    .catch((err) => {
      console.error(err);
      alert(`${err}, something went wrong`);
    })
    .finally(() => {
      popupUpdateAvatar.hideLoading();
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

function handleDelete(card) {
  popupConfirmDeleteCard.open(() => {
    popupConfirmDeleteCard.showLoading();
    api
      .deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
        popupConfirmDeleteCard.close();
      })
      .catch((err) => {
        console.error(err);
        alert(`${err}, something went wrong`);
      })
      .finally(() => {
        popupConfirmDeleteCard.hideLoading();
      });
  });
}
