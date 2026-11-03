const TRANSITION_TIME = 180;
let estEntrainDeRec = false;

let sonsEnregistres = [];
let debutEnregistrement = 0;

document.addEventListener("keydown", handleKeydown);
document.addEventListener("keyup", handleKeyup);

let touches = document.querySelectorAll(".key");
touches.forEach((touche) => {
  touche.addEventListener("click", handleClick);
});

// let pads = document.querySelectorAll(".key");

// pads.forEach((pad) => {
//   pad.addEventListener("transitionend", removeTransition);
// });

function handleKeydown(event) {
  if (event.repeat) {
    return;
  }

  let key = event.key.toUpperCase();

  playSound(key);
}

function handleKeyup(event) {
  let key = event.key.toUpperCase();

  if (key === "R") {
    return;
  }

  removeTransition(key);
}

function handleClick(event) {
  // Trouver un moyen de récuperer la div concerné par l'évènement et non pas les enfant kbd et p
  let key = event.target.dataset.key;

  playSound(key);

  setTimeout(() => {
    removeTransition(key);
  }, TRANSITION_TIME);
}

function playSound(key) {
  if (key === "P") {
    lireEnregistrement();
    return;
  }

  if (key === "R") {
    demarrerEnregistrement();
    return;
  }

  let audio = document.querySelector(`audio[data-key="${key}"]`);
  let pad = document.querySelector(`.key[data-key="${key}"]`);

  // console.log("Audio trouvé", audio);
  // console.log("Pad trouvé", pad);

  if (!audio || !pad) {
    return;
  }

  if (estEntrainDeRec) {
    sonsEnregistres.push([key, Date.now() - debutEnregistrement]);
  }

  audio.currentTime = 0;
  audio.play();
  pad.classList.add("playing");
}

function removeTransition(key) {
  let pad = document.querySelector(`.key[data-key="${key}"]`);

  // console.log("Audio trouvé", audio);
  // console.log("Pad trouvé", pad);

  if (!pad) {
    // console.log("Aucun son ne correspond à cette touche");
    return;
  }

  //   if (event.propertyName !== "transform") return;

  pad.classList.remove("playing");
}

function play(key) {
  let eventKeydown = new KeyboardEvent("keydown", {
    key: key,
  });
  document.dispatchEvent(eventKeydown);

  setTimeout(() => {
    let eventKeyup = new KeyboardEvent("keyup", {
      key: key,
    });
    document.dispatchEvent(eventKeyup);
  }, TRANSITION_TIME);
}

function lireEnregistrement() {
  if (sonsEnregistres.length === 0) return;

  let boutonPlay = document.querySelector(".play-button");
  boutonPlay.classList.add("is-playing");

  sonsEnregistres.forEach((son) => {
    setTimeout(() => {
      play(son[0]);
    }, son[1]);
  });

  let dernierSon = sonsEnregistres[sonsEnregistres.length - 1];

  setTimeout(() => {
    boutonPlay.classList.remove("is-playing");
  }, dernierSon[1] + TRANSITION_TIME);
}

/**
 * Fonction qui gère le début de l'enregistrement (reinitialiser le tableau des touches enregistrées, mettre l'animation sur la touche d'enregistrement, gérer le boolean qui indique si on enregistre ou pas ...)
 */
function demarrerEnregistrement() {
  let pad = document.querySelector(`.rec-button`);

  pad.classList.toggle("is-recording");
  estEntrainDeRec = !estEntrainDeRec;

  // console.log(estEntrainDeRec);

  if (estEntrainDeRec) {
    sonsEnregistres = [];
    debutEnregistrement = Date.now();
  }
}
