// server-local-emergencia.js
// Servidor local de emergencia para recuperación de contraseña

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Configuración de email
const emailTransporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'robertogaona1985@gmail.com',
    pass: 'usol qkca ftyo ymdu'
  }
});

// Endpoint de recuperación de contraseña
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    
    console.log('📧 Solicitud de recuperación para:', email);
    
    if (!email) {
      return res.status(400).json({
        error: 'El email es obligatorio'
      });
    }

    // Generar token simple para demo
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
    
    // Enviar email
    const mailOptions = {
      from: 'robertogaona1985@gmail.com',
      to: email,
      subject: '🔐 Recuperación de Contraseña - BaconFort (Servidor Local)',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">🔐 Recuperación de Contraseña</h2>
            <h3 style="color: #e74c3c; margin: 0;">BaconFort (Servidor Local de Emergencia)</h3>
          </div>
          
          <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0;">Hola,</h3>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Este email fue enviado desde el servidor local de emergencia para BaconFort.
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 30px;">
              Para crear una nueva contraseña, haz clic en el siguiente enlace:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background-color: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Restablecer Contraseña
              </a>
            </div>
            
            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>🚨 Servidor de Emergencia:</strong> Este es un servidor local temporal mientras se resuelve el problema del servidor principal.
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Token de recuperación: <code>${resetToken}</code>
            </p>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              URL completa: ${resetUrl}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; color: #999; font-size: 12px;">
            <p>Este email fue enviado desde el servidor local de BaconFort</p>
            <p>📱 WhatsApp: +54 11 3002-1074</p>
          </div>
        </div>
      `
    };

    await emailTransporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado exitosamente a:', email);
    console.log('🔑 Token generado:', resetToken);
    
    res.json({
      success: true,
      message: 'Se ha enviado un email con las instrucciones para resetear tu contraseña.',
      resetToken: resetToken // Solo para desarrollo local
    });

  } catch (error) {
    console.error('❌ Error enviando email:', error);
    res.status(500).json({
      error: 'Error interno del servidor: ' + error.message
    });
  }
});

// Endpoint de salud
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor Local de Emergencia BaconFort funcionando',
    timestamp: new Date().toISOString(),
    version: '1.0.0-emergency',
    environment: 'local'
  });
});

// Mensaje de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '🚨 Servidor Local de Emergencia - BaconFort',
    status: 'funcionando',
    endpoints: [
      'GET  /api/health - Estado del servidor',
      'POST /api/auth/forgot-password - Recuperación de contraseña'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`
🚨 =====================================================
   SERVIDOR LOCAL DE EMERGENCIA - BACONFORT
🚨 =====================================================

✅ Servidor funcionando en: http://localhost:${PORT}

📋 Endpoints disponibles:
   GET  http://localhost:${PORT}/api/health
   POST http://localhost:${PORT}/api/auth/forgot-password

🔧 Para usar desde el frontend:
   Cambiar VITE_API_URL a: http://localhost:${PORT}/api

📧 Email configurado: robertogaona1985@gmail.com

🎯 Este servidor solucionará temporalmente el problema
   "Failed to fetch" hasta que se resuelva el backend principal.

======================================================
  `);
});

module.exports = app;
