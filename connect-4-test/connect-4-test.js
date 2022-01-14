//GLOBAL VARIABLES
let c = document.getElementById("Board");
var ctx = c.getContext('2d');
var resetBtn = document.getElementById("reset");
let boardW, boardH, boardArray, squareSize, color, canvasSize, boardTopMargin, playerTurn, countTurn, endGame, inRow;
let vx = 1;
let vy = 5;
//START GAME
setUp();
draw();
addController();

//FUNCTIONS
function setUp() {
  canvasSize = 400;
  inRow = 4;
  boardW = 7;
  boardH = 6;
  color = {
    "board": "#29B6F6",
    "player": {
      0: "white",
      1: "yellow",
      2: "red"
    },
    "tileShadow": "black",
    "textColor": "black"
  };
  playerTurn = 1;
  countTurn = 0;
  endGame = false;
  setUpBoard();
  setUpCanvas();
}

function setUpBoard() {
  boardArray = [];
  for (y = 0; y < boardH; y++) {
    let row = [];
    for (x = 0; x < boardW; x++) {
      row.push(0);
    }
    boardArray.push(row);
  }
}

function setUpCanvas() {
  if (boardH + 1 > boardW) {
    c.height = canvasSize;
    squareSize = canvasSize / (boardH + 1);
    c.width = boardW * squareSize;
  } else {
    c.width = canvasSize;
    squareSize = canvasSize / boardW;
    c.height = (boardH + 1) * squareSize;
  }
}

function draw() {
  ctx.fillStyle = color.board;
  ctx.fillRect(0, 0 + squareSize, boardW * squareSize, boardH * squareSize);
  ctx.setLineDash([5, 10]);
  for (y = 0; y < boardH; y++) {
    
    for (x = 0; x < boardW; x++) {
      rectArrondi(ctx, 8, 8, 40, 40, 10);
      drawTile(x, y + 1, boardArray[y][x]);
    }
  }
}

// function rectArrondi(ctx, x, y, largeur, hauteur, rayon) {
//   ctx.beginPath();
//   ctx.moveTo(x, y + rayon);
//   ctx.lineTo(x, y + hauteur - rayon);
//   ctx.quadraticCurveTo(x, y + hauteur, x + rayon, y + hauteur);
//   ctx.lineTo(x + largeur - rayon, y + hauteur);
//   ctx.quadraticCurveTo(x + largeur, y + hauteur, x + largeur, y + hauteur - rayon);
//   ctx.lineTo(x + largeur, y + rayon);
//   ctx.quadraticCurveTo(x + largeur, y, x + largeur - rayon, y);
//   ctx.lineTo(x + rayon,y);
//   ctx.quadraticCurveTo(x, y, x, y + rayon);
//   ctx.stroke();
// }

function drawTile(x, y, tileColor) {
  let centerX = (x * squareSize) + (squareSize / 2);
  let centerY = (y * squareSize) + (squareSize / 2);
  let tileSize = (squareSize * 0.8) / 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, tileSize, 0, 25 * Math.PI);
  ctx.fillStyle = color.player[tileColor];
  ctx.fill();


}

function addController() {
  c.addEventListener("mousemove", (e) => {
    let posX = Math.floor((e.clientX - c.offsetLeft) / squareSize);
    if (!endGame) {
      clearTopRow();
      drawTile(posX, 0, playerTurn);
    };
  })
  c.addEventListener("click", (e) => {
    let clickX = Math.floor((e.clientX - c.offsetLeft) / squareSize)
    if (!endGame) {
      for (y = boardH - 1; y >= 0; y--) {
        if (boardArray[y][clickX] == 0) {
          playMove(clickX, y);
          break;
        }
      }
    }
  })
}

function playMove(x, y) {
  countTurn++
  boardArray[y][x] = playerTurn;
  if (checkWin()) {
    setTimeout(alertWin, 300);
    draw();
  } else if (checkTie()) {
    setTimeout(alertTie, 300);
    draw();
  } else {
    switchPlayer();
    clearTopRow();
    drawTile(x, 0, playerTurn);
    draw();
  }
}

function clearTopRow() {
  ctx.clearRect(0, 0, c.width, squareSize);
}

function checkWin() {
  if (winDirections()) {
    endGame = true
    return true;
  }
}

function checkTie() {
  if (countTurn == boardW * boardH) {
    endGame = true;
    return true;
  }
}

function switchPlayer() {
  playerTurn == 1 ? playerTurn = 2 : playerTurn = 1;
}

function alertWin() {
  window.alert(`PUISSANCE 4 - Joueur ${playerTurn} a gagné !`);
}

function alertTie() {
  window.alert("PUISSANCE 4 - Le jeu est terminé, il y a égalité !");
}

function winDirections() {
  for (y = 0; y < boardH; y++) { //horizontal
    for (x = 0; x < boardW - 3; x++) {
      if (boardArray[y][x] == playerTurn && boardArray[y][x + 1] == playerTurn && boardArray[y][x + 2] == playerTurn && boardArray[y][x + 3] == playerTurn) return true;
    }
  }
  for (y = 0; y < boardH - 3; y++) { //vertical
    for (x = 0; x < boardW; x++) {
      if (boardArray[y][x] == playerTurn && boardArray[y + 1][x] == playerTurn && boardArray[y + 2][x] == playerTurn && boardArray[y + 3][x] == playerTurn) return true;
    }
  }
  for (y = 0; y < boardH - 3; y++) { //diagonal1
    for (x = 0; x < boardW - 3; x++) {
      if (boardArray[y][x] == playerTurn && boardArray[y + 1][x + 1] == playerTurn && boardArray[y + 2][x + 2] == playerTurn && boardArray[y + 3][x + 3] == playerTurn) return true;

    }
  }
  for (y = 3; y < boardH; y++) { //diagonal2
    for (x = 0; x < boardW - 3; x++) {
      if (boardArray[y][x] == playerTurn && boardArray[y - 1][x + 1] == playerTurn && boardArray[y - 2][x + 2] == playerTurn && boardArray[y - 3][x + 3] == playerTurn) return true;
    }
  }
  return false
}

resetBtn.addEventListener('click', function () {
  location.reload();
});