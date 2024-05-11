// Функция создания карточки
function getTmplt(){
    return document.querySelector('#card-template').content
}
export function createNewCard(elem, callback, openCardImagePopup, onLike) {
    const cardTemplate = getTmplt()
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // наполняем карточку содержимым
    cardElement.querySelector('.card__image').src = elem.link;
    cardElement.querySelector('.card__image').alt = elem.name
    cardElement.querySelector('.card__title').textContent = elem.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', callback);
    cardElement.querySelector('.card__like-button').addEventListener('click', onLike);
    cardElement.querySelector('.card__image').addEventListener("click", (event) => openCardImagePopup(event));
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