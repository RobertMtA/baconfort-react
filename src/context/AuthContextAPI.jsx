import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, usersAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un token guardado al cargar la app
    const token = localStorage.getItem('baconfort-token');
    if (token) {
      // Verificar que el token sea válido obteniendo el perfil
      authAPI.profile()
        .then(response => {
          setUser(response.user);
        })
        .catch(error => {
          console.error('Token inválido:', error);
          localStorage.removeItem('baconfort-token');
          localStorage.removeItem('baconfort-user');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.login(email, password);
      
      if (response.success) {
        // Guardar token y usuario
        localStorage.setItem('baconfort-token', response.token);
        localStorage.setItem('baconfort-user', JSON.stringify(response.user));
        setUser(response.user);
        
        return { success: true, user: response.user };
      } else {
        return { success: false, error: response.error || 'Error en el login' };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await authAPI.register(userData);
      
      if (response.success) {
        // Auto-login después del registro
        localStorage.setItem('baconfort-token', response.token);
        localStorage.setItem('baconfort-user', JSON.stringify(response.user));
        setUser(response.user);
        
        return { success: true, user: response.user };
      } else {
        return { success: false, error: response.error || 'Error en el registro' };
      }
    } catch (error) {
      console.error('Error en registro:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    console.log('🚪 Cerrando sesión...');
    setUser(null);
    localStorage.removeItem('baconfort-token');
    localStorage.removeItem('baconfort-user');
    console.log('✅ Sesión cerrada exitosamente');
  };

  const updateProfile = async (userData) => {
    try {
      const response = await authAPI.updateProfile(userData);
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('baconfort-user', JSON.stringify(response.user));
        return { success: true, user: response.user };
      } else {
        return { success: false, error: response.error || 'Error actualizando perfil' };
      }
    } catch (error) {
      console.error('Error actualizando perfil:', error);
      return { success: false, error: error.message };
    }
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Métodos de gestión de usuarios (solo para admin)
  const getAllUsers = async () => {
    try {
      if (!isAdmin()) {
        return { success: false, error: 'No tienes permisos para acceder a los usuarios' };
      }
      
      const response = await usersAPI.getAll();
      return response;
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      if (!isAdmin()) {
        return { success: false, error: 'No tienes permisos para actualizar usuarios' };
      }
      
      const response = await usersAPI.update(userId, userData);
      return response;
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      return { success: false, error: error.message };
    }
  };

  const deleteUser = async (userId) => {
    try {
      if (!isAdmin()) {
        return { success: false, error: 'No tienes permisos para eliminar usuarios' };
      }
      
      const response = await usersAPI.delete(userId);
      return response;
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated,
    isAdmin,
    getAllUsers,
    updateUser,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
