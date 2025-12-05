// Shopping cart storage functions
// Learned about localStorage from: https://www.youtube.com/watch?v=k8yJCpPJ0l4
// Learned about arrays from: https://www.youtube.com/watch?v=8FmBEN0XZyI

const Storage = {
  key: 'cart',
  
  read: function() {
    try {
      const cartString = localStorage.getItem(this.key);
      if (cartString) {
        return JSON.parse(cartString);
      }
      return [];
    } catch (error) {
      return [];
    }
  },
  
  write: function(cartArray) {
    const cartString = JSON.stringify(cartArray);
    localStorage.setItem(this.key, cartString);
  },
  
  add: function(item) {
    const cart = this.read();
    let found = false;
    
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        cart[i].qty = cart[i].qty + (item.qty || 1);
        found = true;
        break;
      }
    }
    
    if (!found) {
      const newItem = {
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        qty: item.qty || 1
      };
      cart.push(newItem);
    }
    
    this.write(cart);
  },
  
  updateQty: function(id, qty) {
    const cart = this.read();
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        if (qty < 1) {
          qty = 1;
        }
        cart[i].qty = qty;
        this.write(cart);
        break;
      }
    }
  },
  
  remove: function(id) {
    const cart = this.read();
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id !== id) {
        newCart.push(cart[i]);
      }
    }
    this.write(newCart);
  },
  
  clear: function() {
    localStorage.removeItem(this.key);
  },
  
  total: function() {
    const cart = this.read();
    let sum = 0;
    for (let i = 0; i < cart.length; i++) {
      sum = sum + (cart[i].price * cart[i].qty);
    }
    return sum;
  }
};

window.Storage = Storage;


