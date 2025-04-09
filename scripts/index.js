const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const createCard = (image, title) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = image;
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCard(cardElement);
  });

  placesList.append(cardElement);
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((item) => {
  createCard(item.link, item.name);
})