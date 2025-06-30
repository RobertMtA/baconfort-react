// PROPUESTA DE MEJORA DE SEGURIDAD PARA PRODUCCIÓN

// 1. Variables de entorno (.env)
REACT_APP_ADMIN_USER=admin
REACT_APP_ADMIN_PASS_HASH=hash_seguro_aqui

// 2. Hash de contraseñas
import bcrypt from 'bcryptjs';

const login = async (username, password) => {
  const validUsername = process.env.REACT_APP_ADMIN_USER;
  const validPasswordHash = process.env.REACT_APP_ADMIN_PASS_HASH;
  
  if (username === validUsername) {
    const isValidPassword = await bcrypt.compare(password, validPasswordHash);
    if (isValidPassword) {
      // Generar JWT token
      const token = generateJWT({ username, timestamp: Date.now() });
      localStorage.setItem('baconfort_admin_token', token);
      return true;
    }
  }
  return false;
};

// 3. Autenticación con backend
const loginWithBackend = async (username, password) => {
  try {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem('baconfort_admin_token', token);
      return true;
    }
  } catch (error) {
    console.error('Error de autenticación:', error);
  }
  return false;
};
