let initialCards = [
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

// Profile Section
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".modal");
const modalExitButton = document.querySelector(".modal__exit-button");
const profileForm = document.querySelector(".modal__form");
const modalTitleInput = document.querySelector("#modalTitle");
const modalDescriptionInput = document.querySelector("#modalDescription");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Event Listeners for Profile Editing

profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal_opened");
  modalDescriptionInput.value = profileDescription.textContent;
  modalTitleInput.value = profileTitle.textContent;
});


function closeModal() {
  profileEditModal.classList.remove("modal_opened");
}

modalExitButton.addEventListener("click", closeModal);

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  closeModal();
  profileTitle.textContent = modalTitleInput.value;
  profileDescription.textContent = modalDescriptionInput.value;
});

// Add Place Section
const addPlaceModal = document.querySelector("#add-place");
const profileAddButton = document.querySelector(".profile__add-button");
const modalExitButton2 = document.querySelector("#exit-button");
const addPlaceForm = document.querySelector("#add-place-form");

// Add Place Event Listeners
profileAddButton.addEventListener("click", () => {
  addPlaceModal.classList.add("modal_opened");
});

modalExitButton2.addEventListener("click", () => {
  addPlaceModal.classList.remove("modal_opened");
});

addPlaceForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const cardData = { name, link };
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  addPlaceModal.classList.remove("modal_opened");
});

// Cards Section
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const cardTitleInput = document.querySelector("#modal-title");
const cardUrlInput = document.querySelector("#modal-description");

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
});

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.setAttribute("src", cardData.link);
  cardImageEl.setAttribute("alt", cardData.name);
  cardTitleEl.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardElement.addEventListener("click", () => {
    const modalImage = document.querySelector(".modal__image");
    const modalDescription = document.querySelector(".modal__description");

    modalImage.setAttribute("src", cardData.link);
    modalDescription.textContent = cardData.name;

    const pictureModal = document.querySelector("#image-modal");
    pictureModal.classList.add("modal_opened");
  });

  return cardElement;
}

// Picture Modal

const pictureModal = document.querySelector("#image-modal");

function closeImgModal() {
  pictureModal.classList.remove("modal_opened");
}

document.addEventListener("click", (event) => {
  if (
    event.target === pictureModal ||
    !pictureModal.contains(event.target)
  ) {
    closeImgModal();
  }
});