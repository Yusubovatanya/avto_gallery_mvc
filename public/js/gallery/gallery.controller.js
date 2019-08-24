import ValidDataForm from './gallery.utils.js';

let validDataForm = new ValidDataForm();

export default class GalleryController {
  constructor(model, view, observer) {
    this.model = model;
    this.view = view;
    this.observer = observer;
    this.list = {};
    this.visibleItem = {};
    this.init();
  }

  bindEvents() {
    this.view.DOMElements.changeSelect.addEventListener('change', () => {
      this.observer.callEvent('changeSelect');
    });

    this.view.DOMElements.result.addEventListener('click', (event) => {
      if (event.target.getAttribute('data-target') === 'btnEdit') {
        this.observer.callEvent('editElement', event.target);
      } else {
        this.observer.callEvent('deleteElement', event.target);
      }
    });

    this.view.DOMElements.btnAddNewElement.addEventListener('click', (e) => {
      this.observer.callEvent('addNewElement');
    });

    this.view.DOMElements.btnCloseFormEdit.addEventListener('click', (e) => {
      this.observer.callEvent('closeFormEdit');
    });

    this.view.DOMElements.btnSaveForm.addEventListener('click', (e) => {
      this.observer.callEvent('update');
    });

    this.view.DOMElements.btnCloseFormCreate.addEventListener('click', (e) => {
      this.observer.callEvent('closeCreateForm');
    });

    this.view.DOMElements.btnCreateElement.addEventListener('click', (e) => {
      this.observer.callEvent('createNewElement');
    });

  }

  bindSubscribers() {
    this.observer.subscribeEvent('changeSelect', () => {
      this.model.sortGallery(this.visibleItem, this.view.DOMElements.changeSelect);
      this.view.renderGallery(this.visibleItem);
      this.view.setSortValueToLocalStorage();
    });

    this.observer.subscribeEvent('editElement', (editElement) => {
      this.view.showOrHideForm('show');
      this.view.showOrHideGroupBtn('edit');

      let idElement = this.model.defineIdEditElement(editElement);

      if (idElement) {
        this.model.getEditElement(idElement).then(element => {
          let editElement = [];
          editElement[0] = element;
          element = (this.model.transformList(editElement))[0];
          this.view.renderEditForm(element);
        });
      }
    });

    this.observer.subscribeEvent('deleteElement', (deletedElement) => {
      this.initDeleteElement(deletedElement);
    });

    this.observer.subscribeEvent('closeFormEdit', () => { //
      this.view.showOrHideForm('hide');
    });

    this.observer.subscribeEvent('addNewElement', () => {
      this.view.clearFieldsForm();
      this.view.showOrHideForm('show');
      this.view.showOrHideGroupBtn('create');
    });

    this.observer.subscribeEvent('update', () => {
      this.initUpdateElement();
    });

    this.observer.subscribeEvent('closeCreateForm', () => {
      this.view.showOrHideForm('hide');
    });

    this.observer.subscribeEvent('createNewElement', () => {
      this.initCreateElement();
    });

  }

  init() {
    this.view.setSortValueFromLocalStorage();
    this.model.getDataElements().then((data) => {
      this.visibleGallery(data);
      this.bindSubscribers();
      this.bindEvents();
    });
  }

  initUpdateElement() {
    const element = this.view.getFieldsForm();
    const formObject = this.view.createFormObject();
    const res = {
      status: true,
    };
    const resultMainValid = validDataForm.mainValidFormNewElement(formObject);

    if (resultMainValid.status) {
      if (!res.status) {
        this.view.showAlert('errors', res.status);
      } else {
        let dateValue = this.view.getDateField();
        element.date = this.model.transformFormatDate(dateValue);
        this.model.updateElements(element).then(data => {
          this.model.getDataElements().then(data => {
            this.visibleGallery(data);
            this.view.showAlert('put');
          });
        });
      }
    } else {
      this.view.showAlert('errors', resultMainValid.msg);
    }
  }

  initCreateElement() {
    const element = this.view.getFieldsForm();
    const formObject = this.view.createFormObject();
    let res = {
      status: true,
    };
    const resultMainValid = validDataForm.mainValidFormNewElement(formObject);

    if (resultMainValid.status) {
      res = validDataForm.validFieldId(formObject, this.visibleItem);
      if (!res.status) {
        this.view.showAlert('errors', res.msg);
      } else {
        let dateValue = this.view.getDateField();
        element.date = this.model.transformFormatDate(dateValue);
        this.model.postNewElement(element).then(data => {
          this.model.getDataElements().then(data => {
            this.visibleGallery(data);
            this.view.showAlert('post');
            this.view.showOrHideForm('hide');
          });
        });
      }
    } else {
      this.view.showAlert('errors', resultMainValid.msg);
    }
  }

  initDeleteElement(deletedElement) {
    const element = this.model.defineDeletedElement(this.visibleItem, deletedElement);

    if (element) {
      const msg = 'Вы действительно хотите удалить элемент?';

      this.view.showConfirmAlert(msg, (confirm) => {
          if (confirm) {
            this.model.deleteElement(element).then((response) => {
              this.model.getDataElements().then(data => {
                this.visibleGallery(data);
                this.view.showAlert('delete');
              });
            });
          }
        },
      );
    }
  }

  visibleGallery(data) {
    this.visibleItem = this.model.transformList(data);
    this.model.sortGallery(this.visibleItem, this.view.DOMElements.changeSelect);
    this.view.renderGallery(this.visibleItem);
    this.view.countItems(this.visibleItem);
  }
}
