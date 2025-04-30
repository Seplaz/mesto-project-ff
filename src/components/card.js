const cardTemplate = document.querySelector('#card-template').content;

const createCard = (data, like) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = data.link;
  cardImage.alt = `Картинка, на которой показывается ${data.name}`;
  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
    deleteCard(cardElement);
  });

  cardElement.querySelector('.card__like-button').addEventListener('click', like);

  return cardElement;
}

const like = (item) => {
  item.classList.toggle('card__like-button_is-active');
};

function deleteCard(card) {
  card.remove();
};

export { createCard, like };