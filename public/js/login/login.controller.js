import { loadRoute } from '../router.js';

export default class LoginController {
  constructor(model, view, validator) {
    this.model = model;
    this.view = view;
    this.validator = validator;
    this.initListeners();
  }

  initListeners() {
    this.view.DOMElements.btnSingIn.addEventListener('click', (event) => {
      event.preventDefault();
      this.initForm();
    });
  }

  initForm() {
    const item = this.view.getItemFromFields();
    const login = this.model.makeTrimFields(item.login);
    const password = this.model.makeTrimFields(item.password);
    const resultValidator = this.validator.isValid(login, password);

    if (resultValidator.status) {
      this.authorize(login, password);
    } else {
      this.view.showOrHideAlert('visible', resultValidator.msg);
      setTimeout(this.view.showOrHideAlert, 3000, 'hide');
    }
  }

  authorize(login, password) {
    this.model.authorization(login, password)
      .then(result => {
        if (result.status) {
          localStorage.setItem('status', 'authorization');
          loadRoute();
        } else {
          this.view.showOrHideAlert('visible', 'Введен неверный логин или пароль !');
          setTimeout(this.view.showOrHideAlert, 3000, 'hide');
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}
