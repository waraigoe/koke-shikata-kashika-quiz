// 間違った選択肢のリスト
var wrongAnswers = ["たけし", "ひとし", "ことし", "こけこっこ", "へっくし"];
var questionNumber = 1; // 今何問目か
var score = 0; // 正解の数
var questionAnswered = false; // 答えを選んだかどうか

// クイズの問題を表示する
function displayQuestion() {
    questionAnswered = false;
    var wrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];
    document.getElementById("question-text").innerText = "第" + questionNumber + "問（全10問）";
    document.getElementById("question-area").innerHTML = "";
    
    // 「こけし」ボタンを作る
    var kokeshiButton = document.createElement("button");
    kokeshiButton.innerHTML = "こけし";
    kokeshiButton.onclick = function() {
        if (!questionAnswered) {
            score++; // 正解ならスコアを増やす
            questionAnswered = true;
            clearTimeout(timer);
            nextQuestion();
        }
    };
    
    // 間違ったボタンを作る
    var wrongButton = document.createElement("button");
    wrongButton.innerHTML = wrongAnswer;
    wrongButton.onclick = function() {
        if (!questionAnswered) {
            questionAnswered = true;
            clearTimeout(timer);
            nextQuestion();
        }
    };
    
    // ボタンを画面に追加
    document.getElementById("question-area").appendChild(kokeshiButton);
    document.getElementById("question-area").appendChild(wrongButton);
    
    // 2秒後に次の問題へ
    var timer = setTimeout(function() {
        if (!questionAnswered) {
            questionAnswered = true;
            nextQuestion();
        }
    }, 2000);
}

// 次の問題へ進む
function nextQuestion() {
    questionNumber++;
    if (questionNumber <= 10) {
        displayQuestion();
    } else {
        showScore(); // 10問終わったら結果を表示
    }
}

// スコアを表示
function showScore() {
    document.getElementById("game-screen").innerHTML = "ゲーム終了！正解数: " + score + " / 10";
}

// ゲーム開始ボタンを押したとき
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("bgm").play(); // BGMを再生
    displayQuestion();
});

// ページを開いたときにBGMをすぐ再生
window.onload = function() {
    document.getElementById("bgm").play();
};