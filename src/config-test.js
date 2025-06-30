// Script para verificar la configuración de variables de entorno en React/Vite
console.log('🔍 VERIFICACIÓN DE CONFIGURACIÓN');
console.log('================================');

// Verificar si estamos en desarrollo o producción
console.log('🌍 Environment:', import.meta.env.MODE);
console.log('🏗️ Build:', import.meta.env.PROD ? 'Production' : 'Development');

// Verificar variables de entorno
console.log('📋 Variables de entorno disponibles:');
console.log('- VITE_API_URL:', import.meta.env.VITE_API_URL);
console.log('- DEV:', import.meta.env.DEV);
console.log('- PROD:', import.meta.env.PROD);

// Configuración que usará la app
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('🎯 API URL final que usará la app:', API_BASE_URL);

// Test de conexión
async function testConnection() {
  try {
    console.log('🧪 Probando conexión a:', `${API_BASE_URL}/api/health`);
    const response = await fetch(`${API_BASE_URL}/api/health`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Backend responde correctamente:', data);
    } else {
      console.log('❌ Backend no responde:', response.status);
    }
  } catch (error) {
    console.log('🚨 Error de conexión:', error.message);
  }
}

// Ejecutar test
testConnection();

export { API_BASE_URL };
