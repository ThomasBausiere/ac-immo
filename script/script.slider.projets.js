"use strict";

// Déclarations de fonctions communes
function updateCarouselPosition(translateValue) {
  const carousel = document.querySelector(".slidsp");
  carousel.style.transform = `translateX(${translateValue}%)`;
}

function handleLeftClick(currentIndex, step) {
  return Math.max(currentIndex - step, 0);
}

function handleRightClick(currentIndex, step, maxIndex) {
  return Math.min(currentIndex + step, maxIndex);
}

// Variables pour gérer l'état
let currentIndex = 0;
const stepMobile = 1; // Définir le pas de déplacement pour mobile
const stepTablet = 2; // Définir le pas de déplacement pour tablette
const stepDesktop = 3; // Définir le pas de déplacement pour desktop

// Gestion des événements de clic
const btnLeft = document.querySelector(".arrowlp");
const btnRight = document.querySelector(".arrowrp");

btnLeft.addEventListener("click", () => {
  currentIndex = handleLeftClick(currentIndex, getStep());
  updateCarouselPosition(-currentIndex * 100); // Ajuster le facteur en fonction de la mise en page
});

btnRight.addEventListener("click", () => {
  currentIndex = handleRightClick(currentIndex, getStep(), 5); // Remplacer 5 par le nombre total d'images
  updateCarouselPosition(-currentIndex * 100);
});

// Fonction pour déterminer le pas en fonction de la taille de l'écran
function getStep() {
  switch (true) {
    case window.matchMedia("(max-width: 768px)").matches:
      return stepMobile;
    case window.matchMedia("(min-width: 769px) and (max-width: 1200px)")
      .matches:
      return stepTablet;
    case window.matchMedia("(min-width: 1201px)").matches:
      return stepDesktop;
    default:
      return 1; // Valeur par défaut
  }
}

// Ajoute ici la gestion du balayage pour les versions mobiles si nécessaire

export default Sliderp;
