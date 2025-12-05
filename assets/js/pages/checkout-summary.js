// Render mini cart summary on checkout page
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc
// Learned about arrays from: https://www.youtube.com/watch?v=8FmBEN0XZyI

document.addEventListener('DOMContentLoaded', function() {
  const mini = document.querySelector('#mini');
  const items = Storage.read();
  
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const row = document.createElement('div');
    row.className = 'between';
    
    const itemInfo = document.createElement('div');
    itemInfo.textContent = item.title + ' × ' + item.qty;
    
    const itemPrice = document.createElement('div');
    const totalPrice = item.price * item.qty;
    itemPrice.textContent = formatPrice(totalPrice);
    
    row.appendChild(itemInfo);
    row.appendChild(itemPrice);
    mini.appendChild(row);
  }
  
  const totalElement = document.querySelector('#total');
  if (totalElement) {
    totalElement.textContent = formatPrice(Storage.total());
  }
});

