// Authentication helper functions
// Learned about localStorage from: https://www.youtube.com/watch?v=k8yJCpPJ0l4
// Learned about objects and functions from: https://www.youtube.com/watch?v=PFmuCDHHpwk

const Auth = {
  tokenKey: 'token',
  userKey: 'user',
  
  getToken: function() {
    return localStorage.getItem(this.tokenKey);
  },
  
  setToken: function(token) {
    localStorage.setItem(this.tokenKey, token);
  },
  
  clear: function() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  },
  
  isLoggedIn: function() {
    const token = this.getToken();
    if (token) {
      return true;
    }
    return false;
  },
  
  getUser: function() {
    try {
      const userString = localStorage.getItem(this.userKey);
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    } catch (error) {
      return null;
    }
  },
  
  setUser: function(user) {
    if (user) {
      const userString = JSON.stringify(user);
      localStorage.setItem(this.userKey, userString);
    } else {
      localStorage.removeItem(this.userKey);
    }
  },
  
  login: function(data) {
    if (data.accessToken) {
      this.setToken(data.accessToken);
      this.setUser({
        email: data.email,
        username: data.username,
        id: data.id,
        bio: data.bio,
        avatar: data.avatar
      });
      return true;
    }
    return false;
  }
};

window.Auth = Auth;


