"use strict";
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const outputMessages = document.getElementById("outputMessages");
const newGameButton = document.getElementById("newGameButton");
const roundsToWin = document.getElementById("roundsToWin");
const wonMatches = document.getElementById("wonMatches");
const actionFieldPlayer = document.getElementById("actionFieldPlayer");
const actionFieldCpu = document.getElementById("actionFieldCpu");
const playerScore = document.getElementById("playerScore");
const cpuScore = document.getElementById("cpuScore");
let victories = 0;
let playerPoints = 0;
let cpuPoints = 0;
let rounds;
const score = function(point, action) {
    if (action == 1 && point == 2) {
        cpuPoints += 1;
    } else if (action == 1 && point == 1) {
        playerPoints += 1;
    } else if (action == 0 && point == 0) {
        playerPoints = 0;
        cpuPoints = 0;
    }
    playerScore.innerHTML = playerPoints;
    cpuScore.innerHTML = cpuPoints;
};
const resetScores = function() {
    actionFieldPlayer.classList.remove("invisible");
    actionFieldCpu.classList.remove("invisible");
    outputMessages.innerHTML =
        "New game - rounds required to win: " + roundsToWin.innerHTML;
    if (cpuPoints > 0 || playerPoints > 0) {
        victories = 0;
    }
    score(0, 0);
    wonMatches.innerHTML = victories;
};
const newGame = function() {
    rounds = window.prompt(
        "How many won rounds are required to win entire match?"
    );
    actionFieldPlayer.classList.add("invisible");
    actionFieldCpu.classList.add("invisible");
    roundsToWin.innerHTML = rounds;
    if (
        rounds === null ||
        rounds === "" ||
        rounds * -1 >= 0 ||
        isNaN(rounds * 1) === true
    ) {
        outputMessages.innerHTML = "Click 'New game' and type a number!";
        roundsToWin.innerHTML = "Read this ->";
    } else {
        resetScores();
    }
};

const ROCK = "Rock";
const PAPER = "Paper";
const SCISSORS = "Scissors";

const winCondition = function() {
    let message =
        playerScore.innerHTML + " - " + cpuScore.innerHTML + "<br><br>";

    if (cpuPoints == rounds) {
        message += "Game over - you lost. Click 'New game' to start next match";
        victories = 0;
    } else if (playerPoints == rounds) {
        message += "YOU WON ENTIRE GAME! Click 'New game' to start next match";
        victories += 1;
    }

    if (cpuPoints == rounds || playerPoints == rounds) {
        score(0, 0);
        outputMessages.innerHTML = message;
        actionFieldPlayer.classList.add("invisible");
        actionFieldCpu.classList.add("invisible");
    }

    wonMatches.innerHTML = victories;
};

const playerMove = function(move) {
    const cpuButton = document.querySelector(".action-field__computer button");
    const randomNumber = Math.floor(Math.random() * 3); // pick 0, 1, or 2
    const pcMove = [ROCK, PAPER, SCISSORS][randomNumber];

    cpuButton.innerHTML = pcMove;

    let message = "You played " + move + " - Computer played " + pcMove;

    if (
        (move == ROCK && pcMove == PAPER) ||
        (move == PAPER && pcMove == SCISSORS) ||
        (move == SCISSORS && pcMove == ROCK)
    ) {
        message += ". Computer scores a point." + "<br>";
        score(2, 1);
    } else if (move == pcMove) {
        message += ". Draw." + "<br>";
    } else {
        message += ". You score a point." + "<br>";
        score(1, 1);
    }

    outputMessages.insertAdjacentHTML("afterbegin", message);

    winCondition();
};

newGameButton.addEventListener("click", newGame);

rock.addEventListener("click", function() {
    playerMove(ROCK);
});
paper.addEventListener("click", function() {
    playerMove(PAPER);
});
scissors.addEventListener("click", function() {
    playerMove(SCISSORS);
});
