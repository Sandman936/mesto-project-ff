//Функция активации валидации

export function enableValidation (validationConfig) {
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

    formList.forEach( (formElement) => {
        setEventListeners(formElement, validationConfig);
    });
};

//Функция очистки ошибок валидации

export function clearValidation (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach( (inputElement) => {
        hideInputError(formElement, inputElement, validationConfig);
    });
    formElement.reset();
    toggleButtonState(inputList, buttonElement, validationConfig);
};

//Установка слушателей при вводе

function setEventListeners (formElement, validationConfig) {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach( (inputElement) => {
        inputElement.addEventListener("input", function () {
            formIsValid(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

//Функция проверки на валидность формы

function formIsValid (formElement, inputElement, validationConfig) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, validationConfig, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement, validationConfig);
    }
};

//Функция вывода ошибки

function showInputError (formElement, inputElement, validationConfig, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.classList.add(validationConfig.errorClass);
    errorElement.textContent = errorMessage;
};

//Функция скрытия ошибки

function hideInputError (formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
};

//Функция проверки валидности нескольких полей ввода

function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

//Функция определения состояния кнопки

function toggleButtonState (inputList, buttonElement, validationConfig) {
    if ( hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};
