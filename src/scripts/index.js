import "../pages/index.css";
import { initialCards } from "../components/cards.js";
import { createCard, handleRemoveCard, handleLikeClick } from "../components/card.js";
import { openModal, closeModal, handleCrossClick, handleOverlayClick } from "../components/modal.js";

//Глобальные переменные

const cardsList = document.querySelector(".places__list");

//Триггеры открытия попапов

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

//Попапы

const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImageWindow = document.querySelector(".popup_type_image");
const popupImage = popupImageWindow.querySelector(".popup__image");
const popupImageCaption = popupImageWindow.querySelector(".popup__caption");

//Триггеры закрытия попапов

const popupEditCloseButton = popupEdit.querySelector(".popup__close");
const popupAddCardCloseButton = popupAddCard.querySelector(".popup__close");
const popupImageWindowCloseButton = popupImageWindow.querySelector(".popup__close");

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

function imageModal ({ cardName, cardLink }) {
    popupImageCaption.textContent = cardName;
    popupImage.src = cardLink;
    popupImage.alt = cardName;

    openModal(popupImageWindow);
};

// Вывести карточки на страницу

const renderCards = (nameValue, linkValue ) => {
    const newCard = createCard(nameValue, linkValue, handleRemoveCard, handleLikeClick, imageModal);

    cardsList.append(newCard);
};

initialCards.forEach((card) => {
   renderCards(card.name, card.link);
});


//Слушатели событий

addCardButton.addEventListener("click", function () {
    openModal(popupAddCard);
    addCardForm.reset();
});

editProfileButton.addEventListener("click", function () {
    openModal(popupEdit);
    formInit();
});

//Слушатели закрытия модального окна

popupEditCloseButton.addEventListener("click", function () {
    handleCrossClick(popupEdit);
});

popupAddCardCloseButton.addEventListener("click", function () {
    handleCrossClick(popupAddCard);
});

popupImageWindowCloseButton.addEventListener("click", function () {
    handleCrossClick(popupImageWindow);
});

popupEdit.addEventListener("click", function (event) {
    handleOverlayClick(event, popupEdit);
});

popupAddCard.addEventListener("click", function (event) {
    handleOverlayClick(event, popupAddCard);
});

popupImageWindow.addEventListener("click", function (event) {
    handleOverlayClick(event, popupImageWindow);
});

//Слушатели отправки формы

editForm.addEventListener('submit', handleEditFormSubmit);

addCardForm.addEventListener('submit', handleAddCardFormSubmit);


//Функция создания новой карточки

function createNewCard (name, link) {
    const newCard = createCard(name, link, handleRemoveCard, handleLikeClick, imageModal);
    
    cardsList.prepend(newCard);
};

//Иницилизация формы

function formInit () {
    editInputName.value = profileInfoName.textContent;
    editInputDesc.value = profileInfoDesc.textContent;
};

//Обработчики отправки форм

function handleEditFormSubmit (event) {
    event.preventDefault();
    profileInfoName.textContent = editInputName.value;
    profileInfoDesc.textContent = editInputDesc.value;
    closeModal(popupEdit);
};

function handleAddCardFormSubmit (event) {
    event.preventDefault();
    createNewCard(addCardInputName.value, addCardInputLink.value);
    closeModal(popupAddCard);
};