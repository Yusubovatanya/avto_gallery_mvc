export default class InfoView {
  constructor() {
    this.DOMElements = {
      btnVisiblePass: document.getElementById('showPassword'),
      fieldUserLogin: document.getElementById('getEmail'),
      fieldUserPassword: document.getElementById('getPassword'),
    };
  }

  hidePassword() {
    this.DOMElements.fieldUserPassword.type = 'password';
    this.DOMElements.btnVisiblePass.innerHTML = 'Показать пароль';
  }

  showPassword() {
    this.DOMElements.fieldUserPassword.type = 'text';
    this.DOMElements.btnVisiblePass.innerHTML = 'Скрыть пароль';
  }

  showInfoUser(user) {
    this.DOMElements.fieldUserLogin.value = user.login;
    this.DOMElements.fieldUserPassword.value = user.password;
  }
}
