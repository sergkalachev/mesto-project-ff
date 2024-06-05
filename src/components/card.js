import { initialData } from "../index.js";   

// Функция создания карточки
function getTemplate(){
    const cardElement = document.querySelector('#card-template').content.querySelector('.places__item').cloneNode(true);
    return cardElement;
}
export function createNewCard(cardItem, deleteCard, openCardImagePopup, onLike) {
    const cardElement = getTemplate();
    const cardImage = cardElement.querySelector('.card__image');
    const likeCounter = cardElement.querySelector('.card__like-counter');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardItem.link;
    cardImage.alt = cardItem.name;
    cardElement.id = cardItem._id;
    likeCounter.textContent = cardItem.likes.length ? cardItem.likes.length : 0;
    //делаем видимость иконки удаления если карточка создана моим пользователем
    if (cardItem.owner._id !== initialData.userInfoData._id) {
        deleteButton.classList.add('card__delete-button_hidden');
    }
    //проверяем наличие собственного лайка в карточке для определения активности иконки
    if (cardItem.likes.some(item => item._id === initialData.userInfoData._id)) {
      cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
    }

    cardElement.querySelector('.card__title').textContent = cardItem.name;

    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardElement.querySelector('.card__like-button').addEventListener('click', onLike);
    cardImage.addEventListener("click", openCardImagePopup);

    return cardElement
}

//Функция удаления карточки
export const delCallback = (ev) => {
    const cardId = ev.currentTarget.closest('.card').id;
    const cardItem = ev.currentTarget.closest('.card');
    cardItem.remove();

    return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '0ecf087f-b21a-4f46-a88e-b66c0994f7fb'
      }
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      })
  }

// Функция добавления лайка и отправки данных на сервер
export const clickOnLike = (event) =>{  

    const likeIsActive = event.target.classList.contains('card__like-button_is-active');
    const likeCounter = event.target.closest('.card').querySelector('.card__like-counter');
    //const likeButton = event.target.closest('.card').querySelector('.card__like-button');

    if (!likeIsActive) {
      return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/likes/${event.target.closest('.card').id}`, {
        method: 'PUT',
        headers: {
          authorization: '0ecf087f-b21a-4f46-a88e-b66c0994f7fb'
        }
      })
        .then((res) => {
          return res.json();
          })
          .then((res) => {
          likeCounter.textContent = res.likes.length || 0;
          event.target.classList.toggle('card__like-button_is-active');

        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        return fetch(`https://nomoreparties.co/v1/wff-cohort-14/cards/likes/${event.target.closest('.card').id}`, {
          method: 'DELETE',
          headers: {
            authorization: '0ecf087f-b21a-4f46-a88e-b66c0994f7fb'
          }
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            likeCounter.textContent = res.likes.length || 0;
            event.target.classList.toggle('card__like-button_is-active');
          })
          .catch((err) => {
            console.log(err);
          })
      }
}