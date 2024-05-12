export function openPopup(popupElement) {
    popupElement.classList.toggle("popup_is-opened");
    document.addEventListener('keydown', closePopupByEsc);
}

export function closePopup (popupElement) {
    popupElement.classList.toggle("popup_is-opened");
    document.removeEventListener('keydown', closePopupByEsc);
}
//Функция закрытия попапов по кнопке Esc
function closePopupByEsc (e) {
if (e.keyCode === 27) {
    const activePopup = document.querySelector(".popup_is-opened");
    if(activePopup){
        closePopup(activePopup);
    }
}
}

//Функция закрытия попапов по клику на оверлей
export function handleOverlayClick (e) {
    {if (e.target.classList.contains('popup_is-opened')) {
        closePopup(e.target);
    }} 
}