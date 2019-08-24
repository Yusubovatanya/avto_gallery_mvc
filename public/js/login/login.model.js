export default class LoginModel {
  constructor() {
  }

  makeTrimFields(valueTrim) {
    return valueTrim.trim();
  }

  authorization(login, password) {
    const valueAuthorization = {
      login: login,
      password: password,
    };
    const linkItem = 'http://localhost:3000/user';
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(valueAuthorization),
    };

    return fetch(linkItem, options).then(response => {
      if (response.status !== 200) {
        return Promise.resolve({
          status: false,
        });
      }

      return response.json();
    });
  }
}
