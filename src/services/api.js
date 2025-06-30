// Configuración de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://baconfort-react-2.onrender.com' : 'http://localhost:5000');
export const API_URL = API_BASE_URL;

// Utilidad para hacer requests a la API
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}/api${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Añadir token de autorización si existe
  const token = localStorage.getItem('baconfort-token');
  if (token) {
    console.log('🔐 API: Token encontrado, agregando a headers:', token.substring(0, 20) + '...');
    defaultOptions.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('❌ API: No se encontró token en localStorage');
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// Funciones específicas de autenticación
export const authAPI = {
  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  profile: async () => {
    return apiRequest('/auth/me');
  },

  updateProfile: async (userData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // Recuperación de contraseña
  forgotPassword: async (email) => {
    return apiRequest('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  resetPassword: async (token, newPassword) => {
    return apiRequest('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  },
};

// Funciones de usuarios (para admin)
export const usersAPI = {
  getAll: async () => {
    return apiRequest('/users');
  },

  getById: async (id) => {
    return apiRequest(`/users/${id}`);
  },

  update: async (id, userData) => {
    return apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

// Funciones de propiedades
export const propertiesAPI = {
  getAll: async () => {
    return apiRequest('/properties');
  },

  getById: async (id) => {
    return apiRequest(`/properties/${id}`);
  },

  create: async (propertyData) => {
    return apiRequest('/properties', {
      method: 'POST',
      body: JSON.stringify(propertyData),
    });
  },

  update: async (id, propertyData) => {
    return apiRequest(`/properties/${id}`, {
      method: 'PUT',
      body: JSON.stringify(propertyData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/properties/${id}`, {
      method: 'DELETE',
    });
  },
};

// Funciones de reseñas
export const reviewsAPI = {
  // Obtener reseñas de una propiedad (públicas aprobadas)
  getPropertyReviews: async (propertyId, options = {}) => {
    const { limit = 10, page = 1, sort = '-createdAt' } = options;
    const params = new URLSearchParams({
      limit: limit.toString(),
      page: page.toString(),
      sort
    });
    
    return apiRequest(`/reviews/property/${propertyId}?${params}`);
  },

  // Enviar nueva reseña (desde frontend público)
  submitReview: async (reviewData) => {
    return apiRequest('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  },

  // Obtener todas las reseñas para administración (incluyendo pendientes)
  getAllReviews: async (options = {}) => {
    const { limit = 20, page = 1, status = 'all', sort = '-createdAt' } = options;
    const params = new URLSearchParams({
      limit: limit.toString(), 
      page: page.toString(),
      sort
    });
    
    if (status !== 'all') {
      params.append('status', status);
    }
    
    return apiRequest(`/reviews/admin?${params}`);
  },

  // Moderar reseña (aprobar/rechazar) - Solo admin
  moderateReview: async (reviewId, action, moderatorNotes = '') => {
    return apiRequest(`/reviews/${reviewId}/moderate`, {
      method: 'PATCH',
      body: JSON.stringify({ action, moderatorNotes })
    });
  },

  // Eliminar reseña - Solo admin
  deleteReview: async (reviewId) => {
    return apiRequest(`/reviews/${reviewId}`, {
      method: 'DELETE'
    });
  },

  // Marcar/desmarcar reseña como destacada - Solo admin
  toggleHighlight: async (reviewId, highlight = true) => {
    return apiRequest(`/reviews/${reviewId}/highlight`, {
      method: 'PATCH',
      body: JSON.stringify({ highlight })
    });
  }
};

// Funciones de reservas
export const reservationsAPI = {
  getAll: async () => {
    return apiRequest('/reservations');
  },

  getMyReservations: async () => {
    return apiRequest('/reservations/my');
  },

  getById: async (id) => {
    return apiRequest(`/reservations/${id}`);
  },

  create: async (reservationData) => {
    return apiRequest('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
  },

  updateStatus: async (id, status) => {
    return apiRequest(`/reservations/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  cancel: async (id) => {
    return apiRequest(`/reservations/${id}/cancel`, {
      method: 'PUT',
    });
  },

  delete: async (id) => {
    return apiRequest(`/reservations/${id}`, {
      method: 'DELETE',
    });
  },
};

// Funciones de galería de imágenes (base de datos)
export const galleryAPI = {
  // Obtener todas las imágenes de una propiedad
  getByProperty: async (propertyId) => {
    return apiRequest(`/gallery/${propertyId}`);
  },

  // Subir múltiples imágenes
  uploadImages: async (propertyId, images, formData = null) => {
    // Si se pasa formData directamente (para archivos reales), usarlo
    if (formData) {
      return apiRequest(`/gallery/${propertyId}/upload`, {
        method: 'POST',
        headers: {
          // No incluir Content-Type para FormData, el navegador lo establecerá automáticamente
          'Authorization': localStorage.getItem('baconfort-token') ? `Bearer ${localStorage.getItem('baconfort-token')}` : undefined
        },
        body: formData,
      });
    }
    
    // Para base64 o URLs de imagen
    return apiRequest(`/gallery/${propertyId}/upload-batch`, {
      method: 'POST',
      body: JSON.stringify({ images }),
    });
  },

  // Actualizar información de una imagen
  updateImage: async (imageId, updateData) => {
    return apiRequest(`/gallery/${imageId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  // Eliminar una imagen
  deleteImage: async (imageId) => {
    return apiRequest(`/gallery/${imageId}`, {
      method: 'DELETE',
    });
  },

  // Reordenar imágenes
  reorderImages: async (propertyId, imageIds) => {
    return apiRequest(`/gallery/${propertyId}/reorder`, {
      method: 'PUT',
      body: JSON.stringify({ imageIds }),
    });
  },

  // Establecer imagen como portada
  setCoverImage: async (imageId) => {
    return apiRequest(`/gallery/${imageId}/cover`, {
      method: 'PUT',
    });
  }
};

// Funciones específicas de propiedades
export const propertyAPI = {
  // Obtener una propiedad específica
  getProperty: async (propertyId) => {
    return apiRequest(`/properties/${propertyId}`, {
      method: 'GET',
    });
  },

  // Obtener todas las propiedades
  getAllProperties: async () => {
    return apiRequest('/properties', {
      method: 'GET',
    });
  },

  // Actualizar una propiedad
  updateProperty: async (propertyId, data) => {
    return apiRequest(`/properties/${propertyId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
};

// Funciones de conveniencia para mantener compatibilidad
export const getUserReservations = () => reservationsAPI.getMyReservations();
export const updateReservationStatus = (id, status) => reservationsAPI.updateStatus(id, status);

export { API_BASE_URL };

// Cache buster - Updated: 2025-06-29T20:20:00Z
