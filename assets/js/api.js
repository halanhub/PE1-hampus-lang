// API helper functions
// Learned about fetch API from: https://www.youtube.com/watch?v=cuEtnrL9-H0
// Learned about promises from: https://www.youtube.com/watch?v=DHvZLI7Db8E
// Learned about async/await from: https://www.youtube.com/watch?v=vn3tm0quoqE

const API = {
  baseURL: '',
  
  json: function(url, options) {
    return fetch(url, options).then(function(response) {
      if (!response.ok) {
        let errorMessage = 'HTTP ' + response.status;
        return response.json().then(function(errorData) {
          if (errorData.errors && errorData.errors.length > 0) {
            let messages = [];
            for (let i = 0; i < errorData.errors.length; i++) {
              if (errorData.errors[i].message) {
                messages.push(errorData.errors[i].message);
              } else {
                messages.push(errorData.errors[i]);
              }
            }
            errorMessage = messages.join(', ');
          } else if (errorData.message) {
            errorMessage = errorData.message;
          }
          const error = new Error(errorMessage);
          error.status = response.status;
          error.response = response;
          throw error;
        }).catch(function(error) {
          if (error.status) {
            throw error;
          }
          const newError = new Error(response.statusText || 'HTTP ' + response.status);
          newError.status = response.status;
          throw newError;
        });
      }
      return response.json();
    });
  },
  
  delay: function(ms) {
    return new Promise(function(resolve) {
      setTimeout(resolve, ms);
    });
  },
  
  // Mock data for testing
  mockProducts: function() {
    const products = [];
    const brands = ['Nova Studio', 'Luma Labs', 'Echo Works'];
    
    for (let i = 0; i < 20; i++) {
      const id = i + 1;
      const price = (50 + i * 3.7).toFixed(2);
      let discount = null;
      if (i % 3 === 0) {
        discount = (parseFloat(price) * 0.9).toFixed(2);
      }
      
      const product = {
        id: String(id),
        title: 'Aurora Headphones ' + id,
        brand: brands[i % 3],
        description: 'Premium sound with active noise canceling and soft memory foam.',
        price: Number(price),
        discountPrice: discount ? Number(discount) : null,
        rating: 3.8 + (i % 4) * 0.3,
        tags: ['audio', 'wireless', (i % 2 === 0 ? 'pro' : 'lite')],
        image: 'assets/img/product_' + ((i % 5) + 1) + '.svg',
        createdAt: Date.now() - i * 86400000
      };
      products.push(product);
    }
    return products;
  },
  
  useMock: function() {
    return !this.baseURL;
  },
  
  normalizeProduct: function(p) {
    const product = {
      id: String(p.id),
      title: p.title,
      description: p.description,
      price: Number(p.price),
      discountPrice: null,
      rating: 0,
      tags: [],
      reviews: [],
      brand: '—',
      image: 'assets/img/product_1.svg',
      imageAlt: p.title,
      createdAt: Date.now()
    };
    
    if (p.discountedPrice != null) {
      product.discountPrice = Number(p.discountedPrice);
    }
    
    if (typeof p.rating === 'number') {
      product.rating = p.rating;
    }
    
    if (Array.isArray(p.tags)) {
      product.tags = p.tags;
      if (p.tags.length > 0) {
        product.brand = p.tags[0];
      }
    }
    
    if (Array.isArray(p.reviews)) {
      product.reviews = p.reviews;
    }
    
    if (p.image && p.image.url) {
      product.image = p.image.url;
    }
    
    if (p.image && p.image.alt) {
      product.imageAlt = p.image.alt;
    }
    
    return product;
  },
  
  get: function(path, params) {
    if (!params) {
      params = {};
    }
    
    if (!this.useMock()) {
      const base = this.baseURL + path;
      
      if (path === '/online-shop') {
        return this.json(base).then(function(res) {
          let items = [];
          if (Array.isArray(res.data)) {
            items = res.data;
          }
          
          let mapped = [];
          for (let i = 0; i < items.length; i++) {
            mapped.push(API.normalizeProduct(items[i]));
          }
          
          if (params.limit) {
            const limit = Number(params.limit);
            mapped = mapped.slice(0, limit);
          }
          
          return mapped;
        });
      }
      
      if (path.indexOf('/online-shop/') === 0) {
        return this.json(base).then(function(res) {
          let productData = {};
          if (res.data) {
            productData = res.data;
          }
          return API.normalizeProduct(productData);
        });
      }
      
      return this.json(base);
    }
    
    // Mock endpoints
    return this.delay(300).then(function() {
      const mockProducts = API.mockProducts();
      
      if (path.indexOf('/online-shop/') === 0) {
        const pathParts = path.split('/');
        const id = pathParts[pathParts.length - 1];
        
        for (let i = 0; i < mockProducts.length; i++) {
          if (mockProducts[i].id === id) {
            return mockProducts[i];
          }
        }
        throw new Error('Not Found');
      }
      
      if (path === '/online-shop') {
        let arr = [];
        for (let i = 0; i < mockProducts.length; i++) {
          arr.push(mockProducts[i]);
        }
        
        if (params.limit) {
          const limit = Number(params.limit);
          arr = arr.slice(0, limit);
        }
        
        return arr;
      }
      
      throw new Error('Unknown GET');
    });
  },
  
  post: function(path, body) {
    if (!this.useMock()) {
      const url = this.baseURL + path;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };
      
      return this.json(url, options).then(function(response) {
        return response;
      }).catch(function(err) {
        throw err;
      });
    }
    
    // Mock endpoints
    return this.delay(300).then(function() {
      if (path === '/auth/login') {
        if (body.email && body.password) {
          return {
            data: {
              accessToken: 'mock-token-' + Math.random().toString(36).substring(2),
              email: body.email,
              username: 'mockuser',
              id: 'mock-id'
            }
          };
        }
        throw new Error('Invalid credentials');
      }
      
      if (path === '/auth/register') {
        if (body.email && body.password && body.name) {
          return {
            data: {
              id: 'mock-id',
              email: body.email,
              username: body.name
            }
          };
        }
        throw new Error('Invalid fields');
      }
      
      throw new Error('Unknown POST');
    });
  },
  
  getBaseURL: function() {
    return this.baseURL;
  },
  
  setBaseURL: function(url) {
    this.baseURL = url;
  }
};

window.API = API;

// Currency formatter (NOK)
window.formatPrice = function(n){
  try{
    return new Intl.NumberFormat('nb-NO', { style: 'currency', currency: 'NOK' }).format(Number(n));
  }catch{
    return `NOK ${Number(n).toFixed(2)}`;
  }
};


