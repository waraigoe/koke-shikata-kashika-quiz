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
            console.log("BGMが再生UIPされました");
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

// ランダムな色を生成する関数
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
    kokeshiButton.style.backgroundColor = getRandomColor(); // ランダムな背景色
    var wrongButton1 = document.createElement("button");
    wrongButton1.innerHTML = wrongAnswer1;
    wrongButton1.style.backgroundColor = getRandomColor(); // ランダムな背景色
    var wrongButton2 = document.createElement("button");
    wrongButton2.innerHTML = wrongAnswer2;
    wrongButton2.style.backgroundColor = getRandomColor(); // ランダムな背景色

    // ボタンをシャッフル
    var buttons = [kokeshiButton, wrongButton1, wrongButton2];
    shuffleArray(buttons);

    // ボタンを追加
    document.getElementById("question-area").innerHTML = "";
    buttons.forEach(button => {
        document.getElementById("question-area").appendChild(button);
    });

    // クリックイベントを追加（遅延後に有効化）
    setTimeout(function() {
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
    }, 100); // 100ミリ秒後にクリックを有効化

    // タイマーを設定（2秒に変更）
    if (timer) clearTimeout(timer);
    timer = setTimeout(function() {
        if (!questionAnswered) {
            questionAnswered = true;
            console.log("2秒経過、次の問題へ");
            nextQuestion();
        }
    }, 2000); // 制限時間2秒

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
window.onload = function() {
    playBGM();
};

// ゲーム開始ボタン
document.getElementById("start-button").addEventListener("click", function() {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    playBGM(); // 再生状態を維持
    displayQuestion();
});
