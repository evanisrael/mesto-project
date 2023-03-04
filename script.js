const content = document.querySelector('.page')
const editButton = content.querySelector('.profile__edit-button')
const editPopup = content.querySelector('#edit')
const closeEditButton = editPopup.querySelector('.popup__close-button')
const popupName = content.querySelector('#popupName');
const popupDescription = content.querySelector('#popupDescription');
const submitEditButton = editPopup.querySelector('.popup__submit');
const popupEditForm = editPopup.querySelector('.popup__form');
const addButton = content.querySelector('.profile__add-button');
const addPopup = content.querySelector('#add');
const closeButtonAdd = addPopup.querySelector('.popup__close-button');
const popupAddForm = addPopup.querySelector('.popup__form');
const deleteButtons = document.querySelectorAll('.element__trash-button');
const photoPopup = content.querySelector('#photo');
const closeButtonPhoto = photoPopup.querySelector('.popup__close-button');
const cardImages = document.querySelectorAll('.element__image');
const photoPopupImage = photoPopup.querySelector('.popup__image');
const photoPopupText = photoPopup.querySelector('.popup__image-text');
const cardTemplate = document.querySelector('#card-template');
const elementsList = document.querySelector('.elements__list');


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



function createCardElement({ name, link }) {
  
  const cardElement = document.createElement('li');
  cardElement.classList.add('element');
  cardElement.innerHTML = cardTemplate.innerHTML;
  const cardTitle = cardElement.querySelector('.element__title');
  const cardImage = cardElement.querySelector('.element__image');
  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  return cardElement;
}

const cardElements = initialCards.map(createCardElement);
cardElements.forEach(cardElement => elementsList.appendChild(cardElement));


function addPopupSubmit(evt) {
  evt.preventDefault();
  const title = document.querySelector('#popupTitle').value;
  const link = document.querySelector('#popupImageLink').value;
  const addedCard = createCardElement({ name: title, link: link });
  elementsList.insertBefore(addedCard, elementsList.firstChild);
  popupClose();
}

function popupOpen(event) {
  if (event.target === editButton) {
    let profileName = content.querySelector('.profile__name').textContent;
    let profileDescription = content.querySelector('.profile__description').textContent;
    editPopup.classList.remove('popup_closed');
    editPopup.classList.add('popup_opened');
    popupName.value = profileName;
    popupDescription.value = profileDescription;
  } else if (event.target === addButton) {
    addPopup.classList.remove('popup_closed');
    addPopup.classList.add('popup_opened');
    popupAddForm.reset();
  } else if (event.target.classList.contains('element__image')) {
    const cardElement = event.target.closest('.element');
    const cardTitle = cardElement.querySelector('.element__title').textContent;
    const cardImage = event.target.src;
    photoPopupImage.src = cardImage;
    photoPopupImage.alt = cardTitle;
    photoPopupText.textContent = cardTitle;
    photoPopup.classList.remove('popup_closed');
    photoPopup.classList.add('popup_opened');
  }
}

function popupClose() {
  if (editPopup.classList.contains('popup_opened')) {
    editPopup.classList.remove('popup_opened');
    editPopup.classList.add('popup_closed');
  } else if (addPopup.classList.contains('popup_opened')) {
    addPopup.classList.remove('popup_opened');
    addPopup.classList.add('popup_closed');
  } else if (photoPopup.classList.contains('popup_opened')) {
    photoPopup.classList.remove('popup_opened');
    photoPopup.classList.add('popup_closed');
  }
}

function EditpopupSubmit(evt) {
  evt.preventDefault();
  let profileName = content.querySelector('.profile__name')
  let profileDescription = content.querySelector('.profile__description')
  let popupName = editPopup.querySelector('#popupName');
  let popupDescription = editPopup.querySelector('#popupDescription');
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClose();
}

function likeToggle(evt) {
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

editButton.addEventListener('click', popupOpen);
closeEditButton.addEventListener('click', popupClose);
closeButtonAdd.addEventListener('click', popupClose);
closeButtonPhoto.addEventListener('click', popupClose);
popupEditForm.addEventListener('submit', EditpopupSubmit);
addButton.addEventListener('click', popupOpen);
popupAddForm.addEventListener('submit', addPopupSubmit);
elementsList.addEventListener('click', likeToggle);
elementsList.addEventListener('click', deleteCard);
elementsList.addEventListener('click', popupOpen);

