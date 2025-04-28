import { createCard } from "./card";
import { initialCards } from "./cards";

const placesList = document.querySelector('.places__list');

initialCards.forEach((item) => {
  placesList.append(createCard(item.link, item.name));
})