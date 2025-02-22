var wrongAnswers = ["たけし", "ひとし", "ことし", "ここここ", "こけむし", "こけこっこ", "へっくし", "あっけし", "さくし", "こけ", "こし", "だがし", "こっこ", "こうし", "こいし", "こうか", "こうちし", "こくし", "こすい", "こむし", "こぐし", "こけおどし", "こころ"];
var questionNumber = 1;
var score = 0;
var questionAnswered = false;
var timer = null; // タイマーを管理

// BGMを再生する関数
function playBGM() {
    var bgm = document.getElementById("bgm");
    if (bgm.paused) {
        bgm.play().then(() => {
            console.log("BGMが再生されました");
        }).catch((error) => {
            console.log("BGM再生に失敗しました: ", error);
        });
    }
}

// 配列をシャッフルする関数
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
    var wrongAnswersCopy = wrongAnswers.slice();
    var wrongAnswer1 = wrongAnswersCopy.splice(Math.floor(Math.random() * wrongAnswersCopy.length), 1)[0];
    var wrongAnswer2 = wrongAnswersCopy.splice(Math.floor(Math.random() * wrongAnswersCopy.length), 1)[0];

    // ボタンを作成
    var kokeshiButton = document.createElement("button");
    kokeshiButton.innerHTML = "こけし";
    var wrongButton1 = document.createElement("button");
    wrongButton1.innerHTML = wrongAnswer1;
    var wrongButton2 = document.createElement("button");
    wrongButton2.innerHTML = wrongAnswer2;

    // ボタンをシャッフル
    var buttons = [kokeshiButton, wrongButton1, wrongButton2];
    shuffleArray(buttons);

    // ボタンを追加
    document.getElementById("question-area").innerHTML = "";
    buttons.forEach(button => {
        document.getElementById("question-area").appendChild(button);
    });

    // クリックイベントを追加
    buttons.forEach(button => {
        button.onclick = function() {
            if (!questionAnswered) {
                if (this.innerHTML === "こけし") {
                    score++;
                }
                questionAnswered = true;
                if (timer) clearTimeout(timer);
                nextQuestion();
            }
        };
    });

    // タイマーを設定（1.5秒に変更）
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
        if (!questionAnswered) {
            questionAnswered = true;
            console.log("1.5秒経過、次の問題へ");
            nextQuestion();
        }
    }, 1500); // 制限時間1.5秒

    document.getElementById("question-text").innerText = "第" + questionNumber + "問（全10問）";
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

// ページ読み込み時にBGMを開始
