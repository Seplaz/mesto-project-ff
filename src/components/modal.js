const profileContainer = document.querySelector('.profile');
const cardsContainer = document.querySelector('.places');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

const popups = document.querySelectorAll('.popup');

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
};

profileContainer.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('profile__edit-button')) {
    openPopup(editPopup);
  } else if (target.classList.contains('profile__add-button')) {
    openPopup(newCardPopup);
  };
});

cardsContainer.addEventListener('click', (event) => {
  const card = event.target.closest('.card');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  if (card) {
    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;
  }

  if (event.target.closest('.card__delete-button') || event.target.closest('.card__like-button')) {
    return;
  };
  
  openPopup(imagePopup);
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__close')) {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  };
});

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    };
  });
});

document,addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    };
  };
});