// store the data in to the local storage
const score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

/* if(!score)
 {
    score = {
        wins:0,
        losses:0,
        ties:0
    };
 } */

// const score = {
//     wins = 0,
//     losses = 0,
//     ties = 0
// };



// console.log(JSON.parse(localStorage.getItem('score')));

function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = ' ';

    if (playerMove === 'rock') {
        if (computerMove === 'Rock') {
            result = 'Tie.';
        }
        else if (computerMove === 'Paper') {
            result = 'You lose.';
        }
        else if (computerMove === 'Scissors') {
            result = 'You win.'
        }
    }

    else if (playerMove === 'paper') {
        if (computerMove === 'Rock') {
            result = 'You win.';
        }
        else if (computerMove === 'Paper') {
            result = 'Tie.';
        }
        else if (computerMove === 'Scissors') {
            result = 'You lose.'
        }
    }

    else if (playerMove === 'scissors') {
        if (computerMove === 'Rock') {
            result = 'You lose.';
        }
        else if (computerMove === 'Paper') {
            result = 'You win.';
        }
        else if (computerMove === 'Scissors') {
            result = 'Tie.'
        }

    }

    if (result === 'You win.') {
        score.wins += 1;
    }
    else if (result === 'You lose.') {
        score.losses += 1;
    }
    else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `You
<img src="./images/ro-pa-se/${playerMove}-emoji.png" class="move-icon" >
<img src="./images/ro-pa-se/${computerMove}-emoji.png" class="move-icon">
Computer`;

    // updateMoveElement();

    // alert(`You picked ${playerMove}, Computer picked ${computerMove}. ${result} Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = ' ';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMove = 'Rock';
    }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
        computerMove = 'Paper';
    }
    else if (randomNumber > 2 / 3 && randomNumber < 1) {
        computerMove = 'Scissors';
    }
    return computerMove;
}