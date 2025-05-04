import { createCard, like } from "./card";
import { initialCards } from "./cards";
import { addListener, openPopup, closePopup } from "./modal";

const placesList = document.querySelector('.places__list');

const profileEditPopup = document.querySelector('.popup_type_edit');
const addNewCardPopup = document.querySelector('.popup_type_new-card');
const openImagePopup = document.querySelector('.popup_type_image');

const profileFormElement = profileEditPopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const descriptionInput = profileFormElement.querySelector('.popup__input_type_description');

const profileFormSubmit = (event) => {
  event.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = descriptionInput.value;

  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileName.textContent = nameValue;
  profileDescription.textContent = descriptionValue;

  closePopup(profileEditPopup);
};

profileFormElement.addEventListener('submit', profileFormSubmit);

const addImageFormElement = addNewCardPopup.querySelector('.popup__form');
const cardNameInput = addImageFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = addImageFormElement.querySelector('.popup__input_type_url');

const imageFormSubmit = (event) => {
  event.preventDefault();

  const cardName = cardNameInput.value;
  const cardUrl = cardUrlInput.value;
  const newCardData = {
    name: cardName,
    link: cardUrl
  };

  placesList.prepend(createCard(newCardData, like, imageClickHandler));
  addImageFormElement.reset();
  closePopup(addNewCardPopup);
};

addImageFormElement.addEventListener('submit', imageFormSubmit);

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__edit-button')) {
    const profileName = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    openPopup(profileEditPopup);
    addListener(profileEditPopup);

  } else if (event.target.classList.contains('profile__add-button')) {
    openPopup(addNewCardPopup);
    addListener(addNewCardPopup);
  };
});

const imageClickHandler = (data) => {
  const popupImage = openImagePopup.querySelector('.popup__image');
  const popupCaption = openImagePopup.querySelector('.popup__caption');

  popupImage.src = data.link;
  popupImage.alt = `Картинка, на которой показывается ${data.name}`;
  popupCaption.textContent = data.name;

  openPopup(openImagePopup);
  addListener(openImagePopup);
};

initialCards.forEach((data) => {
  placesList.append(createCard(data, like, imageClickHandler));
});
