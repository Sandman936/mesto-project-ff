import "../pages/index.css";
import { createCard, handleLikeClick, removeCard} from "../components/card.js";
import { openModal, closeModal, handleOverlayClick } from "../components/modal.js";
import { enableValidation, clearValidation} from "../components/validation.js";
import { dataInit, profileDataPatch, newCardDataPost, removeCardDataDelete, likeCardDataPut, likeCardDataDelete, profileAvatarDataPatch } from "../components/api.js";

//Глобальные переменные

const cardsList = document.querySelector(".places__list");
let removeCardData;
let removeCardElement;

//Объект конфига валидации

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

//Триггеры открытия попапов

const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileAvatarButton = document.querySelector(".profile__image");

//Попапы

const popups = document.querySelectorAll(".popup");
const popupAvatar = document.querySelector(".popup_type_avatar");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImageWindow = document.querySelector(".popup_type_image");
const popupImage = popupImageWindow.querySelector(".popup__image");
const popupImageCaption = popupImageWindow.querySelector(".popup__caption");
const popupDeleteCard = document.querySelector(".popup_type_conformation");
const deleteCardConfirmButton = popupDeleteCard.querySelector(".popup_confirm-button");

//Переменные форм

const avatarForm = document.forms.editAvatar;
const avatarInputLink = avatarForm.link;
const editForm = document.forms.editProfile;
const editInputName = editForm.name;
const editInputDesc = editForm.description;
const addCardForm = document.forms.newPlace;
const addCardInputName = addCardForm.placeName;
const addCardInputLink = addCardForm.link;

//Переменные профиля

const profileInfoAvatar = document.querySelector(".profile__image");
const profileInfoName = document.querySelector(".profile__title");
const profileInfoDesc = document.querySelector(".profile__description");

//Модальное окно картинки карточки

function openImageModal (card) {
    popupImageCaption.textContent = card.name;
    popupImage.src = card.link;
    popupImage.alt = card.name;

    openModal(popupImageWindow);
};

//Вывести карточки на страницу

const renderCard = (card, cardOwner, isLiked) => {
    const newCard = createCard(card, cardOwner, isLiked, openRemoveCardModal, handleLikeClick, openImageModal, likeCardDataPut, likeCardDataDelete);

    cardsList.append(newCard);
};

//Создание новой карточки

const createNewCard = (card, cardOwner) => {
    const newCard = createCard(card, cardOwner, false, openRemoveCardModal, handleLikeClick, openImageModal, likeCardDataPut, likeCardDataDelete);

    cardsList.prepend(newCard);
};

//Слушатели событий

editProfileAvatarButton.addEventListener("click", function () {
    openModal(popupAvatar);
    avatarForm.reset();
    clearValidation(avatarForm, validationConfig);
});

addCardButton.addEventListener("click", function () {
    openModal(popupAddCard);
    addCardForm.reset();
    clearValidation(addCardForm, validationConfig);
});

editProfileButton.addEventListener("click", function () {
    openModal(popupEdit);
    clearValidation(editForm, validationConfig);
    editProfileformInit();
});

deleteCardConfirmButton.addEventListener("click", function () {
    removeCardDataDelete(removeCardData._id)
    .then(removeCard(removeCardElement))
    .catch( (err) => {
    console.error(err);
    });
    closeModal(popupDeleteCard);
});

//Функция открытия модального окна удаления карточки

function openRemoveCardModal (evt, card) {
    removeCardData = card;
    removeCardElement = evt.target.closest(".card");

    openModal(popupDeleteCard);
};

//Слушатели закрытия модального окна

popups.forEach( (popup) => {
    const popupCloseButton =  popup.querySelector(".popup__close");

    popupCloseButton.addEventListener("click", function () {
        closeModal(popup);
    });
    popup.addEventListener("mousedown", handleOverlayClick);
});

//Слушатели отправки формы

editForm.addEventListener('submit', handleEditProfileFormSubmit);

addCardForm.addEventListener('submit', handleAddCardFormSubmit);

avatarForm.addEventListener('submit', handleEditAvatarSubmit);

//Иницилизация формы

function editProfileformInit () {
    editInputName.value = profileInfoName.textContent;
    editInputDesc.value = profileInfoDesc.textContent;
};

//Обработчики отправки форм

function handleEditProfileFormSubmit (event) {
    const currentButton = popupEdit.querySelector(".button");
    
    event.preventDefault();
    currentButton.textContent = "Сохранение..."
    profileDataPatch(editInputName.value, editInputDesc.value)
    .then( (res) => {
        profileInfoName.textContent = res.name;
        profileInfoDesc.textContent = res.about;
    })
    .catch( (err) => {
        console.error(err);
    })
    .finally( () => {
        currentButton.textContent = "Сохранение";
        closeModal(popupEdit);
    })
};

function handleAddCardFormSubmit (event) {
    const currentButton = popupAddCard.querySelector('.button');
    
    event.preventDefault();
    currentButton.textContent = "Сохранение...";
    newCardDataPost(addCardInputName.value, addCardInputLink.value)
    .then( (res) => {
        createNewCard(res, true);
    })
    .catch( (err) => {
    console.error(err);
    })
    .finally( () => {
        currentButton.textContent = "Сохранение";
        closeModal(popupAddCard);
    })
};

function handleEditAvatarSubmit (event) {
    const currentButton = popupAvatar.querySelector(".button");
    
    event.preventDefault();
    currentButton.textContent = "Сохранение...";
    profileAvatarDataPatch(avatarInputLink.value)
    .then( (res) => {
        profileInfoAvatar.setAttribute('style', `background-image: url(${res.avatar})`);
    })
    .catch( (err) => {
        console.error(err);
    })
    .finally( () => {
        currentButton.textContent = "Сохранение";
        closeModal(popupAvatar);
    })
};

//Активация валидации форм

enableValidation(validationConfig);

//Иницилизация данных страницы

dataInit()
.then( ([profileData, cardsData]) => {
    profileInfoAvatar.setAttribute("style", `background-image: url(${profileData.avatar})`);
    profileInfoName.textContent = profileData.name;
    profileInfoDesc.textContent = profileData.about;

    cardsData.forEach( (card) => {
        const ownedCard = profileData._id === card.owner._id;
        const likeId = (like) => like._id === profileData._id;
        const isLiked = card.likes.some(likeId);

        renderCard(card, ownedCard, isLiked);
    })
})
.catch( (err) => {
    console.error(err);
});