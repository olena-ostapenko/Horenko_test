"use strict";

var menu = document.querySelector(".header-conteiner_menu");
var telephone = document.querySelector(".header-conteiner_info__telephone");
var lang = document.querySelector(".header-conteiner__lang");
var burgerMenuOpen = document.querySelector(".btn-burger");
var btnCall = document.querySelector(".call");
window.addEventListener("resize", function () {
  checkGlobeMenuAdaptive();
});
checkGlobeMenuAdaptive();

function checkGlobeMenuAdaptive() {
  if (window.innerWidth <= 1190) {
    menu.classList.add("hidden");
    telephone.classList.add("hidden");
    lang.classList.add("hidden");
    burgerMenuOpen.classList.remove("hidden");
    btnCall.classList.remove("btn-grey");
    btnCall.classList.add("btn-transparent");
  } else {
    menu.classList.remove("hidden");
    telephone.classList.remove("hidden");
    lang.classList.remove("hidden");
    burgerMenuOpen.classList.add("hidden");
    btnCall.classList.add("btn-grey");
    btnCall.classList.remove("btn-transparent");
  }
}

burgerMenuOpen.addEventListener("click", function (e) {
  e.preventDefault();

  if (menu.classList.contains("hidden")) {
    burgerMenuOpen.classList.remove("btn-burger");
    burgerMenuOpen.classList.add("btn-x");
    menu.classList.remove("hidden");
    menu.classList.add(".burger-adaptive");
    telephone.classList.remove("hidden");
    lang.classList.remove("hidden");
  } else {
    menu.classList.add("hidden");
    burgerMenuOpen.classList.add("btn-burger");
    burgerMenuOpen.classList.remove("btn-x");
    menu.classList.remove(".burger-adaptive");
    telephone.classList.add("hidden");
    lang.classList.remove("hidden");
  }
}); // slider

var sliderThumbs = new Swiper('.swiper-container', {
  direction: 'horizontal',
  slidesPerView: 1,
  spaceBetween: 24,
  pagination: {
    el: '.swiper-pagination'
  },
  loop: true,
  on: {
    init: function init(swiper) {
      // ugly but fast hack ...
      for (var i = 0; i < swiper.pagination.bullets.length; i++) {
        swiper.pagination.bullets[i].style.width = "calc( " + 100 / swiper.pagination.bullets.length + "% - 8px)";
      }
    }
  },
  updateOnWindowResize: true
}); // cookie------------------------------------

var btnCookie = document.querySelector(".btn-cookie");
btnCookie.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".сookies").classList.add("hidden");
}); // call + open popup------------------------------------

var mainPopUp = document.querySelector(".popup");
var inPopUpForm = document.querySelector(".popup-box");
var closePopUpForm = document.querySelector(".popup-box_btn");
var inPopUpSuccess = document.querySelector(".popup-success");
var formValid = document.getElementById("valid");
var inputName = document.querySelector(".name-field");
var inputPhone = document.querySelector(".number-field");
var popUpSuccess = document.querySelector(".popup-success");
btnCall.addEventListener("click", function (e) {
  e.preventDefault();
  mainPopUp.classList.remove("hidden");
  inPopUpForm.classList.remove("hidden");
  inputPhone.value = "";
});
closePopUpForm.addEventListener("click", function (e) {
  mainPopUp.classList.add("hidden");
  inPopUpForm.classList.add("hidden");
});
popUpSuccess.addEventListener("click", function (e) {
  e.preventDefault();
  mainPopUp.classList.add("hidden");
}); // ----------

formValid.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!inputPhone.value) {
    inputPhone.classList.add("input-error");
  } else if (inputPhone.value.match(/^\+380\d{3}\d{2}\d{2}\d{2}$/)) {
    inputPhone.classList.remove("input-error");
    inPopUpForm.classList.add("hidden");
    popUpSuccess.classList.remove("hidden");
    setTimeout(function () {
      popUpSuccess.classList.add("hidden");
      mainPopUp.classList.add("hidden");
    }, 5000);
  } else {
    inputPhone.classList.add("input-error");
  }
}); // ---------lang

function changeLang(langCode) {
  var arrayLang = document.querySelectorAll(".header-conteiner__lang .btn");

  for (var i = 0; i < arrayLang.length; i++) {
    var what = arrayLang[i].dataset.lang;

    if (what == langCode) {
      arrayLang[i].classList.add("btn-active");
    } else {
      arrayLang[i].classList.remove("btn-active");
    }
  }

  setCookie("cooc", langCode);
}

var arrayLang = document.querySelectorAll(".header-conteiner__lang .btn");

var _loop = function _loop(i) {
  arrayLang[i].addEventListener("click", function (e) {
    e.preventDefault();
    changeLang(arrayLang[i].dataset.lang);
  });
};

for (var i = 0; i < arrayLang.length; i++) {
  _loop(i);
}

var voidLang = getCookie("cooc");

if (voidLang != null) {
  changeLang(voidLang);
} // for(let a =0; a<arrayLang.length; a++){
//     let langCode = arrayLang[a].dataset.lang;
//     if(langCode == getCookie("lang"))
//     {
//         arrayLang[a].classList.add("btn-active");
//     }
//     else
//     {
//         arrayLang[a].classList.remove("btn-active");
//     }
// }


function setCookie(name, value, days) {
  var expires = "";

  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');

  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];

    while (c.charAt(0) == ' ') {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}