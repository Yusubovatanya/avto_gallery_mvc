export default class GalleryModel {
  constructor() {
  }

  changeName(oldName) {
    oldName = oldName.trim();
    return ((oldName)[0]).toUpperCase() + ((oldName).slice(1)).toLowerCase();
  }

  changeUrl(oldUrl) {
    return (oldUrl.startsWith('http://')) ? oldUrl : 'http://' + oldUrl;
  }

  changeDescription(oldDescription) {
    if ((oldDescription).length > 15) {
      return oldDescription.substr(0, 15) + '...';
    }

    return oldDescription;
  }

  changeDate(date) {
    let oldDate = parseInt(date);

    if (Number.isNaN(oldDate) === true) {
      oldDate = +new Date(oldDate);
    }
    if (window.moment) {
      return moment(oldDate).format('YYYY/MM/DD h:mm');
    } else {
      return `${oldDate.getFullYear()}/\
            ${formatValueDate(oldDate.getMonth(), 1)}/\
            ${formatValueDate(oldDate.getDate())} \
            ${oldDate.getHours()}:\
            ${oldDate.getMinutes()}`;

      function formatValueDate(item, value = 0) {
        return (item < 10 - value) ? `0${item + value}` : `${item}`;
      }
    }
  }

  transformList(data) {
    return data.map(item => {
      return {
        url: this.changeUrl(item.url),
        name: this.changeName(item.name),
        id: item.id,
        description: this.changeDescription(item.description),
        timeStamp: item.date,
        date: this.changeDate(item.date),
      };
    });
  }

  sortGallery(visibleItem, changeSelect) {
    let key;
    let direction = 1;

    function sortMethod(a, b) {
      if (a[key] > b[key]) {
        return direction;
      }

      return a[key] < b[key] ? -direction : 0;
    }

    switch (changeSelect.value) {
      case '1':
        key = 'name';
        direction = 1;

        return visibleItem.sort(sortMethod);
      case '2':
        key = 'name';
        direction = -1;

        return visibleItem.sort(sortMethod);
      case '3':
        key = 'timeStamp';
        direction = -1;

        return visibleItem.sort(sortMethod);
      case '4':
        key = 'timeStamp';
        direction = 1;

        return visibleItem.sort(sortMethod);
    }
  }

  defineDeletedElement(visibleItem, deletedElement) {
    const idDeletedElement = this.defineIdEditElement(deletedElement);

    if (idDeletedElement) {
      const index = visibleItem.indexOf(visibleItem.filter(element => element.id == idDeletedElement)[0]);

      return visibleItem[index] || null;
    }
  }

  defineIdEditElement(editElement) {
    const idEditElement = editElement.getAttribute('data-id');

    return idEditElement || null;
  }

  getDataElements() {
    return fetch('/cars')
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  getEditElement(id) {
    return fetch(`/cars/${id}`)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  deleteElement(element) {
    const linkItem = `/cars/${element.id}`;
    const options = {
      method: 'delete',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(element),
    };

    return fetch(linkItem, options)
      .then(response => response.json())
      .then(data => {
        return data;
      });
  }

  updateElements(editElement) {
    const linkItem = `/cars/${editElement.id}`;
    const options = {
      method: 'put',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(editElement),
    };

    return fetch(linkItem, options).then(response => response.json())
      .then(data => {
        return data;
      });
  }

  postNewElement(newElement) {
    const options = {
      method: 'post',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(newElement),
    };
    return fetch('/cars', options).then(response => response.json())
      .then(data => {
        return data;
      });
  }

  transformFormatDate(formatDate) {
    return moment(formatDate).format('x');
  }

}
