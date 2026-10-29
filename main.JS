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

  let audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);
  let pad = document.querySelector(`.key[data-key="${event.keyCode}"]`);

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
  let pad = document.querySelector(`.key[data-key="${event.keyCode}"]`);

  // console.log("Audio trouvé", audio);
  // console.log("Pad trouvé", pad);

  if (!pad) {
    // console.log("Aucun son ne correspond à cette touche");
    return;
  }

  //   if (event.propertyName !== "transform") return;

  pad.classList.remove("playing");
}
