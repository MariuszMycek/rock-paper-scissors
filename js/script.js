"use strict";
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const cpuButton = document.querySelector(".action-field__computer button");
const outputMessages = document.getElementById("outputMessages");

function cpuMove() {
    const number = Math.floor(Math.random() * 3 + 1);

    if (number == 1) {
        cpuButton.innerHTML = "Rock";
    } else if (number == 2) {
        cpuButton.innerHTML = "Paper";
    } else if (number == 3) {
        cpuButton.innerHTML = "Scissors";
    }
}

rock.addEventListener("click", function() {
    const playerScore = document.getElementById("playerScore");
    const cpuScore = document.getElementById("cpuScore");
    cpuMove();
    if (cpuButton.innerHTML == "Paper") {
        cpuScore.innerHTML = parseInt(cpuScore.innerHTML) + 1;
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played Rock - Computer played Paper. Computer Score." + "<br>"
        );
    } else if (cpuButton.innerHTML == "Scissors") {
        playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1;
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played Rock - Computer played Scissors. You Score!" + "<br>"
        );
    }
    else {
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played Rock - Computer played Rock. Draw." + "<br>"
        ) 
    }
});
paper.addEventListener("click", function() {
    const playerScore = document.getElementById("playerScore");
    const cpuScore = document.getElementById("cpuScore");
    cpuMove();
    if (cpuButton.innerHTML == "Scissors") {
        cpuScore.innerHTML = parseInt(cpuScore.innerHTML) + 1;
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played Paper - Computer played Scissors. Computer Score." + "<br>"
        )
    } else if (cpuButton.innerHTML == "Rock") {
        playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1;
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played Paper - Computer played Rock. You Score!" + "<br>"
        )
    }
    else {
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played Paper - Computer played Paper. Draw." + "<br>"
        ) 
    }
});
scissors.addEventListener("click", function() {
    const playerScore = document.getElementById("playerScore");
    const cpuScore = document.getElementById("cpuScore");
    cpuMove();
    if (cpuButton.innerHTML == "Rock") {
        cpuScore.innerHTML = parseInt(cpuScore.innerHTML) + 1;
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played Scissors - Computer played Rock. Computer Score." + "<br>"
        )
    } else if (cpuButton.innerHTML == "Paper") {
        playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1;
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played Scissors - Computer played Paper. You Score!" + "<br>"
        )
    }
    else {
        outputMessages.insertAdjacentHTML(
            "afterbegin",
            "You played Scissors - Computer played Scissors. Draw." + "<br>"
        ) 
    }
});
