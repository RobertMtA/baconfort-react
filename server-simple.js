const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 BACONFORT Server Starting...');
console.log('📊 Port:', PORT);

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://baconfort.netlify.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BACONFORT API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: 'production'
  });
});

// API info
app.get('/api', (req, res) => {
  res.json({
    message: 'BACONFORT API',
    version: '1.0.0',
    endpoints: [
      '/api/health',
      '/api/auth/login',
      '/api/auth/me',
      '/api/properties/:id',
      '/api/reservations',
      '/api/gallery/:id'
    ]
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('🔐 Login attempt:', email, password);
  
  // Demo credentials
  if (email === 'admin@baconfort.com' && password === 'admin123') {
    const token = jwt.sign(
      { userId: 'demo-admin', role: 'admin', email },
      'demo-secret-key',
      { expiresIn: '7d' }
    );
    
    console.log('✅ Login successful for:', email);
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
    console.log('❌ Login failed for:', email);
    res.status(401).json({
      error: 'Credenciales inválidas'
    });
  }
});

// User info endpoint
app.get('/api/auth/me', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, 'demo-secret-key');
    res.json({
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      name: 'Demo Admin'
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Properties data
const propertiesData = {
  moldes1680: {
    id: 'moldes1680',
    name: 'Moldes 1680',
    address: 'Moldes 1680, CABA',
    price: 85000,
    description: 'Moderno departamento en el corazón de la ciudad',
    amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada', 'balcon'],
    available: true
  },
  santafe3770: {
    id: 'santafe3770',
    name: 'Santa Fe 3770',
    address: 'Santa Fe 3770, CABA',
    price: 92000,
    description: 'Elegante departamento con excelente ubicación',
    amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada', 'gimnasio'],
    available: true
  },
  dorrego1548: {
    id: 'dorrego1548',
    name: 'Dorrego 1548',
    address: 'Dorrego 1548, CABA',
    price: 78000,
    description: 'Acogedor departamento en zona tranquila',
    amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada'],
    available: true
  },
  convencion1994: {
    id: 'convencion1994',
    name: 'Convención 1994',
    address: 'Convención 1994, CABA',
    price: 88000,
    description: 'Departamento moderno con todas las comodidades',
    amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada', 'balcon'],
    available: true
  },
  ugarteche2824: {
    id: 'ugarteche2824',
    name: 'Ugarteche 2824',
    address: 'Ugarteche 2824, CABA',
    price: 95000,
    description: 'Lujoso departamento con vista panorámica',
    amenities: ['wifi', 'aire_acondicionado', 'cocina_equipada', 'balcon', 'gimnasio'],
    available: true
  }
};

// Individual property endpoint
app.get('/api/properties/:propertyId', (req, res) => {
  const { propertyId } = req.params;
  const property = propertiesData[propertyId];
  
  if (!property) {
    return res.status(404).json({
      error: 'Property not found',
      propertyId
    });
  }

  console.log(`📋 Property requested: ${propertyId}`);
  res.json(property);
});

// All properties
app.get('/api/properties', (req, res) => {
  res.json(Object.values(propertiesData));
});

// Reservations
app.get('/api/reservations', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  res.json([]);
});

app.post('/api/reservations', (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  console.log('📅 New reservation:', req.body);
  res.json({
    id: 'reservation-' + Date.now(),
    ...req.body,
    status: 'confirmed'
  });
});

// Gallery endpoint
app.get('/api/gallery/:propertyId', (req, res) => {
  const { propertyId } = req.params;
  res.json({
    propertyId,
    images: []
  });
});

// Catch all for undefined routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ Ready for connections');
});

module.exports = app;
