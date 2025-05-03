import { createCard, like } from "./card";
import { initialCards } from "./cards";
import { addListener, openPopup } from "./modal";

const placesList = document.querySelector('.places__list');

const profileEditPopup = document.querySelector('.popup_type_edit');
const addNewCardPopup = document.querySelector('.popup_type_new-card');
const openImagePopup = document.querySelector('.popup_type_image');

const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const handleFormSubmit = (event) => {
  event.preventDefault();

}

formElement.addEventListener('submit', handleFormSubmit);

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__edit-button')) {
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
