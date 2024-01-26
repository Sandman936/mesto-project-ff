// Темплейт карточки

const cardsTemplate = document.querySelector("#card-template").content;

// DOM узлы

const cardsList = document.querySelector(".places__list");

const cardsItem = cardsTemplate.querySelector(".places__item");

const cardImage = cardsTemplate.querySelector(".card__image");

const cardTitle = cardsTemplate.querySelector(".card__title");


// Функция создания карточки

const renderCards = (name, link) => {
    cardTitle.textContent = name;

    cardImage.src = link;

    cardImage.alt = name;

    createCard();
};

const createCard = () => {
    const cardsItemCloned = cardsItem.cloneNode(true);

    cardsList.append(cardsItemCloned);

    const removeButton = cardsItemCloned.querySelector(".card__delete-button");

    removeButton.addEventListener("click", function (evt) {
        removeCard(evt);
    });
}

// Функция удаления карточки

const removeCard = (evt) => {
    const removeItem = evt.target;

    removeItem.parentElement.remove();
}

// Вывести карточки на страницу

initialCards.forEach((card) => {
    renderCards(card.name, card.link);
});
