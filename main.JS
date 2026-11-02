const TRANSITION_TIME = 180;
let estEntrainDeRec = false;

let sonsEnregistres = [["A", 10], ["E", 200], ["W", 380], ["E", 600]];
let debutEnregistrement = 0;

document.addEventListener("keydown", playSound);
document.addEventListener("keyup", removeTransition);

// let pads = document.querySelectorAll(".key");

// pads.forEach((pad) => {
//   pad.addEventListener("transitionend", removeTransition);
// });

function playSound(event) {
  if (event.repeat) {
    return;
  }

  let key = event.key.toUpperCase();

  if (key === "P") {
    lireEnregistrement();
    return;
  }

  if (key === "R") {
    let pad = document.querySelector(`.rec-button`);
   
    pad.classList.toggle("playing");
    estEntrainDeRec = !estEntrainDeRec;

    // console.log(estEntrainDeRec);
    

    if (estEntrainDeRec) {
      sonsEnregistres = [];
      debutEnregistrement = Date.now();
    }

    return;
  }

  let audio = document.querySelector(`audio[data-key="${key}"]`);
  let pad = document.querySelector(`.key[data-key="${key}"]`);

  // console.log("Audio trouvé", audio);
  // console.log("Pad trouvé", pad);

  if (!audio || !pad) {
    // console.log("Aucun son ne correspond à cette touche");
    return;
  }

  audio.currentTime = 0;
  audio.play();
  pad.classList.add("playing");

  
}

function removeTransition(event) {
  //   let audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  let key = event.key.toUpperCase();

  if (key === "R") {
    return;
  }


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

// function play() {
//   let eventKeydown = new KeyboardEvent("keydown", {
//     key: "A",
//   });
//   document.dispatchEvent(eventKeydown);

//   setTimeout(() => {
//     let eventKeyup = new KeyboardEvent("keyup", {
//       key: "A",
//     });
//     document.dispatchEvent(eventKeyup);
//   }, TRANSITION_TIME);
// }

function play(key) {

  let eventKeydown = new KeyboardEvent("keydown", {
    key: key
  });
  document.dispatchEvent(eventKeydown);

  setTimeout(() => {
    let eventKeyup = new KeyboardEvent("keyup", {
      key: key
    });
    document.dispatchEvent(eventKeyup);
  }, TRANSITION_TIME);
}

function lireEnregistrement() {
  sonsEnregistres.forEach((son) => {
    
    setTimeout(() => {
      play(son[0]);
    }, son[1]);
  });
}
