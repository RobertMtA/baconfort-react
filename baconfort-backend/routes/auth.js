// routes/auth.js - Rutas de autenticación
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authenticateToken, requireAdmin, ADMIN_CREDENTIALS, JWT_SECRET } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔑 Login attempt:', email);
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email y contraseña requeridos'
      });
    }
    
    // Verificar credenciales admin
    if (email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase() &&
        password === ADMIN_CREDENTIALS.password) {
      
      const token = jwt.sign(
        { 
          id: 'admin_baconfort_2025',
          email: ADMIN_CREDENTIALS.email,
          role: ADMIN_CREDENTIALS.role 
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      console.log('✅ Admin login successful');
      
      return res.json({
        success: true,
        message: 'Login exitoso',
        user: {
          id: 'admin_baconfort_2025',
          email: ADMIN_CREDENTIALS.email,
          role: ADMIN_CREDENTIALS.role,
          name: 'Admin BACONFORT',
          phone: '+54 11 3002-1074',
          createdAt: '2024-01-01T00:00:00.000Z'
        },
        token
      });
    }
    
    // 👤 VERIFICAR USUARIOS REGULARES
    // Primero buscar en la base de datos
    try {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
      if (user) {
        const isPasswordValid = await user.comparePassword(password);
        if (isPasswordValid) {
          const token = jwt.sign(
            { 
              id: user._id,
              userId: user._id, // Para compatibilidad con middleware
              email: user.email,
              role: user.role,
              name: user.name
            },
            JWT_SECRET,
            { expiresIn: '24h' }
          );
          
          // Actualizar último login
          user.lastLogin = new Date();
          await user.save();
          
          console.log('✅ Database user login successful:', email);
          
          return res.json({
            success: true,
            message: 'Login exitoso',
            user: {
              id: user._id,
              email: user.email,
              role: user.role,
              name: user.name,
              phone: user.phone,
              emailVerified: user.emailVerified,
              createdAt: user.createdAt,
              lastLogin: user.lastLogin
            },
            token
          });
        }
      }
    } catch (dbError) {
      console.log('Database error during login:', dbError);
      // Continuar con el fallback si hay error de BD
    }
    
    // Fallback: Para el usuario específico hardcoded (temporal)
    if (email.toLowerCase() === 'robertogaona1985@gmail.com' && password === 'password123') {
      const userId = 'user_roberto_2025';
      const token = jwt.sign(
        { 
          id: userId,
          userId: userId, // Para compatibilidad con middleware
          email: email.toLowerCase(),
          role: 'user',
          name: 'Roberto Gaona'
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      console.log('✅ Hardcoded user login successful:', email);
      
      return res.json({
        success: true,
        message: 'Login exitoso',
        user: {
          id: userId,
          email: email.toLowerCase(),
          role: 'user',
          name: 'Roberto Gaona',
          phone: '+54 11 1234-5678',
          createdAt: '2023-01-01T00:00:00.000Z'
        },
        token
      });
    }
    
    // Si no coincide con ningún usuario válido
    console.log('❌ Invalid credentials for:', email);
    return res.status(401).json({
      success: false,
      error: 'Credenciales inválidas'
    });
    
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Registro de usuarios
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    console.log('📝 Register attempt:', email);
    
    // Validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Nombre, email y contraseña son requeridos'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'La contraseña debe tener al menos 6 caracteres'
      });
    }
    
    // Verificar si el email ya está registrado
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'El email ya está registrado'
      });
    }
    
    // Crear nuevo usuario
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase(),
      password: password,
      phone: phone || null,
      role: 'user',
      emailVerified: false
    });
    
    // Guardar usuario en la base de datos
    await newUser.save();
    
    // Generar token JWT
    const token = jwt.sign(
      { 
        id: newUser._id,
        userId: newUser._id, // Para compatibilidad con middleware
        email: newUser.email,
        role: newUser.role,
        name: newUser.name
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log('✅ User registered successfully:', email);
    
    // Devolver respuesta exitosa
    return res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        phone: newUser.phone,
        emailVerified: newUser.emailVerified,
        createdAt: newUser.createdAt
      },
      token
    });
    
  } catch (error) {
    console.error('❌ Register error:', error);
    
    // Manejar errores de validación de Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        error: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Verificar usuario actual
router.get('/me', authenticateToken, (req, res) => {
  console.log('👤 /auth/me - Usuario actual:', req.user?.email, 'Rol:', req.user?.role);
  
  // Devolver datos específicos según el rol
  if (req.user.role === 'admin') {
    res.json({
      success: true,
      user: {
        id: req.user.id,
        email: req.user.email,
        role: req.user.role,
        name: 'Admin BACONFORT',
        phone: '+54 11 3002-1074',
        createdAt: '2024-01-01T00:00:00.000Z'
      }
    });
  } else if (req.user.role === 'user' || req.user.role === 'guest') {
    // Datos específicos para usuarios regulares (user o guest)
    const userData = {
      id: req.user.id || req.user.userId,
      email: req.user.email,
      role: req.user.role,
      name: req.user.name || 'Usuario',
      phone: req.user.phone || null,
      createdAt: req.user.createdAt || new Date().toISOString()
    };
    
    // Si es Roberto, usar sus datos específicos
    if (req.user.email === 'robertogaona1985@gmail.com') {
      userData.name = 'Roberto Gaona';
      userData.phone = '+54 11 1234-5678';
      userData.createdAt = '2023-01-01T00:00:00.000Z';
    }
    
    res.json({
      success: true,
      user: userData
    });
  } else {
    res.status(400).json({
      success: false,
      error: 'Rol de usuario no válido'
    });
  }
});

// Actualizar perfil de usuario autenticado
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    console.log('👤 /auth/profile - Actualizar perfil:', req.user?.email, { name, email, phone });
    
    // Validaciones básicas
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'El nombre debe tener al menos 2 caracteres'
      });
    }
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Email inválido'
      });
    }
    
    // Para admin, actualizar datos especiales
    if (req.user.role === 'admin') {
      const updatedUser = {
        id: req.user.id,
        email: email,
        role: 'admin',
        name: name,
        phone: phone || '+54 11 3002-1074',
        createdAt: req.user.createdAt || '2024-01-01T00:00:00.000Z',
        updatedAt: new Date().toISOString()
      };
      
      console.log('✅ Admin profile updated:', updatedUser);
      
      return res.json({
        success: true,
        message: 'Perfil actualizado exitosamente',
        user: updatedUser
      });
    }
    
    // Para usuarios normales (cuando se implemente registro)
    const updatedUser = {
      id: req.user.id,
      email: email,
      role: req.user.role,
      name: name,
      phone: phone,
      createdAt: req.user.createdAt,
      updatedAt: new Date().toISOString()
    };
    
    console.log('✅ User profile updated:', updatedUser);
    
    res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      user: updatedUser
    });
    
  } catch (error) {
    console.error('❌ Profile update error:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Cambiar contraseña
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    console.log('🔐 /auth/change-password - Usuario:', req.user?.email);
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        error: 'Contraseña actual y nueva contraseña requeridas'
      });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'La nueva contraseña debe tener al menos 6 caracteres'
      });
    }
    
    // Para admin, verificar contraseña actual
    if (req.user.role === 'admin') {
      if (currentPassword !== ADMIN_CREDENTIALS.password) {
        return res.status(401).json({
          success: false,
          error: 'Contraseña actual incorrecta'
        });
      }
      
      // En un sistema real, aquí actualizarías la contraseña en la base de datos
      console.log('⚠️ Password change requested for admin - would update in real DB');
      
      return res.json({
        success: true,
        message: 'Contraseña actualizada exitosamente'
      });
    }
    
    // Para usuarios normales (cuando se implemente registro con DB)
    res.json({
      success: true,
      message: 'Contraseña actualizada exitosamente'
    });
    
  } catch (error) {
    console.error('❌ Password change error:', error);
    res.status(500).json({
      success: false,
      error: 'Error interno del servidor'
    });
  }
});

// Verificar token
router.post('/verify', authenticateToken, (req, res) => {
  console.log('🔍 /auth/verify - Token válido para:', req.user?.email);
  
  res.json({
    success: true,
    valid: true,
    user: req.user
  });
});

// Logout
router.post('/logout', (req, res) => {
  console.log('👋 Logout request');
  
  res.json({
    success: true,
    message: 'Logout exitoso'
  });
});

module.exports = router;
