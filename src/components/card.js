// Функция создания карточки
function getTemplate(){
    const cardElement = document.querySelector('#card-template').content.querySelector('.places__item').cloneNode(true);
    return cardElement;
}
export function createNewCard(cardItem, deleteCard, openCardImagePopup, onLike) {
    const cardElement = getTemplate();
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name
    cardElement.querySelector('.card__title').textContent = cardItem.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', onLike);
    cardImage.addEventListener("click", openCardImagePopup);
    
    return cardElement
}

// Функция удаления карточки
export const delCallback =(ev)=>{
    const cardItem = ev.currentTarget.closest('.card');
    cardItem.remove();
}

// Функция добавления лайка
export const clickOnLike = (event) =>{
    event.target.classList.toggle('card__like-button_is-active');
}