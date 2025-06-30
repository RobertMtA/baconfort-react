const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 BACONFORT Server Starting...');
console.log('📊 Port:', PORT);
console.log('🌍 Environment:', process.env.NODE_ENV || 'development');

// Simple CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://baconfort.netlify.app',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.log('⚠️ No MONGODB_URI provided, skipping database connection');
      return;
    }
    
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    // Don't exit in production, let the server run without DB for testing
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

connectDB();

// Health check - FIRST route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    version: '1.0.0'
  });
});

// API info
app.get('/api', (req, res) => {
  res.json({
    message: 'BACONFORT API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      test: '/api/test'
    }
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Test endpoint working',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic properties endpoint (without models for now)
app.get('/api/properties', (req, res) => {
  res.json({
    message: 'Properties endpoint',
    data: [],
    timestamp: new Date().toISOString()
  });
});

// Basic reviews endpoint
app.get('/api/reviews', (req, res) => {
  res.json({
    message: 'Reviews endpoint',
    data: [],
    timestamp: new Date().toISOString()
  });
});

// Catch all API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      '/api/health',
      '/api/test',
      '/api/properties',
      '/api/reviews'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Global error:', error.message);
  
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : error.message,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 BACONFORT Server running on port ${PORT}`);
  console.log(`📊 API available at: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log('✅ Server started successfully');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Shutting down gracefully...');
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

module.exports = app;
