var wrongAnswers = ["takeishi", "hitoshi", "kotoshi", "kokokoko", "koke mush", "kokekoko", "hekkushi", "akke shi", "sakushi", "koke", "koshi", "dagashi", "kokko", "koushi", "koishi", "kouka", "kouchi shi", "kokushi", "kosui", "komushi", "kogushi", "koke odoshi", "kokoro"];
var questionNumber = 1;
var score = 0;
var questionAnswered = false;

// Function to play BGM
function playBGM() {
    var bgm = document.getElementById("bgm");
    bgm.play().then(() => {
        console.log("BGM is playing");
    }).catch((error) => {
        console.log("Failed to play BGM: ", error);
    });
}

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to display the question
function displayQuestion() {
    questionAnswered = false;
    // Select two random wrong answers
    var wrongAnswersCopy = wrongAnswers.slice();
    var wrongAnswer1 = wrongAnswersCopy.splice(Math.floor(Math.random() * wrongAnswersCopy.length), 1)[0];
    var wrongAnswer2 = wrongAnswersCopy.splice(Math.floor(Math.random() * wrongAnswersCopy.length), 1)[0];
    
    // Create buttons
    var kokeshiButton = document.createElement("button");
    kokeshiButton.innerHTML = "kokeshi";
    var wrongButton1 = document.createElement("button");
    wrongButton1.innerHTML = wrongAnswer1;
    var wrongButton2 = document.createElement("button");
    wrongButton2.innerHTML = wrongAnswer2;
    
    // Put buttons in an array and shuffle
    var buttons = [kokeshiButton, wrongButton1, wrongButton2];
    shuffleArray(buttons);
    
    // Append to question-area
    document.getElementById("question-area").innerHTML = "";
    for (var button of buttons) {
        document.getElementById("question-area").appendChild(button);
    }
    
    // Define click event
    function handleButtonClick() {
        if (!questionAnswered) {
            if (this.innerHTML === "kokeshi") {
                score++;
            }
            questionAnswered = true;
            clearTimeout(timer);
            nextQuestion();
        }
    }
    
    // Assign click event to all buttons
    for (var button of buttons) {
        button.onclick = handleButtonClick;
    }
    
    // Set timer
    var timer = setTimeout(function() {
        if (!questionAnswered) {
            questionAnswered = true;
            nextQuestion();
        }
    }, 1000);
    
    // Set question text
    document.getElementById("question-text").innerText = "Question " + questionNumber + " of 10";
}

// Function to move to the next question
function nextQuestion() {
    questionNumber++;
    if (questionNumber <= 10) {
        displayQuestion();
    } else {
        showScore();
    }
}

// Function to show the final score
function showScore() {
    document.getElementById("game-screen").innerHTML = "Game over! You got " + score + " correct answers out of 10.";
}

// Start button event listener
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    playBGM();
    displayQuestion();
});
