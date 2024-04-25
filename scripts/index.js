

// @todo: Темплейт карточки
function getTmplt(){
    return document.querySelector('#card-template').content
}
// @todo: DOM узлы

// @todo: Функция создания карточки
function newCard(elem, callback){
    const cardTemplate = getTmplt()
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    // наполняем содержимым
    cardElement.querySelector('.card__image').src = elem.link;
    cardElement.querySelector('.card__image').alt = elem.name
    cardElement.querySelector('.card__title').textContent = elem.name;
    cardElement.querySelector('.card__delete-button').addEventListener('click', callback)
    
    return cardElement
}
// @todo: Функция удаления карточки
function delCallback(){
    return (ev)=>{
        const cardItem = ev.currentTarget.closest('.card');
        cardItem.remove();
    }
}

// @todo: Вывести карточки на страницу
function showCards(){
    const cards = document.querySelector('.places__list');


    const cardArray = []

    initialCards.forEach(e=>{
        const nc = newCard(e, delCallback())
        cardArray.push(nc)
    })

    cardArray.forEach(card => {cards.append(card) })
}

showCards()