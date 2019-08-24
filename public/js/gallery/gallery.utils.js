export default function ValidDataForm() {

  let validDate = (formObject) => {
    const checkedDay = moment(`${formObject.year}-${formObject.month}`, 'YYYY-MM').daysInMonth();

    if (checkedDay < formObject.day || formObject.day <= 0) {
      return false;
    }

    if (formObject.month > 12 || formObject.month <= 0) {
      return false;
    }

    if (formObject.year > moment().year()) {
      return false;
    }

    const dataValue = `${formObject.year}-${formObject.month}-${formObject.day}`;
    const dataValueMilliseconds = moment(dataValue, 'YYYY-MM-DD').format('x');

    return dataValueMilliseconds <= moment().format('x');
  };

  let validFullFieldsNewElement = (formObject) => {
    const fields = (formObject.box).querySelectorAll('input');

    for (let i = 0; i < fields.length; i++) {
      if (!fields[i].value.length) {
        return false;
      }
    }

    return true;
  };

  this.mainValidFormNewElement = function (formObject) {
    const isFullFields = validFullFieldsNewElement(formObject);

    if (!isFullFields) {
      return {
        status: false,
        msg: 'Заполните все поля формы',
      };
    }

    if (!validDate(formObject)) {
      return {
        status: false,
        msg: 'Введите корректную дату ',
      };
    }

    return {
      status: true,
      msg: '',
    };
  };

  this.validFieldId = (formObject, visibleItem) => {
    const double = visibleItem.filter(item => formObject.id === item.id);

    if (double.length) {
      return {
        status: false,
        msg: 'Элемент с таким id уже существует',
      };
    }

    return {
      status: true,
      msg: '',
    };
  };
}
