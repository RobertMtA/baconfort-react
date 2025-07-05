// test-email-endpoint.js
// Endpoint temporal para probar emails
const express = require('express');
const router = express.Router();
const { sendUserReservationNotification, sendAdminReservationNotification } = require('../utils/emailNotifications');

// @route   POST /api/test/email
// @desc    Probar envío de emails (solo para desarrollo)
// @access  Public (temporal)
router.post('/email', async (req, res) => {
  try {
    console.log('🧪 Iniciando prueba de email...');
    console.log('📧 Variables de entorno:');
    console.log('EMAIL_USER:', process.env.EMAIL_USER ? '✅ Configurado' : '❌ No configurado');
    console.log('EMAIL_APP_PASSWORD:', process.env.EMAIL_APP_PASSWORD ? '✅ Configurado' : '❌ No configurado');
    console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL ? '✅ Configurado' : '❌ No configurado');

    const testData = {
      fullName: 'Roberto Gaona (Prueba)',
      email: 'robertogaona1985@gmail.com',
      phone: '+54 11 1234-5678',
      propertyName: 'Moldes 1680 - Apartamento de Prueba',
      checkIn: new Date('2025-07-15'),
      checkOut: new Date('2025-07-18'),
      guests: 2,
      message: 'Esta es una reserva de prueba para verificar el sistema de emails.'
    };

    // Probar email al usuario
    console.log('📧 Enviando email al usuario...');
    const userResult = await sendUserReservationNotification(testData);
    
    // Probar email al admin
    console.log('📧 Enviando email al admin...');
    const adminResult = await sendAdminReservationNotification(testData);

    res.json({
      success: true,
      message: 'Prueba de emails completada',
      results: {
        userEmail: userResult ? 'Enviado' : 'Error',
        adminEmail: adminResult ? 'Enviado' : 'Error'
      },
      environment: {
        EMAIL_USER: process.env.EMAIL_USER ? 'Configurado' : 'No configurado',
        EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? 'Configurado' : 'No configurado',
        ADMIN_EMAIL: process.env.ADMIN_EMAIL ? 'Configurado' : 'No configurado'
      }
    });

  } catch (error) {
    console.error('❌ Error en prueba de email:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
