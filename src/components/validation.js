const showInputError = (popupElement, inputElement, errorMessage, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.classList.add(settings.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (popupElement, inputElement, settings) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (popupElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(popupElement, inputElement, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (popupElement, settings) => {
  const inputList = Array.from(popupElement.querySelectorAll(settings.inputSelector));
  const buttonElement = popupElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      toggleButtonState(inputList, buttonElement, settings);
      checkInputValidity(popupElement, inputElement, settings);
    });
  });
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settings);
  });
};

export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
    inputElement.setCustomValidity('');
  });
  
  toggleButtonState(inputList, buttonElement, settings);
};
