import {goods} from './serviceStorage.js'

import {
  addProductPage
} from './render.js';

const btnAddGood = document.querySelector('.window__add-btn');
const formOverlay = document.querySelector('.overlay');
const listTable = document.querySelector('tbody');
const allProductSum = document.querySelector('.crm__total-price');

const productForm = document.querySelector('.window__form-main');
const checkbox = productForm.querySelector(".window__checkbox_add-good");
const addProduct = productForm.querySelector(".window__add-product");
const checkboxNumber = productForm.querySelector('.window__checkbox_number-add-good');
const productSum = formOverlay.querySelector('.window__text-prodsum');
const productId = formOverlay.querySelector('.window__info-id');
const buttonId = formOverlay.querySelector('.window__info-img');

let discont;

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

const controlList = () => {
  listTable.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.crm__main-del')) {
      goods.splice([...document.querySelectorAll('.crm__main-del')].indexOf(e.target), 1);

      target.closest('.contact').remove();
      newTotalSum();
    }
  });
};

const controlProductForm = () => {
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

  buttonId.addEventListener('click', () => {
    productId.contentEditable = 'true';
    productId.focus();
  });

  productForm.addEventListener('submit', handleAddProduct);
};

const handleAddProduct = (e) => {
  e.preventDefault()

  const formData = new FormData(e.target);

  const product = Object.fromEntries(formData);

  product['id'] = productId.textContent;


  if (!('discont' in product)) {
    product.discont = false;
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

export {
  controlList,
  controlProductForm,
  isNumber,
  newTotalSum,
  getTotal
};
