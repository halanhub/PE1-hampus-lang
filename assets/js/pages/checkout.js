// Checkout page functionality
// Learned about form handling from: https://www.youtube.com/watch?v=In0nB0ABaUk
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc
// Learned about event listeners from: https://www.youtube.com/watch?v=XF1_MlZ5l6M

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('#checkout-form');
  const name = form.querySelector('[name="name"]');
  const address = form.querySelector('[name="address"]');
  const city = form.querySelector('[name="city"]');
  const zip = form.querySelector('[name="zip"]');
  const error = form.querySelector('[data-error]');
  const methods = form.querySelectorAll('[role="radio"]');
  
  // Payment method selection
  for (let i = 0; i < methods.length; i++) {
    methods[i].addEventListener('click', function() {
      for (let j = 0; j < methods.length; j++) {
        methods[j].setAttribute('aria-checked', 'false');
      }
      this.setAttribute('aria-checked', 'true');
    });
  }
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    error.textContent = '';
    
    // Validate form fields
    const nameValue = name.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();
    const zipValue = zip.value.trim();
    
    if (!nameValue || !addressValue || !cityValue) {
      error.textContent = 'Please fill in all required fields.';
      return;
    }
    
    // Validate ZIP code (simple check)
    const zipPattern = /^[0-9A-Za-z -]{3,}$/;
    if (!zipPattern.test(zipValue)) {
      error.textContent = 'Please enter a valid ZIP code.';
      return;
    }
    
    // Save order to session storage
    const order = {
      items: Storage.read(),
      total: Storage.total()
    };
    sessionStorage.setItem('order', JSON.stringify(order));
    location.href = 'success.html';
  });
});


