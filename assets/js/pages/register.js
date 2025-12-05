// Registration page functionality
// Learned about form handling from: https://www.youtube.com/watch?v=In0nB0ABaUk
// Learned about async/await from: https://www.youtube.com/watch?v=vn3tm0quoqE

document.addEventListener('DOMContentLoaded', function() {
  // Set API base URL if not already set
  if (!API.getBaseURL || !API.getBaseURL()) {
    API.setBaseURL('https://v2.api.noroff.dev');
  }
  
  const form = document.querySelector('#register-form');
  const name = form.querySelector('input[name="name"]');
  const email = form.querySelector('input[name="email"]');
  const password = form.querySelector('input[name="password"]');
  const error = form.querySelector('[data-error]');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    error.textContent = '';
    
    // Validate name/username
    const usernameValue = name.value.trim();
    if (usernameValue.length < 2) {
      error.textContent = 'Username must be at least 2 characters.';
      return;
    }
    
    // Username validation - check if it only has letters, numbers, and underscores
    let isValidUsername = true;
    for (let i = 0; i < usernameValue.length; i++) {
      const char = usernameValue[i];
      if (!((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z') || (char >= '0' && char <= '9') || char === '_')) {
        isValidUsername = false;
        break;
      }
    }
    if (!isValidUsername) {
      error.textContent = 'Username can only contain letters, numbers, and underscores.';
      return;
    }
    
    // Validate email - must be Noroff email
    const emailValue = email.value.trim().toLowerCase();
    if (!emailValue.includes('@')) {
      error.textContent = 'Enter a valid email.';
      return;
    }
    
    // Check if email is a Noroff email
    const isNoroffEmail = emailValue.endsWith('@stud.noroff.no') || emailValue.endsWith('@noroff.no');
    if (!isNoroffEmail) {
      error.textContent = 'Email must be a Noroff email (@stud.noroff.no or @noroff.no)';
      return;
    }
    
    // Validate password
    if (password.value.length < 8) {
      error.textContent = 'Password must be at least 8 characters.';
      return;
    }
    
    // Try to register with Noroff API
    API.post('/auth/register', {
      email: emailValue,
      password: password.value,
      name: usernameValue
    }).then(function(result) {
      // Check if registration was successful
      let responseData = result.data;
      if (!responseData) {
        responseData = result;
      }
      
      if (responseData && (responseData.id || responseData.accessToken)) {
        Toast.show('Registration successful! Please login.');
        location.href = 'login.html';
      } else {
        error.textContent = 'Registration failed. Please try again.';
      }
    }).catch(function(err) {
      console.error('Registration error:', err);
      if (err.message) {
        error.textContent = err.message;
      } else {
        error.textContent = 'Registration failed. Please try again.';
      }
    });
  });
});


