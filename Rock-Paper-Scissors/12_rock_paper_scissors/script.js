// Load score from localStorage or initialize
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

// Update score display when page loads
updateScoreElement();

let isAutoPlaying = false;
let intervalId;

// Auto Play function: uses pickComputerMove() as player's move
function autoPlay() {
    const autoPlayButton = document.querySelector('.auto-play-button')
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove(); // Player move is random
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        autoPlayButton.innerHTML = 'Stop';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayButton.innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    });
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    });
document.querySelector('.js-scissor-button')
    .addEventListener('click', () => {
        playGame('scissors');
    });

    document.body.addEventListener('keydown', (event)=>
    {
        if(event.key === 'r' || event.key === 'R')
        {
            playGame('rock');
        } else if(event.key === 'p' || event.key === 'P')
        {
            playGame('paper')
        }
        else if(event.key === 's' || event.key === 'S')
        {
            playGame('scissors');
        }
    });

// Main game logic
function playGame(playerMove) {
    const computerMove = pickComputerMove(); // Opponent move
    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') result = 'Tie.';
        else if (computerMove === 'paper') result = 'You lose.';
        else result = 'You win.';
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') result = 'You win.';
        else if (computerMove === 'paper') result = 'Tie.';
        else result = 'You lose.';
    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') result = 'You lose.';
        else if (computerMove === 'paper') result = 'You win.';
        else result = 'Tie.';
    }

    // Update score
    if (result === 'You win.') {
        score.wins++;
    } else if (result === 'You lose.') {
        score.losses++;
    } else if (result === 'Tie.') {
        score.ties++;
    }

    // Save updated score to localStorage
    localStorage.setItem('score', JSON.stringify(score));

    // Update result and move display
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `
    You
    <img src="./images/ro-pa-se/${playerMove}-emoji.png" class="move-icon">
    <img src="./images/ro-pa-se/${computerMove}-emoji.png" class="move-icon">
    Computer
  `;

    // Update score display
    updateScoreElement();
}

// Show score on page
function updateScoreElement() {
    document.querySelector('.js-score').innerHTML =
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Randomly pick a move
function pickComputerMove() {
    const randomNumber = Math.random();

    if (randomNumber < 1 / 3) {
        return 'rock';
    } else if (randomNumber < 2 / 3) {
        return 'paper';
    } else {
        return 'scissors';
    }
}
