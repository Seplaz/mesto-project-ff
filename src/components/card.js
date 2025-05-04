const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (data, like, deleteCard, imageClickHandler) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = data.link;
  cardImage.alt = `Картинка, на которой показывается ${data.name}`;
  cardTitle.textContent = data.name;

  cardImage.addEventListener('click', () => imageClickHandler(data));
  deleteButton.addEventListener('click', () => deleteCard(cardElement));
  likeButton.addEventListener('click', like);

  return cardElement;
};

export const handleLikeButton = (event) => {
  event.target.classList.toggle('card__like-button_is-active');
};

export const deleteCard = (cardElement) => {
  cardElement.remove();
};