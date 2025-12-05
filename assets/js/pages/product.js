// Product detail page functionality
// Learned about URL parameters from: https://www.youtube.com/watch?v=z84uTk5zmak
// Learned about async/await from: https://www.youtube.com/watch?v=vn3tm0quoqE
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc

document.addEventListener('DOMContentLoaded', function() {
  // Header actions
  const cartBtn = document.querySelector('[data-nav-cart]');
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      location.href = 'cart.html';
    });
  }
  
  // Get product ID from URL
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const media = document.querySelector('#media');
  const info = document.querySelector('#info');
  
  if (!id) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'glass error-message';
    errorDiv.textContent = 'Product not found.';
    info.innerHTML = '';
    info.appendChild(errorDiv);
    return;
  }
  
  // Load product data
  API.get('/online-shop/' + id).then(function(p) {
    
    // Display product image
    media.innerHTML = '<img src="' + p.image + '" alt="' + p.title + '" width="800" height="600"/>';
    
    // Remove skeleton when image loads
    const img = media.querySelector('img');
    if (img) {
      function removeSkeleton() {
        media.classList.remove('skeleton');
      }
      
      if (img.complete) {
        removeSkeleton();
      } else {
        img.addEventListener('load', removeSkeleton, { once: true });
        img.addEventListener('error', removeSkeleton, { once: true });
      }
    }
    
    // Check if product has discount
    const hasDiscount = p.discountPrice != null && p.discountPrice < p.price;
    
    // Build product info HTML - compact and centered
    let html = '<h2>' + p.title + '</h2>';
    
    // Rating and tags together
    html += '<div class="row product-rating-row">';
    html += '<div class="row product-rating" aria-label="rating" title="Rating">⭐ <span class="rating-value">' + p.rating.toFixed(1) + '</span></div>';
    
    // Add tags
    for (let i = 0; i < p.tags.length; i++) {
      html += '<span class="badge">' + p.tags[i] + '</span>';
    }
    html += '</div>';
    
    html += '<p>' + p.description + '</p>';
    
    // Pricing section
    html += '<div class="product-pricing">';
    
    // Price display
    html += '<div class="row product-price-row">';
    if (hasDiscount) {
      html += '<span class="price-old">' + formatPrice(p.price) + '</span>';
      html += '<span class="price-current">' + formatPrice(p.discountPrice) + '</span>';
    } else {
      html += '<span class="price-current">' + formatPrice(p.price) + '</span>';
    }
    html += '</div>';
    
    // Action buttons
    const displayPrice = hasDiscount ? p.discountPrice : p.price;
    html += '<div class="row product-actions">';
    html += '<button id="add" class="btn btn-primary add-cart-btn" aria-label="Add to cart">Add to Cart</button>';
    html += '<button id="share" class="chip share-btn" aria-label="Share link">Share</button>';
    html += '</div>';
    html += '</div>';
    
    // Add reviews if available
    if (Array.isArray(p.reviews) && p.reviews.length > 0) {
      html += '<div class="product-reviews">';
      html += '<h3>Reviews</h3>';
      html += '<div class="grid reviews-grid">';
      
      for (let i = 0; i < p.reviews.length; i++) {
        const r = p.reviews[i];
        html += '<div class="review-item">';
        html += '<div class="between review-header">';
        const username = r.username || 'Anonymous';
        html += '<div class="review-username">' + username + '</div>';
        html += '<div class="review-rating">⭐ ' + r.rating + '</div>';
        html += '</div>';
        html += '<p class="review-text">' + (r.description || '') + '</p>';
        html += '</div>';
      }
      
      html += '</div>';
      html += '</div>';
    }
    
    info.innerHTML = html;
    
    // Share button
    const shareBtn = document.querySelector('#share');
    if (shareBtn) {
      shareBtn.addEventListener('click', function() {
        const url = location.href.split('?')[0] + '?id=' + p.id;
        
        // Try native share API, fallback to clipboard
        if (navigator.share) {
          navigator.share({
            title: p.title,
            url: url
          }).catch(function(error) {
            // User cancelled share
          });
        } else {
          navigator.clipboard.writeText(url).then(function() {
            Toast.show('Link copied');
          });
        }
      });
    }
    
    // Add to cart button
    const addBtn = document.querySelector('#add');
    if (addBtn) {
      addBtn.addEventListener('click', function() {
        const price = p.discountPrice || p.price;
        Storage.add({
          id: p.id,
          title: p.title,
          price: price,
          image: p.image,
          qty: 1
        });
        Toast.show('Added to cart');
      });
    }
  }).catch(function(error) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'glass error-message';
    errorDiv.innerHTML = 'We couldn\'t find that product. <a href="index.html">Go back</a>';
    info.innerHTML = '';
    info.appendChild(errorDiv);
  });
});


