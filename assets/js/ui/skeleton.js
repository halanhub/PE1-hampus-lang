// Create skeleton loading card
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc

function skeletonCard() {
  const el = document.createElement('div');
  el.className = 'product-card glass skeleton skeleton-card';
  return el;
}

window.skeletonCard = skeletonCard;


