class Model {
  constructor() {
    this.matrix = this.initializeMatrice
  }

  // Binding.
  bindDisplayCNF(callback) {
    // Définition d'une nouvelle propriété pouvant être utilisée à partir d'une instance de Model.
    this.DisplayCNF = callback; // On veut pouvoir actualiser la View (depuis le Controller) quand nous récupérons les données.
  }

  bindRender(callback) {
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

  initializeMatrice(columns, rows) {
    for (var i = 0; i < columns; i++) {
      let matrix = new Array(rows);
      for (let y = 0; y < rows; y++) {
        matrix[i][y] = 0;
      }
    }
    return matrix;
  };

  
}