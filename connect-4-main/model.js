class Model {
    constructor() {
        this.player = 1;
        this.matrixW = 7;
        this.matrixH = 6;
        this.matrix = this.initializeMatrix();
        this.changePlayer();
    }


    bindRender(callback) {
        this.render = callback;
    }

    bindChangePLayer(callback) {
        this.changePlayer = callback;
    }

    bindRenderPlayer(callback) {
        this.renderPlayer = callback;
    }


    initializeMatrix() {
        let matrix = [];
        let row = [];
        for (let i = 0; i < this.matrixH; i++) {
            row = [];
            for (let j = 0; j < this.matrixW; j++) {
                row.push(0);
            }
            matrix.push(row);
        }
        return matrix;
    };

    setMatrix(columns, rows) {
        this.matrix[rows][columns] = this.player;
    };

    changePlayer() {
        if (this.player === 1) {
            this.player = 2;
            return "red";
        } else {
            this.player = 1;
            return "yellow";
        }
    }

    checkWin() {
        //check horizontal
        for (let x = 0; x < this.matrixH; x++) {
            for (let y = 0; y < this.matrixW - 3; y++) {
                if (this.matrix[x][y] === this.player && this.matrix[x][y + 1] === this.player && this.matrix[x][y + 2] === this.player && this.matrix[x][y + 3] === this.player) {

                    let winPositon = this.createWinnerMatrix();

                    winPositon[0][0] = x;
                    winPositon[0][1] = y;

                    winPositon[1][0] = x;
                    winPositon[1][1] = y + 1;

                    winPositon[2][0] = x;
                    winPositon[2][1] = y + 2;

                    winPositon[3][0] = x;
                    winPositon[3][1] = y + 3;

                    return winPositon;
                }
            }
        }
        //check vertical
        for (let y = 0; y < this.matrixW; y++) {
            for (let x = 0; x < this.matrixH - 3; x++) {
                if (this.matrix[x][y] === this.player && this.matrix[x + 1][y] === this.player && this.matrix[x + 2][y] === this.player && this.matrix[x + 3][y] === this.player) {
                    let winPositon = this.createWinnerMatrix();

                    winPositon[0][0] = x;
                    winPositon[0][1] = y;

                    winPositon[1][0] = x + 1;
                    winPositon[1][1] = y;

                    winPositon[2][0] = x + 2;
                    winPositon[2][1] = y;

                    winPositon[3][0] = x + 3;
                    winPositon[3][1] = y;

                    return winPositon;
                }
            }
        }
        //check diagonal bas gauche haut droit
        for (let x = 0; x < this.matrixH - 3; x++) {
            for (let y = 0; y < this.matrixW - 3; y++) {
                if (this.matrix[x][y] === this.player && this.matrix[x + 1][y + 1] === this.player && this.matrix[x + 2][y + 2] === this.player && this.matrix[x + 3][y + 3] === this.player) {

                    let winPositon = this.createWinnerMatrix();

                    winPositon[0][0] = x;
                    winPositon[0][1] = y;

                    winPositon[1][0] = x + 1;
                    winPositon[1][1] = y + 1;

                    winPositon[2][0] = x + 2;
                    winPositon[2][1] = y + 2;

                    winPositon[3][0] = x + 3;
                    winPositon[3][1] = y + 3;

                    return winPositon;
                }
            }
        }
        //check diagonal
        for (let x = 0; x < this.matrixH - 3; x++) {
            for (let y = this.matrixW; y > 3; y--) {
                if (this.matrix[x][y] === this.player && this.matrix[x + 1][y - 1] === this.player && this.matrix[x + 2][y - 2] === this.player && this.matrix[x + 3][y - 3] === this.player) {

                    let winPositon = this.createWinnerMatrix();

                    winPositon[0][0] = x;
                    winPositon[0][1] = y;

                    winPositon[1][0] = x + 1;
                    winPositon[1][1] = y - 1;

                    winPositon[2][0] = x + 2;
                    winPositon[2][1] = y - 2;

                    winPositon[3][0] = x + 3;
                    winPositon[3][1] = y - 3;


                    return winPositon;
                }
            }
        }
        return 0;
    }

    addToken(column) {
        let i = 5;

        do {
            if (this.matrix[i][column] === 0) {
                this.setMatrix(column, i);
                return i;
            } else if (i === 0) {
                alert("You can't put this token, the column is already full !");
                return 567890;
            } else {
                i--
            }
        } while (1);

    }

    createWinnerMatrix() {
        let matrix = [];
        let row = [];
        for (let i = 0; i < 4; i++) {
            row = [];
            for (let j = 0; j < 2; j++) {
                row.push(0);
            }
            matrix.push(row);
        }
        return matrix;
    }

    /*minimax(position, depth, alpha, beta, maximizingPlayer) {
        if (depth === 0 || (checkWin() === 1)){
            return this.evaluation(position);
        }
        if (maximizingPlayer) {
            maxEval = -10000;
            for (child in position) {
                evalNode = this.minimax(child, depth-1, alpha, beta, false);
                maxEval = max(maxEval, evalNode);
                alpha = max(alpha, evalNode);
                if (beta <= alpha) {
                    break;
                }
            }
            return maxEval;
        } else {
            minEval = +10000;
            for (child in position) {
                evalNode = this.minimax(child, depth-1, alpha, beta, true);
                minEval = min(minEval, evalNode);
                beta = min(beta, evalNode);
                if (beta <= alpha) {
                    break;
                }
            }
            return minEval;
        }
    }*/

    evaluation(position) {
        for (let i = 0; i < this.matrixH; i++ ){
            let check = position[i].join("");
        }
        //Horizontal

        if (check & (check >> 14)) {
            return true;
        }

        //Diagonal
        check = position & (position >> 6);
        if (check & (check >> 12)) {
            return true;
        }

        //Diagonal
        check = position & (position >> 8);
        if (check & (check >> 16)) {
            return true;
        }

        //Vertical
        check = position & (position >> 1);
        if (check & (check >> 2)) {
            return true;
        }

        return false;
    }
}