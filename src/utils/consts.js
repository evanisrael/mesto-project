export const content = document.querySelector('.page');
export const editButton = content.querySelector('.profile__edit-button');
export const editPopup = content.querySelector('#edit');
export const popupName = content.querySelector('#popupName');
export const popupDescription = content.querySelector('#popupDescription');
export const popupEditForm = editPopup.querySelector('.popup__form');
export const addButton = content.querySelector('.profile__add-button');
export const addPopup = content.querySelector('#add');
export const popupAddForm = addPopup.querySelector('.popup__form');
export const photoPopup = content.querySelector('#photo');
export const photoPopupImage = document.querySelector('.popup__image');
export const photoPopupText = document.querySelector('.popup__image-text');
export const cardTemplate = document.querySelector('#card-template');
export const elementsList = document.querySelector('.elements__list');
export const popupTitle = document.querySelector('#popupTitle');
export const popupLink = document.querySelector('#popupImageLink');
export const profileName = '.profile__name';
export const profileDescription = '.profile__description';
// export const closeButtonsSelector = '.popup__close-button';
export const profileAvatar = ".profile__avatar";
export const avatarEditButton = document.querySelector('.profile__edit-avatar-button');
export const avatarPopup = document.querySelector('#avatar');
export const popupAvatarForm = avatarPopup.querySelector('.popup__form');
export const popupAvatarInput = popupAvatarForm.querySelector('.popup__input');
export const configObject = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

