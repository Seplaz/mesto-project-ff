import { createCard } from "./card";
import { initialCards } from "./cards";
import { showImagePopup, openPopup } from "./modal";

const placesList = document.querySelector('.places__list');
const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

initialCards.forEach((item) => {
  placesList.append(createCard(item.link, item.name));
})

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('profile__edit-button')) {
    openPopup(editPopup);
  } else if (target.classList.contains('profile__add-button')) {
    openPopup(newCardPopup);
  } else if (target.closest('.card__image')) {
    showImagePopup(target.closest('.card'));
  };
});