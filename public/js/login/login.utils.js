export default class Validator {
  checkFullField(emailValue, passwordValue) {
    if (emailValue.length && passwordValue.length) {
      return {
        status: true,
        msg: '',
      };
    }

    return {
      status: false,
      msg: 'Заполните все поля логина и пароля!',
    };
  }

  validateEmail(emailValue) {
    const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (reg.test(emailValue)) {
      return {
        status: true,
        msg: '',
      };
    }

    return {
      status: false,
      msg: 'Пожалуйста, введите корректный адрес электронной почты!',
    };
  }

  validatePassword(passwordValue) {
    if (passwordValue.length >= 8) {
      return {
        status: true,
        msg: '',
      };
    }

    return {
      status: false,
      msg: 'Пароль должен содержать не менее 8 символов. Пожалуйста, введите корректный пароль!',
    };
  }

  isValid(email, password) {
    let resultFullFields = this.checkFullField(email, password);
    let resultValidateEmail = this.validateEmail(email);

    if (!resultFullFields.status) {
      return resultFullFields;
    }

    if (!resultValidateEmail.status) {
      return resultValidateEmail;
    }

    return this.validatePassword(password);
  }
}
