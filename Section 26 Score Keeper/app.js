const p1 = {
    score: 0,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Display")
}

const p2 = {
    score: 0,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Display")
}

const resetButton = document.querySelector("#resetButton");
const winingScoreSelect = document.querySelector("#playto");

let winningScore = 3;
let isGameOver = false;

function updateScores(player, opponent) {
    if (!isGameOver) {
        player.display.textContent = ++player.score;
        if (player.score === winningScore) {
            isGameOver = true;
            player.display.classList.add('has-text-success');
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
    }
}

p1.button.addEventListener("click", function () {
    updateScores(p1, p2)
});

p2.button.addEventListener("click", function () {
    updateScores(p2, p1)
});

winingScoreSelect.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
});

resetButton.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    p1.score = 0;
    p2.score = 0;
    p1.display.textContent = 0;
    p2.display.textContent = 0;
    p2.display.classList.remove('has-text-danger', 'has-text-success');
    p1.display.classList.remove('has-text-danger', 'has-text-success');
    p1.button.disabled = false;
    p2.button.disabled = false;
}