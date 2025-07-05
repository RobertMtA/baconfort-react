// generate-admin-codes.js
// Script para generar códigos de acceso administrativo seguros

const crypto = require('crypto');

const generateSecureCode = (prefix, length = 16) => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomBytes(length).toString('hex').toUpperCase().substring(0, length);
  return `${prefix}_${timestamp}_${random}`;
};

const generateAdminCodes = () => {
  console.log('🔐 GENERANDO CÓDIGOS DE ACCESO ADMINISTRATIVO');
  console.log('===========================================');
  console.log('Fecha:', new Date().toISOString());
  console.log('');
  
  const codes = [
    generateSecureCode('BACONFORT_ADMIN_2025', 12),
    generateSecureCode('SECURE_ACCESS', 10),
    generateSecureCode('ADMIN_VERIFY', 8)
  ];
  
  console.log('📋 CÓDIGOS GENERADOS:');
  codes.forEach((code, index) => {
    console.log(`${index + 1}. ${code}`);
  });
  
  console.log('');
  console.log('🔧 CREDENCIALES ADMINISTRATIVAS:');
  console.log('================================');
  console.log('👤 Propietario:');
  console.log('   Email: roberto@baconfort.com');
  console.log('   Password: Roccosa226!Admin');
  console.log('');
  console.log('👤 Administrador:');
  console.log('   Email: admin@baconfort.com');
  console.log('   Password: BaconfortSecure2025!');
  console.log('');
  console.log('⏰ CONFIGURACIÓN DE SEGURIDAD:');
  console.log('==============================');
  console.log('- Tiempo de sesión: 2 horas');
  console.log('- Verificación cada: 5 minutos');
  console.log('- Dominios autorizados: localhost, 127.0.0.1');
  console.log('- Tokens seguros: Sí');
  console.log('');
  console.log('🚨 INSTRUCCIONES DE SEGURIDAD:');
  console.log('===============================');
  console.log('1. Usar estos códigos SOLO para acceso autorizado');
  console.log('2. No compartir códigos con terceros');
  console.log('3. Cambiar códigos periódicamente');
  console.log('4. Reportar accesos no autorizados inmediatamente');
  console.log('');
  console.log('📞 CONTACTO DE EMERGENCIA:');
  console.log('==========================');
  console.log('Email: roberto@baconfort.com');
  console.log('WhatsApp: +54 11 3002-1074');
  
  // Crear archivo de códigos
  const fs = require('fs');
  const codesData = {
    codes: codes,
    generated: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 días
    credentials: [
      { email: 'roberto@baconfort.com', password: 'Roccosa226!Admin', role: 'owner' },
      { email: 'admin@baconfort.com', password: 'BaconfortSecure2025!', role: 'admin' }
    ]
  };
  
  fs.writeFileSync('admin-access-codes.json', JSON.stringify(codesData, null, 2));
  console.log('');
  console.log('✅ Códigos guardados en: admin-access-codes.json');
  
  return codes;
};

// Función para revocar todos los accesos
const revokeAllAccess = () => {
  console.log('🚨 REVOCANDO TODOS LOS ACCESOS ADMINISTRATIVOS');
  console.log('==============================================');
  
  const revokeScript = `
// Script para ejecutar en consola del navegador
// Esto limpiará todas las sesiones administrativas

localStorage.removeItem('baconfort_admin_access_code');
localStorage.removeItem('baconfort_admin_session_token');
localStorage.removeItem('baconfort_admin_last_access');
localStorage.removeItem('baconfort_admin_user_role');
localStorage.removeItem('baconfort_admin_session');
localStorage.removeItem('baconfort_admin_user');
localStorage.removeItem('baconfort-token');

console.log('🔐 Todos los accesos administrativos han sido revocados');
alert('Accesos administrativos revocados. Recarga la página.');
window.location.reload();
`;
  
  const fs = require('fs');
  fs.writeFileSync('revoke-admin-access.js', revokeScript);
  
  console.log('✅ Script de revocación creado: revoke-admin-access.js');
  console.log('💡 Para usar: Ejecutar el contenido en la consola del navegador');
};

// Función para verificar estado de seguridad
const checkSecurityStatus = () => {
  console.log('🔍 VERIFICANDO ESTADO DE SEGURIDAD');
  console.log('===================================');
  
  const fs = require('fs');
  
  try {
    if (fs.existsSync('admin-access-codes.json')) {
      const codesData = JSON.parse(fs.readFileSync('admin-access-codes.json', 'utf8'));
      const generated = new Date(codesData.generated);
      const expires = new Date(codesData.expiresAt);
      const now = new Date();
      
      console.log('📅 Códigos generados:', generated.toLocaleString());
      console.log('⏰ Códigos expiran:', expires.toLocaleString());
      console.log('🕒 Tiempo restante:', Math.ceil((expires - now) / (1000 * 60 * 60 * 24)), 'días');
      
      if (now > expires) {
        console.log('🚨 ¡CÓDIGOS EXPIRADOS! Generar nuevos códigos inmediatamente.');
      } else {
        console.log('✅ Códigos válidos');
      }
    } else {
      console.log('❌ No se encontraron códigos. Ejecutar generateAdminCodes()');
    }
  } catch (error) {
    console.log('❌ Error verificando estado:', error.message);
  }
};

// Ejecutar según argumento
const action = process.argv[2];

switch (action) {
  case 'generate':
    generateAdminCodes();
    break;
  case 'revoke':
    revokeAllAccess();
    break;
  case 'check':
    checkSecurityStatus();
    break;
  default:
    console.log('📋 USO:');
    console.log('  node generate-admin-codes.js generate  # Generar nuevos códigos');
    console.log('  node generate-admin-codes.js revoke    # Revocar todos los accesos');
    console.log('  node generate-admin-codes.js check     # Verificar estado');
    console.log('');
    generateAdminCodes();
}

module.exports = {
  generateAdminCodes,
  revokeAllAccess,
  checkSecurityStatus
};
