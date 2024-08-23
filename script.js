let userScore = 0;
let compScore = 0;
const winningScore = 10; // First to 10 points wins

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};

const drawGame = () => {
  msg.innerText = "Game was a Draw. Play again.";
  msg.style.backgroundColor = "#081b31";
};

const checkWinner = () => {
  if (userScore === winningScore) {
    msg.innerText = "Congratulations! You won the game!";
    msg.style.backgroundColor = "green";
    disableChoices(); // Stop the game after the winner is declared
  } else if (compScore === winningScore) {
    msg.innerText = "Sorry! The computer won the game.";
    msg.style.backgroundColor = "red";
    disableChoices(); // Stop the game after the winner is declared
  }
};

const disableChoices = () => {
  choices.forEach((choice) => {
    choice.style.pointerEvents = "none"; // Disable further clicks
  });
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin) {
    userScore++;
    userScorePara.innerText = userScore;
    msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScorePara.innerText = compScore;
    msg.innerText = `You lost. ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
  checkWinner(); // Check if someone reached 10 points
};

const playGame = (userChoice) => {
  const compChoice = genCompChoice();

  if (userChoice === compChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else if (userChoice === "scissors") { // Scissors functional logic
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});
