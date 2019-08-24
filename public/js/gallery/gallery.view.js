export default class GalleryView {
  constructor() {
    this.DOMElements = {
      saveBtn: document.querySelector('#saveBtn'),
      refreshBtn: document.querySelector('#refreshBtn'),
      changeSelect: document.getElementById('line-selector'),
      btnGroupEdit: document.getElementById('btnGroupeEdit'),
      btnGroupCreate: document.getElementById('btnGroupeCreate'),
      btnSaveForm: document.getElementById('saveForm'),
      boxForm: document.getElementById('boxFormEdit'),
      result: document.querySelector('#result'),
      btnAddNewElement: document.getElementById('add'),
      btnCloseFormEdit: document.getElementById('closeForm'),
      btnCreateElement: document.getElementById('saveFormCreate'),
      btnCloseFormCreate: document.getElementById('closeFormCreate'),
      menuBtn: document.getElementById('go_groupe_btn'),
      boxGallery: document.getElementById('gallery'),
      fieldId: document.getElementById('inputId'),
      fieldUrl: document.getElementById('inputUrl'),
      fieldName: document.getElementById('inputName'),
      fieldDescription: document.getElementById('inputDescription'),
      fieldDay: document.getElementById('inputDay'),
      fieldMonth: document.getElementById('inputMonth'),
      fieldYear: document.getElementById('inputYear'),
      count: document.querySelector('#count'),
    };
  }

  setSortValueFromLocalStorage() {
    const valueOfMethodSort = localStorage.getItem('valueOfMethodSort');

    this.DOMElements.changeSelect.value = valueOfMethodSort || '1';
  }

  setSortValueToLocalStorage() {
    localStorage.setItem('valueOfMethodSort', this.DOMElements.changeSelect.value);
  }

  countItems(item) {
    this.DOMElements.count.innerHTML = item.length;
  }

  renderGallery(list) {
    let secondItemTemplate = '';

    list.forEach(item => {
      secondItemTemplate += `<div class="card box-shadow text-center card_item" style="margin: 15px; padding: 0">\
            <div class="img_card" style="background: url(${item.url}) no-repeat center/cover;"></div>\
            <div class="card-info">\
            <h5 class="text-muted text-center">${item.name}</h5>\
            <p class="text-muted top-padding text-center">${item.description}</p>\
            <p class="text-muted text-center">${item.date}</p>\
            <div class="btn-group" role="group">\
            <button data-target="btnEdit" data-id="${item.id}" type="button" class="btn btn-outline-secondary" style="margin-top: 10px;">Edit</button>\
            <button id="btnDel" class="btn btn-danger" class = "del" data-id="${item.id}" style="margin-top: 10px;">Удалить</button>\
            </div>\
            </div>\
            </div>`;
    });
    this.DOMElements.result.innerHTML = secondItemTemplate;
  }

  showOrHideGroupBtn(status) {
    switch (status) {
      case 'create':
        this.DOMElements.btnGroupCreate.style.display = 'block';
        this.DOMElements.btnGroupEdit.style.display = 'none';
        this.DOMElements.fieldId.removeAttribute('readonly');
        break;
      case 'edit':
        this.DOMElements.btnGroupCreate.style.display = 'none';
        this.DOMElements.btnGroupEdit.style.display = 'block';
        this.DOMElements.fieldId.setAttribute('readonly', 'readonly');
        break;
      default:
    }
  }

  showOrHideForm(status) {
    switch (status) {
      case 'show':
        this.DOMElements.boxGallery.style.display = 'none';
        this.DOMElements.boxForm.style.display = 'block';
        this.DOMElements.menuBtn.style.visibility = 'hidden';
        break;
      case 'hide':
        this.DOMElements.boxGallery.style.display = 'block';
        this.DOMElements.boxForm.style.display = 'none';
        this.DOMElements.menuBtn.style.visibility = 'visible';
        break;
      default:
    }
  }

  renderEditForm(editElement) {
    this.DOMElements.fieldUrl.value = editElement.url;
    this.DOMElements.fieldName.value = editElement.name;
    this.DOMElements.fieldId.value = editElement.id;
    this.DOMElements.fieldDescription.value = editElement.description;
    this.DOMElements.fieldYear.value = moment(editElement.timeStamp, 'xx').format('YYYY');
    this.DOMElements.fieldMonth.value = moment(editElement.timeStamp, 'xx').format('MM');
    this.DOMElements.fieldDay.value = moment(editElement.timeStamp, 'xx').format('DD');
  }

  showAlert(status, msg = '') {
    switch (status) {
      case 'put':
        msg = 'Данные успешно сохранены';
        break;
      case 'post':
        msg = 'Новый элемент был успешно сохранен';
        break;
      case 'delete':
        msg = 'Элемент был успешно удален';
        break;
      case 'errors':
        break;
      default:
    }
    document.getElementById('resultBodyModal').innerHTML = msg;
    $('#resultModal').modal('show');
  }

  showConfirmAlert(msg, callback) {
    document.getElementById('confirmBodyModal').innerHTML = msg;
    $('#confirmModal').modal('show');

    $('#confirm-btn').on('click', function () {
      $('#confirmModal').modal('hide');

      return callback(true);
    });
  }

  clearFieldsForm() {
    const fields = this.DOMElements.boxForm.querySelectorAll('input');

    for (let i = 0; i < fields.length; i++) {
      fields[i].value = '';
    }
  }

  createFormObject() {
    return {
      year: this.DOMElements.fieldYear.value,
      month: this.DOMElements.fieldMonth.value,
      day: this.DOMElements.fieldDay.value,
      id: this.DOMElements.fieldId.value,
      box: this.DOMElements.boxForm,
    };
  }

  getDateField() {
    return `${this.DOMElements.fieldYear.value}-\
       ${this.DOMElements.fieldMonth.value}-\
       ${this.DOMElements.fieldDay.value}`;
  }

  getFieldsForm() {
    return {
      url: this.DOMElements.fieldUrl.value,
      name: this.DOMElements.fieldName.value,
      id: this.DOMElements.fieldId.value,
      description: this.DOMElements.fieldDescription.value,
      date: moment(this.getDateField(), 'YYYY-MM-DD').format('x'),
    };
  }
}
