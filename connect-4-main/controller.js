class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    /*** Bindings ***
      La fonction bind() permet de sceller le contexte dans lequel la fonction sera appelée.
      Dans cet exemple, on veut toujours que les fonctions bindDisplayCNF() et bindGetCNF() (de cette classe) soient appelées dans le contexte du Controller.
      Ce contexte est primordial car il permet d'accéder aux attributs de notre classe.
      ---
      Sans la fonction bind(), les différentes fonctions passées en callback seraient appelées dans le contexte de la classe qu'il l'exécute.
      Par conséquent, nous ne pourrions pas accéder à la View depuis le Model ou au Model depuis la View.
    */
    this.bindDisplayCNF = this.bindDisplayCNF.bind(this);
    this.model.bindDisplayCNF(this.bindDisplayCNF);

    this.bindChangePlayer = this.bindChangePlayer.bind(this);
    this.view.bindChangePlayer(this.bindChangePlayer);

    /*this.bindRender = this.bindRender.bind(this);
    this.model.bindRender(this.bindRender)*/;

    this.bindSetMatrix = this.bindSetMatrix.bind(this);
    this.view.bindSetMatrix(this.bindSetMatrix);

    this.bindInitializeMatrix = this.bindInitializeMatrix.bind(this);
    this.model.bindRender(this.bindInitializeMatrix);

    this.bindRenderPlayer = this.bindRenderPlayer.bind(this);
    this.model.bindRenderPlayer(this.bindRenderPlayer);

    this.bindAddToken = this.bindAddToken.bind(this);
    this.view.bindAddToken(this.bindAddToken);
  }

  bindDisplayCNF(cnf_value) {
    this.view.displayCNF(cnf_value);
  }

  bindChangePlayer() {
    this.model.changePlayer();
  }

  bindSetMatrix() {
    this.model.setmatrix();
  }

  bindRender() {
    this.view.grid();
  }

  bindInitializeMatrix() {
    this.model.initializeMatrix();
  }

  bindSetMatrix() {
    this.model.setMatrix();
  }

  bindRenderPlayer(player) {
    this.view.renderPlayer(player);
  }

  bindAddToken(column) {
    return this.model.addToken(column);
  }
}