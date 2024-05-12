import {initialCards} from "./components/cards";
import './pages/index.css';

import {createNewCard, delCallback, clickOnLike} from "./components/card";
import {openPopup, closePopup, handleOverlayClick} from "./components/modal";

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector(".popup_type_edit");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const newCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector('.profile__add-button');
const cardArea = document.querySelector('.places__list');
const formAddCard = document.forms['new-place'];
const formImageName = formAddCard.elements['place-name'];
const formImageLink = formAddCard.elements['link'];

const cardImagePopup = document.querySelector(".popup_type_image");
const popupImage = cardImagePopup.querySelector('.popup__image');
const popupCaption = cardImagePopup.querySelector('.popup__caption');

const popupArray = [cardImagePopup, editProfilePopup, newCardPopup];

// Функция открытия картинки
const openImage = (e)=>{
    openPopup(cardImagePopup);
    popupImage.src = e.target.src;
    popupImage.alt = e.target.alt;
    popupCaption.textContent = e.target.alt;
}
 
// Ввести карточки на страницу
function showCards(){
    initialCards.forEach(e=>{
        const newCard = createNewCard(e, delCallback, openImage, clickOnLike)
        cardArea.append(newCard);
    })
}
showCards()

//Открытие формы редактирования профиля
const openProfileEditForm = () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openPopup(editProfilePopup);
}
editProfileButton.addEventListener("click", openProfileEditForm);

//Добавление картинки
addCardButton.addEventListener("click", ()=> {
    openPopup(newCardPopup)
});

//Функция закрытия попапов
popupArray.forEach(arrayPopupElement => {
    const closeButton = arrayPopupElement.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closePopup(arrayPopupElement))
})

document.addEventListener ('click', handleOverlayClick);

//Функция редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(editProfilePopup);
}

formEditProfile.addEventListener('submit', handleFormSubmit);

//функция добавления новой карточки
const addNewCardBySubmit = (e) => {
    e.preventDefault();
    const card = {name: formImageName.value, link: formImageLink.value};
    cardArea.prepend(createNewCard(card, delCallback, openImage, clickOnLike));
    formAddCard.reset();
    closePopup(newCardPopup)
}

formAddCard.addEventListener('submit', addNewCardBySubmit);
