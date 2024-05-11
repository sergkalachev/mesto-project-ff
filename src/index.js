import {initialCards} from "./components/cards";
import './pages/index.css';

import {createNewCard, delCallback, clickOnLike} from "./components/card";
import {openPopup, closePopup, handleEsc, handleOverlayClick} from "./components/modal";

const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector(".popup_type_edit");
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const newCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector('.profile__add-button');

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
    const cards = document.querySelector('.places__list');
    const cardArray = []
    initialCards.forEach(e=>{
        const newCard = createNewCard(e, delCallback, openImage, clickOnLike)
        cardArray.push(newCard)
    })
    cardArray.forEach(card => {cards.append(card) })
}

showCards()

//Открытие формы редактирования профиля
const openProfileEditForm = () => {
    document.forms['edit-profile'].name.value = profileName.textContent;
    document.forms['edit-profile'].description.value = profileDescription.textContent;
    openPopup(editProfilePopup);
}
editProfileButton.addEventListener("click", openProfileEditForm);

//Добавление картинки
addCardButton.addEventListener("click", ()=> {
    openPopup(newCardPopup)
});

//Функция закрытия попапов
popupArray.forEach(arrayElement => {
    const closeButton = arrayElement.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closePopup(arrayElement))
})

document.addEventListener ('click', handleOverlayClick);

//Функция редактирования профиля
const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(editProfilePopup);
}

formElement.addEventListener('submit', handleFormSubmit);

//функция добавления новой карточки
const addNewCardBySubmit = (e) => {
    e.preventDefault();

    const formAddCard = document.forms['new-place'];
    const card = {name: formAddCard.elements['place-name'].value, link: formAddCard.elements['link'].value};
    const cards = document.querySelector('.places__list');

    cards.prepend(createNewCard(card, delCallback, openImage, clickOnLike));
    formAddCard.reset();
    closePopup(newCardPopup)
}

newCardPopup.addEventListener('submit', addNewCardBySubmit);
