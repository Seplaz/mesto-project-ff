const handleEscKeyUp = (e) => {
  if (e.key ===  'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    closePopup(popup);
  };
};

export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
  document.addEventListener('keydown', handleEscKeyUp);
};

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscKeyUp);
};

export const addListener = (popup) => {
  const closeButton = popup.querySelector('.popup__close');
  closeButton.addEventListener('click', () => {
    closePopup(popup);
  });

  popup.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('popup')) {
      closePopup(popup);
    };
  });
};