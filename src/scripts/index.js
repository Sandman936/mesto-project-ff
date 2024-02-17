import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { createCard, HandleRemoveCard, HandleLikeClick } from "../components/card.js";
import { openModal, closeModal, modalEvents, handleCrossClick, handleEscapePress, handleOverlayClick } from "../components/modal.js";

//Глобальные переменные

const cardsList = document.querySelector(".places__list");

//Триггеры попапов

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const popupImageWindow = document.querySelector(".popup_type_image");

//Попапы

const popupImage = popupImageWindow.querySelector(".popup__image");
const popupImageCaption = popupImageWindow.querySelector(".popup__caption");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");

//Переменные форм

const editForm = document.forms.editProfile;
const editInputName = editForm.name;
const editInputDesc = editForm.description;
const addCardForm = document.forms.newPlace;
const addCardInputName = addCardForm.placeName;
const addCardInputLink = addCardForm.link;

//Переменные профиля

const profileInfoName = document.querySelector(".profile__title");
const profileInfoDesc = document.querySelector(".profile__description");

function imageModal (event) {
    popupImageCaption.textContent = event.target.alt;
    popupImage.src = event.target.src;
    popupImage.alt = event.target.alt;

    openModal(popupImageWindow);
};

// Вывести карточки на страницу

const renderCards = (nameValue, linkValue ) => {
    const newCard = createCard(nameValue, linkValue, HandleRemoveCard, HandleLikeClick, imageModal);

    cardsList.append(newCard);
};

initialCards.forEach((card) => {
   renderCards(card.name, card.link);
});


//Слушатели событий

addCardButton.addEventListener("click", function () {
    openModal(popupAddCard);
    formInit(popupAddCard);
    addCardForm.reset();
});

editProfileButton.addEventListener("click", function () {
    openModal(popupEdit);
    formInit(popupEdit);
    editForm.reset();
});

//Функция создания новой карточки

function createNewCard (name, link) {
    const newCard = createCard(name, link, HandleRemoveCard, HandleLikeClick, imageModal);
    
    cardsList.prepend(newCard);
};

//Иницилизация формы

function formInit (popupElement) {
    if (popupElement.classList.contains("popup_type_edit")) {
        editInputName.setAttribute("placeholder", profileInfoName.textContent);
        editInputDesc.setAttribute("placeholder", profileInfoDesc.textContent);
        editForm.addEventListener('submit', handleEditFormSubmit);
    };

    if (popupElement.classList.contains("popup_type_new-card")) {
        addCardForm.addEventListener('submit', handleAddCardFormSubmit);
    }
};

//Обработчики отправки форм

function handleEditFormSubmit (event) {
    event.preventDefault();
    profileInfoName.textContent = editInputName.value;
    profileInfoDesc.textContent = editInputDesc.value;
    closeModal();
};

function handleAddCardFormSubmit (event) {
    event.preventDefault();
    createNewCard(addCardInputName.value, addCardInputLink.value);
    closeModal();
};