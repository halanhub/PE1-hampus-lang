// Make images clickable to open in new tab
// Learned about event listeners from: https://www.youtube.com/watch?v=XF1_MlZ5l6M
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc

document.addEventListener('click', function(event) {
  const target = event.target;
  
  // Check if clicked element is an image
  let img = null;
  if (target.tagName === 'IMG') {
    img = target;
  } else if (target.closest) {
    img = target.closest('img');
  }
  
  if (!img) {
    return;
  }
  
  // Skip product detail view images
  if (img.closest) {
    if (img.closest('#media') || img.closest('.product-media')) {
      return;
    }
  }
  
  // Skip images inside links
  if (img.closest('a')) {
    return;
  }
  
  // Get image URL
  let url = img.src;
  if (img.currentSrc) {
    url = img.currentSrc;
  }
  
  if (url) {
    window.open(url, '_blank', 'noopener');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const allImages = document.querySelectorAll('img');
  
  for (let i = 0; i < allImages.length; i++) {
    const img = allImages[i];
    
    // Skip product detail images
    if (img.closest) {
      if (img.closest('#media') || img.closest('.product-media')) {
        continue;
      }
    }
    
    // Skip images inside links
    if (img.closest('a')) {
      continue;
    }
    
    // Add pointer cursor
    img.style.cursor = 'pointer';
  }
});


