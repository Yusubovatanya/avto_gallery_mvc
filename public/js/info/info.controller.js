export default class InfoController {
  constructor(model, view, observer) {
    this.model = model;
    this.view = view;
    this.observer = observer;
    this.pwShown = true;
    this.init();
  }

  bindEvents() {
    this.view.DOMElements.btnVisiblePass.addEventListener('click', () => {
      this.observer.callEvent('showOrHidePassword');
    });
  }

  bindSubscribers() {
    this.observer.subscribeEvent('showOrHidePassword', () => {
      if (this.pwShown) {
        this.pwShown = !this.pwShown;
        this.view.showPassword();
      } else {
        this.pwShown = !this.pwShown;
        this.view.hidePassword();
      }
    });
  }

  init() {
    this.model.initPageAboutUser().then((user) => {
      this.view.showInfoUser(user);
      this.view.hidePassword();
      this.bindSubscribers();
      this.bindEvents();
    });
  }

}
