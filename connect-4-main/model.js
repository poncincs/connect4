class Model {
  constructor() {
    this.player = 0;
    this.matrixW = 7;
    this.matrixH = 6;
    this.matrix = this.initializeMatrix();



  }

  // Binding.
  bindDisplayCNF(callback) {
    // Définition d'une nouvelle propriété pouvant être utilisée à partir d'une instance de Model.
    this.DisplayCNF = callback; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
  }

  bindRenderPlayer(callback) {
    this.render = callback;
  }

  getCNF() {
    fetch(this.URL)
      .then(response => response.json())
      .then(response => {
        let text = 'No Chuck Norris Fact found.';
        if (response.value) {
          text = response.value;
        }
        this.DisplayCNF(text);
      })
      .catch(error => {
        console.log("Error : " + error);
      });
  }

  initializeMatrix() {
    this.matrix = [];
    let row = [];
    for(let i = 0 ; i<this.matrixW ; i++){
      row = [];
      for (let j ; j<this.matrixH ; j++){
        row.push(0);
      }
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
      let i = 0;
      do {
        if (this.matrix[column][i] === 0){
          this.setMatrix(column,i);
          return 0;
        }else if (i === 7){
          return 1;
        } else{
          i++
        }
      }while (1);

    }
}