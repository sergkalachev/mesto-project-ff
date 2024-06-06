(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-14",headers:{authorization:"0ecf087f-b21a-4f46-a88e-b66c0994f7fb","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function n(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__like-counter"),u=c.querySelector(".card__delete-button");return a.src=e.link,a.alt=e.name,c.id=e._id,i.textContent=e.likes.length?e.likes.length:0,e.owner._id!==o.userInfoData._id&&u.classList.add("card__delete-button_hidden"),e.likes.some((function(e){return e._id===o.userInfoData._id}))&&c.querySelector(".card__like-button").classList.add("card__like-button_is-active"),c.querySelector(".card__title").textContent=e.name,c.querySelector(".card__delete-button").addEventListener("click",t),c.querySelector(".card__like-button").addEventListener("click",r),a.addEventListener("click",n),c}var r=function(n){var r=n.currentTarget.closest(".card").id,o=n.currentTarget.closest(".card");(function(n){return fetch("".concat(e.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:e.headers}).then(t)})(r).then((function(){o.remove()})).catch((function(e){console.log(e)}))},o=function(n){var r,o=n.target.classList.contains("card__like-button_is-active"),c=n.target.closest(".card").querySelector(".card__like-counter");o?function(n){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(n),{method:"DELETE",headers:e.headers}).then(t)}(n.target.closest(".card").id).then((function(e){c.textContent=e.likes.length||0,n.target.classList.toggle("card__like-button_is-active")})).catch((function(e){console.log(e)})):(r=n.target.closest(".card").id,fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:e.headers}).then(t)).then((function(e){return c.textContent=e.likes.length||0,n.target.classList.toggle("card__like-button_is-active"),e})).catch((function(e){console.log(e)}))},c=27;function a(e){e.classList.toggle("popup_is-opened"),document.addEventListener("keydown",u)}function i(e){e.classList.toggle("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){if(e.keyCode===c){var t=document.querySelector(".popup_is-opened");t&&i(t)}}var s=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},l=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},d=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),l(n,r,t.inactiveButtonClass)};function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var m=document.querySelector(".profile__edit-button"),p=document.querySelector(".popup_type_edit"),_=document.querySelector(".profile__title"),y=document.querySelector(".profile__description"),h=document.querySelector(".profile__image"),v=document.forms["update-avatar"],b=document.querySelector(".popup_type_update_avatar"),g=document.querySelector(".logo-edit__button"),S=document.forms["edit-profile"],C=S.elements.name,k=S.elements.description,q=document.querySelector(".popup_type_new-card"),L=document.querySelector(".profile__add-button"),E=document.querySelector(".places__list"),x=document.forms["new-place"],A=x.elements["place-name"],D=x.elements.link,w=document.querySelector(".popup_type_image"),U=w.querySelector(".popup__image"),T=w.querySelector(".popup__caption"),j=[w,p,q,b],I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"form__submit_inactive",inputErrorClass:"form__input_type_error",errorClass:"form__input-error_active"},O={userInfoData:{},cardsData:[]},B=function(e){a(w),U.src=e.target.src,U.alt=e.target.alt,T.textContent=e.target.alt};m.addEventListener("click",(function(){C.value=_.textContent,k.value=y.textContent,d(S,I),a(p)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),l(n,r,t)}))}))}(t,e)}))}(I),L.addEventListener("click",(function(){d(x,I),a(q),x.reset()})),j.forEach((function(e){e.querySelector(".popup__close").addEventListener("click",(function(){return i(e)}))})),document.addEventListener("click",(function(e){e.target.classList.contains("popup_is-opened")&&i(e.target)}));S.addEventListener("submit",(function(n){n.preventDefault(),function(n,r,o){n.submitter.textContent="Сохранение...",function(n,r,o){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r.value,about:o.value})}).then(t)}(0,r,o).then((function(e){_.textContent=e.name,y.textContent=e.about,i(p)})).catch((function(e){console.log(e)})).finally((function(){n.submitter.textContent="Сохранить"}))}(n,C,k)})),x.addEventListener("submit",(function(c){var a;c.submitter.textContent="Сохранение...",c.preventDefault(),(a={name:A.value,link:D.value,likes:[],owner:{_id:O.userInfoData._id}},fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify(a)}).then(t)).then((function(e){var t=n(e,r,B,o,O);E.prepend(t),x.reset(),i(q)})).catch((function(e){console.log(e)})).finally((function(){c.submitter.textContent="Cохранить"}))})),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then(t),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then(t)]).then((function(e){var t,c,a=(c=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){s=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return i}}(t,c)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,c)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],u=a[1];O.userInfoData=i,O.cardsData=u,function(e){e.forEach((function(e){var t=n(e,r,B,o,O);E.append(t)}))}(u),function(e){_.textContent=e.name,y.textContent=e.about,h.setAttribute("style","background-image: url(".concat(e.avatar)),h.alt=e.name}(i)})).catch((function(e){console.log(e)}));g.addEventListener("click",(function(){d(v,I),a(b)})),v.addEventListener("submit",(function(n){n.preventDefault(),function(n,r){n.submitter.textContent="Сохранение...",function(n){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:n})}).then(t)}(r).then((function(e){h.setAttribute("style","background-image: url(".concat(e.avatar)),i(b),v.reset()})).catch((function(e){console.log(e)})).finally((function(){n.submitter.textContent="Сохранить"}))}(n,v.elements.link.value)}))})();