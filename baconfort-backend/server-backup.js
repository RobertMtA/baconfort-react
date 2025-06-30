const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Iniciando servidor BACONFORT...');
console.log(`📊 Puerto configurado: ${PORT}`);
console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// CORS configuration
const getAllowedOrigins = () => {
  const origins = ['http://localhost:3000', 'http://127.0.0.1:3000'];
  
  // Add production frontend URL if specified
  if (process.env.FRONTEND_URL) {
    origins.push(process.env.FRONTEND_URL);
  }
  
  // Add any additional CORS origins from environment
  if (process.env.CORS_ORIGIN) {
    const envOrigins = process.env.CORS_ORIGIN.split(',').map(origin => origin.trim());
    origins.push(...envOrigins);
  }
  
  return origins;
};

const corsOptions = {
  origin: getAllowedOrigins(),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200,
  preflightContinue: false
};
app.use(cors(corsOptions));

// Middleware adicional para CORS
app.use((req, res, next) => {
  const allowedOrigins = getAllowedOrigins();
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configurar middleware para servir archivos estáticos
app.use('/uploads', (req, res, next) => {
  res.header('Cross-Origin-Resource-Policy', 'cross-origin');
  res.header('Access-Control-Allow-Origin', '*');
  next();
}, express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/baconfort';
    console.log('🔄 Conectando a MongoDB...');
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Health check endpoint (must be first)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// API root endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'BACONFORT API está funcionando',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      users: '/api/users',
      properties: '/api/properties',
      gallery: '/api/gallery',
      reviews: '/api/reviews'
    }
  });
});

// Function to safely load routes
const loadRoute = (routePath, routeName) => {
  try {
    console.log(`📦 Cargando ruta: ${routeName}`);
    const route = require(routePath);
    app.use(`/api/${routeName}`, route);
    console.log(`✅ Ruta cargada: ${routeName}`);
  } catch (error) {
    console.error(`❌ Error cargando ruta ${routeName}:`, error.message);
    
    // Create a fallback route that returns an error
    app.use(`/api/${routeName}`, (req, res) => {
      res.status(503).json({
        error: `Servicio ${routeName} no disponible temporalmente`,
        message: 'El servicio está siendo configurado'
      });
    });
  }
};

// Load routes safely
const routes = [
  { path: './routes/auth', name: 'auth' },
  { path: './routes/users', name: 'users' },
  { path: './routes/properties', name: 'properties' },
  { path: './routes/reviews', name: 'reviews' },
  { path: './routes/gallery', name: 'gallery' }
];

// Load optional routes (won't fail if they don't exist)
const optionalRoutes = [
  { path: './routes/bookings', name: 'bookings' },
  { path: './routes/reservations', name: 'reservations' },
  { path: './routes/upload', name: 'upload' }
];

console.log('📦 Cargando rutas principales...');
routes.forEach(route => loadRoute(route.path, route.name));

console.log('📦 Cargando rutas opcionales...');
optionalRoutes.forEach(route => loadRoute(route.path, route.name));

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      '/api/health',
      '/api',
      '/api/auth',
      '/api/users',
      '/api/properties',
      '/api/reviews',
      '/api/gallery'
    ]
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Error global:', error.message);
  console.error('Stack:', error.stack);
  
  // Mongoose validation error
  if (error.name === 'ValidationError') {
    const messages = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      error: 'Error de validación',
      details: messages
    });
  }
  
  // Mongoose duplicate key error
  if (error.code === 11000) {
    return res.status(400).json({
      error: 'Ya existe un registro con esos datos',
      field: Object.keys(error.keyValue || {})[0]
    });
  }
  
  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: 'Token inválido'
    });
  }
  
  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'Token expirado'
    });
  }
  
  // Default error
  res.status(error.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Error interno del servidor' 
      : error.message,
    ...(process.env.NODE_ENV !== 'production' && { 
      stack: error.stack,
      timestamp: new Date().toISOString()
    })
  });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor BACONFORT corriendo en puerto ${PORT}`);
  console.log(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📊 API disponible en: http://localhost:${PORT}/api`);
  console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
  console.log('✅ Servidor iniciado correctamente');
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n👋 Recibida señal ${signal}, cerrando servidor...`);
  
  server.close(() => {
    console.log('🛑 Servidor HTTP cerrado');
    
    mongoose.connection.close(() => {
      console.log('📪 Conexión a MongoDB cerrada');
      console.log('✅ Proceso terminado correctamente');
      process.exit(0);
    });
  });
  
  // Force close after timeout
  setTimeout(() => {
    console.error('❌ Forzando cierre del servidor');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('❌ Excepción no capturada:', error);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promesa rechazada no manejada:', reason);
  gracefulShutdown('unhandledRejection');
});

module.exports = app;
