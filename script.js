let content = document.querySelector('.page')
let editButton = content.querySelector('.profile__edit-button')
let editPopup = content.querySelector('.popup')
let closeButton = content.querySelector('.popup__close-button')
let profileName = content.querySelector('.profile__name').textContent;
let profileDescription = content.querySelector('.profile__description').textContent;
let popupName = content.querySelector('#popupName');
let popupDescription = content.querySelector('#popupDescription');
let submitButton = content.querySelector('.popup__submit');
let popupForm = editPopup.querySelector('.popup__form');

function popupOpen() {
  editPopup.classList.add('popup_opened');
  let profileName = content.querySelector('.profile__name').textContent;
  let profileDescription = content.querySelector('.profile__description').textContent;
  popupName.value = profileName;
  popupDescription.value = profileDescription;
}

function popupClose() {
  editPopup.classList.remove('popup_opened');
}

function popupSubmit(evt) {
  evt.preventDefault();
  let profileName = content.querySelector('.profile__name')
  let profileDescription = content.querySelector('.profile__description')
  let popupName = content.querySelector('#popupName');
  let popupDescription = content.querySelector('#popupDescription');
  profileName.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
  popupClose();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);
popupForm.addEventListener('submit', popupSubmit);



