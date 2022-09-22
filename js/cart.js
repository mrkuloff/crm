'use strict';

const btnAddGood = document.querySelector('.window__add-btn');
const formOverlay = document.querySelector('.overlay');
const listTable = document.querySelector('tbody');
const allProductSum = document.querySelector('.crm__total-price');

const heading = document.querySelector('.window__start-world');
const id = document.querySelector('.window__id');
const exit = document.querySelector('.window__exit');
const form = document.querySelector('.window__form');
const totalPrice = document.querySelector('.window__text-footer');

const productForm = document.querySelector('.window__form-main');
const checkbox = productForm.querySelector(".window__checkbox_add-good");
const addProduct = productForm.querySelector(".window__add-product");
const checkboxNumber = productForm.querySelector('.window__checkbox_number-add-good');
const productSum = formOverlay.querySelector('.window__text-prodsum');
const productId = formOverlay.querySelector('.window__info-id');
const buttonId = formOverlay.querySelector('.window__info-img');

let discont;

const goods = [
  {
    "id": 253842678,
    "title": "Смартфон Xiaomi 11T 8/128GB",
    "price": 27000,
    "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
    "category": "mobile-phone",
    "discont": false,
    "count": 3,
    "units": "шт",
    "images": {
      "small": "img/smrtxiaomi11t-m.jpg",
      "big": "img/smrtxiaomi11t-b.jpg"
    }
  },
  {
    "id": 296378448,
    "title": "Радиоуправляемый автомобиль Cheetan",
    "price": 4000,
    "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
    "category": "toys",
    "discont": 5,
    "count": 1,
    "units": "шт",
    "images": {
      "small": "img/cheetancar-m.jpg",
      "big": "img/cheetancar-b.jpg"
    }
  },
  {
    "id": 215796548,
    "title": "ТВ приставка MECOOL KI",
    "price": 12400,
    "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
    "category": "tv-box",
    "discont": 15,
    "count": 4,
    "units": "шт",
    "images": {
      "small": "img/tvboxmecool-m.jpg",
      "big": "img/tvboxmecool-b.jpg"
    }
  },
  {
    "id": 246258248,
    "title": "Витая пара PROConnect 01-0043-3-25",
    "price": 22,
    "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
    "category": "cables",
    "discont": false,
    "count": 420,
    "units": "v",
    "images": {
      "small": "img/lan_proconnect43-3-25.jpg",
      "big": "img/lan_proconnect43-3-25-b.jpg"
    }
  }
]

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    checkboxNumber.disabled = false;
    checkboxNumber.focus();
  } else {
    checkboxNumber.disabled = true;
    checkboxNumber.value = '';
    discont = null;
  }
});


const addProductData = product => {
  goods.push(product);
};

const setDiscount = (discont) => {
  return discont ? (100 - discont) / 100 : 1;
}

const getTotal = (price, count, discont) => {
  if (price <= 0 || count <= 0) {
    return 0;
  }
  return price * count * setDiscount(discont);
};

const getTotalTable = (prices = []) => {
  return prices.reduce(
    (acc, { count, price, discont }) => acc + getTotal(price, count, discont),
    0
  )
};

const isNumber = (num) => {
  return !isNaN(parseFloat(num)) && isFinite(num) ? + num : null
};

const newTotalSum = () => {
  allProductSum.textContent = `$ ${getTotalTable(goods).toFixed(2)}`;
};
newTotalSum();

productForm.addEventListener('change', () => {
  const price = isNumber(productForm.querySelector('[name=price]').value);
  const count = isNumber(productForm.querySelector('[name=count]').value);
  const discont = isNumber(productForm.querySelector('[name=discont]').value);
  if (discont >= 0) {
    productSum.textContent = `$ ${getTotal(price, count, discont).toFixed(2)}`;
    addProduct.disabled = false;
    addProduct.style.background = "#6D5BD0";
  } else if (discont < 0) {
    productSum.textContent = `Скидка не может быть отрицательной!`;
    addProduct.disabled = true;
    addProduct.style.background = "gray";
  }
});

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
    '                      <img src="img/clarity_picture-line.svg" alt="edit img" type="button">\n' +
    '                    </button>\n' +
    '                  </li>\n' +
    '                  <li class="crm__main-1_2-img">\n' +
    '                    <button class="crm__main-img">\n' +
    '                      <img src="img/akar-icons_edit.svg" alt="no" type="button">\n' +
    '                    </button>\n' +
    '                  </li>\n' +
    '                  <li class="crm__main-1_3-img">\n' +
    '                    <button class="crm__main-img crm__main-del" type="button">\n' +
    '                      <img src="img/ant-design_delete-outlined.svg" alt="no">\n' +
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

renderGoods(goods);


btnAddGood.addEventListener('click', () => {
  formOverlay.classList.add('is-visible');
  productId.textContent = `${Date.now().toString().slice(4)}`;
});

formOverlay.addEventListener('click', e => {
  const target = e.target;
  if (target === formOverlay ||
    target.closest('.window__exit-btn')) {
    formOverlay.classList.remove('is-visible');
    discont = null;
    checkboxNumber.disabled = true;
    productSum.textContent = '$ 0.00';
    productId.contentEditable = 'false';
    productForm.reset();
  }
});


listTable.addEventListener('click', e => {
  const target = e.target;
  if (target.closest('.crm__main-del')) {
    goods.splice([...document.querySelectorAll('.crm__main-del')].indexOf(e.target), 1);

    target.closest('.contact').remove();
    newTotalSum();
  }
  console.log(goods);
  console.log(listTable);
});
console.log(goods);
console.log(listTable);

buttonId.addEventListener('click', () => {
  productId.contentEditable = 'true';
  productId.focus();
});

const addProductPage = (object) => {
  createRow(object);
};

const handleAddProduct = (e) => {
  e.preventDefault()

  const formData = new FormData(e.target);

  const product = Object.fromEntries(formData);

  product['id'] = productId.textContent;


  if (!('discont' in product)) {
    product.discont = false
  }

  console.log(product);
  addProductData(product);
  addProductPage(product);

  newTotalSum();

  formOverlay.classList.remove('is-visible');
  checkboxNumber.disabled = true;
  productSum.textContent = '$ 0.00';
  productId.contentEditable = 'false';
  productForm.reset();

  console.log(goods)
  console.log(listTable)
};

productForm.addEventListener('submit', handleAddProduct);





