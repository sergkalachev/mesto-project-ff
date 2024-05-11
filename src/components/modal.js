export function openPopup(e) {
    e.classList.toggle("popup_is-opened");
    document.addEventListener('keydown', handleEsc);
}

export function closePopup (e) {
    e.classList.toggle("popup_is-opened");
    document.removeEventListener('keydown', handleEsc);
}
//Функция закрытия попапов по кнопке Esc
export function handleEsc (e) {
if (e.keyCode === 27) {
    const activePopup = document.querySelector(".popup_is-opened");
    if(activePopup){
        closePopup(activePopup);
    }
}
}

//Функция закрытия попапов по клику на оверлей
export function handleOverlayClick (e) {
    {if (e.target.classList.value.includes('popup_is-opened')) {
        closePopup(e.target);
    }} 
}