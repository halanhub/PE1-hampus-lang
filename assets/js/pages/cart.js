// Cart page functionality
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc
// Learned about event listeners from: https://www.youtube.com/watch?v=XF1_MlZ5l6M
// Learned about arrays from: https://www.youtube.com/watch?v=8FmBEN0XZyI

function render() {
  const list = document.querySelector('#cart-rows');
  const items = Storage.read();
  list.innerHTML = '';
  
  if (items.length === 0) {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'glass empty-cart';
    emptyDiv.textContent = 'Your cart is empty.';
    list.appendChild(emptyDiv);
    return;
  }
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const row = document.createElement('div');
    row.className = 'row table row glass-strong bevel';
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = '';
    img.width = 64;
    img.height = 64;
    img.className = 'cart-item-image';
    
    const itemInfo = document.createElement('div');
    const titleDiv = document.createElement('div');
    titleDiv.className = 'cart-item-title';
    titleDiv.textContent = item.title;
    const priceDiv = document.createElement('div');
    priceDiv.className = 'brand';
    priceDiv.textContent = formatPrice(item.price);
    itemInfo.appendChild(titleDiv);
    itemInfo.appendChild(priceDiv);
    
    const qtyDiv = document.createElement('div');
    qtyDiv.className = 'qty';
    qtyDiv.setAttribute('aria-label', 'Quantity');
    const decBtn = document.createElement('button');
    decBtn.setAttribute('aria-label', 'Decrease');
    decBtn.setAttribute('data-dec', item.id);
    decBtn.textContent = '−';
    const qtyDisplay = document.createElement('div');
    qtyDisplay.textContent = item.qty;
    const incBtn = document.createElement('button');
    incBtn.setAttribute('aria-label', 'Increase');
    incBtn.setAttribute('data-inc', item.id);
    incBtn.textContent = '+';
    qtyDiv.appendChild(decBtn);
    qtyDiv.appendChild(qtyDisplay);
    qtyDiv.appendChild(incBtn);
    
    const totalDiv = document.createElement('div');
    totalDiv.textContent = formatPrice(item.price * item.qty);
    
    row.appendChild(img);
    row.appendChild(itemInfo);
    row.appendChild(qtyDiv);
    row.appendChild(totalDiv);
    list.appendChild(row);
  }
  
  const subtotalElement = document.querySelector('#subtotal');
  if (subtotalElement) {
    subtotalElement.textContent = formatPrice(Storage.total());
  }
}

document.addEventListener('DOMContentLoaded', function() {
  render();
  const host = document.querySelector('#cart-rows');
  
  host.addEventListener('click', function(event) {
    const target = event.target;
    
    if (target.matches('[data-inc]')) {
      const id = target.getAttribute('data-inc');
      const items = Storage.read();
      let item = null;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          item = items[i];
          break;
        }
      }
      const newQty = (item && item.qty) ? item.qty + 1 : 1;
      Storage.updateQty(id, newQty);
      render();
    }
    
    if (target.matches('[data-dec]')) {
      const id = target.getAttribute('data-dec');
      const items = Storage.read();
      let item = null;
      for (let i = 0; i < items.length; i++) {
        if (items[i].id === id) {
          item = items[i];
          break;
        }
      }
      const currentQty = (item && item.qty) ? item.qty : 1;
      const newQty = Math.max(1, currentQty - 1);
      Storage.updateQty(id, newQty);
      render();
    }
  });
  
  const clearBtn = document.querySelector('#clear');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (confirm('Clear all items?')) {
        Storage.clear();
        render();
      }
  });
  }
  
  const checkoutBtn = document.querySelector('#checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function() {
      location.href = 'checkout.html';
    });
  }
});


