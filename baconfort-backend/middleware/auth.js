const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    console.log('🔐 Auth Header:', authHeader ? authHeader.substring(0, 20) + '...' : 'No header');
    
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token) {
      console.log('❌ No token provided');
      return res.status(401).json({ error: 'Acceso denegado. Token requerido.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Token decoded for user:', decoded.userId);
    
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      console.log('❌ User not found for ID:', decoded.userId);
      return res.status(401).json({ error: 'Token inválido. Usuario no encontrado.' });
    }

    if (!user.isActive) {
      console.log('❌ User account inactive:', user.email);
      return res.status(401).json({ error: 'Cuenta desactivada.' });
    }

    console.log('✅ Auth successful for:', user.email);
    req.user = user;
    next();
  } catch (error) {
    console.error('Error en middleware auth:', error.message);
    res.status(401).json({ error: 'Token inválido.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {
      if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
      }
      next();
    });
  } catch (error) {
    console.error('Error en middleware adminAuth:', error);
    res.status(401).json({ error: 'Error de autorización.' });
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      req.user = null;
      return next();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    
    req.user = user;
    next();
  } catch (error) {
    // Si el token es inválido, continúa sin usuario
    req.user = null;
    next();
  }
};

module.exports = { auth, adminAuth, optionalAuth };
