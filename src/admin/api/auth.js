import { API_ENDPOINTS } from '../config/api';

export const authAPI = {
  login: async (email, password) => {
    try {
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('Login response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      // Verificar que tengamos el token
      if (!data.token) {
        throw new Error('Respuesta del servidor inválida: falta el token');
      }

      // Si el servidor no devuelve el usuario, obtenerlo con el token
      if (!data.user) {
        console.log('Obteniendo información del usuario con el token...');
        const userInfo = await authAPI.verifyToken(data.token);
        return {
          success: true,
          token: data.token,
          user: userInfo.user
        };
      }

      // Si el servidor sí devuelve el usuario, procesarlo
      const userRole = data.user.role?.role_name || data.user.role;
      if (userRole !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden acceder.');
      }

      return {
        success: true,
        token: data.token,
        user: {
          id: data.user.user_id || data.user.id,
          username: data.user.username,
          email: data.user.email,
          role: userRole
        }
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Error de conexión con el servidor');
    }
  },

  verifyToken: async (token) => {
    try {
      const response = await fetch(API_ENDPOINTS.PROFILE, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('Verify token response:', data); // Debug log

      if (!response.ok) {
        throw new Error(data.message || 'Token inválido');
      }

      // Validar que exista la estructura esperada
      if (!data.user) {
        throw new Error('Respuesta del servidor inválida: falta información del usuario');
      }

      // Verificar que el usuario tenga rol de admin
      const userRole = data.user.role?.role_name || data.user.role;
      if (userRole !== 'admin') {
        throw new Error('Acceso denegado. Solo administradores pueden acceder.');
      }

      return {
        valid: true,
        user: {
          id: data.user.user_id || data.user.id,
          username: data.user.username,
          email: data.user.email,
          role: userRole
        }
      };
    } catch (error) {
      console.error('Verify token error:', error);
      throw new Error(error.message || 'Error al verificar el token');
    }
  },

  getAllUsers: async (token) => {
    try {
      const response = await fetch(API_ENDPOINTS.USERS, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al obtener usuarios');
      }

      return {
        success: true,
        users: data.users.map(user => ({
          id: user.user_id,
          username: user.username,
          email: user.email,
          role: user.role.role_name,
          createdAt: user.created_at
        }))
      };
    } catch (error) {
      throw new Error(error.message || 'Error al obtener la lista de usuarios');
    }
  },

  logout: () => {
    localStorage.removeItem('adminToken');
  }
};