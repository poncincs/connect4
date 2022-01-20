class Model {
  constructor() {
    this.player = 1;
    this.matrixW = 7;
    this.matrixH = 6;
    this.matrix = this.initializeMatrix();



  }


  initializeMatrix() {
    this.matrix = [];
    let row = [];
    for(let i = 0 ; i<this.matrixW ; i++){
      row = [];
      for (let j = 0; j<this.matrixH ; j++){
        row.push(0);
      }
      this.matrix.push(row);
    }
  };

    setMatrix(columns, rows) {
        this.matrix[columns][rows] = this.player;
    };

    changePlayer(){
      if (this.player === 0){
        this.player = 1;
      }else {
        this.player = 0;
      }
    }

    checkWin(){
      //check horizontal
      for (let x = 0 ; x < this.matrixW - 3 ; x++){
        for (let y = 0 ; y < this.matrixH ; y++){
          if ( this.matrix[x][y] === this.player && this.matrix[x+1][y] === this.player && this.matrix[x+2][y] === this.player && this.matrix[x+3][y] === this.player){
            return 1;
          }
        }
      }

      //check vertical
      for (let x = 0 ; x < this.matrixW ; x++){
        for (let y = 0 ; y < this.matrixH -3 ; y++){
          if ( this.matrix[x][y] === this.player && this.matrix[x][y+1] === this.player && this.matrix[x][y+2] === this.player && this.matrix[x][y+3] === this.player){
            return 1;
          }
        }
      }

      //check diagonal bas gauche haut droit
      for (let x = 0 ; x < this.matrixW - 3 ; x++){
        for (let y = 0 ; y < this.matrixH - 3 ; y++){
          if ( this.matrix[x][y] === this.player && this.matrix[x+1][y+1] === this.player && this.matrix[x+2][y+2] === this.player && this.matrix[x+3][y+3] === this.player){
            return 1;
          }
        }
      }

      //check diagonal
      for (let x = 3; x < this.matrixW ; x++){
        for (let y = 0 ; y < this.matrixH - 3 ; y++){
          if ( this.matrix[x][y] === this.player && this.matrix[x-1][y+1] === this.player && this.matrix[x-2][y-2] === this.player && this.matrix[x-3][-3] === this.player){
            return 1;
          }
        }
      }
    }

    addToken(column){
      let i = 6;
      do {
        if (this.matrix[i][column] === 0){
          this.setMatrix(i,column);
          return 0;
        }else if (i === 0){
          return 1;
        } else{
          i--
        }
      }while (1);

  }
}