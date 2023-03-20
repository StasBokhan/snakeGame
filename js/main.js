const playBoard = document.querySelector(".play-board"),
  score = document.querySelector(".score"),
  highScore = document.querySelector(".high-score");

let scoreCount = 0;

let foodX = 13,
  foodY = 10;
let snakeX = 5,
  snakeY = 15,
  snakeBody = [];

let velocityX = 0,
  velocityY = 0;

let gameOver = false;

let setIntervalId = 0;

const chanfeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }

  initGame();
};

const gameOverMessage = () => {
  clearInterval(setIntervalId);
  alert("Game over, press OK to restart");
  localStorage.setItem("highscore", scoreCount);
  location.reload();
};

const initGame = () => {
  if (localStorage.getItem("highscore")) {
    highScore.innerHTML = `High Score : ${localStorage.getItem("highscore")}`;
  }

  if (gameOver) {
    return gameOverMessage();
  }
  let htmlMarkup = `<div class = "food" style = "grid-area: ${foodX} / ${foodY}"></div>`;

  if (snakeY === foodX && snakeX === foodY) {
    chanfeFoodPosition();
    snakeBody.push([foodX, foodY]);
    console.log(snakeBody);
    scoreCount++;
    score.innerHTML = `Score : ${scoreCount}`;
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY];

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
    gameOver = true;
  }

  for (let i = 0; i < snakeBody.length; i++) {
    htmlMarkup += `<div class = "head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = htmlMarkup;
};

chanfeFoodPosition();
setIntervalId = setInterval(initGame, 125);
initGame();

document.addEventListener("keydown", changeDirection);
