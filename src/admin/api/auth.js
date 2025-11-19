// Simulación de API - datos mock
export const authAPI = {
  login: async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@aura.com' && password === 'admin123') {
          resolve({
            success: true,
            token: 'fake-jwt-token-12345',
            user: {
              id: 1,
              name: 'Administrador',
              email: 'admin@aura.com',
              role: 'admin'
            }
          });
        } else {
          reject(new Error('Credenciales incorrectas'));
        }
      }, 800);
    });
  },

  verifyToken: async (token) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (token === 'fake-jwt-token-12345') {
          resolve({
            valid: true,
            user: {
              id: 1,
              name: 'Administrador',
              email: 'admin@aura.com',
              role: 'admin'
            }
          });
        } else {
          reject(new Error('Token inválido'));
        }
      }, 300);
    });
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  }
};