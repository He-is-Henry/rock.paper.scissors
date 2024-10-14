let userScore = 0;
let computerScore = 0;
let ties = 0;

// Define sounds
const rockSound = new Audio('audio/rock.mp3');
const paperSound = new Audio('audio/paper.mp3');
const scissorsSound = new Audio('audio/scissors.mp3');
const winSound = new Audio('audio/win.mp3');
const lossSound = new Audio('audio/loss.mp3');
const tieSound = new Audio('audio/tie.mp3');
const backgroundMusic = new Audio('audio/background.mp3');

// Elements
const confirmationModal = document.getElementById("confirmation-modal");
const usernameModal = document.getElementById("username-modal");
const usernameInput = document.getElementById("username-input");
const usernameDisplay = document.getElementById("username-display");
const messageElement = document.getElementById("message");
const playAgainButton = document.getElementById("play-again");
const buttons = document.querySelectorAll('button');
const overlay = document.getElementById("overlay");

let playerName = 'Player'; // Default name

// Show confirmation modal at the start
confirmationModal.style.display = 'flex';

// Handle the 'Yes' or 'No' from confirmation modal
document.getElementById("confirm-play").addEventListener("click", () => {
    confirmationModal.style.display = 'none'; // Hide confirmation modal 
    usernameModal.style.display = 'block'; // Show username modal
});

document.getElementById("cancel-play").addEventListener("click", () => {
    confirmationModal.style.display = 'none'; // Hide confirmation modal
    alert("Ok, maybe next time!");
});

// Handle the username submission
document.getElementById("submit-username").addEventListener("click", () => {
    playerName = usernameInput.value.trim() || 'Player'; // Get input or default to 'Player'
    usernameDisplay.innerText = `Welcome, ${playerName}!`;
    usernameModal.style.display = 'none';
    overlay.style.display = 'none'  // Hide username modal and overlay
    startGameSetup(); // Proceed to game setup
});

// Game setup and event listeners
function startGameSetup() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.2;

    document.getElementById("rock").addEventListener("click", () => {
        rockSound.play();
        backgroundMusic.play();
        startGame("rock");
    });

    document.getElementById("paper").addEventListener("click", () => {
        paperSound.play();
        backgroundMusic.play();
        startGame("paper");
    });

    document.getElementById("scissors").addEventListener("click", () => {
        scissorsSound.play();
        backgroundMusic.play();
        startGame("scissors");
    });

    playAgainButton.addEventListener("click", resetGame);

    buttons.forEach(button => {
        button.addEventListener("click", () => triggerAnimation(button));
    });
}

// Core game logic (same as your existing code)
function startGame(playerChoice) {
    let computerChoice = Math.floor(Math.random() * 3);
    let choices = ["rock", "paper", "scissors"];
    let computer = choices[computerChoice];

    setTimeout(() => {
        let message = `Computer chose: ${computer}, <br> ${playerName} chose: ${playerChoice} <br> `;

        if (playerChoice === computer) {
            message += "It's a tie!";
            ties++;
            tieSound.play();
        } else if ((playerChoice === "rock" && computer === "scissors") || 
                   (playerChoice === "paper" && computer === "rock") || 
                   (playerChoice === "scissors" && computer === "paper")) {
            message += `${playerName} wins!<br>`;
            userScore++;
            winSound.play();
        } else {
            message += `Computer wins!<br>`;
            computerScore++;
            lossSound.play();
        }

        messageElement.innerHTML = message;
        messageElement.classList.add('fall');
        setTimeout(() => {
            messageElement.classList.remove('fall');
        }, 5000);

        document.getElementById("play-again").style.display = "block";
        document.getElementById("options").style.display = "none";
        document.getElementById("heading").innerHTML = "Restart?";
    }, 3000);
}

// Reset game
function resetGame() {
    messageElement.innerHTML = "";
    document.getElementById("heading").innerHTML = "Select rock, paper or scissors";
    document.getElementById("user-score").innerText = userScore;
    document.getElementById("computer-score").innerText = computerScore;
    document.getElementById("tie-score").innerText = ties;

    document.getElementById("options").style.display = "flex";
    playAgainButton.style.display = "none";
}

// Button animation
function triggerAnimation(button) {
    button.classList.add('dance-animation');
    setTimeout(() => {
        button.classList.remove('dance-animation');
    }, 2000);
}

// Pause background music on page visibility change
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
});