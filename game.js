var wrongAnswers = ["たけし", "ひとし", "ことし", "ここここ", "こけむし", "こけこっこ", "へっくし", "あっけし", "さくし", "こけ", "こし", "だがし", "こっこ", "こうし", "こいし", "こうか", "こうちし", "こくし", "こすい", "こむし", "こぐし", "こけおどし", "こころ"];
var questionNumber = 1;
var score = 0;
var questionAnswered = false;

function displayQuestion() {
    questionAnswered = false;
    var wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    document.getElementById("question-text").innerText = "第" + questionNumber + "問（全10問）";
    document.getElementById("question-area").innerHTML = "";
    
    // 「こけし」ボタン
    var kokeshiButton = document.createElement("button");
    kokeshiButton.innerHTML = "こけし";
    kokeshiButton.onclick = function() {
        if (!questionAnswered) {
            score++;
            questionAnswered = true;
            clearTimeout(timer);
            nextQuestion();
        }
    };
    
    // 間違ったボタン
    var wrongButton = document.createElement("button");
    wrongButton.innerHTML = wrongAnswer;
    wrongButton.onclick = function() {
        if (!questionAnswered) {
            questionAnswered = true;
            clearTimeout(timer);
            nextQuestion();
        }
    };
    
    // ランダムに左右を決める
    var buttons = [kokeshiButton, wrongButton];
    if (Math.random() < 0.5) {
        buttons = [wrongButton, kokeshiButton]; // 50%の確率で順番を入れ替え
    }
    document.getElementById("question-area").appendChild(buttons[0]);
    document.getElementById("question-area").appendChild(buttons[1]);
    
    // 1.4秒後に次の問題へ
    var timer = setTimeout(function() {
        if (!questionAnswered) {
            questionAnswered = true;
            nextQuestion();
        }
    }, 1400); // 2秒から1.4秒に変更
}

function nextQuestion() {
    questionNumber++;
    if (questionNumber <= 10) {
        displayQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.getElementById("game-screen").innerHTML = "ゲーム終了！正解数: " + score + " / 10";
}

document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("bgm").play();
    displayQuestion();
});

window.onload = function() {
    document.getElementById("bgm").play();
};
