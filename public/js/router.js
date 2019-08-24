import utils from './utils.js';
import Observer from './gallery/observer.js';
import GalleryController from './gallery/gallery.controller.js';
import GalleryModel from './gallery/gallery.model.js';
import GalleryView from './gallery/gallery.view.js';

import Validator from './login/login.utils.js';
import LoginController from './login/login.controller.js';
import LoginModel from './login/login.model.js';
import LoginView from './login/login.view.js';
import Exit from './login/login.exit.js';

import InfoController from './info/info.controller.js';
import InfoModel from './info/info.model.js';
import InfoView from './info/info.view.js';

const boxSignIn = document.getElementById('formSignIn');
const boxUser = document.getElementById('userPage');
const boxGallery = document.getElementById('gallery');

const btnGallery = document.getElementById('go_gallery');
const btnAboutUser = document.getElementById('go_about_user');
const btnExit = document.getElementById('go_exit');

const userMenu = document.getElementById('menu');
const startMenu = document.getElementById('start_menu');

let activatedRoutes = {};

let routeConfig = {
  '': {
    show: () => {
      utils.showView(boxSignIn);
      utils.hideAllView([boxUser, boxGallery]);
    },
    init: () => {
      let model = new LoginModel();
      let view = new LoginView();
      let validator = new Validator();

      new LoginController(model, view, validator);
    },
  },
  'gallery': {
    show: () => {
      utils.showView(boxGallery);
      utils.hideAllView([boxSignIn, boxUser]);
      utils.activeBtn(btnGallery);
      utils.disActiveAllBtn([btnAboutUser, btnExit]);
    },
    init: () => {
      let observer = new Observer;
      let model = new GalleryModel;
      let view = new GalleryView;

      new GalleryController(model, view, observer);
      new Exit();
    },
  },
  'info': {
    show: () => {
      utils.showView(boxUser);
      utils.hideAllView([boxGallery, boxSignIn]);
      utils.activeBtn(btnAboutUser);
      utils.disActiveAllBtn([btnGallery, btnExit]);
    },
    init: () => {
      let model = new InfoModel;
      let view = new InfoView;
      let observer = new Observer;

      new InfoController(model, view, observer);
    },
  },
};

export function updateRoute() {
  let routeName = document.location.hash.replace(/^#/, '');

  if (!isAuthorization() && !routeName.length) {
    activatedRoutes = {};
  }

  if (activatedRoutes[routeName]) {
    activatedRoutes[routeName]();
  } else {
    routeInit(routeName);
  }
}

export function loadRoute() {
  let routeName = '';

  if (isAuthorization()) {
    routeName = 'gallery';
    location.hash = routeName;

    utils.showView(userMenu);
    utils.hideAllView([startMenu]);
  } else {
    location.hash = routeName;
    document.location.assign('http://localhost:3000/#');
  }

  routeInit(routeName);
}

function isAuthorization() {
  return localStorage.getItem('status') === 'authorization';
}

function routeInit(routeName) {
  let route = routeConfig[routeName];

  if (route) {
    route.init();
    route.show();
    activatedRoutes[routeName] = route.show;
  }
}
