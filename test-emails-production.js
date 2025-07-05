// Script para probar emails en producción
async function testEmailsProduction() {
  // Probar múltiples URLs hasta encontrar una que funcione
  const API_URLS = [
    'https://baconfort-backend-pqeyxjxqx-robertogaona1985-1518s-projects.vercel.app',
    'https://baconfort-backend-2ww5vf7x9-robertogaona1985-1518s-projects.vercel.app',
    'https://baconfort-backend.vercel.app'
  ];
  
  console.log('🔄 Probando múltiples URLs del backend...');
  
  for (const API_URL of API_URLS) {
    console.log(`\n🧪 Probando: ${API_URL}`);
    
    try {
      console.log('📡 Enviando petición...');
      
      const response = await fetch(`${API_URL}/api/test/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.status === 401) {
        console.log('❌ Backend protegido con SSO - probando siguiente URL...');
        continue;
      }
      
      const result = await response.json();
      console.log('📧 Resultado:', result);
      
      if (result.success) {
        console.log('✅ Emails enviados exitosamente!');
        console.log('📊 Estado:', result.results);
        console.log(`🎯 URL funcional encontrada: ${API_URL}`);
        return; // Salir del bucle al encontrar una URL que funciona
      } else {
        console.log('❌ Error enviando emails:', result.error);
      }
      
    } catch (error) {
      console.error('❌ Error de conexión:', error.message);
      if (API_URL === API_URLS[API_URLS.length - 1]) {
        console.log('\n🚨 NINGUNA URL DEL BACKEND FUNCIONA');
        console.log('📋 Diagnóstico:');
        console.log('   - Todos los backends tienen protección SSO activada');
        console.log('   - Necesitamos desplegar en un servicio sin restricciones');
        console.log('\n💡 Soluciones inmediatas:');
        console.log('   1. Contactar al admin: robertogaona1985@gmail.com');
        console.log('   2. WhatsApp: +54 11 3002-1074');
        console.log('   3. Usar reset manual de contraseña');
      }
    }
  }
}

testEmailsProduction();
