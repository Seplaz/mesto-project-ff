import { createCard, like } from "./card";
import { initialCards } from "./cards";
import { addListener, openPopup } from "./modal";

const placesList = document.querySelector('.places__list');

const profileEditPopup = document.querySelector('.popup_type_edit');
const addNewCardPopup = document.querySelector('.popup_type_new-card');
const openImagePopup = document.querySelector('.popup_type_image');

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('profile__edit-button')) {
    openPopup(profileEditPopup);
    addListener(profileEditPopup);

  } else if (event.target.classList.contains('profile__add-button')) {
    openPopup(addNewCardPopup);
    addListener(addNewCardPopup);

  };
});

initialCards.forEach((data) => {
  placesList.append(createCard(data, like));
});
