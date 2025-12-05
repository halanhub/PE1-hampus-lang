// Success page functionality
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc
// Learned about sessionStorage from: https://www.youtube.com/watch?v=k8yJCpPJ0l4

document.addEventListener('DOMContentLoaded', function() {
  const host = document.querySelector('#summary');
  let order = null;
  
  try {
    const orderString = sessionStorage.getItem('order');
    if (orderString) {
      order = JSON.parse(orderString);
    }
  } catch (error) {
    // Error parsing order
  }
  
  if (!order) {
    host.innerHTML = '<p>No order found.</p>';
    return;
  }
  
  const list = document.createElement('div');
  list.className = 'grid';
  
  for (let i = 0; i < order.items.length; i++) {
    const item = order.items[i];
    const row = document.createElement('div');
    row.className = 'row';
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = '';
    img.width = 40;
    img.height = 40;
    img.className = 'success-item-image';
    
    const itemInfo = document.createElement('div');
    itemInfo.textContent = item.title + ' × ' + item.qty;
    
    const itemTotal = document.createElement('div');
    itemTotal.className = 'success-item-total';
    itemTotal.textContent = formatPrice(item.price * item.qty);
    
    row.appendChild(img);
    row.appendChild(itemInfo);
    row.appendChild(itemTotal);
    list.appendChild(row);
  }
  
  host.appendChild(list);
  
  const total = document.createElement('div');
  total.className = 'between mt-6';
  
  const totalLabel = document.createElement('div');
  totalLabel.className = 'success-total-label';
  totalLabel.textContent = 'Total';
  
  const totalValue = document.createElement('div');
  totalValue.className = 'success-total-value';
  totalValue.textContent = formatPrice(order.total);
  
  total.appendChild(totalLabel);
  total.appendChild(totalValue);
  host.appendChild(total);
  
  Storage.clear();
});


