'use strict';

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

const heading = document.querySelector('.window__start-world');
const id = document.querySelector('.window__id');
const exit = document.querySelector('.window__exit');
const form = document.querySelector('.window__form');
const discountButton = document.querySelector('.window__checkbox');
const discountNumber = document.querySelector('.window__checkbox_number');
const totalPrice = document.querySelector('.window__text-footer');

const overlay = document.querySelector('.overlay ');

const cart = {
  items: [],
  totalPrice: `0`,
  count: `0`,
  discount: `0`,

  get toPrice() {
    return this.calculateItemPrice();
  },

  set setDiscount(promocode) {
    if (typeof promocode === 'string' && promocode === 'METHED') {
      this.discount += 15;
    } else if (typeof promocode === 'string' && promocode === 'NEWYEAR') {
      this.discount += 10;
    }
  },

  add(name, price, count) {
    this.increaseCount(count);
    this.calculateItemPrice();

    const item = {name, price, count};

    return this.items.push(item);
  },

  increaseCount(number) {
    return this.count += number;
  },

  calculateItemPrice() {
    const length = this.items.length;
    const newCount = this.count;
    return length * newCount - (this.discount / 100);
  },

  clear() {
    return this.items.removeAllRanges();
  },

  print() {
    const aboutItems = JSON.stringify(this.items);
    console.log(`json: , ${aboutItems}`);
    console.log(`totalPrice: , ${cart.toPrice}`);
  },
};

//метод проходит по объекту и добавляет по нужному key нужные value в td
const createRow = (object) => {
  const table = document.querySelector('tbody');
  const list = document.createElement('tr');
  table.append(list);

  const id = document.createElement('td');
  const title = document.createElement('td');
  const price = document.createElement('td');
  const category = document.createElement('td');
  const units = document.createElement('td');
  const count = document.createElement('td');
  const allPrice = document.createElement('td');


  list.classList.add('crm__table-row');
  Object.entries(object).forEach((object) => {
    const [key, value] = object;
    if (key === 'id') {
      id.innerText = value;
      id.style.cssText=
        `text-align: right; min-width: 93px;`;
    } else if (key === 'title') {
      title.innerText = value;
      title.style.cssText=
        `min-width: 290px;`;
    } else if (key === 'price') {
      price.innerText = value;
      price.style.cssText=
        `min-width: 80px; text-align: right;`;
    } else if (key === 'category') {
      category.innerText = value;
      category.style.cssText=
        `min-width: 160px; text-align: left;`;
    } else if (key === 'units') {
      units.innerText = value;
      units.style.cssText=
        `min-width: 52px; text-align: center;`;
    } else if (key === 'count') {
      count.innerText = value;
      count.style.cssText=
        `min-width: 91px; text-align: center;`;
    }
  });
  if (price!=null && count!=null) {
    allPrice.innerText = price.innerText * count.innerText;
    allPrice.style.cssText=
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
    '                      <img src="img/ant-design_delete-outlined.svg" alt="no">\n' +
    '                    </button>\n' +
    '                  </li>\n' +
    '                  <li class="crm__main-1_2-img">\n' +
    '                    <button class="crm__main-img">\n' +
    '                      <img src="img/akar-icons_edit.svg" alt="no">\n' +
    '                    </button>\n' +
    '                  </li>\n' +
    '                  <li class="crm__main-1_3-img">\n' +
    '                    <button class="crm__main-img">\n' +
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

cart.add('Масло', 80, 2);
cart.add('Квас', 100, 3);
cart.add('Хлем', 45, 1);
cart.setDiscount = 'METHED';
cart.print();

renderGoods(goods);


