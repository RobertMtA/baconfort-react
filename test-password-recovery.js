// test-password-recovery.js
// Script para probar el sistema de recuperación de contraseña
const https = require('https');
const http = require('http');

// Configuración - usar la URL más reciente
const BACKEND_URL = process.env.BACKEND_URL || 'https://baconfort-backend-pqeyxjxqx-robertogaona1985-1518s-projects.vercel.app';
const TEST_EMAIL = 'robertogaona1985@gmail.com';

console.log('🔄 Iniciando prueba de recuperación de contraseña...');
console.log(`🌐 Backend URL: ${BACKEND_URL}`);
console.log(`📧 Email de prueba: ${TEST_EMAIL}`);

// Función para hacer peticiones HTTP/HTTPS
const makeRequest = (url, options, postData = null) => {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', reject);
    
    if (postData) {
      req.write(postData);
    }
    
    req.end();
  });
};

// Función principal de prueba
const runTest = async () => {
  try {
    console.log('\n1️⃣ Solicitando recuperación de contraseña...');
    
    const forgotPasswordResponse = await makeRequest(`${BACKEND_URL}/api/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    }, JSON.stringify({
      email: TEST_EMAIL
    }));

    console.log('📤 Respuesta del servidor:', forgotPasswordResponse);

    if (forgotPasswordResponse.status === 200) {
      console.log('✅ Solicitud de recuperación enviada exitosamente');
      console.log('📧 Revisa tu email para el enlace de recuperación');
      
      // Si estamos en desarrollo, podríamos mostrar el token
      if (forgotPasswordResponse.data.resetToken) {
        console.log('🔑 Token de desarrollo:', forgotPasswordResponse.data.resetToken);
        console.log('🔗 URL de prueba:', `http://localhost:3001/reset-password?token=${forgotPasswordResponse.data.resetToken}`);
      }
    } else {
      console.log('❌ Error en la solicitud:', forgotPasswordResponse.data);
    }

    console.log('\n2️⃣ Probando estado del backend...');
    
    // Probar el endpoint de salud
    const healthResponse = await makeRequest(`${BACKEND_URL}/api/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log('🏥 Estado del backend:', healthResponse);

  } catch (error) {
    console.error('❌ Error en la prueba:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('🔌 Error de conexión: El backend no está disponible');
    } else if (error.code === 'ENOTFOUND') {
      console.log('🌐 Error de DNS: No se puede resolver la URL del backend');
    }
  }
};

// Ejecutar la prueba
runTest().then(() => {
  console.log('\n🏁 Prueba completada');
}).catch((error) => {
  console.error('💥 Error fatal:', error);
});
