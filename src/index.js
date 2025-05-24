import './pages/index.css';
import { createCard, onDeleteCard, handleLikeButton } from "./components/card.js";
import { setupPopupListeners, openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from './components/validation.js';
import { getProfile, getInitialCards, updateProfile, postNewCard } from './components/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const placesList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  setupPopupListeners(popup);
});

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const editProfileButton = document.querySelector('.profile__edit-button');

const addNewCardPopup = document.querySelector('.popup_type_new-card');
const addImageButton = document.querySelector('.profile__add-button');

const openImagePopup = document.querySelector('.popup_type_image');

const profileFormElement = profileEditPopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const descriptionInput = profileFormElement.querySelector('.popup__input_type_description');

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  updateProfile(nameValue, descriptionValue)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    });
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const addImageFormElement = addNewCardPopup.querySelector('.popup__form');
const cardNameInput = addImageFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = addImageFormElement.querySelector('.popup__input_type_url');

const handleImageFormSubmit = (event) => {
  event.preventDefault();

  const cardName = cardNameInput.value;
  const cardUrl = cardUrlInput.value;

  postNewCard(cardName, cardUrl)
    .then((data) => {
      placesList.prepend(createCard(data, handleLikeButton, onDeleteCard, onOpenPreview));
      addImageFormElement.reset();
      clearValidation(addImageFormElement, validationConfig);
      closePopup(addNewCardPopup);
    })
    .catch((err) => {
      console.log(err);
    });
};

addImageFormElement.addEventListener('submit', handleImageFormSubmit);

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(profileFormElement, validationConfig);
    openPopup(profileEditPopup);
});

addImageButton.addEventListener('click', () => {
  clearValidation(addImageFormElement, validationConfig);
  openPopup(addNewCardPopup);
});

const onOpenPreview = (data) => {
  const popupImage = openImagePopup.querySelector('.popup__image');
  const popupCaption = openImagePopup.querySelector('.popup__caption');
  popupImage.src = data.link;
  popupImage.alt = `Картинка, на которой показывается ${data.name}`;
  popupCaption.textContent = data.name;
  openPopup(openImagePopup);
};

Promise.all([getProfile(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((data) => {
      placesList.append(createCard(data, handleLikeButton, onDeleteCard, onOpenPreview));
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);