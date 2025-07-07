// middleware/auth.js - Middleware simplificado
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'baconfort_jwt_secret_super_seguro_2024_cambiar_en_produccion';

// Admin credentials válidas
const ADMIN_CREDENTIALS = {
  email: 'admin@baconfort.com',
  password: 'roccosa226',
  role: 'admin'
};

// Middleware de autenticación
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  console.log('🔑 Auth middleware - Token recibido:', token ? 'SÍ' : 'NO');
  console.log('🔍 Token completo:', token);
  
  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ 
      success: false, 
      error: 'Token requerido' 
    });
  }
  
  // Verificar tokens simples del sistema
  if (token.startsWith('admin_token_') || 
      token.startsWith('BACONFORT_ADMIN_TOKEN_') ||
      token.startsWith('session_') ||
      token === 'admin_baconfort_2025' ||
      token === 'BACONFORT_ADMIN_2025_7D3F9K2L') {
    console.log('✅ Token admin reconocido:', token.substring(0, 20) + '...');
    req.user = {
      id: 'admin_baconfort_2025',
      email: ADMIN_CREDENTIALS.email,
      role: ADMIN_CREDENTIALS.role
    };
    return next();
  }
  
  // Verificar tokens de usuario regular
  if (token.startsWith('user_token_')) {
    console.log('✅ Token usuario reconocido:', token.substring(0, 20) + '...');
    req.user = {
      id: 'user_roberto_2025',
      email: 'robertogaona1985@gmail.com',
      role: 'user',
      name: 'Roberto Gaona',
      phone: '+54 11 1234-5678'
    };
    return next();
  }
  
  // Verificar JWT
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('❌ Token inválido:', err.message);
      return res.status(403).json({ 
        success: false, 
        error: 'Token inválido' 
      });
    }
    
    console.log('✅ Token JWT válido, datos del usuario:', JSON.stringify(user, null, 2));
    req.user = user;
    next();
  });
};

// Middleware específico para admin
const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    console.log('❌ Acceso denegado - No es admin');
    return res.status(403).json({ 
      success: false, 
      error: 'Acceso denegado' 
    });
  }
  
  console.log('✅ Acceso admin autorizado');
  next();
};

// Middleware de autenticación opcional (no requiere token)
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token) {
    // Si hay token, intentar verificarlo
    if (token.startsWith('admin_token_') || 
        token.startsWith('BACONFORT_ADMIN_TOKEN_') ||
        token.startsWith('session_') ||
        token === 'admin_baconfort_2025' ||
        token === 'BACONFORT_ADMIN_2025_7D3F9K2L') {
      req.user = {
        id: 'admin_baconfort_2025',
        email: ADMIN_CREDENTIALS.email,
        role: ADMIN_CREDENTIALS.role
      };
    } else if (token.startsWith('user_token_')) {
      req.user = {
        id: 'user_roberto_2025',
        email: 'robertogaona1985@gmail.com',
        role: 'user',
        name: 'Roberto Gaona',
        phone: '+54 11 1234-5678'
      };
    } else {
      jwt.verify(token, JWT_SECRET, (err, user) => {
        if (!err) {
          req.user = user;
        }
      });
    }
  }
  
  // Continuar sin importar si hay token o no
  next();
};

// Alias para compatibilidad - Combina auth + admin
const adminAuth = (req, res, next) => {
  // Primero autenticar
  authenticateToken(req, res, (err) => {
    if (err) return; // Si hay error, authenticateToken ya manejó la respuesta
    
    // Luego verificar que sea admin
    requireAdmin(req, res, next);
  });
};

module.exports = {
  authenticateToken,
  requireAdmin,
  optionalAuth,
  adminAuth,
  ADMIN_CREDENTIALS,
  JWT_SECRET
};
