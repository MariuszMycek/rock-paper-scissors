"use strict"; // global variables

var rock = document.getElementById("rock");
var paper = document.getElementById("paper");
var scissors = document.getElementById("scissors");
var outputMessages = document.getElementById("outputMessages");
var newGameButton = document.getElementById("newGameButton");
var roundsToWin = document.getElementById("roundsToWin");
var wonMatches = document.getElementById("wonMatches");
var actionFieldPlayer = document.getElementById("actionFieldPlayer");
var actionFieldCpu = document.getElementById("actionFieldCpu");
var playerScore = document.getElementById("playerScore");
var cpuScore = document.getElementById("cpuScore");
var modals = document.querySelectorAll(".modal");
var playerNameInput = document.querySelector("#player-name");
var roundsNumberInput = document.querySelector("#rounds-number");
var startGamePopupButton = document.querySelector("#start-button");
var gameRulesButton = document.querySelector("#game-rules");
var cpuActionIcon = document.querySelector("#cpu-move i"); // Object with basic game variables

var params = {
  victories: 0,
  playerPoints: 0,
  cpuPoints: 0,
  rounds: 0,
  message: "",
  progress: []
}; // Object with game progress (each round info)

var gameProgress = {
  roundNumber: 0,
  message: "",
  result: ""
}; // Function shows modal overlay and proper modal

var showModal = function showModal(modalId) {
  document.querySelector("#modal-overlay").classList.add("show");
  modals.forEach(function (modal) {
    modal.classList.remove("show");
  });
  document.querySelector(modalId).classList.add("show");
}; // Function closes modal overlay


var hideModal = function hideModal() {
  document.querySelector("#modal-overlay").classList.remove("show");
}; // Event listener for modal overlay to close modal


document.querySelector("#modal-overlay").addEventListener("click", hideModal);

for (var i = 0; i < modals.length; i++) {
  modals[i].addEventListener("click", function (event) {
    event.stopPropagation();
  });
} // Event listener for close buttons to close modals


var closeButtons = document.querySelectorAll(".modal__close");

for (var i = 0; i < closeButtons.length; i++) {
  closeButtons[i].addEventListener("click", hideModal);
} // Function changes content of modal after match end (displays proper messages)


var modalContent = function modalContent(modalId) {
  var modal = document.querySelector(modalId);
  var modalHeader = modal.querySelector(".modal__header");
  var modalTableContentColumns = document.querySelectorAll(".table-content__column");
  modalHeader.innerHTML = params.message; // Result info
  // Deleting content of modal table from last match

  modalTableContentColumns.forEach(function (column) {
    while (column.firstChild) {
      column.removeChild(column.firstChild);
    }
  }); // Inserting new data to modal table columns

  for (var i = 0; i < params.progress.length; i++) {
    var roundsNewDiv = document.createElement("div");
    roundsNewDiv.innerHTML = params.progress[i].roundNumber;
    var playerMovesNewDiv = document.createElement("div");
    playerMovesNewDiv.innerHTML = params.progress[i].message;
    var resultNewDiv = document.createElement("div");
    resultNewDiv.innerHTML = params.progress[i].result;
    document.querySelector(".table-content__column--rounds").appendChild(roundsNewDiv);
    document.querySelector(".table-content__column--player-moves").appendChild(playerMovesNewDiv);
    document.querySelector(".table-content__column--result").appendChild(resultNewDiv);
  }
}; // Function add points to Player or Cpu depending on round result


var score = function score(pointTo, action) {
  if (action == "addPoint" && pointTo == "cpu") {
    params.cpuPoints += 1;
  } else if (action == "addPoint" && pointTo == "player") {
    params.playerPoints += 1;
  } else if (action == "noPoint" && pointTo == "noOne") {
    params.playerPoints = 0;
    params.cpuPoints = 0;
  } // Updating points on the scoreboard


  playerScore.innerHTML = params.playerPoints;
  cpuScore.innerHTML = params.cpuPoints;
};
/* Function shows player buttons, displays how many rounds are required to win,
displays matches won in a row and resets scoreboard */


var startGameSettings = function startGameSettings() {
  actionFieldPlayer.classList.remove("invisible");
  actionFieldCpu.classList.remove("invisible");
  outputMessages.innerHTML = "New game - rounds required to win: " + roundsToWin.innerHTML; // info about rounds required to win

  if (params.cpuPoints > 0 || params.playerPoints > 0) {
    // reset win counter after loss
    params.victories = 0;
  }

  score("noOne", "noPoint"); // point reset

  wonMatches.innerHTML = params.victories; // updating highscore
}; // Function show start modal with small form to fill and hides player and cpu buttons


var gameInit = function gameInit() {
  showModal("#match-start-modal");
  actionFieldPlayer.classList.add("invisible");
  actionFieldCpu.classList.add("invisible");
};
/* After clicking on "Start" button (in start game form), 
function hides modal, resets last cpu move icon, and sets all params to needed to new game */


var startGame = function startGame() {
  hideModal();
  removeClassesForIconFields();
  params.rounds = roundsNumberInput.value;
  roundsToWin.innerHTML = params.rounds;
  document.querySelector("#score-board-player-name").innerHTML = playerNameInput.value;
  startGameSettings();
  gameProgress.roundNumber = 0;
  params.progress = [];
}; // Event listener for "Start" button in start game form


startGamePopupButton.addEventListener("click", startGame); // Event listener for "New game" button

newGameButton.addEventListener("click", gameInit); // Event listener for "Game rules" button

gameRulesButton.addEventListener("click", function () {
  showModal("#game-rules-modal");
});
/* Function checks validation of start game form input fields.
If data is ok, enables start button */

var startModalValidation = function startModalValidation() {
  startGamePopupButton.disabled = true;

  if (playerNameInput.checkValidity() && roundsNumberInput.checkValidity()) {
    startGamePopupButton.disabled = false;
  }
}; // Event listener for start game form input fields to check its validation


document.querySelectorAll(".modal__input").forEach(function (input) {
  input.addEventListener("keyup", function () {
    startModalValidation();
  });
});
/*  Function checks if player or cpu points are equal to rounds required to win 
and displays popup with proper message */

var winCondition = function winCondition() {
  var messageWithResult = params.playerPoints + " - " + params.cpuPoints + "<br><br>";
  var message;

  if (params.cpuPoints == params.rounds) {
    message = messageWithResult + "Game over - you lost." + "<br>" + "Click 'New game' to start next match";
    params.victories = 0;
  } else if (params.playerPoints == params.rounds) {
    message = messageWithResult + "YOU WON ENTIRE GAME!" + "<br>" + "Click 'New game' to start next match";
    params.victories += 1;
  }

  if (params.cpuPoints == params.rounds || params.playerPoints == params.rounds) {
    params.message = message;
    modalContent("#match-end-modal");
    showModal("#match-end-modal");
    actionFieldPlayer.classList.add("invisible");
    actionFieldCpu.classList.add("invisible");
    score("noOne", "noPoint");
  }

  wonMatches.innerHTML = params.victories;
}; // Removing all classes from cpu icons


var removeClassesForIconFields = function removeClassesForIconFields() {
  cpuActionIcon.className = "";
}; // Displaying proper icon in cpu action field


var cpuMoveIcon = function cpuMoveIcon(pcMove) {
  removeClassesForIconFields(cpuActionIcon);
  cpuActionIcon.classList.add("far", "button__icon");

  if (pcMove == "Rock") {
    cpuActionIcon.classList.add("fa-hand-rock", "button__cpu-icon--rock");
  } else if (pcMove == "Paper") {
    cpuActionIcon.classList.add("fa-hand-paper", "button__cpu-icon--paper");
  } else if (pcMove == "Scissors") {
    cpuActionIcon.classList.add("fa-hand-scissors", "button__cpu-icon--scissors");
  } else if (pcMove == "Lizard") {
    cpuActionIcon.classList.add("fa-hand-lizard", "button__cpu-icon--lizard");
  } else if (pcMove == "Spock") {
    cpuActionIcon.classList.add("fa-hand-spock", "button__cpu-icon--spock");
  }
};
/* After player move, function draws cpu move and compare them.
Next it displays proper message in system message field. Also checks win conditions
after each move */


var playerMove = function playerMove(move) {
  var randomNumber = Math.floor(Math.random() * 5); // pick 0, 1, ..., 5

  var pcMove = ["Rock", "Paper", "Scissors", "Lizard", "Spock"][randomNumber];
  var playerName = playerNameInput.value;
  var message = playerName + " played " + move + " - Computer played " + pcMove;
  cpuMoveIcon(pcMove);

  if ((move == "Rock" || move == "Spock") && pcMove == "Paper" || (move == "Paper" || move == "Lizard") && pcMove == "Scissors" || (move == "Scissors" || move == "Lizard") && pcMove == "Rock" || (move == "Spock" || move == "Paper") && pcMove == "Lizard" || (move == "Scissors" || move == "Rock") && pcMove == "Spock") {
    message += ". Computer scores a point." + "<br>";
    score("cpu", "addPoint");
  } else if (move == pcMove) {
    message += ". Draw." + "<br>";
  } else {
    message += ". You score a point." + "<br>";
    score("player", "addPoint");
  }

  outputMessages.innerHTML = message;
  gameProgress.roundNumber += 1;
  gameProgress.message = message;
  gameProgress.result = params.playerPoints + " - " + params.cpuPoints;
  params.progress.push({
    roundNumber: gameProgress.roundNumber,
    message: gameProgress.message,
    result: gameProgress.result
  });
  winCondition();
}; // Function gets attribute value from player button and execute playerMove()


document.querySelectorAll(".player-move").forEach(function (playerMoveButton) {
  playerMoveButton.addEventListener("click", function () {
    var playerMoveName = playerMoveButton.getAttribute("data-move");
    playerMove(playerMoveName);
  });
});