// Show login status in header
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc
// Learned about event listeners from: https://www.youtube.com/watch?v=XF1_MlZ5l6M

document.addEventListener('DOMContentLoaded', function() {
  const actionsDivs = document.querySelectorAll('.actions');
  
  for (let i = 0; i < actionsDivs.length; i++) {
    const actionsDiv = actionsDivs[i];
    
    // Check if auth button already exists
    const existingAuthBtn = actionsDiv.querySelector('[data-auth-button]');
    if (existingAuthBtn) {
      existingAuthBtn.remove();
    }
    
    if (Auth.isLoggedIn()) {
      const user = Auth.getUser();
      let username = 'User';
      if (user) {
        if (user.username) {
          username = user.username;
        } else if (user.email) {
          username = user.email;
        }
      }
      
      // Create logout button with username
      const authDiv = document.createElement('div');
      authDiv.setAttribute('data-auth-button', 'true');
      authDiv.className = 'auth-status';
      
      const usernameSpan = document.createElement('span');
      usernameSpan.className = 'auth-username';
      usernameSpan.textContent = username;
      
      const logoutBtn = document.createElement('button');
      logoutBtn.className = 'chip elevate logout-btn';
      logoutBtn.setAttribute('aria-label', 'Logout');
      logoutBtn.onclick = function() {
        Auth.clear();
        location.reload();
      };
      
      const logoutIcon = document.createElement('span');
      logoutIcon.className = 'material-symbols-outlined';
      logoutIcon.textContent = 'logout';
      logoutBtn.appendChild(logoutIcon);
      
      authDiv.appendChild(usernameSpan);
      authDiv.appendChild(logoutBtn);
      actionsDiv.appendChild(authDiv);
    } else {
      // Create login button
      const loginBtn = document.createElement('button');
      loginBtn.setAttribute('data-auth-button', 'true');
      loginBtn.className = 'chip elevate';
      loginBtn.setAttribute('aria-label', 'Login');
      loginBtn.onclick = function() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('account/')) {
          location.href = 'login.html';
        } else {
          location.href = 'account/login.html';
        }
      };
      
      const loginIcon = document.createElement('span');
      loginIcon.className = 'material-symbols-outlined';
      loginIcon.textContent = 'login';
      loginBtn.appendChild(loginIcon);
      
      actionsDiv.appendChild(loginBtn);
    }
  }
});

