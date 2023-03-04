const content = document.querySelector('.page');
const editButton = content.querySelector('.profile__edit-button');
const editPopup = content.querySelector('#edit');
const closeEditButton = editPopup.querySelector('.popup__close-button');
const popupName = content.querySelector('#popupName');
const popupDescription = content.querySelector('#popupDescription');
const popupEditForm = editPopup.querySelector('.popup__form');
const addButton = content.querySelector('.profile__add-button');
const addPopup = content.querySelector('#add');
const closeButtonAdd = addPopup.querySelector('.popup__close-button');
const popupAddForm = addPopup.querySelector('.popup__form');
const photoPopup = content.querySelector('#photo');
const closeButtonPhoto = photoPopup.querySelector('.popup__close-button');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupText = photoPopup.querySelector('.popup__image-text');
const cardTemplate = document.querySelector('#card-template');
const elementsList = document.querySelector('.elements__list');
const popupTitle = document.querySelector('#popupTitle');
const popupLink = document.querySelector('#popupImageLink');
const profileName = content.querySelector('.profile__name');
const profileDescription = content.querySelector('.profile__description');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function toggleLike(evt) {
  const likeButton = evt.target;
  if (likeButton.classList.contains('element__button')) {
    likeButton.classList.toggle('element__button_active');
  }
}

function deleteCard(evt) {
  if (evt.target.classList.contains('element__trash-button')) {
    const card = evt.target.closest('.element');
    card.remove();
  }
}

function createCardElement({ name, link }) {
  const cardElement = cardTemplate.content.cloneNode(true).querySelector('.element');
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  const cardLikeButton = cardElement.querySelector('.element__button');
  const cardTrashButton = cardElement.querySelector('.element__trash-button');
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardLikeButton.addEventListener('click', toggleLike);
  cardTrashButton.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', () => handleCardClick(cardElement));
  return cardElement;
}

const cardElements = initialCards.map(createCardElement);
cardElements.forEach(cardElement => elementsList.appendChild(cardElement));

function fillEditPopup () {
  popupName.value = profileName.textContent;
  popupDescription.value = profileDescription.textContent;
  openPopup(editPopup);
}

function handleCardClick(card) {
  const cardTitle = card.querySelector('.element__title').textContent;
  const cardImage = card.querySelector('.element__image').src;
  photoPopupImage.src = cardImage;
  photoPopupImage.alt = cardTitle;
  photoPopupText.textContent = cardTitle;
  openPopup(photoPopup);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const addedCard = createCardElement({ name: popupTitle.value, link: popupLink.value });
  elementsList.insertBefore(addedCard, elementsList.firstChild);
  closePopup(addPopup);
  popupAddForm.reset();
}

function updateProfile(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  closePopup(editPopup);
}

editButton.addEventListener('click', fillEditPopup);
addButton.addEventListener('click', () => openPopup(addPopup));
closeEditButton.addEventListener('click', () => closePopup(editPopup));
closeButtonAdd.addEventListener('click', () => closePopup(addPopup));
closeButtonPhoto.addEventListener('click', () => closePopup(photoPopup));
popupEditForm.addEventListener('submit', updateProfile);
popupAddForm.addEventListener('submit', handleAddCardSubmit);
