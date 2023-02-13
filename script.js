let content = document.querySelector('.page')
const editButton = content.querySelector('.profile__edit-button')
let editPopup = content.querySelector('#edit')
const closeEditButton = editPopup.querySelector('.popup__close-button')
let popupName = content.querySelector('#popupName');
let popupDescription = content.querySelector('#popupDescription');
let submitEditButton = editPopup.querySelector('.popup__submit');
let popupEditForm = editPopup.querySelector('.popup__form');
const addButton = content.querySelector('.profile__add-button');
let addPopup = content.querySelector('#add');
const closeButtonAdd = addPopup.querySelector('.popup__close-button');
let popupAddForm = addPopup.querySelector('.popup__form');

function popupOpen() {
  if (this === editButton) {
    let profileName = content.querySelector('.profile__name').textContent;
    let profileDescription = content.querySelector('.profile__description').textContent;
    editPopup.classList.remove('popup_closed');
    editPopup.classList.add('popup_opened');
    popupName.value = profileName;
    popupDescription.value = profileDescription;
  } else if (this === addButton) {
    addPopup.classList.remove('popup_closed');
    addPopup.classList.add('popup_opened');
  }
}

function popupClose() {
  if (editPopup.classList.contains('popup_opened')) {
    editPopup.classList.remove('popup_opened');
    editPopup.classList.add('popup_closed');
  } else if (addPopup.classList.contains('popup_opened')) {
    addPopup.classList.remove('popup_opened');
    addPopup.classList.add('popup_closed');
  }
}

function popupSubmit(evt) {
  evt.preventDefault();
  let profileName = content.querySelector('.profile__name')
  let profileDescription = content.querySelector('.profile__description')
  let popupName = editPopup.querySelector('#popupName');
  let popupDescription = editPopup.querySelector('#popupDescription');
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeEditButton.addEventListener('click', popupClose);
closeButtonAdd.addEventListener('click', popupClose);
popupEditForm.addEventListener('submit', popupSubmit);
addButton.addEventListener('click', popupOpen);
