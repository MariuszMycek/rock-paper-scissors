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
const cpuButton = document.querySelector(".action-field__computer button");
const playerScore = document.getElementById("playerScore");
const cpuScore = document.getElementById("cpuScore");

const newGame = function() {
    const rounds = window.prompt(
        "How many won rounds are required to win entire match?"
    );
    actionFieldPlayer.classList.add("invisible");
    actionFieldCpu.classList.add("invisible");

    if (
        rounds === null ||
        rounds === "" ||
        rounds * -1 >= 0 ||
        isNaN(rounds * 1) === true
    ) {
        outputMessages.innerHTML = "Click 'New game' and type a number!";
        roundsToWin.innerHTML = "Read this ->";
    } else if (cpuScore.innerHTML > 0 || playerScore.innerHTML > 0) {
        wonMatches.innerHTML = 0;
        actionFieldPlayer.classList.remove("invisible");
        actionFieldCpu.classList.remove("invisible");
        cpuScore.innerHTML = 0;
        playerScore.innerHTML = 0;
        roundsToWin.innerHTML = rounds;
        outputMessages.innerHTML =
            "New game - rounds required to win: " + roundsToWin.innerHTML;
    } else {
        actionFieldPlayer.classList.remove("invisible");
        actionFieldCpu.classList.remove("invisible");
        cpuScore.innerHTML = 0;
        playerScore.innerHTML = 0;
        roundsToWin.innerHTML = rounds;
        outputMessages.innerHTML =
            "New game - rounds required to win: " + roundsToWin.innerHTML;
    }
};
const winCondition = function() {
    if (cpuScore.innerHTML == roundsToWin.innerHTML) {
        outputMessages.innerHTML =
            playerScore.innerHTML +
            " - " +
            cpuScore.innerHTML +
            "<br>" +
            "Game over - you lost. Click 'New game' to start next match";
        actionFieldPlayer.classList.add("invisible");
        actionFieldCpu.classList.add("invisible");
        wonMatches.innerHTML = 0;
        cpuScore.innerHTML = 0;
        playerScore.innerHTML = 0;
    } else if (playerScore.innerHTML == roundsToWin.innerHTML) {
        outputMessages.innerHTML =
            playerScore.innerHTML +
            " - " +
            cpuScore.innerHTML +
            "<br>" +
            "YOU WON ENTIRE GAME! Click 'New game' to start next match";
        actionFieldPlayer.classList.add("invisible");
        actionFieldCpu.classList.add("invisible");
        wonMatches.innerHTML = parseInt(wonMatches.innerHTML) + 1;
        cpuScore.innerHTML = 0;
        playerScore.innerHTML = 0;
    }
};
const cpuMove = function(number) {
    if (number == 1) {
        cpuButton.innerHTML = "Rock";
    } else if (number == 2) {
        cpuButton.innerHTML = "Paper";
    } else if (number == 3) {
        cpuButton.innerHTML = "Scissors";
    }
};
const playerMove = function(move) {
    const number = Math.floor(Math.random() * 3 + 1);
    cpuMove(number);
    if (
        (move.innerHTML == "Rock" && number == 2) ||
        (move.innerHTML == "Paper" && number == 3) ||
        (move.innerHTML == "Scissors" && number == 1)
    ) {
        cpuScore.innerHTML = parseInt(cpuScore.innerHTML) + 1;
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played " +
                move.innerHTML +
                " - Computer played " +
                cpuButton.innerHTML +
                ". Computer scores a point." +
                "<br>"
        );
        winCondition();
    } else if (
        (move.innerHTML == "Rock" && number == 3) ||
        (move.innerHTML == "Paper" && number == 1) ||
        (move.innerHTML == "Scissors" && number == 2)
    ) {
        playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1;
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played " +
                move.innerHTML +
                " - Computer played " +
                cpuButton.innerHTML +
                ". You score a point." +
                "<br>"
        );
        winCondition();
    } else if (
        (move.innerHTML == "Rock" && number == 1) ||
        (move.innerHTML == "Paper" && number == 2) ||
        (move.innerHTML == "Scissors" && number == 3)
    ) {
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played " +
                move.innerHTML +
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
    playerMove(rock);
});
paper.addEventListener("click", function() {
    playerMove(paper);
});
scissors.addEventListener("click", function() {
    playerMove(scissors);
});
