const simonGame = document.querySelector('.game-container');
const topLeft = document.querySelector('.top-left-panel');
const topRight = document.querySelector('.top-right-panel');
const bottomLeft = document.querySelector('.bottom-left-panel');
const bottomRight = document.querySelector('.bottom-right-panel');
const countValue = document.getElementById('count');
const innercircleHeading = document.getElementById('innercircleHeading');
const startBtn = document.querySelector('.start-btn');
const newgameBtn = document.querySelector('.newgame-btn');
const stopBtn = document.querySelector('.stop-btn');
const pauseBtn = document.querySelector('.pause-btn');

let noise = true;

const getRandomPanel = () => {
    const panels = [
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    ]
    return panels[parseInt(Math.random() * panels.length)];
}

let sequence = [getRandomPanel()];
let sequenceToGuess = [...sequence];

const flash = (panel) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (panel == topLeft) one();
            if (panel == topRight) two();
            if (panel == bottomLeft) three();
            if (panel == bottomRight) four();
            setTimeout(() => {
                clearColor();
                resolve();
            }, 250);
        }, 1000);
    });
};

function one() {
    let audio = document.getElementById("clip1");
    audio.play();
    topLeft.style.backgroundColor = "lightgreen";
}

function two() {
    let audio = document.getElementById("clip2");
    audio.play();
    topRight.style.backgroundColor = "tomato";
}

function three() {
    let audio = document.getElementById("clip3");
    audio.play();
    bottomLeft.style.backgroundColor = "yellow";
}

function four() {
    let audio = document.getElementById("clip4");
    audio.play();
    bottomRight.style.backgroundColor = "lightskyblue";
}

function clearColor() {
    topLeft.style.backgroundColor = "darkgreen";
    topRight.style.backgroundColor = "darkred";
    bottomLeft.style.backgroundColor = "goldenrod";
    bottomRight.style.backgroundColor = "darkblue";
}

let canClick = false;

const panelClicked = (panelClicked) => {
    if (!canClick) return;
    const expectedPanel = sequenceToGuess.shift();
    if (expectedPanel === panelClicked) {
        if (sequenceToGuess.length === 0) {
            // start new game
            sequence.push(getRandomPanel());
            sequenceToGuess = [...sequence];
            startGame();
        }
    } else {
        // end game
        countValue.innerHTML = 0;
        sequence = [getRandomPanel()];
        sequenceToGuess = [...sequence];
        flashColor();
        appear();
    };
}

function flashColor() {
    topLeft.style.backgroundColor = "lightgreen";
    topRight.style.backgroundColor = "tomato";
    bottomLeft.style.backgroundColor = "yellow";
    bottomRight.style.backgroundColor = "lightskyblue";
}

// functions to set up panels
topLeft.addEventListener('click', (event) => {
    if (canClick) {
        one();
    }
    setTimeout(() => {
        clearColor();
    }, 300);
})
topRight.addEventListener('click', (event) => {
    if (canClick) {
        two();
    }
    setTimeout(() => {
        clearColor();
    }, 300);
})
bottomLeft.addEventListener('click', (event) => {
    if (canClick) {
        three();
    }
    setTimeout(() => {
        clearColor();
    }, 300);
})
bottomRight.addEventListener('click', (event) => {
    if (canClick) {
        four();
    }
    setTimeout(() => {
        clearColor();
    }, 300);
})

// =======================start the game========================

const gameBtnsWrapper = document.querySelector(".gameBtns-wrapper");
const startBtnWrapper = document.querySelector(".startBtn-wrapper");

const startGame = async () => {
    startBtnWrapper.style.display = 'none';
    innercircleHeading.style.display = 'none';
    gameBtnsWrapper.style.display = 'flex';
    countValue.style.display = 'block';
    countValue.innerHTML++;

    for (let panel of sequence) {
        await flash(panel);
    }
    canClick = true;
}

startBtn.addEventListener("click", startGame);


// =======================gameOver========================

const gameOverText = document.querySelector(".gameOver-text");
const gameOverBtn = document.querySelector(".gameOver-Btn");

function appear() {
    cardWrappers[1].style.display = "block";
    gameOverText.innerHTML = `Your score: ${countValue.value}`;
    simonGame.style.filter = "blur(10px)"
}

const stopGame = async () => {
    countValue.innerHTML = 0;
    sequence = [getRandomPanel()];
    sequenceToGuess = [...sequence];
    countValue.style.display = 'none';
    startBtnWrapper.style.display = 'flex';
    gameBtnsWrapper.style.display = 'none';
    innercircleHeading.style.display = 'block';
}

gameOverBtn.addEventListener("click", stopGame);


// ============================================================


const prBtns = document.querySelectorAll("#prBtn");
const closeBtns = document.querySelectorAll(".close-btn");
const cardWrappers = document.querySelectorAll(".card-wrapper");

prBtns.forEach((prBtn, index) => {
    prBtn.addEventListener("click", () => {
    cardWrappers[index].style.display = "block";
    simonGame.style.filter = "blur(10px)";
    });
});

closeBtns.forEach((closeBtn, index) => {
    closeBtn.addEventListener("click", () => {
    cardWrappers[index].style.display = "none";
    simonGame.style.filter = "blur(0)";
    canClick = true;
    });
});

cardWrappers.forEach((cardWrapper) => {
    cardWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("card-wrapper")) {
        cardWrapper.style.display = "none";
        simonGame.style.filter = "blur(0)";
    }
    });
});
