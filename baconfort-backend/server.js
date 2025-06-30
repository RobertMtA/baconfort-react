const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 BACONFORT Server Starting...');
console.log('📊 Port:', PORT);
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://baconfort.netlify.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ No MONGODB_URI provided, using demo mode');
      return;
    }
    
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('🔄 Running in demo mode without database');
  }
};

connectDB();

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BACONFORT API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

// API root
app.get('/api', (req, res) => {
  res.json({
    message: 'BACONFORT API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/test', '/api/auth/login', '/api/properties', '/api/reviews']
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString()
  });
});

// Demo authentication endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('🔐 Login attempt:', email);
  
  // Demo admin credentials
  if (email === 'admin@baconfort.com' && password === 'admin123') {
    const token = jwt.sign(
      { userId: 'demo-admin', role: 'admin' },
      process.env.JWT_SECRET || 'demo-secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: 'demo-admin',
        email: 'admin@baconfort.com',
        role: 'admin',
        name: 'Demo Admin'
      }
    });
  } else {
    res.status(401).json({
      error: 'Credenciales inválidas'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  res.json({
    message: 'Registro disponible próximamente',
    demo: true
  });
});

app.get('/api/auth/verify', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    res.json({
      valid: true,
      user: decoded
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Basic properties endpoint
app.get('/api/properties', (req, res) => {
  res.json({
    message: 'Properties endpoint',
    data: [],
    timestamp: new Date().toISOString()
  });
});

// Individual property endpoints
app.get('/api/properties/:propertyId', (req, res) => {
  const { propertyId } = req.params;
  
  // Demo property data
  const propertyData = {
    moldes1680: {
      id: 'moldes1680',
      name: 'Moldes 1680',
      address: 'Moldes 1680, CABA',
      price: 85000,
      description: 'Moderno departamento en el corazón de la ciudad',
      amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada', 'balcon'],
      images: [],
      reviews: [],
      available: true
    },
    santafe3770: {
      id: 'santafe3770',
      name: 'Santa Fe 3770',
      address: 'Santa Fe 3770, CABA',
      price: 92000,
      description: 'Elegante departamento con excelente ubicación',
      amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada', 'gimnasio'],
      images: [],
      reviews: [],
      available: true
    },
    dorrego1548: {
      id: 'dorrego1548',
      name: 'Dorrego 1548',
      address: 'Dorrego 1548, CABA',
      price: 78000,
      description: 'Acogedor departamento en zona tranquila',
      amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada'],
      images: [],
      reviews: [],
      available: true
    },
    convencion1994: {
      id: 'convencion1994',
      name: 'Convención 1994',
      address: 'Convención 1994, CABA',
      price: 88000,
      description: 'Departamento moderno con todas las comodidades',
      amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada', 'balcon'],
      images: [],
      reviews: [],
      available: true
    },
    ugarteche2824: {
      id: 'ugarteche2824',
      name: 'Ugarteche 2824',
      address: 'Ugarteche 2824, CABA',
      price: 95000,
      description: 'Lujoso departamento con vista panorámica',
      amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada', 'balcon', 'gimnasio'],
      images: [],
      reviews: [],
      available: true
    }
  };

  const property = propertyData[propertyId];
  
  if (!property) {
    return res.status(404).json({
      error: 'Property not found',
      propertyId
    });
  }

  console.log(`📋 Property requested: ${propertyId}`);
  res.json({
    message: 'Property found',
    data: property,
    timestamp: new Date().toISOString()
  });
});

// Authentication endpoints for property access
app.get('/api/auth/me', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    res.json({
      id: decoded.userId,
      email: 'admin@baconfort.com',
      role: decoded.role,
      name: 'Demo Admin'
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Reservations endpoints
app.get('/api/reservations', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  res.json({
    message: 'Reservations endpoint',
    data: [],
    timestamp: new Date().toISOString()
  });
});

app.post('/api/reservations', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  console.log('📅 New reservation request:', req.body);
  res.json({
    message: 'Reservation created',
    id: 'demo-reservation-' + Date.now(),
    data: req.body,
    timestamp: new Date().toISOString()
  });
});

// Gallery endpoints
app.get('/api/gallery/:propertyId', (req, res) => {
  const { propertyId } = req.params;
  
  console.log(`🖼️ Gallery requested for: ${propertyId}`);
  res.json({
    message: 'Gallery endpoint',
    propertyId,
    images: [],
    timestamp: new Date().toISOString()
  });
});

// Catch all
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  res.status(500).json({
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('🌍 Host: 0.0.0.0');
  console.log('✅ Ready');
});

module.exports = app;
