import { deleteLike, putLike } from './api.js';

const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (data, onDeleteCard, onOpenPreview, userId) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = data.link;
  cardImage.alt = `Картинка, на которой показывается ${data.name}`;
  cardTitle.textContent = data.name;
  likeCount.textContent = data.likes.length;

  const isLiked = data.likes.some(like => like._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (data.owner._id === userId) {
    deleteButton.style.display = 'block';
    deleteButton.addEventListener('click', () => onDeleteCard(cardElement, data._id));
  } else {
    deleteButton.style.display = 'none';
  }

  cardImage.addEventListener('click', () => onOpenPreview(data));
  likeButton.addEventListener('click', () => handleLikeCard(likeButton, data._id, likeCount));

  return cardElement;
};

export const handleLikeCard = (likeButton, cardId, likeCount) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const likeRequest = isLiked ? deleteLike(cardId) : putLike(cardId);

  likeRequest
    .then((data) => {
      likeCount.textContent = data.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch((err) => {
      console.log(err);
    });
};

export const onDeleteCard = (cardElement) => {
  cardElement.remove();
};
