// Create product card element
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc
// Learned about creating elements from: https://www.youtube.com/watch?v=0ik6X4DJKCc

function ProductCard(product) {
  const el = document.createElement('article');
  el.className = 'product-card';
  
  const imgLink = document.createElement('a');
  imgLink.href = 'product.html?id=' + product.id;
  imgLink.setAttribute('aria-label', 'View ' + product.title);
  
  const img = document.createElement('img');
  img.src = product.image;
  img.alt = product.title;
  img.loading = 'lazy';
  img.width = 480;
  img.height = 360;
  imgLink.appendChild(img);
  el.appendChild(imgLink);
  
  const cardContent = document.createElement('div');
  cardContent.className = 'card-content';
  
  const titleDiv = document.createElement('h3');
  titleDiv.className = 'title';
  titleDiv.textContent = product.title;
  cardContent.appendChild(titleDiv);
  
  const priceInfo = document.createElement('div');
  priceInfo.className = 'price-info';
  
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  
  if (hasDiscount) {
    const originalPrice = document.createElement('span');
    originalPrice.className = 'price-original';
    originalPrice.textContent = formatPrice(product.price);
    priceInfo.appendChild(originalPrice);
    
    const currentPrice = document.createElement('span');
    currentPrice.className = 'price-current';
    currentPrice.textContent = formatPrice(product.discountPrice);
    priceInfo.appendChild(currentPrice);
  } else {
    const normalPrice = document.createElement('span');
    normalPrice.className = 'price-normal';
    normalPrice.textContent = formatPrice(product.price);
    priceInfo.appendChild(normalPrice);
  }
  
  cardContent.appendChild(priceInfo);
  
  const viewButton = document.createElement('a');
  viewButton.className = 'btn-view';
  viewButton.href = 'product.html?id=' + product.id;
  viewButton.textContent = 'View Details';
  viewButton.setAttribute('aria-label', 'View ' + product.title);
  cardContent.appendChild(viewButton);
  
  el.appendChild(cardContent);
  
  return el;
}

window.ProductCard = ProductCard;


