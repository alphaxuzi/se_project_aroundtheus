let initialCards = [
    { name: "Shibuya Streets", link: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Malibu Beach", link: "https://images.unsplash.com/photo-1568418038101-646e9a156c2e?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Las Vegas", link: "https://images.unsplash.com/photo-1623107935331-7164fb0d6978?q=80&w=2788&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "African Elephants", link: "https://images.unsplash.com/photo-1525535816528-974e4b19eb51?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Arctic Fox", link: "https://images.unsplash.com/photo-1549926345-dd490df47bd2?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Great Wall of China", link: "https://plus.unsplash.com/premium_photo-1664304488525-44a96338c0cc?q=80&w=2950&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
]

let profileEditButton = document.querySelector(".profile__edit-button");
let profileEditModal = document.querySelector(".modal")
let modalExitButton = document.querySelector('.modal__exit-button')

let modalTitleInput = document.querySelector('#modalTitle')
let modalDescriptionInput = document.querySelector('#modalDescription')
let profileTitle = document.querySelector('.profile__title')
let profileDescription = document.querySelector('.profile__description')



profileEditButton.addEventListener("click", () => {
    profileEditModal.classList.add('modal__opened');
    modalDescriptionInput.value = profileDescription.textContent
    modalTitleInput.value = profileTitle.textContent
});

    modalExitButton.addEventListener('click', () => {
        profileEditModal.classList.remove('modal__opened')
    });


let modalForm = document.querySelector('.modal__form')
    modalForm.addEventListener('submit', (evt) =>{
        evt.preventDefault();
        profileEditModal.classList.remove('modal__opened');
        profileTitle.textContent = modalTitleInput.value;
        profileDescription.textContent = modalDescriptionInput.value
    });




    let cardTemplate = document.querySelector('#card-template').content.firstElementChild
    let cardListEl = document.querySelector('.cards__list')


initialCards.forEach ((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListEl.prepend(cardElement);
});

function getCardElement(cardData) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector('.card__image');
    const cardTitleEl = cardElement.querySelector('.card__title');
    cardImageEl.setAttribute('src', cardData.link);
    cardImageEl.setAttribute('alt',cardData.name);
    cardTitleEl.textContent = cardData.name;
    return cardElement;
}