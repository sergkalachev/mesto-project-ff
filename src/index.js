import "./pages/index.css";

import { createNewCard, delCallback, clickOnLike } from "./components/card";
import { openPopup, closePopup, handleOverlayClick } from "./components/modal";
import { clearValidation, enableValidation } from "./components/validation";
import {
  getUserInfo,
  editProfile,
  getCards,
  addNewCard,
  changeLogoOnServer,
} from "./components/api";

const editProfileButton = document.querySelector(".profile__edit-button");
const editProfilePopup = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");
const logoUpdateForm = document.forms["update-avatar"];
const avatarPopup = document.querySelector(".popup_type_update_avatar");
const profileLogoEditButton = document.querySelector(".logo-edit__button");

const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const newCardPopup = document.querySelector(".popup_type_new-card");
const addCardButton = document.querySelector(".profile__add-button");
const cardArea = document.querySelector(".places__list");
const formAddCard = document.forms["new-place"];
const formImageName = formAddCard.elements["place-name"];
const formImageLink = formAddCard.elements["link"];

const cardImagePopup = document.querySelector(".popup_type_image");
const popupImage = cardImagePopup.querySelector(".popup__image");
const popupCaption = cardImagePopup.querySelector(".popup__caption");

const popupArray = [
  cardImagePopup,
  editProfilePopup,
  newCardPopup,
  avatarPopup,
];

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const initialData = {
  userInfoData: {},
  cardsData: [],
};

// Функция открытия картинки
const openImage = (e) => {
  openPopup(cardImagePopup);
  popupImage.src = e.target.src;
  popupImage.alt = e.target.alt;
  popupCaption.textContent = e.target.alt;
};

//Открытие формы редактирования профиля
const openProfileEditForm = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(editProfilePopup);
};
editProfileButton.addEventListener("click", openProfileEditForm);

//Проверка на валидность
enableValidation(validationConfig);

//Добавление картинки
addCardButton.addEventListener("click", () => {
  clearValidation(formAddCard, validationConfig);
  openPopup(newCardPopup);
  formAddCard.reset();
});

//Функция закрытия попапов
popupArray.forEach((arrayPopupElement) => {
  const closeButton = arrayPopupElement.querySelector(".popup__close");
  closeButton.addEventListener("click", () => closePopup(arrayPopupElement));
});

document.addEventListener("click", handleOverlayClick);

//Функция редактирования профиля
const updateProfile = (e, nameInput, jobInput) => {
  e.submitter.textContent = "Сохранение...";
  
  editProfile(e, nameInput, jobInput)
  .then((res) => {
    profileName.textContent = res.name;
    profileDescription.textContent = res.about;
    closePopup(editProfilePopup);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    e.submitter.textContent = "Сохранить";
  })
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  updateProfile(evt, nameInput, jobInput);
}

formEditProfile.addEventListener("submit", handleFormSubmit);

//функция добавления новой карточки
const addNewCardBySubmit = (e) => {
  e.submitter.textContent = "Сохранение...";
  e.preventDefault();
  const card = {
    name: formImageName.value,
    link: formImageLink.value,
    likes: [],
    owner: {
      _id: initialData.userInfoData._id,}
  };

  addNewCard(e, card)
  .then((res) => {
    const newCard = createNewCard(res, delCallback, openImage, clickOnLike, initialData);
    cardArea.prepend(newCard);
    formAddCard.reset();
    closePopup(newCardPopup);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    e.submitter.textContent = "Cохранить";
  })
};

formAddCard.addEventListener("submit", addNewCardBySubmit);

//функции получения и отображения первоначальной информации с сервера
function showCards(cards) {
  cards.forEach((e) => {
    const newCard = createNewCard(e, delCallback, openImage, clickOnLike, initialData);
    cardArea.append(newCard);
  });
}

function showUserInfo(userInfo) {
  profileName.textContent = userInfo.name;
  profileDescription.textContent = userInfo.about;
  profileAvatar.setAttribute(
    "style",
    `background-image: url(${userInfo.avatar}`
  );
  profileAvatar.alt = userInfo.name;
}

function showInitialPage() {
  Promise.all([getUserInfo(), getCards()])
    .then(([userInfo, cards]) => {
      initialData.userInfoData = userInfo;
      initialData.cardsData = cards;
      showCards(cards);
      showUserInfo(userInfo);
    })
    .catch((err) => {
      console.log(err);
    });
}
showInitialPage();

const changeProfileImage = (e, link) => {
  e.submitter.textContent = "Сохранение...";
  changeLogoOnServer(link)
    .then((res) => {
      profileAvatar.setAttribute(
        "style",
        `background-image: url(${res.avatar}`
      );
      closePopup(avatarPopup);
      logoUpdateForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      e.submitter.textContent = "Сохранить";
    });
  }

//Обработка клика на кнопку редактирования аватара
const handleEditLogoFormSubmit = (e) => {
  e.preventDefault();
  changeProfileImage(e, logoUpdateForm.elements.link.value);
};

profileLogoEditButton.addEventListener("click", () => {
  clearValidation(logoUpdateForm, validationConfig);
  openPopup(avatarPopup);
});

logoUpdateForm.addEventListener("submit", handleEditLogoFormSubmit);