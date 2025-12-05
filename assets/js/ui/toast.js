// Toast notification helper
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc
// Learned about setTimeout from: https://www.youtube.com/watch?v=n0guH8z7H8U

const Toast = {
  host: null,
  
  init: function() {
    this.host = document.createElement('div');
    this.host.className = 'toast';
    document.body.appendChild(this.host);
  },
  
  show: function(message, type) {
    if (!this.host) {
      this.init();
    }
    
    const item = document.createElement('div');
    item.className = 'item glass bevel';
    item.setAttribute('role', 'status');
    item.setAttribute('aria-live', 'polite');
    item.textContent = message;
    this.host.appendChild(item);
    
    setTimeout(function() {
      item.remove();
    }, 3000);
  }
};

document.addEventListener('DOMContentLoaded', function() {
  Toast.init();
});

window.Toast = Toast;


