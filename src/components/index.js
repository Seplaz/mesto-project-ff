import '../pages/index.css';
import { createCard, deleteCard, handleLikeButton } from "./card";
import { initialCards } from "./cards";
import { setupPopupListeners, openPopup, closePopup } from "./modal";

const placesList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  setupPopupListeners(popup);
});

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
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

  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closePopup(profileEditPopup);
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const addImageFormElement = addNewCardPopup.querySelector('.popup__form');
const cardNameInput = addImageFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = addImageFormElement.querySelector('.popup__input_type_url');

const handleImageFormSubmit = (event) => {
  event.preventDefault();

  const cardName = cardNameInput.value;
  const cardUrl = cardUrlInput.value;
  const newCardData = {
    name: cardName,
    link: cardUrl
  };

  placesList.prepend(createCard(newCardData, deleteCard, handleLikeButton, imageClickHandler));
  addImageFormElement.reset();
  closePopup(addNewCardPopup);
};

addImageFormElement.addEventListener('submit', handleImageFormSubmit);

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(profileEditPopup);
});

addImageButton.addEventListener('click', () => {
  openPopup(addNewCardPopup);
});

const imageClickHandler = (data) => {
  const popupImage = openImagePopup.querySelector('.popup__image');
  const popupCaption = openImagePopup.querySelector('.popup__caption');
  popupImage.src = data.link;
  popupImage.alt = `Картинка, на которой показывается ${data.name}`;
  popupCaption.textContent = data.name;
  openPopup(openImagePopup);
};

initialCards.forEach((data) => {
  placesList.append(createCard(data, handleLikeButton, deleteCard, imageClickHandler));
});
