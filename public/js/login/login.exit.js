import utils from '../utils.js';

export default class Exit {
  constructor() {
    this.DOMElements = {
      userMenu: document.getElementById('menu'),
      startMenu: document.getElementById('start_menu'),
      formFieldsSingIn: document.getElementById('formFieldsSingIn'),
      btnExit: document.getElementById('go_exit'),
    };
    this.initListeners();
  }

  initListeners() {
    this.DOMElements.btnExit.addEventListener('click', (event) => {
      event.preventDefault();
      this.initExitComponent();
    });
  }

  initExitComponent() {
    utils.hideAllView([this.DOMElements.userMenu]);
    localStorage.clear();
    utils.showView(this.DOMElements.startMenu);
    utils.clearFieldsForm(this.DOMElements.formFieldsSingIn);
    document.location.assign('http://localhost:3000/#');
  }
}
