export default class InfoModel {
  constructor() {
  }

  initPageAboutUser() {
    return fetch('http://localhost:3000/user')
      .then(response => response.json())
      .then(user => {
        return user;
      });
  }
}
