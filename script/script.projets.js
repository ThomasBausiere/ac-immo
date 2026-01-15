// import Sliderp from "./script.slider.projets.js";

const url = "./projets.json";

var currentProjet = sessionStorage.getItem("currentProjet");

let maxImages = 0;
const tp = document.querySelector(".titreprojet");
const txtareap = document.querySelector(".txtareap");
const titrep = document.querySelector(".titrep");
const p = document.querySelector(".p");
const slidsp = document.querySelector(".slidsp"); // Sélectionne la div pour les images

fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Réseau réponse non OK");
    }
    return response.json();
  })
  .then((data) => {
    const projet = data[currentProjet];
    tp.innerHTML = `<h2>${projet.Titre}</h2>`;
    titrep.innerHTML = `<h3>${projet["Sous-titre"]}</h3>`;

    // Reset le contenu de p pour éviter l'accumulation de paragraphes
    p.innerHTML = "";
    for (const key in projet.Texte) {
      if (projet.Texte.hasOwnProperty(key)) {
        p.innerHTML += `<p>${projet.Texte[key]}</p>`;
      }
    }

    // Ajoute les images à slidsp
    slidsp.innerHTML = ""; // Efface les anciennes images
    projet.image.forEach((image) => {
      slidsp.innerHTML += `<img src="${image}" alt="Image du ${projet.Titre}">`;
    });
    maxImages = projet.image.length;
  })
  .catch((error) => console.error("Erreur lors du fetch:", error));

document.addEventListener("DOMContentLoaded", function () {
  const btnVoirPlus = document.querySelector(".btnvoirplusp");
  const btnVoirMoins = document.querySelector(".btnvoirmoinsp");
  const mainDiv = document.querySelector(".mainp"); // Div principale
  const textArea = document.querySelector(".txtareap"); // Zone de texte
  const textContainer = textArea.querySelector(".p"); // Conteneur de texte
  const backgroundDiv = document.querySelector(".noir"); // Div de fond
  const bodyy = document.querySelector("body");

  function adjustHeight() {
    const paragraphs = textContainer.querySelectorAll("p");
    const heightToAdd = paragraphs.length > 1 ? 5 * paragraphs.length : 0;

    // Ajuster la hauteur de la div principale
    mainDiv.style.gridTemplateRows = `10vh 2vh 10vh 2vh 34vh 11vh ${
      25 + heightToAdd
    }vh 11vh`;
    bodyy.style.gridTemplateRows = ` 10vh 32vh calc(62vh + ${heightToAdd}vh) 80vh`;

    // Ajuster la hauteur du fond
    backgroundDiv.style.height = `calc(62vh +${heightToAdd}vh)`;

    // Autres ajustements si nécessaire...
  }

  btnVoirPlus.addEventListener("click", function () {
    adjustHeight();
    btnVoirPlus.style.display = "none";
    btnVoirMoins.style.display = "flex";
  });

  btnVoirMoins.addEventListener("click", function () {
    mainDiv.style.gridTemplateRows = "10vh 2vh 10vh 2vh 34vh 11vh 20vh 11vh"; // Valeurs initiales
    backgroundDiv.style.height = "100%"; // Hauteur initiale
    btnVoirMoins.style.display = "none";
    btnVoirPlus.style.display = "flex";
    bodyy.style.gridTemplateRows = ` 10vh 32vh 58vh 80vh`;
  });
});

// ------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

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
let padding = "";
const stepMobile = 1; // Définir le pas de déplacement pour mobile
const stepTablet = 2; // Définir le pas de déplacement pour tablette
const stepDesktop = 6; // Définir le pas de déplacement pour desktop

// Gestion des événements de clic
const btnLeft = document.querySelector(".arrowlp");
const btnRight = document.querySelector(".arrowrp");

btnLeft.addEventListener("click", () => {
  currentIndex = handleLeftClick(currentIndex, getStep());
  updateCarouselPosition(-currentIndex * padding); // Ajuster le facteur en fonction de la mise en page
});

btnRight.addEventListener("click", () => {
  currentIndex = handleRightClick(currentIndex, getStep(), maxImages); // Remplacer 5 par le nombre total d'images
  updateCarouselPosition(-currentIndex * padding);
});

// Fonction pour déterminer le pas en fonction de la taille de l'écran
function getStep() {
  switch (true) {
    case window.matchMedia("(max-width: 768px)").matches:
      padding = 72;
      console.log("(max-width: 768px)");

      return stepMobile;
    case window.matchMedia("(min-width: 769px) and (max-width: 1200px)")
      .matches:
      padding = 66;
      console.log("(min-width: 679px)");

      return stepTablet;
    case window.matchMedia("(min-width: 1201px)").matches:
      padding = maxImages * 1.8;
      console.log(maxImages);
      return stepDesktop;

    default:
      return 1; // Valeur par défaut
  }
}


// Ajout de la gestion de swipe pour mobiles et tablettes
let startX, startY, moveX, moveY;

slidsp.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX;
  startY = e.touches[0].pageY;
}, false);

slidsp.addEventListener('touchmove', (e) => {
  moveX = e.touches[0].pageX;
  moveY = e.touches[0].pageY;
}, false);

slidsp.addEventListener('touchend', (e) => {
  const diffX = startX - moveX;
  const diffY = startY - moveY;

  // Vérifie si le swipe est principalement horizontal et dépasse un seuil de 30px
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 30) {
    if (diffX > 0) {
      // Swipe vers la gauche
      currentIndex = handleRightClick(currentIndex, getStep(), maxImages - 1);
    } else {
      // Swipe vers la droite
      currentIndex = handleLeftClick(currentIndex, getStep());
    }
    updateCarouselPosition(-currentIndex * padding); // Utilise 'padding' pour calculer la translation
  }
}, false);
