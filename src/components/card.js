//Функция создания карточки

export const createCard = (card, cardOwner, isLiked, removeCardModal, likeClick, openImage, likeDataPut, likeDataDelete) => {
    const cardsTemplate = document.querySelector("#card-template").content;
    const cardElement = cardsTemplate.querySelector(".places__item").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const removeButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeValue = cardElement.querySelector(".card__like-counter");

    cardTitle.textContent = card.name;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    likeValue.textContent = card.likes.length;

    if (cardOwner) {
        removeButton.addEventListener("click", function (evt) {
            removeCardModal(evt, card);
        });
    } else {
        removeButton.remove();
    }
    
    if (isLiked) {
        likeButton.classList.add("card__like-button_is-active");
    } else {
        likeButton.classList.remove("card__like-button_is-active");
    };

    likeButton.addEventListener("click", function (event) {
        likeClick(event, card._id, isLiked, likeButton, likeValue, likeDataPut, likeDataDelete);
    });

    cardImage.addEventListener("click", () => openImage(card));

    return cardElement;
};

//Обработчик удаления карточки

export function removeCard (cardElement) {
    cardElement.remove();
}

//Функция обработки лайка

export function handleLikeClick (event, cardId, isLiked, likeButton, likeCounter, likeDataPut, likeDataDelete) {
    if (event.target.classList.contains("card__like-button_is-active")) {
        likeDataDelete(cardId)
        .then( (res) => {
            likeButton.classList.remove("card__like-button_is-active");
            likeCounter.textContent = res.likes.length;
        })
        .catch( (err) => {
        console.error(err);
        });
    } else {
        likeDataPut(cardId)
        .then( (res) => {
            likeButton.classList.add("card__like-button_is-active");
            likeCounter.textContent = res.likes.length;
        })
        .catch( (err) => {
        console.error(err);
        });
    }
    
};