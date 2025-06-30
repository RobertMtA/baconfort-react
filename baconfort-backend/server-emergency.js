const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 BACONFORT Minimal Server Starting...');
console.log('📊 Port:', PORT);

// CORS - Very simple
app.use(cors({
  origin: '*',
  credentials: true
}));

// Basic middleware
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'BACONFORT API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API root
app.get('/api', (req, res) => {
  res.json({
    message: 'BACONFORT API',
    version: '1.0.0',
    endpoints: ['/api/health', '/api/test']
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    message: 'Test endpoint working',
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
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ Ready');
});

module.exports = app;
