const container = document.getElementById('container');
const smallGrid = document.getElementById('smallGrid');
const colorsGrid = document.getElementById('colorsGrid');

const colorPalette = [
    '#0000FF',
    '#4169E1',
    '#FFA500',
    '#FFFF00',
    '#00FF00',
    '#00FFFF',
    '#FF0000',
    '#8000FF',
    '#FF00FF',
    '#FF0080'
];

const SQUARES = 100;
const SMALL_SQUARES = 100;

let selectedColor = '#0000FF';
let smallSquares = [];

let currentLevel = 1;
let timeLeft = 60;
let score = 0;
let completedLevels = 0;
let gameTimer;
let isGameActive = false;
let isCheckingPattern = false;

const currentLevelElement = document.getElementById('currentLevel');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const completedLevelsElement = document.getElementById('completedLevels');
const startBtn = document.getElementById('startBtn');

function createColorPalette() {
    colorPalette.forEach((color, index) => {
        const colorOption = document.createElement('div');
        colorOption.classList.add('color-option');
        colorOption.style.backgroundColor = color;
        colorOption.dataset.color = color;
        
        if (index === 0) {
            colorOption.classList.add('selected');
        }
        
        colorOption.addEventListener('click', () => selectColor(colorOption, color));
        colorsGrid.appendChild(colorOption);
    });
}

function selectColor(element, color) {
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedColor = color;
}

function createSmallSquares() {
    smallGrid.innerHTML = '';
    smallSquares = [];
    
    let coloredSquaresCount;
    
    if (currentLevel <= 2) {
        coloredSquaresCount = 6;
    } else if (currentLevel <= 4) {
        coloredSquaresCount = 12;
    } else if (currentLevel <= 6) {
        coloredSquaresCount = 20;
    } else if (currentLevel <= 10) {
        coloredSquaresCount = 35;
    } else {
        coloredSquaresCount = 50;
    }
    
    const availableColors = colorPalette;
    
    for(let i = 0; i < SMALL_SQUARES; i++){
        const smallSquare = document.createElement('div');
        smallSquare.classList.add('small-square');
        smallSquare.style.backgroundColor = '#1d1d1d';
        smallSquares.push(smallSquare);
        smallGrid.appendChild(smallSquare);
    }
    
    const positions = [];
    for(let i = 0; i < SMALL_SQUARES; i++) {
        positions.push(i);
    }
    
    for(let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }
    
    for(let i = 0; i < coloredSquaresCount; i++) {
        const randomColor = availableColors[Math.floor(Math.random() * availableColors.length)];
        smallSquares[positions[i]].style.backgroundColor = randomColor;
    }
}

function createBigSquares() {
    for(let i = 0; i < SQUARES; i++){
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('click', () => setSquareColor(square));
        square.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            clearSquareColor(square);
        });
        
        container.appendChild(square);
    }
}

function clearSquareColor(square) {
    if (!isGameActive || isCheckingPattern) return;
    
    square.style.backgroundColor = '#1d1d1d';
    square.style.boxShadow = '0 0 2px #000';
    
    addSparkleEffect(square);
    checkPattern();
}

function setSquareColor(square) {
    if (!isGameActive || isCheckingPattern) return;
    
    square.style.backgroundColor = selectedColor;
    square.style.boxShadow = `0 0 2px ${selectedColor}, 0 0 10px ${selectedColor}`;
    
    addSparkleEffect(square);
    checkPattern();
}

function addSparkleEffect(square) {
    square.style.transform = 'scale(1.1)';
    square.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
        square.style.transform = 'scale(1)';
    }, 200);
}

function checkPattern() {
    if (isCheckingPattern) return;
    
    const bigSquares = document.querySelectorAll('.square');
    const smallSquares = document.querySelectorAll('.small-square');
    
    let matches = 0;
    let totalColored = 0;
    
    for (let i = 0; i < SMALL_SQUARES; i++) {
        const smallSquare = smallSquares[i];
        const bigSquare = bigSquares[i];
        
        const smallColor = smallSquare.style.backgroundColor;
        const bigColor = bigSquare.style.backgroundColor;
        
        if (smallColor !== 'rgb(29, 29, 29)' && smallColor !== '') {
            totalColored++;
            if (smallColor === bigColor) {
                matches++;
            }
        }
    }
    
    if (totalColored > 0 && matches === totalColored) {
        completeLevel();
    }
}

function completeLevel() {
    if (isCheckingPattern) return;
    
    isCheckingPattern = true;
    isGameActive = false;
    clearInterval(gameTimer);
    
    completedLevels++;
    updateDisplay();
    
    showCongratulations();
    
    setTimeout(() => {
        startNextLevel();
    }, 3000);
}

function showCongratulations() {
    const congratsDiv = document.createElement('div');
    congratsDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.95));
        color: #4ECDC4;
        font-size: 48px;
        font-weight: bold;
        text-align: center;
        padding: 50px;
        border-radius: 25px;
        border: 4px solid #4ECDC4;
        box-shadow: 0 0 30px #4ECDC4, inset 0 0 20px rgba(78, 205, 196, 0.2);
        z-index: 10000;
        animation: celebration 2s ease-in-out;
    `;
    
    congratsDiv.innerHTML = `
        <div style="font-size: 42px; margin-bottom: 25px; text-shadow: 0 0 20px #4ECDC4;">🎉 CONGRATULATIONS! 🎉</div>
        <div style="font-size: 28px; color: #FECA57; margin-bottom: 15px; text-shadow: 0 0 15px #FECA57;">Level ${currentLevel} Completed!</div>
        <div style="font-size: 20px; color: #FF6B6B; margin-top: 15px; text-shadow: 0 0 10px #FF6B6B;">Level ${currentLevel + 1} starting...</div>
        <div style="font-size: 16px; color: #4ECDC4; margin-top: 20px;">Completed Levels: ${completedLevels}</div>
    `;
    
    document.body.appendChild(congratsDiv);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes celebration {
            0% { 
                transform: translate(-50%, -50%) scale(0.3) rotate(-10deg); 
                opacity: 0; 
            }
            50% { 
                transform: translate(-50%, -50%) scale(1.1) rotate(5deg); 
                opacity: 1; 
            }
            100% { 
                transform: translate(-50%, -50%) scale(1) rotate(0deg); 
                opacity: 1; 
            }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.removeChild(congratsDiv);
        document.head.removeChild(style);
    }, 3000);
}

function startNextLevel() {
    showCountdown(() => {
        nextLevel();
        isCheckingPattern = false;
    });
}

function showCountdown(callback) {
    let count = 3;
    const countdownDiv = document.createElement('div');
    countdownDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #FF6B6B;
        font-size: 72px;
        font-weight: bold;
        text-align: center;
        padding: 40px;
        border-radius: 20px;
        border: 3px solid #FF6B6B;
        z-index: 10000;
        animation: zoom 1s ease-in-out;
    `;
    
    document.body.appendChild(countdownDiv);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes zoom {
            0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    const countdown = setInterval(() => {
        countdownDiv.textContent = count;
        count--;
        
        if (count < 0) {
            clearInterval(countdown);
            document.body.removeChild(countdownDiv);
            document.head.removeChild(style);
            callback();
        }
    }, 1000);
    
    countdownDiv.textContent = count;
}

function getRandomColor(){
    return colorPalette[Math.floor(Math.random() * colorPalette.length)];
}

function getTimeForLevel(level) {
    if (level <= 3) {
        return 90;
    } else if (level <= 6) {
        return 75;
    } else if (level <= 10) {
        return 60;
    } else {
        return 45;
    }
}

function startGame() {
    isGameActive = true;
    timeLeft = getTimeForLevel(1);
    score = 0;
    currentLevel = 1;
    
    startBtn.disabled = true;
    startBtn.textContent = 'Game in Progress...';
    
    updateDisplay();
    startTimer();
    createNewPattern();
}

function startTimer() {
    gameTimer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function updateDisplay() {
    currentLevelElement.textContent = currentLevel;
    timerElement.textContent = timeLeft;
    scoreElement.textContent = score;
    completedLevelsElement.textContent = completedLevels;
}

function endGame() {
    isGameActive = false;
    clearInterval(gameTimer);
    
    startBtn.disabled = false;
    startBtn.textContent = 'Restart';
    
    alert(`Game Over! Score: ${score} | Level: ${currentLevel}`);
}

function resetGame() {
    isGameActive = false;
    clearInterval(gameTimer);
    
    startBtn.disabled = false;
    startBtn.textContent = 'Start';
    
    timeLeft = getTimeForLevel(1);
    score = 0;
    currentLevel = 1;
    completedLevels = 0;
    
    updateDisplay();
    clearBigSquares();
}

function nextLevel() {
    currentLevel++;
    timeLeft = getTimeForLevel(currentLevel); // Level'e göre süre
    score += 100;
    isGameActive = true;
    createNewPattern();
    updateDisplay();
    startTimer();
}

function createNewPattern() {
    createSmallSquares();
    clearBigSquares();
}

function clearBigSquares() {
    const squares = document.querySelectorAll('.square');
    squares.forEach(square => {
        square.style.backgroundColor = '#1d1d1d';
        square.style.boxShadow = '0 0 2px #000';
    });
}

startBtn.addEventListener('click', startGame);

createColorPalette();
createBigSquares();
resetGame();