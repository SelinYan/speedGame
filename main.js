const startButton = document.querySelector("#startButton");
const endButton = document.querySelector("#endButton");
const circles = document.querySelectorAll(".circle");
const scoreDisplay = document.querySelector(".score");
const modal = document.querySelector(".modal");
const message = document.querySelector("#modal-message");
const closeButton = document.querySelector(".close");
const scoreModal = document.querySelector("#scoreModal");

let score = 0;
let timer;
let pace = 1500;
let active = 0;
let rounds = 0;

const gameMusic = new Audio();
gameMusic.src = "./audio/music.mp3";

const gameoverMusic = new Audio();
gameoverMusic.src = "./audio/gameover.mp3";

const tryAgainMusic = new Audio();
tryAgainMusic.src = "./audio/try-again.ogg";

const cheerMusic = new Audio();
cheerMusic.src = "./audio/cheer.wav";

const clickMusic = new Audio();
clickMusic.src = "./audio/eating.wav";

// asign get random number
function getRndInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// asign click circle
const clickCircle = (i) => {
  clickMusic.play();
  if (i !== active) {
    return endGame();
  }
  rounds--;
  score += 10;
  scoreDisplay.textContent = score;
};

// add event listener to every circle and loop the movement
circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});

// enable circles with cursor pointer events
const enableEvents = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

// game starts
function startGame() {
  startButton.classList.add("none");
  endButton.classList.remove("none");
  gameMusic.play();
  enableEvents();
  if (rounds >= 3) {
    return endGame();
  }

  // pick new active circle
  const newActive = pickNew(active);
  circles[newActive].classList.toggle("active");
  circles[active].classList.remove("active");
  active = newActive;
  timer = setTimeout(startGame, pace);
  pace -= 20;
  rounds++;

  function pickNew(active) {
    const newActive = getRndInt(0, 3);

    if (newActive !== active) {
      return newActive;
    }
    return pickNew(active);
  }
  startButton.classList.add("none");
}

function endGame() {
  clearTimeout(timer);
  gameMusic.pause();
  modalShow();
  if (score < 30) {
    gameoverMusic.play();
  } else if (score >= 30 && score < 80) {
    tryAgainMusic.play();
  } else {
    cheerMusic.play();
  }
  startButton.classList.add("none");
  endButton.classList.add("none");
}

function resetGame() {
  window.location.reload();
}

function modalShow() {
  modal.classList.toggle("visible");
  scoreModal.textContent = score;
  if (score < 30) {
    scoreModal.textContent = `${score}`;
    message.textContent = `Uh-oh, are you having a diet?`;
  } else if (score >= 30 && score < 80) {
    scoreModal.textContent = `${score}`;
    message.textContent = `Come on, you are getting there! Try again`;
  } else {
    scoreModal.textContent = `${score}`;
    message.textContent = `WOW! You are such a great big eater!`;
  }
}

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
closeButton.addEventListener("click", resetGame);
