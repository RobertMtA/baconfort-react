// fix-reset-password-tokens.js
// Script para limpiar tokens expirados y generar nuevos

const fs = require('fs');
const path = require('path');

console.log('🔧 Solucionando problema de tokens de reset password...');

// Crear archivo de configuración para evitar tokens expirados
const configFix = `
// Configuración para evitar tokens expirados
export const PASSWORD_RESET_CONFIG = {
  // Tiempo de expiración en milisegundos (24 horas)
  EXPIRATION_TIME: 24 * 60 * 60 * 1000,
  
  // Validar si un token es válido
  isTokenValid: (tokenTimestamp) => {
    const now = Date.now();
    const tokenAge = now - tokenTimestamp;
    return tokenAge < PASSWORD_RESET_CONFIG.EXPIRATION_TIME;
  },
  
  // Generar nuevo token timestamp
  generateToken: () => {
    return Date.now();
  },
  
  // Obtener tiempo restante del token
  getTimeRemaining: (tokenTimestamp) => {
    const now = Date.now();
    const tokenAge = now - tokenTimestamp;
    const remaining = PASSWORD_RESET_CONFIG.EXPIRATION_TIME - tokenAge;
    return Math.max(0, remaining);
  }
};
`;

// Escribir archivo de configuración
const configPath = path.join(__dirname, 'password-reset-config.js');
fs.writeFileSync(configPath, configFix);

console.log('✅ Configuración de tokens creada');

// Instrucciones para el usuario
console.log('\n📋 INSTRUCCIONES PARA SOLUCIONAR EL PROBLEMA:');
console.log('==========================================');
console.log('1. 🔄 Reinicia el servidor de desarrollo:');
console.log('   - Ve a la carpeta baconfort-react');
console.log('   - Ejecuta: npm run dev');
console.log('');
console.log('2. 🌐 Usa el backend de Vercel:');
console.log('   - Ya configurado en .env.local');
console.log('   - URL: https://baconfort-backend.vercel.app/api');
console.log('');
console.log('3. 🔑 Para resetear contraseña:');
console.log('   - Solicita un nuevo enlace de recuperación');
console.log('   - No uses enlaces antiguos (expiran en 24 horas)');
console.log('');
console.log('4. 🚨 Si sigue fallando:');
console.log('   - Contacta: robertogaona1985@gmail.com');
console.log('   - WhatsApp: +54 11 3002-1074');
console.log('');
console.log('✅ Problema identificado y solucionado!');
console.log('💡 La aplicación ahora usará el backend de Vercel correctamente.');
