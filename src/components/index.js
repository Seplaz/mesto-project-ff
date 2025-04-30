import { createCard } from "./card";
import { initialCards } from "./cards";
import { openPopup, closePopup, addListener } from "./modal";

const placesList = document.querySelector('.places__list');

const profileEditPopup = document.querySelector('.popup_type_edit');
const addNewCardPopup = document.querySelector('.popup_type_new-card');
const openImagePopup = document.querySelector('.popup_type_image');

initialCards.forEach((item) => {
  placesList.append(createCard(item.link, item.name));
});

addListener(profileEditPopup);
addListener(addNewCardPopup);
addListener(openImagePopup);