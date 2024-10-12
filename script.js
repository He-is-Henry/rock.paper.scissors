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

let play = confirm("Shall we play rock paper scissors?");

if (play) {

// Set background music to loop and lower volume
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

let playerName = prompt("Please enter your name:");
    if (playerName){ document.getElementById("username-display").innerText = `Welcome, ${playerName}!`;
    } else {
        alert("No name entered. Defaulting to 'Player'.");
        playerName = 'Player';
        document.getElementById("username-display").innerText = `Welcome, ${playerName}!`;
    }
   
const messageElement = document.getElementById("message");
    document.getElementById("rock").addEventListener("click", () => {
rockSound.play();
backgroundMusic.play();
        startGame("rock");
   }); document.getElementById("paper").addEventListener("click", () => 
   {
   paperSound.play();
   startGame("paper");
   backgroundMusic.play();
   });
    document.getElementById("scissors").addEventListener("click", () =>  {
   scissorsSound.play();   
   startGame("scissors");
   backgroundMusic.play();
   }
   );
 document.getElementById("play-again").addEventListener("click", resetGame);

    function startGame(playerChoice) {
        let computerChoice = Math.floor(Math.random() * 3);
        let choices = ["rock", "paper", "scissors"];
        let computer = choices[computerChoice];

        setTimeout(() => {
        let message = `Computer chose: ${computer}<br>`;

        if (playerChoice === computer) {
            message += "It's a tie!";
            ties++;
            tieSound.play()
        } else if ((playerChoice === "rock" && computer === "scissors") || 
                   (playerChoice === "paper" && computer === "rock") || 
                   (playerChoice === "scissors" && computer === "paper")) {
            message += `${playerName} wins!`;
            userScore++;
            winSound.play()
        } else {
            message += "Computer wins!";
            computerScore++;
            lossSound.play()
        }

messageElement.innerHTML = message;
messageElement.classList.add('fall');
setTimeout(() => {
    messageElement.classList.remove('fall');
}, 3000);

        document.getElementById("play-again").style.display = "block";
  
document.getElementById("options").style.display = "none";
document.getElementById("heading").innerHTML = "Restart?";
    },3000);
    }
    
    document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        backgroundMusic.pause();
    } else {
        backgroundMusic.play();
    }
});

    function resetGame() {
        document.getElementById("message").innerHTML = "";
document.getElementById("heading").innerHTML = "Select rock, paper or scissors";
document.getElementById("user-score").innerText = userScore;
document.getElementById("computer-score").innerText = computerScore;
document.getElementById("tie-score").innerText = ties;

document.getElementById("options").style.display = "block"; document.getElementById("play-again").style.display = "none";
}

} else {
    
    alert("ok, maybe next time");
}


