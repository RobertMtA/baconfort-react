
// Configuración para evitar tokens expirados
export const PASSWORD_RESET_CONFIG = {
  // Tiempo de expiración en milisegundos (24 horas)
  EXPIRATION_TIME: 24 * 60 * 60 * 1000,
  
  // Validar si un token es válido
  isTokenValid: (tokenTimestamp) => {
    const now = Date.now();
    const tokenAge = now - tokenTimestamp;
    return tokenAge < PASSWORD_RESET_CONFIG.EXPIRATION_TIME;
  },
  
  // Generar nuevo token timestamp
  generateToken: () => {
    return Date.now();
  },
  
  // Obtener tiempo restante del token
  getTimeRemaining: (tokenTimestamp) => {
    const now = Date.now();
    const tokenAge = now - tokenTimestamp;
    const remaining = PASSWORD_RESET_CONFIG.EXPIRATION_TIME - tokenAge;
    return Math.max(0, remaining);
  }
};
