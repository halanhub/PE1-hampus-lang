// Mobile menu functionality
// Learned about DOM manipulation from: https://www.youtube.com/watch?v=0ik6X4DJKCc
// Learned about event listeners from: https://www.youtube.com/watch?v=XF1_MlZ5l6M

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger-menu');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileActions = document.querySelector('.mobile-actions');
  const desktopActions = document.querySelector('.actions');
  
  if (!hamburger || !mobileMenu || !mobileActions) {
    return;
  }
  
  // Copy actions to mobile menu and attach event listeners
  function updateMobileMenu() {
    mobileActions.innerHTML = '';
    
    if (desktopActions) {
      const cartBtn = desktopActions.querySelector('[data-nav-cart]');
      const authBtn = desktopActions.querySelector('[data-auth-button]');
      const authStatus = desktopActions.querySelector('.auth-status');
      
      // Add cart button
      if (cartBtn) {
        const mobileCartBtn = document.createElement('button');
        mobileCartBtn.className = 'cart-button';
        mobileCartBtn.setAttribute('data-nav-cart', '');
        mobileCartBtn.setAttribute('aria-label', 'Shopping cart');
        const cartIcon = document.createElement('span');
        cartIcon.className = 'material-symbols-outlined';
        cartIcon.textContent = 'shopping_cart';
        mobileCartBtn.appendChild(cartIcon);
        
        // Attach click event
        mobileCartBtn.addEventListener('click', function() {
          location.href = 'cart.html';
        });
        
        mobileActions.appendChild(mobileCartBtn);
      }
      
      // Add auth button or status
      if (authStatus) {
        const mobileAuthStatus = document.createElement('div');
        mobileAuthStatus.className = 'auth-status';
        
        const username = authStatus.querySelector('.auth-username');
        if (username) {
          const mobileUsername = document.createElement('span');
          mobileUsername.className = 'auth-username';
          mobileUsername.textContent = username.textContent;
          mobileAuthStatus.appendChild(mobileUsername);
        }
        
        const logoutBtn = authStatus.querySelector('.logout-btn');
        if (logoutBtn) {
          const mobileLogoutBtn = document.createElement('button');
          mobileLogoutBtn.className = 'logout-btn';
          mobileLogoutBtn.setAttribute('aria-label', 'Logout');
          const logoutIcon = document.createElement('span');
          logoutIcon.className = 'material-symbols-outlined';
          logoutIcon.textContent = 'logout';
          mobileLogoutBtn.appendChild(logoutIcon);
          
          // Attach click event
          mobileLogoutBtn.addEventListener('click', function() {
            Auth.clear();
            location.reload();
          });
          
          mobileAuthStatus.appendChild(mobileLogoutBtn);
        }
        
        mobileActions.appendChild(mobileAuthStatus);
      } else if (authBtn) {
        const mobileAuthBtn = document.createElement('button');
        mobileAuthBtn.setAttribute('data-auth-button', 'true');
        mobileAuthBtn.className = 'chip elevate';
        mobileAuthBtn.setAttribute('aria-label', 'Login');
        const loginIcon = document.createElement('span');
        loginIcon.className = 'material-symbols-outlined';
        loginIcon.textContent = 'login';
        mobileAuthBtn.appendChild(loginIcon);
        
        // Attach click event
        mobileAuthBtn.addEventListener('click', function() {
          const currentPath = window.location.pathname;
          if (currentPath.includes('account/')) {
            location.href = 'login.html';
          } else {
            location.href = 'account/login.html';
          }
        });
        
        mobileActions.appendChild(mobileAuthBtn);
      }
    }
  }
  
  // Toggle menu
  hamburger.addEventListener('click', function() {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    
    if (!isExpanded) {
      updateMobileMenu();
      mobileMenu.classList.add('active');
    } else {
      mobileMenu.classList.remove('active');
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!hamburger.contains(event.target) && !mobileMenu.contains(event.target)) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
    }
  });
  
  // Update mobile menu when auth status changes
  const observer = new MutationObserver(function() {
    if (window.innerWidth <= 768) {
      updateMobileMenu();
    }
  });
  
  if (desktopActions) {
    observer.observe(desktopActions, { childList: true, subtree: true });
  }
});

