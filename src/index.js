import './pages/index.css';
import { createCard, onDeleteCard } from "./components/card.js";
import { setupPopupListeners, openPopup, closePopup } from "./components/modal.js";
import { enableValidation, clearValidation } from './components/validation.js';
import { getProfile, getInitialCards, updateProfile, postNewCard, deleteCard, updateAvatar, checkImageUrl } from './components/api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
  inputErrorSelector: '.popup__input-error',
  errorSelector: '.popup__error',
  avatarUrlPattern: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  avatarUrlError: 'Введите корректный URL изображения'
};

const placesList = document.querySelector('.places__list');

const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
  setupPopupListeners(popup);
});

const profileEditPopup = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const editProfileButton = document.querySelector('.profile__edit-button');

const addNewCardPopup = document.querySelector('.popup_type_new-card');
const addImageButton = document.querySelector('.profile__add-button');

const openImagePopup = document.querySelector('.popup_type_image');

const profileFormElement = profileEditPopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const descriptionInput = profileFormElement.querySelector('.popup__input_type_description');

const handleProfileFormSubmit = (event) => {
  event.preventDefault();

  const name = nameInput.value;
  const description = descriptionInput.value;
  const submitButton = profileFormElement.querySelector('.popup__button');

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateProfile(name, description)
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
};

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const addImageFormElement = addNewCardPopup.querySelector('.popup__form');
const cardNameInput = addImageFormElement.querySelector('.popup__input_type_card-name');
const cardUrlInput = addImageFormElement.querySelector('.popup__input_type_url');

const deleteCardPopup = document.querySelector('.popup_type_delete-card');
const deleteCardForm = deleteCardPopup.querySelector('.popup__form');
let cardToDelete = null;

const handleDeleteCard = (cardElement, cardId) => {
  cardToDelete = { element: cardElement, id: cardId };
  openPopup(deleteCardPopup);
};

const handleDeleteCardSubmit = (event) => {
  event.preventDefault();

  deleteCard(cardToDelete.id)
    .then(() => {
      cardToDelete.element.remove();
      closePopup(deleteCardPopup);
      cardToDelete = null;
    })
    .catch((err) => {
      console.log(err);
    });
};

deleteCardForm.addEventListener('submit', handleDeleteCardSubmit);

const handleImageFormSubmit = (event) => {
  event.preventDefault();

  const cardName = cardNameInput.value;
  const cardUrl = cardUrlInput.value;
  const submitButton = addImageFormElement.querySelector('.popup__button');

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  postNewCard(cardName, cardUrl)
    .then((data) => {
      const cardElement = createCard(data, (element, id) => handleDeleteCard(element, id), onOpenPreview, data.owner._id);
      placesList.prepend(cardElement);
      addImageFormElement.reset();
      clearValidation(addImageFormElement, validationConfig);
      closePopup(addNewCardPopup);
    })
    .catch((err) => {
      console.log(err);
      submitButton.textContent = 'Создать';
      submitButton.disabled = false;
    });
};

addImageFormElement.addEventListener('submit', handleImageFormSubmit);

editProfileButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    descriptionInput.value = profileDescription.textContent;
    clearValidation(profileFormElement, validationConfig);
    openPopup(profileEditPopup);
});

addImageButton.addEventListener('click', () => {
  clearValidation(addImageFormElement, validationConfig);
  openPopup(addNewCardPopup);
});

const onOpenPreview = (data) => {
  const popupImage = openImagePopup.querySelector('.popup__image');
  const popupCaption = openImagePopup.querySelector('.popup__caption');
  popupImage.src = data.link;
  popupImage.alt = `Картинка, на которой показывается ${data.name}`;
  popupCaption.textContent = data.name;
  openPopup(openImagePopup);
};

Promise.all([getProfile(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;

    cards.forEach((data) => {
      const cardElement = createCard(data, (element, id) => handleDeleteCard(element, id), onOpenPreview, userData._id);
      placesList.append(cardElement);
    });
  })
  .catch((err) => {
    console.log(err);
  });

enableValidation(validationConfig);

const updateAvatarPopup = document.querySelector('.popup_type_update-avatar');
const updateAvatarForm = updateAvatarPopup.querySelector('.popup__form');
const avatarUrlInput = updateAvatarForm.querySelector('.popup__input');

profileAvatar.addEventListener('click', () => {
  openPopup(updateAvatarPopup);
});

const handleUpdateAvatarSubmit = (event) => {
  event.preventDefault();

  const avatarUrl = avatarUrlInput.value;
  const submitButton = updateAvatarForm.querySelector('.popup__button');

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  checkImageUrl(avatarUrl)
    .then(() => {
      return updateAvatar(avatarUrl);
    })
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      updateAvatarForm.reset();
      clearValidation(updateAvatarForm, validationConfig);
      closePopup(updateAvatarPopup);
    })
    .catch((err) => {
      console.log(err);
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
};

updateAvatarForm.addEventListener('submit', handleUpdateAvatarSubmit);

