class Model {
    constructor() {
        this.player = 1;
        this.matrixW = 7;
        this.matrixH = 6;
        this.matrix = this.initializeMatrix();
    }


    bindRender(callback) {
        this.render = callback;
    }

    bindChangePLayer(callback){
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
        console.log(this.player);

        for (let x = 0; x < this.matrixH ; x++) {
            for (let y = 0; y < this.matrixW - 3; y++) {
                if (this.matrix[x][y] === this.player && this.matrix[x][y+1] === this.player && this.matrix[x][y+2] === this.player && this.matrix[x][y+3] === this.player) {
                    console.log("victoire horizontale");
                    return 1;
                }
            }
        }

        //check vertical
        for (let y = 0; y < this.matrixW; y++) {
            for (let x = 0; x < this.matrixH - 3; x++) {
                if (this.matrix[x][y] === this.player && this.matrix[x+1][y] === this.player && this.matrix[x+2][y] === this.player && this.matrix[x+3][y] === this.player) {
                   console.log("victoire varticale");
                    return 1;
                }
            }
        }
        return 0;
        //check diagonal bas gauche haut droit
        for (let x = 0; x < this.matrixW - 3; x++) {
            for (let y = 0; y < this.matrixH - 3; y++) {
                if (this.matrix[x][y] === this.player && this.matrix[x + 1][y + 1] === this.player && this.matrix[x + 2][y + 2] === this.player && this.matrix[x + 3][y + 3] === this.player) {
                    return 1;
                }
            }
        }

        //check diagonal
        for (let x = 3; x < this.matrixW; x++) {
            for (let y = 0; y < this.matrixH - 3; y++) {
                if (this.matrix[x][y] === this.player && this.matrix[x - 1][y + 1] === this.player && this.matrix[x - 2][y - 2] === this.player && this.matrix[x - 3][y - 3] === this.player) {
                    return 1;
                }
            }
        }
    }

    addToken(column) {
        let i = 5;

        console.log(this.matrix);
        do {
            if (this.matrix[i][column] === 0) {
                this.setMatrix(column, i);
                return i;
            } else if (i === 0) {
                return 567890;
            } else {
                i--
            }
        } while (1);

    }
}