class Model {
  constructor() {
    this.matrix = this.initializeMatrix
    this.player = 0;
    this.matrixW = 7;
    this.matrixH = 6;
  }

  // Binding.
  bindDisplayCNF(callback) {
    // Définition d'une nouvelle propriété pouvant être utilisée à partir d'une instance de Model.
    this.DisplayCNF = callback; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
  }

  bindRender(callback) {
    this.render = callback;
  }

  bindInitializeMatrix(callback) {
    this.initMatrix = callback;
  }

  bindRenderPlayer(callback) {
    this.renderPlayer = callback;
  }

  // getCNF() {
  //   fetch(this.URL)
  //     .then(response => response.json())
  //     .then(response => {
  //       let text = 'No Chuck Norris Fact found.';
  //       if (response.value) {
  //         text = response.value;
  //       }
  //       this.DisplayCNF(text);
  //     })
  //     .catch(error => {
  //       console.log("Error : " + error);
  //     });
  // }

  initializeMatrix(columns, rows) {
    for (var i = 0; i < columns; i++) {
      this.matrix = new Array(rows);
      for (let y = 0; y < rows; y++) {
        this.matrix[i][y] = 0;
      }
    }
  };

  setMatrix(columns, rows) {
    this.matrix[columns][rows] = this.player;
  };

  changePlayer() {
    if (this.player == 0) {
      this.player = 1;
      this.renderPlayer(this.player);
    } else {
      this.player = 0;
      this.renderPlayer(this.player);
    }
  }

  checkWin() {
    //check horizontal
    for (let x = 0; x < this.matrixW - 3; x++) {
      for (let y = 0; y < this.matrixH; y++) {
        if (this.matrix[x][y] == this.player && this.matrix[x + 1][y] == this.player && this.matrix[x + 2][y] == this.player && this.matrix[x + 3][y] == this.player) {
          return 1;
        }
      }
    }

    //check vertical
    for (let x = 0; x < this.matrixW; x++) {
      for (let y = 0; y < this.matrixH - 3; y++) {
        if (this.matrix[x][y] == this.player && this.matrix[x][y + 1] == this.player && this.matrix[x][y + 2] == this.player && this.matrix[x][y + 3] == this.player) {
          return 1;
        }
      }
    }

    //check diagonal bas gauche haut droit
    for (let x = 0; x < this.matrixW - 3; x++) {
      for (let y = 0; y < this.matrixH - 3; y++) {
        if (this.matrix[x][y] == this.player && this.matrix[x + 1][y + 1] == this.player && this.matrix[x + 2][y + 2] == this.player && this.matrix[x + 3][y + 3] == this.player) {
          return 1;
        }
      }
    }

    //check diagonal bas droit haut gauche
    for (let x = 3; x < this.matrixW; x++) {
      for (let y = 0; y < this.matrixH - 3; y++) {
        if (this.matrix[x][y] == this.player && this.matrix[x - 1][y + 1] == this.player && this.matrix[x - 2][y - 2] == this.player && this.matrix[x - 3][-3] == this.player) {
          return 1;
        }
      }
    }
  }
}