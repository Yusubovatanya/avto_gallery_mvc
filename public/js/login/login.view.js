export default class LoginView {
  constructor() {
    this.DOMElements = {
      btnSingIn: document.getElementById('singIn'),
      valueFieldEmail: document.getElementById('inputEmail'),
      valueFieldPassword: document.getElementById('inputPassword'),
      userMenu: document.getElementById('menu'),
      msgAlertFullFields: document.querySelector('#alert-msg'),
      containerAlert: document.querySelector('.alert-container'),
    };
  }

  getItemFromFields() {
    let login = this.DOMElements.valueFieldEmail.value;
    let password = this.DOMElements.valueFieldPassword.value;

    return {
      login,
      password,
    };
  }

  showOrHideAlert(status, information) {
    switch (status) {
      case 'visible':
        this.DOMElements.containerAlert.style.visibility = 'visible';
        this.DOMElements.msgAlertFullFields.innerHTML = information;
        break;
      case 'hide':
        this.DOMElements.containerAlert.style.visibility = 'hidden';
        break;
      default:
    }
  }
}
