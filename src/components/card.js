// Функция создания карточки

export const createCard = (cardName, cardLink, removeCard, likeClick, imageOpen) => {
    const cardsTemplate = document.querySelector("#card-template").content;
    const cardElement = cardsTemplate.querySelector(".places__item").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const removeButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");

    cardTitle.textContent = cardName;
    cardImage.src = cardLink;
    cardImage.alt = cardName;

    removeButton.addEventListener("click", removeCard);

    likeButton.addEventListener("click", likeClick);

    cardImage.addEventListener('click', () => imageOpen({ cardName, cardLink }));

    return cardElement;
};

// Функция удаления карточки

export function handleRemoveCard (evt) {
    const removeItem = evt.target;
    removeItem.closest(".card").remove();
};

//Функция обработки лайка

export function handleLikeClick (event) {
    event.target.classList.toggle("card__like-button_is-active");
};