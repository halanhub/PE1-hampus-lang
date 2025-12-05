// Carousel functionality
// Learned about classes from: https://www.youtube.com/watch?v=PFmuCDHHpwk
// Learned about event listeners from: https://www.youtube.com/watch?v=XF1_MlZ5l6M
// Learned about setInterval from: https://www.youtube.com/watch?v=n0guH8z7H8U

function Carousel(root, options) {
  if (!options) {
    options = {};
  }
  
  this.root = root;
  this.track = root.querySelector('.track');
  this.slides = root.querySelectorAll('.slide');
  this.index = 0;
  this.interval = options.interval || 4000;
  this.visibleCount = options.visibleCount || 3;
  this.timer = null;
  
  this.init();
}

Carousel.prototype.init = function() {
  const prev = this.root.querySelector('[data-prev]');
  const next = this.root.querySelector('[data-next]');
  
  if (prev) {
    prev.addEventListener('click', function() {
      this.go(-1);
    }.bind(this));
  }
  
  if (next) {
    next.addEventListener('click', function() {
      this.go(1);
    }.bind(this));
  }
  
  this.root.addEventListener('mouseenter', function() {
    this.pause();
  }.bind(this));
  
  this.root.addEventListener('mouseleave', function() {
    this.play();
  }.bind(this));
  
  this.root.setAttribute('role', 'region');
  this.root.setAttribute('aria-label', 'Latest products');
  this.root.tabIndex = 0;
  
  this.root.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      this.go(-1);
    }
    if (event.key === 'ArrowRight') {
      this.go(1);
    }
  }.bind(this));
  
  this.dots = this.root.querySelectorAll('.dot');
  this.update();
  this.play();
};

Carousel.prototype.go = function(dir) {
  const maxIndex = Math.max(0, this.slides.length - this.visibleCount);
  this.index = this.index + dir;
  
  if (this.index > maxIndex) {
    this.index = 0;
  }
  if (this.index < 0) {
    this.index = maxIndex;
  }
  
  this.update();
};

Carousel.prototype.update = function() {
  let width = 0;
  if (this.slides.length > 0 && this.slides[0]) {
    const rect = this.slides[0].getBoundingClientRect();
    width = rect.width + 16;
  }
  
  this.track.style.transform = 'translateX(' + (-this.index * width) + 'px)';
  
  if (this.dots) {
    for (let i = 0; i < this.dots.length; i++) {
      if (i === this.index) {
        this.dots[i].classList.add('active');
      } else {
        this.dots[i].classList.remove('active');
      }
    }
  }
};

Carousel.prototype.play = function() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return;
  }
  
  this.timer = setInterval(function() {
    this.go(1);
  }.bind(this), this.interval);
};

Carousel.prototype.pause = function() {
  if (this.timer) {
    clearInterval(this.timer);
  }
};

window.Carousel = Carousel;


