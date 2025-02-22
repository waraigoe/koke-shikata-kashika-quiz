var wrongAnswers = ["たけし", "ひとし", "ことし", "ここここ", "こけむし", "こけこっこ", "へっくし", "あっけし", "さくし", "こけ", "こし", "だがし", "こっこ", "こうし", "こいし", "こうか", "こうちし", "こくし", "こすい", "こむし", "こぐし", "こけおどし", "こころ"];
var questionNumber = 1;
var score = 0;
var questionAnswered = false;

// BGMを再生する関数
function playBGM() {
    var bgm = document.getElementById("bgm");
    bgm.play().then(() => {
        console.log("BGMが再生されました");
    }).catch((error) => {
        console.log("BGM再生に失敗しました: ", error);
    });
}

// 配列をシャッフルする関数（Fisher-Yatesシャッフル）
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// クイズの問題を表示する
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

    // ボタンをシャッフルして配置
    var buttons = [kokeshiButton, wrongButton];
    shuffleArray(buttons);
    document.getElementById("question-area").appendChild(buttons[0]);
    document.getElementById("question-area").appendChild(buttons[1]);

    // 1秒後に次の問題へ
    var timer = setTimeout(function() {
        if (!questionAnswered) {
            questionAnswered = true;
            nextQuestion();
        }
    }, 1000); // 制限時間を1秒に設定
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

// ゲーム開始ボタンを押したとき
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    playBGM(); // BGMを再生
    displayQuestion();
});
