//Открытие модального окна

export function openModal (popupElement) {
    popupElement.classList.add("popup_is-opened");
    window.addEventListener("keydown", handleEscapePress);
};

//Закрытие модального окна

export function closeModal (popupElement) {
    popupElement.classList.remove("popup_is-opened");
    window.removeEventListener("keydown", handleEscapePress);
};

//Обработчики событий закрытия модального окна

export function handleOverlayClick (event) {
    if (event.target === event.currentTarget) {
        closeModal(event.currentTarget);
    };
};

function handleEscapePress (event) {
    if (event.key === "Escape") {
        const currentPopup = document.querySelector(".popup_is-opened");

        closeModal(currentPopup);
    };
};