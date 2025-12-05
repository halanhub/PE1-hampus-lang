// Login page functionality
// Learned about form handling from: https://www.youtube.com/watch?v=In0nB0ABaUk
// Learned about async/await from: https://www.youtube.com/watch?v=vn3tm0quoqE

document.addEventListener('DOMContentLoaded', function() {
  // Set API base URL if not already set
  if (!API.getBaseURL || !API.getBaseURL()) {
    API.setBaseURL('https://v2.api.noroff.dev');
  }
  
  const form = document.querySelector('#login-form');
  const email = form.querySelector('input[name="email"]');
  const password = form.querySelector('input[name="password"]');
  const error = form.querySelector('[data-error]');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    error.textContent = '';
    
    // Validate email
    if (!email.value.includes('@')) {
      error.textContent = 'Enter a valid email.';
      return;
    }
    
    // Validate password
    if (password.value.length < 6) {
      error.textContent = 'Password must be at least 6 characters.';
      return;
    }
    
    // Try to login with Noroff API
    API.post('/auth/login', {
      email: email.value,
      password: password.value
    }).then(function(result) {
      // Check if response has data property (Noroff API wraps responses)
      let responseData = result.data;
      if (!responseData) {
        responseData = result;
      }
      
      // Save token and user info
      if (Auth.login(responseData)) {
        location.href = '../index.html';
      } else {
        error.textContent = 'Login failed. Invalid response from server.';
      }
    }).catch(function(err) {
      console.error('Login error:', err);
      if (err.message) {
        error.textContent = err.message;
      } else {
        error.textContent = 'Login failed. Please check your email and password.';
      }
    });
  });
});


