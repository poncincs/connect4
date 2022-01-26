class View {
    constructor(div_id) {
        this.div_id = div_id;
        this.squareSize = 60;
        this.rows = 7;
        this.columns = 6;
        this.circleRayon = this.squareSize / 2;
        this.tokenSize = this.squareSize / 3;
        this.gameBoard = document.getElementById("gameBoard");
        this.tokens = document.getElementById("tokens");
        this.ctxGameBoard = this.gameBoard.getContext("2d");
        this.ctxTokens = this.tokens.getContext("2d");
        this.initView();
        this.player;

        this.addController();
    }

    // Binding.
    bindChangePlayer(callback) {
        this.changePlayer = callback;
    }

    bindSetMatrix(callback) {
        this.setMatrix = callback;
    }

    bindAddToken(callback) {
        this.addToken = callback;
    }

    bindCheckWin(callback) {
        this.checkWin = callback;
    }


    initView() {
        let div = document.querySelector(`#${this.div_id}`);
        this.p_tag = document.createElement('h1');
        this.p_tag.innerHTML = 'CONNECT 4';

        let buttonReset = document.createElement('button');
        buttonReset.innerHTML = 'Recommencer';
        buttonReset.addEventListener('click', () => {
            location.reload();
        });

        let player1Selector = document.getElementById("player1");
        let player2Selector = document.getElementById("player2");

        if (player2Selector.checked = "true") {
            this.player = "yellow";
        }

        if (player1Selector.checked = "true") {
            this.player = "red";
        }

        player1Selector.addEventListener("change", () => {
            if (confirm("Start with Red token ?")) {
                this.player = this.changePlayer();
                location.reload();
            } else {
                player2Selector.checked = "true";
            }

        });

        player2Selector.addEventListener("change", () => {
            if (confirm("Start with Yellow token ?")) {
                this.player = this.changePlayer();
                location.reload();
            } else {
                player1Selector.checked = "true";
            }
        });

        this.gameBoard.height = this.squareSize * this.rows;
        this.gameBoard.width = this.squareSize * (this.columns + 1);

        this.tokens.height = this.squareSize * this.rows;
        this.tokens.width = this.squareSize * (this.columns + 1);

        this.ctxGameBoard.fillStyle = "blue";
        this.ctxGameBoard.fillRect(0, this.squareSize, this.gameBoard.width * this.squareSize, this.gameBoard.height - this.squareSize);

        this.ctxGameBoard.globalCompositeOperation = 'destination-out';
        for (let i = 0; i < this.rows; i++) {
            for (let y = 0; y < this.columns; y++) {
                this.ctxGameBoard.arc(2 * i * this.circleRayon + this.circleRayon, 2 * y * this.circleRayon + this.circleRayon + this.squareSize, this.tokenSize, 0, Math.PI * 2)
                this.ctxGameBoard.fill();
                this.ctxGameBoard.closePath();
            }
            this.ctxGameBoard.beginPath();
        }

        div.appendChild(this.p_tag);
        div.appendChild(this.gameBoard);
        div.appendChild(this.tokens);
        div.appendChild(buttonReset);
    }


    addController() {
        this.gameBoard.addEventListener("mousemove", (e) => {
            let position = Math.floor((e.clientX - this.gameBoard.offsetLeft) / this.squareSize);
            this.clearTopRow(0);
            this.drawTokenTop(position, 0, this.player);
        });
        this.gameBoard.addEventListener("click", (e) => {
            this.gameBoard.style.pointerEvents = "none";
            let position = Math.floor((e.clientX - this.gameBoard.offsetLeft) / this.squareSize);
            this.newMove(position);
        });
    }

    clearTopRow(y) {
        this.ctxTokens.clearRect(0, y, 420, 60);
    }


    newMove(positionX) {
        let column = this.addToken(positionX);
        this.drawToken2(positionX, column + 1, this.player,0, 1);
        let winnerMatrix = this.checkWin();
        if (winnerMatrix != 0) {
            this.drawWinner(winnerMatrix);
            this.p_tag.innerHTML = 'VICTORY !!';
            var victoire = document.getElementById("victory");
            var close = document.getElementsByClassName("close")[0];
            var modalBody = document.getElementById("modal-body")
            var playerWin = document.createElement('h3');
            playerWin.setAttribute("id", "winner");
            playerWin.innerHTML = `Player ${this.player} win !`;
            modalBody.appendChild(playerWin);
            victoire.style.display = "block";
            close.onclick = function() {
                victoire.style.display = "none";
            }
            window.onclick = function(event) {
                if (event.target == victoire) {
                    victoire.style.display = "none";
                }
            }
            return;
        }
        this.player = this.changePlayer();
        this.clearTopRow();
        this.gameBoard.style.pointerEvents = "auto";
    }



    drawWinner(matrixCoord) {
        for (let i = 0; i < 4; i++) {
            this.drawToken(matrixCoord[i][1], matrixCoord[i][0] + 1, "#00FF00");
        }
    }


   drawTokenTop(x, y, color) {
        let centerX = (x * this.squareSize) + (this.squareSize / 2);
        let centerY = (y * this.squareSize) + (this.squareSize / 2);
        let tileSize = (this.squareSize * 0.8) / 2;
        this.ctxTokens.beginPath();
        this.ctxTokens.fillStyle = color;
        this.ctxTokens.arc(centerX, centerY, tileSize, 0, Math.PI * 2)
        this.ctxTokens.fill();
    }


    drawToken2(x, y, color, sens, firstCall) {
        let centerX = (x * this.squareSize) + (this.squareSize / 2);

        if (sens ==0  && firstCall == 1){

            var yPos = 0;
            var yfinal = (y * this.squareSize) + (this.squareSize / 2) - 30;

        }else if (sens == 0 && firstCall !=1){

            var yPos = (y * this.squareSize) + (this.squareSize / 2) - 30;
            var yfinal = (y * this.squareSize) + (this.squareSize / 2) - 30;

        } else{
            var yPos = (y * this.squareSize) + (this.squareSize / 2) - 30;
            var yfinal = ((y * this.squareSize) + (this.squareSize / 2) - 30)*0.8;

        }



        let tileSize = (this.squareSize * 0.8) / 2;

        let b = setInterval(() => {draw()},1);



        let draw = () => {
            console.log("cc");
            this.clearToken(x * 60, yPos-1);


            this.ctxTokens.beginPath();
            this.ctxTokens.arc(centerX, yPos + 30, tileSize, 0, Math.PI * 2);
            this.ctxTokens.fillStyle = color;
            this.ctxTokens.fill();

            if (yPos === yfinal){
                clearInterval(b);
                yfinal *= 0.2;
                console.log(yfinal,yPos);
                console.log(sens);

                if (sens == 0){
                    sens = 1;
                } else if (sens === 1){
                    sens = 0;
                }

                this.drawToken2(x,y,color,sens, 0);
            }

            if (sens === 0){
                console.log(y);

                yPos+=6;

                console.log(y);
                console.log(yPos,yfinal);

                debugger;
            }else {
                yPos--;
                console.log(y);
                console.log(yPos,yfinal);
                debugger
            }


        }

    }

    clearToken(x, y) {
        this.ctxTokens.clearRect(x, y, 60, 60);
    }
}


