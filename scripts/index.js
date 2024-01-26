// Функция создания карточки

const createCard = (cardName, cardLink) => {
    const cardsTemplate = document.querySelector("#card-template").content;
    const cardElement = cardsTemplate.querySelector(".places__item").cloneNode(true);

    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");

    cardTitle.textContent = cardName;

    cardImage.src = cardLink;
    cardImage.alt = cardName;

    const removeButton = cardElement.querySelector(".card__delete-button");

    removeButton.addEventListener("click", (evt) => {
        removeCard(evt)
    });

    return cardElement;
}

// Функция удаления карточки

const removeCard = (evt) => {
    const removeItem = evt.target;
    removeItem.parentElement.remove();
}

// Вывести карточки на страницу

const renderCards = (nameValue, linkValue ) => {
    const newCard = createCard(nameValue, linkValue);
    const cardsList = document.querySelector(".places__list");

    cardsList.append(newCard);
};

initialCards.forEach((card) => {
   renderCards(card.name, card.link);
});
