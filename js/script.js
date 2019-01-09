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
    outputMessages.innerHTML = "New game - rounds required to win: " + roundsToWin.innerHTML;
    if (cpuPoints > 0 || playerPoints > 0) {
        victories = 0;
    }
    score(0, 0);
    wonMatches.innerHTML = victories;
};
const newGame = function() {
    const rounds = window.prompt(
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
const winCondition = function() {
    if (cpuPoints == rounds) {
        outputMessages.innerHTML =
            playerScore.innerHTML +
            " - " +
            cpuScore.innerHTML +
            "<br>" +
            "Game over - you lost. Click 'New game' to start next match";
        actionFieldPlayer.classList.add("invisible");
        actionFieldCpu.classList.add("invisible");
        victories = 0;
        score(0, 0);
    } else if (playerPoints == rounds) {
        outputMessages.innerHTML =
            playerScore.innerHTML +
            " - " +
            cpuScore.innerHTML +
            "<br>" +
            "YOU WON ENTIRE GAME! Click 'New game' to start next match";
        actionFieldPlayer.classList.add("invisible");
        actionFieldCpu.classList.add("invisible");
        score(0, 0);
        victories += 1;
    }
    wonMatches.innerHTML = victories;
};
const moveNumber = function(number) {
    if (number == 1) {
        return "Rock";
    } else if (number == 2) {
        return "Paper";
    } else if (number == 3) {
        return "Scissors";
    }
};
const playerMove = function(move) {
    const cpuButton = document.querySelector(".action-field__computer button");
    const number = Math.floor(Math.random() * 3 + 1);
    cpuButton.innerHTML = moveNumber(number);
    if (
        (move == 1 && number == 2) ||
        (move == 2 && number == 3) ||
        (move == 3 && number == 1)
    ) {
        score(2, 1);
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played " +
                moveNumber(move) +
                " - Computer played " +
                cpuButton.innerHTML +
                ". Computer scores a point." +
                "<br>"
        );
        winCondition();
    } else if (
        (move == 1 && number == 3) ||
        (move == 2 && number == 1) ||
        (move == 3 && number == 2)
    ) {
        score(1, 1);
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played " +
                moveNumber(move) +
                " - Computer played " +
                cpuButton.innerHTML +
                ". You score a point." +
                "<br>"
        );
        winCondition();
    } else if (
        (move == 1 && number == 1) ||
        (move == 2 && number == 2) ||
        (move == 3 && number == 3)
    ) {
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played " +
                moveNumber(move) +
                " - Computer played " +
                cpuButton.innerHTML +
                ". Draw." +
                "<br>"
        );
        winCondition();
    }
};

newGameButton.addEventListener("click", newGame);

rock.addEventListener("click", function() {
    playerMove(1);
});
paper.addEventListener("click", function() {
    playerMove(2);
});
scissors.addEventListener("click", function() {
    playerMove(3);
});
