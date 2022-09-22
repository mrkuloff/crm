const cart = {
  items: [],
  totalPrice: `0`,
  count: `0`,
  discont: `0`,

  get toPrice() {
    return this.calculateItemPrice();
  },

  set setDiscont(discont) {
    if (typeof discont === 'string' && discont === 'METHED') {
      this.discont += 15;
    } else if (typeof discont === 'string' && discont === 'NEWYEAR') {
      this.discont += 10;
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

cart.add('Масло', 80, 2);
cart.add('Квас', 100, 3);
cart.add('Хлем', 45, 1);
cart.setDiscont = 'METHED';
cart.print();
