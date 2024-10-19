let userScore = 0;
let computerScore = 0;
let ties = 0;

// Define sounds
const rockSound = new Audio("audio/rock.mp3");
const paperSound = new Audio("audio/paper.mp3");
const scissorsSound = new Audio("audio/scissors.mp3");
const winSound = new Audio("audio/win.mp3");
const lossSound = new Audio("audio/loss.mp3");
const tieSound = new Audio("audio/tie.mp3");
const backgroundMusic = new Audio("audio/background.mp3");

// Elements
const confirmationModal = document.getElementById("confirmation-modal");
const usernameModal = document.getElementById("username-modal");
const usernameInput = document.getElementById("username-input");
const usernameDisplay = document.getElementById("username-display");
const messageElement = document.getElementById("message");
const playAgainButton = document.getElementById("play-again");
const buttons = document.querySelectorAll("button");
const overlay = document.getElementById("overlay");
const toggleButton = document.getElementById("toggle-button");

// Dark mode toggle
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Update emoji based on the mode
    toggleButton.textContent = document.body.classList.contains("dark-mode")
        ? "🌙"
        : "🌞";
});

let highlightInterval;
let currentHighlightedIndex = 0;

// Define the computer options
const computerOptions = [
    document.getElementById("com_rock"),
    document.getElementById("com_paper"),

    document.getElementById("com_scissors")
];
let playerName = "Player"; // Default name

// Show confirmation modal at the start
confirmationModal.style.display = "flex";

// Handle the 'Yes' or 'No' from confirmation modal
document.getElementById("confirm-play").addEventListener("click", () => {
    confirmationModal.style.display = "none"; // Hide confirmation modal
    usernameModal.style.display = "block";
    backgroundMusic.play();
});

document.getElementById("cancel-play").addEventListener("click", () => {
    confirmationModal.style.display = "none"; // Hide confirmation modal
    alert("Ok, maybe next time!");
});

// Handle the username submission
document.getElementById("submit-username").addEventListener("click", () => {
    playerName = usernameInput.value.trim() || "Player"; // Get input or default to 'Player'
    usernameDisplay.innerText = `Welcome, ${playerName}!`;
    usernameModal.style.display = "none";
    overlay.style.display = "none"; // Hide username modal and overlay
    startComputerHighlight();
    startGameSetup(); // Proceed to game setup
});

// Core game logic
function startGame(playerChoice) {
    setTimeout(() => {
        let computerChoiceIndex = stopComputerHighlight();
        let choices = ["rock", "paper", "scissors"];
        let computer = choices[computerChoiceIndex];

        setTimeout(() => {
            let message = `Computer chose: ${computer}, <br> ${playerName} chose: ${playerChoice} <br> `;

            if (playerChoice === computer) {
                message += "It's a tie!";
                ties++;
                tieSound.play();
            } else if (
                (playerChoice === "rock" && computer === "scissors") ||
                (playerChoice === "paper" && computer === "rock") ||
                (playerChoice === "scissors" && computer === "paper")
            ) {
                message += `${playerName} wins!<br>`;
                userScore++;
                winSound.play();
            } else {
                message += `Computer wins!<br>`;
                computerScore++;
                lossSound.play();
            }

            messageElement.innerHTML = message;
            messageElement.classList.add("fall");
            messageElement.style.display = "flex";
            document.getElementById("play-again").style.display = "block";
            document.getElementById("options").style.display = "none";
            document.getElementById("computer").style.display = "none";
            document.getElementById("heading").innerHTML = "Restart?";
        }, 1000);
    }, 1000);
}

// game setup
function startGameSetup() {
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.4;

    document.getElementById("rock").addEventListener("click", () => {
        rockSound.play(); // play rock sound
        startGame("rock"); // choose rock
    });

    document.getElementById("paper").addEventListener("click", () => {
        paperSound.play();
        startGame("paper");
    });

    document.getElementById("scissors").addEventListener("click", () => {
        scissorsSound.play();
        startGame("scissors");
    });

    playAgainButton.addEventListener("click", resetGame);

    buttons.forEach(button => {
        button.addEventListener("click", () => triggerAnimation(button));
    });
}
// computer highlight
function startComputerHighlight() {
    currentHighlightedIndex = 0; // start at rock
    highlightInterval = setInterval(() => {
        computerOptions[currentHighlightedIndex].classList.remove("highlight"); //remove from the current option before moving to the next

        currentHighlightedIndex =
            (currentHighlightedIndex + 1) % computerOptions.length; // finally, move to the next option

        computerOptions[currentHighlightedIndex].classList.add("highlight");
    }, 200); // 0.2 seconds interval between options
}

function stopComputerHighlight() {
    clearInterval(highlightInterval);
    computerOptions.forEach(option => option.classList.remove("highlight")); // totally remove the highlight from any option
    computerOptions[currentHighlightedIndex].classList.add("highlight"); // keep the highlight on only the computer's pick
    return currentHighlightedIndex; // Return the current index here
}

// Reset game
function resetGame() {
    startComputerHighlight();

    messageElement.innerHTML = "";
    document.getElementById("heading").innerHTML =
        "Select rock, paper or scissors";
    document.getElementById("user-score").innerText = userScore;
    document.getElementById("computer-score").innerText = computerScore;
    document.getElementById("tie-score").innerText = ties;

    document.getElementById("options").style.display = "flex";
    document.getElementById("computer").style.display = "flex";
    playAgainButton.style.display = "none";
    document.getElementById("message").style.display = "none";
}

// Button animation
function triggerAnimation(button) {
    button.classList.add("dance-animation");
    setTimeout(() => {
        button.classList.remove("dance-animation");
    }, 1500);
}

// Pause background music on page visibility change
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
});
