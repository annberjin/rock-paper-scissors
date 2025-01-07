/* If first statement is true -> Loads the saved scores 
Or if it returns null (falsy value) -> set it to the default values */
let scores = JSON.parse(localStorage.getItem('score')) || {
  "wins": 0,
  "losses": 0,
  "ties": 0
};

updateScores();

autoPlayElement = document.querySelector('.js-autoplay-btn');
autoPlayElement.addEventListener('click', () => {
  autoPlay();
});

let isAutoPlay = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlay) {
    intervalID = setInterval(function() {
      playerMove = pickComputerMove();
      playGame(playerMove)}, 1000);
    isAutoPlay = true;
    autoPlayElement.innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalID);
    isAutoPlay = false;
    autoPlayElement.innerHTML = 'Autoplay';
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetConfirmation();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
  }

  else if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }
  }
  
  if (result === 'You win.') {
    scores["wins"] += 1;
  } else if (result === 'You lose.') {
    scores["losses"] += 1;
  } else if (result === 'Tie.') {
    scores['ties'] += 1;
  }

  localStorage.setItem('score', JSON.stringify(scores));
  document.querySelector('.js-results').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `
    You
    <img src="images/${playerMove}-emoji.png" class="move-icon">
    <img src="images/${computerMove}-emoji.png" class="move-icon">
    Computer`;
  updateScores();
}

function pickComputerMove() {
  const randNum = Math.random();
  let computerMove = '';

  if (randNum >= 0 && randNum < 1/3) {
    computerMove = 'rock';
  } else if (randNum >= 1/3 && randNum < 2/3) {
    computerMove = 'paper';
  } else if (randNum >= 2/3 && randNum < 1) {
    computerMove = 'scissors';
  }
  return computerMove;
}

function updateScores() {
  document.querySelector('.js-scores').innerHTML = `Wins: ${scores.wins} Losses: ${scores.losses} Ties: ${scores.ties}`;
}

document.querySelector('.js-reset-button').addEventListener('click', () => {
  resetConfirmation();
});

function resetConfirmation() {
  document.querySelector('.js-reset-confirmation').innerHTML = `
  Are you sure you want to reset the score?
  <button class="js-reset-confirm-yes">
    Yes
  </button>
  <button class="js-reset-confirm-no">
    No
  </button>`;

  document.querySelector('.js-reset-confirm-yes').addEventListener('click', () => {
    resetScores();
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  });

  document.querySelector('.js-reset-confirm-no').addEventListener('click', () => {
    document.querySelector('.js-reset-confirmation').innerHTML = '';
  });
}

function resetScores() {
  scores["wins"] = 0;
  scores["losses"] = 0;
  scores["ties"] = 0;
  localStorage.removeItem('score');
  document.querySelector('.js-results').innerHTML = ''; //Resets the screen to default
  document.querySelector('.js-moves').innerHTML = '';
  updateScores();
}
