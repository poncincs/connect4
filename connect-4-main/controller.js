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

    this.bindGetCNF = this.bindGetCNF.bind(this);
    this.view.bindGetCNF(this.bindGetCNF);

    this.bindRender = this.bindRender.bind(this);
    this.model.bindRender(this.bindRender);

    this.bindSetMatrix = this.bindSetMatrix.bind(this);
    this.model.bindRender(this.bindSetMatrix);

    this.bindInitializeMatrix = this.bindInitializeMatrix(this);
    this.model.bindRender(this.bindInitializeMatrix);
  }

  bindDisplayCNF(cnf_value) {
    this.view.displayCNF(cnf_value);
  }

  bindGetCNF() {
    this.model.getCNF();
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
}
