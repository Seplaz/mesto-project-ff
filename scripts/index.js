const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

const createCard = (image, title) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = image;
  cardImage.alt = `Картинка, на которой показывается ${title}`;
  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach((item) => {
  placesList.append(createCard(item.link, item.name));
})