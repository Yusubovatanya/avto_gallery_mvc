export default class utils {

  static showView(showElement) {
    showElement.style.display = 'block';
  }

  static hideAllView(viewElements) {
    viewElements.forEach(element => {
      element.style.display = 'none';
    });
  }

  static activeBtn(activeElement) {
    activeElement.classList.remove('btn-outline-primary');
    activeElement.classList.add('btn-primary');
  }

  static disActiveAllBtn(listBtn) {
    listBtn.forEach(element => {
      element.classList.remove('btn-primary');
      element.classList.add('btn-outline-primary');
    });
  }

  static clearFieldsForm(form) {
    const fields = form.querySelectorAll('input');

    for (let i = 0; i < fields.length; i++) {
      fields[i].value = '';
    }
  }
}
