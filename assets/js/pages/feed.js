// Home page functionality
// Learned about async/await from: https://www.youtube.com/watch?v=vn3tm0quoqE
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc
// Learned about event listeners from: https://www.youtube.com/watch?v=XF1_MlZ5l6M

document.addEventListener('DOMContentLoaded', function() {
  // Header actions
  const cartBtn = document.querySelector('[data-nav-cart]');
  if (cartBtn) {
    cartBtn.addEventListener('click', function() {
      location.href = 'cart.html';
    });
  }

  // Search and filters
  const search = document.querySelector('#search');
  const chips = document.querySelectorAll('[data-chip]');
  for (let i = 0; i < chips.length; i++) {
    chips[i].addEventListener('click', function() {
      for (let j = 0; j < chips.length; j++) {
        chips[j].classList.remove('active');
      }
      this.classList.add('active');
    });
  }

  // Filter dropdown
  const filter = document.querySelector('.filter');
  if (filter) {
    const filterButton = filter.querySelector('button');
    if (filterButton) {
      filterButton.addEventListener('click', function() {
        const isOpen = filter.getAttribute('aria-expanded') === 'true';
        if (isOpen) {
          filter.setAttribute('aria-expanded', 'false');
        } else {
          filter.setAttribute('aria-expanded', 'true');
        }
      });
    }
    
    document.addEventListener('click', function(event) {
      if (!filter.contains(event.target)) {
        filter.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Carousel latest
  const latestWrap = document.querySelector('#latest');
  const track = latestWrap.querySelector('.track');
  const dots = latestWrap.querySelector('.dots');

  // Grid
  const grid = document.querySelector('#grid');
  for (let i = 0; i < 6; i++) {
    grid.appendChild(skeletonCard());
  }

  // Load products
  API.get('/online-shop').then(function(latest) {
    // Carousel: render 6 slides
    const slidesData = latest.slice(0, 6);
    track.innerHTML = '';
    dots.innerHTML = '';
    
    for (let i = 0; i < slidesData.length; i++) {
      const p = slidesData[i];
      const slide = document.createElement('div');
      slide.className = 'slide bevel';
      
      const slideContent = document.createElement('div');
      slideContent.className = 'row between';
      
      const slideInfo = document.createElement('div');
      const titleDiv = document.createElement('div');
      titleDiv.className = 'title slide-title';
      titleDiv.textContent = p.title;
      const brandDiv = document.createElement('div');
      brandDiv.className = 'brand';
      brandDiv.textContent = p.brand;
      slideInfo.appendChild(titleDiv);
      slideInfo.appendChild(brandDiv);
      
      const viewBtn = document.createElement('a');
      viewBtn.className = 'btn btn-secondary elevate';
      viewBtn.href = 'product.html?id=' + p.id;
      viewBtn.textContent = 'View';
      
      slideContent.appendChild(slideInfo);
      slideContent.appendChild(viewBtn);
      
      const slideImgLink = document.createElement('a');
      slideImgLink.href = 'product.html?id=' + p.id;
      slideImgLink.setAttribute('aria-label', 'View ' + p.title);
      
      const slideImg = document.createElement('img');
      slideImg.src = p.image;
      slideImg.alt = p.title;
      slideImg.loading = 'lazy';
      slideImg.className = 'slide-image';
      
      slideImgLink.appendChild(slideImg);
      
      slide.appendChild(slideContent);
      slide.appendChild(slideImgLink);
      track.appendChild(slide);
    }
    
    // Create dots
    const positions = Math.max(1, slidesData.length - 3);
    for (let i = 0; i <= positions; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i === 0) {
        dot.classList.add('active');
      }
      dots.appendChild(dot);
    }
    new Carousel(latestWrap, { interval: 4500 });

    // Grid products
    API.get('/online-shop').then(function(list) {
      grid.innerHTML = '';
      const productCount = Math.min(12, list.length);
      for (let i = 0; i < productCount; i++) {
        grid.appendChild(ProductCard(list[i]));
      }
    }).catch(function(error) {
      Toast.show('Failed to load products');
    });
  }).catch(function(error) {
    Toast.show('Failed to load products');
  });

  // Search filter
  if (search) {
    search.addEventListener('input', function() {
      const searchText = search.value.toLowerCase();
      API.get('/online-shop').then(function(list) {
        const filtered = [];
        for (let i = 0; i < list.length; i++) {
          if (list[i].title.toLowerCase().includes(searchText)) {
            filtered.push(list[i]);
          }
        }
        grid.innerHTML = '';
        const productCount = Math.min(12, filtered.length);
        for (let i = 0; i < productCount; i++) {
          grid.appendChild(ProductCard(filtered[i]));
        }
      });
    });
  }
});


