'use strict';

let currentScore0Display = document.getElementById('current--0');
let currentScore1Display = document.getElementById('current--1');
let totalScore0Display = document.getElementById('total--0');
let totalScore1Display = document.getElementById('total--1');
let diceImg = document.querySelector('.dice');
let rollBtn = document.querySelector('.btn--roll');
let holdBtn = document.querySelector('.btn--hold');
let newGameBtn = document.querySelector('.btn--new');
let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');

let currentScore;
let totalScore;
let roll;
let activePlayer;
let isGameActive;

let newGame = () => {
  currentScore = 0;
  activePlayer = 0;
  totalScore = [0, 0];
  isGameActive = true;
  totalScore0Display.textContent = 0;
  totalScore1Display.textContent = 0;
  currentScore0Display.textContent = 0;
  currentScore1Display.textContent = 0;
  diceImg.classList.add('hidden');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
};
newGame();
newGameBtn.addEventListener('click', newGame);

let switchActivePlayer = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

let rollAction = () => {
  if (isGameActive) {
    roll = Math.trunc(Math.random() * 6 + 1);
    diceImg.src = `dice${roll}.png`;
    diceImg.classList.remove('hidden');
    if (roll != 1) {
      currentScore = currentScore + roll;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      switchActivePlayer();
    }
  }
};
rollBtn.addEventListener('click', rollAction);

let holdAction = () => {
  totalScore[activePlayer] = totalScore[activePlayer] + currentScore;
  document.getElementById(`total--${activePlayer}`).textContent = totalScore[activePlayer];
  if (totalScore[activePlayer] < 10) {
    switchActivePlayer();
  } else {
    isGameActive = false;
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
  }
};
holdBtn.addEventListener('click', holdAction);
