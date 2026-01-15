"use strict";
import Slider from "./slider.js";

const images = [
  `./Image/photos/slide_01.jpg`,
  `./Image/photos/slide_02.jpg`,
  `./Image/photos/slide_03.jpg`,
];
const appli = document.querySelector(".appli");
const slide = Slider.create(images);

appli.append(slide);
Slider.init();

const right = document.querySelector(".arrowright");
const left = document.querySelector(".arrowleft");
const proj = document.querySelector(".slider-projects");
let move = false;
let statmove = 0;

right.addEventListener("click", moveRight);
left.addEventListener("click", moveLeft);

function moveRight() {
  if (!move && statmove === 0) {
    if (window.matchMedia("(max-width: 768px)").matches) {
      proj.style.transform = "translateX(-35%)";
      statmove = 1;
      move = true;
      console.log("first if moveright", move, statmove);
    } else {
      proj.style.transform = "translateX(-20%)";
      move = true;
      statmove = 1;
    }
  } else if (move == true && statmove === 1) {
    if (window.matchMedia("(max-width: 768px)").matches) {
      proj.style.transform = "translateX(-58%)";
      statmove = 2;
      move = true;
      console.log("2nd if moveright", move, statmove);
    } else {
      console.log("secondmove");
    }
  }
}

function moveLeft() {
  if (move == true && statmove === 2) {
    if (window.matchMedia("(max-width: 768px)").matches) {
      proj.style.transform = "translateX(-35%)";
      statmove = 1;
      console.log("first if moveleft", move, statmove);
    } else {
      proj.style.transform = "translateX(0)";
      move = false;
      console.log("desktop if moveright", move, statmove);
    }
  } else if (move == true && statmove === 1) {
    proj.style.transform = "translateX(0)";
    statmove = 0;
    move = false;
    console.log("elseif moveleft", move, statmove);
  }
}

var startX, endX;

proj.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
});
proj.addEventListener("touchend", function (e) {
  endX = e.changedTouches[0].clientX;
  // Si endX > startX, c'est un swipe à droite
  if (endX > startX) {
    moveLeft();
  }
});
proj.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
});
proj.addEventListener("touchend", function (e) {
  endX = e.changedTouches[0].clientX;
  // Si endX > startX, c'est un swipe à droite
  if (endX < startX) {
    moveRight();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner tous les éléments avec la classe 'nav-item'
  var navItems = document.querySelectorAll(".nav-item");

  // Sélectionner l'input avec l'id 'navbar'
  var navbarCheckbox = document.querySelector("#navbar");

  // Vérifier si le checkbox 'navbar' existe
  if (navbarCheckbox) {
    // Ajouter un écouteur d'événement de clic à chaque 'nav-item'
    navItems.forEach(function (navItem) {
      navItem.addEventListener("click", function () {
        // Décocher l'input 'navbar'
        navbarCheckbox.checked = false;
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner le bouton avec la classe 'btndesc'
  var btnDesc = document.querySelector(".btndesc");

  // Ajouter un écouteur d'événement de clic au bouton
  btnDesc.addEventListener("click", function () {
    // Sélectionner les éléments à modifier
    var about2 = document.querySelector(".about2");
    var body = document.querySelector("body");
    var btn2Desc = document.querySelector(".btn2desc");

    // Modifier les classes pour appliquer les nouveaux styles
    if (about2) {
      about2.classList.add("new-about2-style");
    }

    if (body) {
      body.classList.add("new-body-style");
    }

    // Modifier l'affichage des boutons
    btnDesc.style.display = "none";
    if (btn2Desc) {
      btn2Desc.style.display = "block";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner le bouton avec la classe 'btn2desc'
  var btn2Desc = document.querySelector(".btn2desc");

  // Ajouter un écouteur d'événement de clic au bouton
  btn2Desc.addEventListener("click", function () {
    // Sélectionner les éléments à modifier
    var about2 = document.querySelector(".about2");
    var body = document.querySelector("body");
    var btnDesc = document.querySelector(".btndesc");

    // Retirer les classes pour revenir aux styles originaux
    if (about2) {
      about2.classList.remove("new-about2-style");
    }

    if (body) {
      body.classList.remove("new-body-style");
    }

    // Modifier l'affichage des boutons
    btn2Desc.style.display = "none";
    if (btnDesc) {
      btnDesc.style.display = "block";
    }
  });
});

document
  .querySelectorAll(".slidprojet1, .slidprojet2, .slidprojet3")
  .forEach((element) => {
    element.addEventListener("click", function () {
      let projet = this.className.replace("slidprojet", "Projet");
      sessionStorage.setItem("currentProjet", projet);
    });
  });
