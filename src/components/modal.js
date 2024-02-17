//Открытие модального окна

export function openModal (popupElement) {
    popupElement.classList.add("popup_is-opened");
    modalEvents(popupElement);
    return;
};

//Закрытие модального окна

export function closeModal () {
    const currentPopup = document.querySelector(".popup_is-opened");
    
    currentPopup.classList.remove("popup_is-opened");
    return;
};

//Обработчики событий модального окна

export function modalEvents (popupElement) {
    const popupCloseButton = popupElement.querySelector(".popup__close");

    popupCloseButton.addEventListener("click", handleCrossClick);
    window.addEventListener("click", handleOverlayClick);
    window.addEventListener("keydown", handleEscapePress);
};

//Обработчики событий

export function handleCrossClick () {
    window.removeEventListener("keydown", handleEscapePress);
    closeModal();
};

export function handleEscapePress (event) {
    if (event.key === "Escape") {
        window.removeEventListener("keydown", handleEscapePress);
        closeModal();
    };
};

export function handleOverlayClick (event) {
    if (event.target.classList.contains("popup")) {
        window.removeEventListener("keydown", handleEscapePress);
        closeModal();
    };
};