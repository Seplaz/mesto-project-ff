const handleEscKeyUp = (e) => {
  if (e.key ===  'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  };
};

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscKeyUp);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

export const setupPopupListeners = (popup) => {
  const closeButton = popup.querySelector('.popup__close');

  const closePopupHandler = () => closePopup(popup);
  closeButton.addEventListener('click', closePopupHandler);

  const overlayClickHandler = (event) => {
    if (event.target.classList.contains('popup')) {
      closePopup(popup);
    };
  };

  popup.addEventListener('mousedown', overlayClickHandler);
};