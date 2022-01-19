class View {
  constructor(div_id) {
    this.div_id = div_id;
    this.p_tag;
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
    this.addController();
  }

  // Binding.
  bindChangePlayer(callback) {
    this.changePlayer = callback; // On veut pouvoir demander au Model (depuis le Controller) une nouvelle Chuck Norris Fact.
  }

  initView() {
    let div = document.querySelector(`#${this.div_id}`);
    this.p_tag = document.createElement('h1');
    this.p_tag.innerHTML = 'PUISSANCE 4';

    let buttonReset = document.createElement('button');
    buttonReset.innerHTML = 'Recommencer';
    buttonReset.addEventListener('click', () => {
      location.reload();
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

  drawToken(x, y, color) {
    this.ctxTokens.beginPath();
    this.ctxTokens.fillStyle = color;
    this.ctxTokens.arc(2 * x * 30 + 30, 2 * y * 30 + 30, 20, 0, Math.PI * 2)
    console.log("yooo");
    this.ctxTokens.fill();
  }

  addController() {
    this.gameBoard.addEventListener("mousemove", (e) => {
      let position = Math.floor((e.clientX - this.gameBoard.offsetLeft) / this.squareSize);
      console.log(position);
      this.drawToken(position, 0, "red");
      clearTopRow();
    });
    // this.gameBoard.addEventListener("click", (e) => {
    //   let clickX = Math.floor((e.clientX - c.offsetLeft) / squareSize)
    //   this.drawToken(clickX, 3, "red");
    // });
  }

  clearTopRow() {
    this.ctxTokens.clearRect(0, 0, 420, 60);
  }

  renderPlayer(){

  }
}

