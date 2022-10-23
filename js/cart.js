import {goods} from './module/serviceStorage.js'

import {
  controlList,
  controlProductForm,
  newTotalSum,
  controlListItem,
} from './module/control.js';

import {
  renderGoods,
} from './module/render.js';


const init = (goods) => {
  renderGoods(goods);
  newTotalSum();

  controlProductForm();
  controlList();
  controlListItem();
};

init(goods);







