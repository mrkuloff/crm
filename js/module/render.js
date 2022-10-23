import {
  isNumber,
  getTotal
} from './control.js';


//метод проходит по объекту и добавляет по нужному key нужные value в td
const createRow = (object) => {
  const table = document.querySelector('tbody');
  const list = document.createElement('tr');
  list.classList.add('contact');
  table.append(list);

  const id = document.createElement('td');
  const title = document.createElement('td');
  const price = document.createElement('td');
  const category = document.createElement('td');
  const units = document.createElement('td');
  const count = document.createElement('td');
  const allPrice = document.createElement('td');
  let tempDiscont;


  list.classList.add('crm__table-row');
  list.setAttribute('data-pic', '../../img/coffe-machine.png');
  Object.entries(object).forEach((object) => {
    const [key, value] = object;
    if (key === 'id') {
      id.innerText = value;
      id.style.cssText =
        `text-align: right; min-width: 93px;`;
    } else if (key === 'title') {
      title.innerText = value;
      title.style.cssText =
        `min-width: 290px;`;
    } else if (key === 'price') {
      price.innerText = value;
      price.style.cssText =
        `min-width: 80px; text-align: right;`;
    } else if (key === 'category') {
      category.innerText = value;
      category.style.cssText =
        `min-width: 160px; text-align: left;`;
    } else if (key === 'units') {
      units.innerText = value;
      units.style.cssText =
        `min-width: 52px; text-align: center;`;
    } else if (key === 'count') {
      count.innerText = value;
      count.style.cssText =
        `min-width: 91px; text-align: center;`;
    } else if (key === 'discont') {
      if (isNumber(value)) {
        tempDiscont = value;
      }
    }
  });
  if (price!=null && count!=null) {
    allPrice.innerText = getTotal(price.innerText,count.innerText,tempDiscont).toFixed(2);
    allPrice.style.cssText =
      `min-width: 80px; text-align: right;`;
  }

  list.append(id);
  list.append(title);
  list.append(category);
  list.append(units);
  list.append(count);
  list.append(price);
  list.append(allPrice);

  list.insertAdjacentHTML("beforeend", '<td>\n' +
    '                  <ul class="crm__main_1-img">\n' +
    '                  <li class="crm__main-1_1-img">\n' +
    '                    <button class="crm__main-img">\n' +
    '                      <img class="crm__main-show" src="img/clarity_picture-line.svg" alt="show img">\n' +
    '                    </button>\n' +
    '                  </li>\n' +
    '                  <li class="crm__main-1_2-img">\n' +
    '                    <button class="crm__main-img">\n' +
    '                      <img src="img/akar-icons_edit.svg" alt="edit item" type="button">\n' +
    '                    </button>\n' +
    '                  </li>\n' +
    '                  <li class="crm__main-1_3-img">\n' +
    '                    <button class="crm__main-img crm__main-del" type="button">\n' +
    '                      <img src="img/ant-design_delete-outlined.svg" alt="delete item">\n' +
    '                    </button>\n' +
    '                  </li>\n' +
    '                </ul>\n' +
    '              </td>')

}

const renderGoods = (goods) => {
  for (let obj of goods) {
    createRow(obj);
  }
}

const addProductPage = (object) => {
  createRow(object);
};

export {
  renderGoods,
  addProductPage,
};

