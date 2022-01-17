class View {
    constructor(div_id) {
        this.div_id = div_id;
        this.p_tag;
        this.initView();
        this.gameBoard = document.getElementById("gameBoard");
        this.tokens = document.getElementById("tokens");
    }

    // Binding.
    bindGetCNF(callback) {
        this.getCNF = callback; // On veut pouvoir demander au Model (depuis le Controller) une nouvelle Chuck Norris Fact.
    }

    initView() {
        let div = document.querySelector(`#${this.div_id}`);
        this.p_tag = document.createElement('h1');
        this.p_tag.innerHTML = 'PUISSANCE 4';
        var ctxGameBoard = this.gameBoard.getContext("2d");
        var ctxTokens = this.tokens.getContext("2d");
        let buttonReset = document.createElement('button');
        buttonReset.innerHTML = 'Recommencer';
        buttonReset.addEventListener('click', () => {
            location.reload();
        });
        


        var squareSize = 60;
        var rows = 7;
        var columns = 6
        var circleRayon = squareSize / 2;
        var tokenSize = squareSize / 3;

        this.gameBoard.height = squareSize * rows;
        this.gameBoard.width = squareSize * (columns + 1);

        this.tokens.height = squareSize * rows;
        this.tokens.width = squareSize * (columns + 1);

        ctxGameBoard.fillStyle = "blue";
        ctxGameBoard.fillRect(0, 0 + squareSize, gameBoard.width * squareSize, gameBoard.height - squareSize);
        
        for (var i = 0; i < rows; i++) {
            for (var y = 0; y < columns; y++) {
                ctxGameBoard.globalCompositeOperation = 'destination-out';
                ctxGameBoard.arc(2 * i * circleRayon + circleRayon, 2 * y * circleRayon + circleRayon + squareSize, tokenSize, 0, Math.PI * 2)
                ctxGameBoard.fill();
                ctxGameBoard.closePath();
            }
            ctxGameBoard.beginPath();
        }
        div.appendChild(this.p_tag);
        div.appendChild(this.gameBoard);
        div.appendChild(this.tokens);
        div.appendChild(buttonReset);
    }

    displayCNF(cnf_value) {
        if (this.p_tag) {
            this.p_tag.innerHTML = cnf_value;
        }
    }

    addController() {
        this.gameBoard.addEventListener("mousemove", (e) => {
          let posX = Math.floor((e.clientX - this.gameBoard.offsetLeft) / squareSize);
          if (!endGame) {
            clearTopRow();
            drawTile(posX, 0, playerTurn);
          };
        })
        this.gameBoard.addEventListener("click", (e) => {
          let clickX = Math.floor((e.clientX - this.gameBoard.offsetLeft) / squareSize)
          if (!endGame) {
            for (y = rows - 1; y >= 0; y--) {
              if (boardArray[y][clickX] == 0) {
                playMove(clickX, y);
                break;
              }
            }
          }
        })
    }
}

function setmatrix(matrix, columns, rows) {
    for (var i = 0; i < columns; i++) {
        matrix = new Array(rows);
        for (let y = 0; y < rows; y++) {
            matrix[i][y] = 0;
        }
    }
    return matrix;
};

function drawToken(ctx, x, y, color){
    ctx.arc(2 * x * 30 + 30, 2 * y * 30 + 30 + 60, 20, 0, Math.PI * 2)
    ctx.fillStyle = color;
    ctx.fill();

};