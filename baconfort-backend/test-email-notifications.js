// test-email-notifications.js
// Script para probar las notificaciones de email
require('dotenv').config();
const { sendUserReservationNotification, sendAdminReservationNotification } = require('./utils/emailNotifications');

const testReservationData = {
  fullName: 'Roberto Gaona (Prueba)',
  email: 'robertogaona1985@gmail.com',
  phone: '+54 11 1234-5678',
  propertyName: 'Moldes 1680 - Apartamento de Prueba',
  checkIn: new Date('2025-07-15'),
  checkOut: new Date('2025-07-18'),
  guests: 2,
  message: 'Esta es una reserva de prueba para verificar que el sistema de notificaciones por email funciona correctamente.'
};

async function testEmails() {
  console.log('🧪 Iniciando prueba de notificaciones por email...\n');
  
  try {
    // Probar email al usuario
    console.log('📧 Enviando email al usuario...');
    const userResult = await sendUserReservationNotification(testReservationData);
    console.log('Usuario:', userResult ? '✅ Enviado' : '❌ Error');
    
    // Esperar un poco antes del siguiente email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Probar email al admin
    console.log('📧 Enviando email al admin...');
    const adminResult = await sendAdminReservationNotification(testReservationData);
    console.log('Admin:', adminResult ? '✅ Enviado' : '❌ Error');
    
    console.log('\n🎉 Prueba completada!');
    console.log('Revisa tu bandeja de entrada para verificar que llegaron los emails.');
    
  } catch (error) {
    console.error('❌ Error durante la prueba:', error);
  }
  
  process.exit(0);
}

// Ejecutar la prueba
testEmails();
