const profile = document.querySelector('.profile');

const editPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const popups = document.querySelectorAll('.popup');

const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
};

const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
};

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('profile__edit-button')) {
    openPopup(editPopup);
  } else if (target.classList.contains('profile__add-button')) {
    openPopup(newCardPopup);
  } else if (target.closest('.card__image')) {

    const card = target.closest('.card');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');

    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = cardImage.src;
    popupImage.alt = cardImage.alt;
    popupCaption.textContent = cardTitle.textContent;

    openPopup(imagePopup);
  };
  document.removeEventListener('click', (event));
});

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('popup__close')) {
    const popup = event.target.closest('.popup');
    closePopup(popup);
  };
  document.removeEventListener('click', (event));
});

popups.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target === popup) {
      closePopup(popup);
    };
    popup.removeEventListener('click', (event));
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closePopup(openedPopup);
    };
    document.removeEventListener('click', (event));
  };
});