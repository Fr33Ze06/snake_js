const choices = document.querySelectorAll('.choice');
const playerScoreEl = document.getElementById('player-score');
const computerScoreEl = document.getElementById('computer-score');
const resultEl = document.getElementById('result');
const resetEl = document.getElementById('reset');
const countdownEl = document.getElementById('countdown');

let playerScore = 0;
let computerScore = 0;
let timer;

// Jouer un tour
function play(e) {
    resetEl.style.display = 'none';
    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    showChoices(playerChoice, computerChoice);
    const winner = getWinner(playerChoice, computerChoice);
    showResult(winner, computerChoice);
    updateScore(winner);
}

function countdown() {
    let count = 6;
    countdownEl.innerText = count;
    let words = ["un", "deux", "trois", "Pierre", "Feuille", "Ciseaux"];
    let i = 0;
    timer = setInterval(function() {
        count--;
        countdownEl.innerText = words[i];
        i++;
        if (count === 0) {
            clearInterval(timer);
            playRandom();
        }
    }, 1000);
}
// Obtenir le choix de l'ordinateur
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

// Afficher les choix
function showChoices(playerChoice, computerChoice) {
    resultEl.innerHTML = `
        <p>Vous avez choisi ${playerChoice}.</p>
        <p>L'ordinateur a choisi ${computerChoice}.</p>
    `;
}

// Obtenir le gagnant
function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'tie';
    } else if (playerChoice === 'rock') {
        if (computerChoice === 'paper') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (playerChoice === 'paper') {
        if (computerChoice === 'scissors') {
            return 'computer';
        } else {
            return 'player';
        }
    } else if (playerChoice === 'scissors') {
        if (computerChoice === 'rock') {
            return 'computer';
        } else {
            return 'player';
        }
    }
}


// Jouer un tour aléatoire
function playRandom() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    const computerChoice = choices[randomNumber];
    const playerChoice = choices[(randomNumber + 1) % 3];
    showChoices(playerChoice, computerChoice);
    const winner = getWinner(playerChoice, computerChoice);
    showResult(winner, computerChoice);
    updateScore(winner);
}

// Afficher le résultat
function showResult(winner, computerChoice) {
    if (winner === 'player') {
        resultEl.innerHTML += `<p>Vous avez gagné !</p>`;
    } else if (winner === 'computer') {
        resultEl.innerHTML += `<p>L'ordinateur a gagné avec ${computerChoice}.</p>`;
    } else {
        resultEl.innerHTML += `<p>Match nul !</p>`;
    }
}

// Mettre à jour le score
function updateScore(winner) {
    if (winner === 'player') {
        playerScore++;
        playerScoreEl.innerText = playerScore;
    } else if (winner === 'computer') {
        computerScore++;
        computerScoreEl.innerText = computerScore;
    }
    if (playerScore === 5 || computerScore === 5) {
        endGame();
    }
}

// Fin de partie
function endGame() {
    choices.forEach(choice => choice.removeEventListener('click', play));
    resetEl.style.display = 'block';
    resetEl.addEventListener('click', reset);
}

// Réinitialiser le jeu
function reset() {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.innerText = playerScore;
    computerScoreEl.innerText = computerScore;
    resultEl.innerHTML = '';
    resetEl.style.display = 'none';
    choices.forEach(choice => choice.addEventListener('click', play));
}

choices.forEach(choice => choice.addEventListener('click', play));