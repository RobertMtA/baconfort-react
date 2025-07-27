// test-password-reset.js
// Script para probar la funcionalidad completa de recuperación de contraseña

const axios = require('axios');

const BASE_URL = 'http://localhost:5004';

async function testPasswordReset() {
  console.log('🧪 TESTING: Iniciando prueba de recuperación de contraseña...\n');

  try {
    // 1. Probar con email válido (debe existir en la base de datos)
    console.log('📧 STEP 1: Probando recuperación con email válido...');
    const validEmail = 'admin@baconfort.com'; // Usuario que existe en la BD
    
    const response = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
      email: validEmail
    });

    console.log('✅ RESPONSE:', response.data);
    
    if (response.data.success) {
      console.log('🎉 ¡Email de recuperación enviado exitosamente!');
      
      if (response.data.demo_reset_url) {
        console.log('🔗 URL de prueba:', response.data.demo_reset_url);
      }
    } else {
      console.log('❌ Error en la respuesta:', response.data.error);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // 2. Probar con email inválido (no debe existir)
    console.log('📧 STEP 2: Probando recuperación con email inválido...');
    const invalidEmail = 'usuarioquenoexiste@test.com';
    
    const response2 = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {
      email: invalidEmail
    });

    console.log('✅ RESPONSE:', response2.data);
    
    if (response2.data.success) {
      console.log('✅ Respuesta de seguridad correcta (no revela si el usuario existe)');
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // 3. Probar sin email
    console.log('📧 STEP 3: Probando sin proporcionar email...');
    
    try {
      const response3 = await axios.post(`${BASE_URL}/api/auth/forgot-password`, {});
      console.log('✅ RESPONSE:', response3.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Error 400 esperado:', error.response.data);
      } else {
        console.log('❌ Error inesperado:', error.message);
      }
    }

  } catch (error) {
    console.error('❌ ERROR GENERAL:', error.message);
    if (error.response) {
      console.error('📊 Status:', error.response.status);
      console.error('📄 Data:', error.response.data);
    }
  }

  console.log('\n🏁 TESTING: Prueba completada');
}

// Ejecutar la prueba
testPasswordReset();
