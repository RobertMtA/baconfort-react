#!/usr/bin/env node

/**
 * Script de testing post-deploy para BACONFORT
 * Verifica que las URLs de producción funcionen correctamente
 */

const https = require('https');
const http = require('http');

// URLs a probar (actualizar después del deploy)
const BACKEND_URL = 'https://tu-backend.onrender.com';
const FRONTEND_URL = 'https://tu-sitio.netlify.app';

console.log('🧪 BACONFORT Post-Deploy Testing\n');

// Función para hacer request HTTP/HTTPS
function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: data,
          headers: res.headers
        });
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Probar endpoints del backend
async function testBackend() {
  console.log('🔧 Probando Backend...');
  
  const endpoints = [
    '/api/health',
    '/api',
    '/api/properties',
    '/api/reviews'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(BACKEND_URL + endpoint);
      if (response.statusCode === 200) {
        console.log(`  ✅ ${endpoint} - OK (${response.statusCode})`);
      } else {
        console.log(`  ⚠️  ${endpoint} - ${response.statusCode}`);
      }
    } catch (error) {
      console.log(`  ❌ ${endpoint} - Error: ${error.message}`);
    }
  }
}

// Probar frontend
async function testFrontend() {
  console.log('\n🎨 Probando Frontend...');
  
  const routes = [
    '/',
    '/admin',
    '/propiedades/moldes-1680',
    '/propiedades/santa-fe-3770',
    '/propiedades/dorrego-1548'
  ];

  for (const route of routes) {
    try {
      const response = await makeRequest(FRONTEND_URL + route);
      if (response.statusCode === 200) {
        console.log(`  ✅ ${route} - OK (${response.statusCode})`);
      } else {
        console.log(`  ⚠️  ${route} - ${response.statusCode}`);
      }
    } catch (error) {
      console.log(`  ❌ ${route} - Error: ${error.message}`);
    }
  }
}

// Verificar CORS
async function testCORS() {
  console.log('\n🔗 Probando CORS...');
  
  // Simular request desde frontend a backend
  try {
    const response = await makeRequest(BACKEND_URL + '/api');
    if (response.headers['access-control-allow-origin']) {
      console.log('  ✅ CORS configurado correctamente');
    } else {
      console.log('  ⚠️  Headers CORS no encontrados');
    }
  } catch (error) {
    console.log(`  ❌ Error probando CORS: ${error.message}`);
  }
}

// Función principal
async function main() {
  console.log('⚠️  IMPORTANTE: Actualiza las URLs al principio del script con tus URLs reales\n');
  console.log(`Backend URL: ${BACKEND_URL}`);
  console.log(`Frontend URL: ${FRONTEND_URL}\n`);
  
  if (BACKEND_URL.includes('tu-backend') || FRONTEND_URL.includes('tu-sitio')) {
    console.log('❌ Actualiza las URLs antes de ejecutar este script');
    return;
  }
  
  await testBackend();
  await testFrontend();
  await testCORS();
  
  console.log('\n📋 Testing completado');
  console.log('📝 Si hay errores, revisa:');
  console.log('  - Variables de entorno');
  console.log('  - Configuración CORS');
  console.log('  - Logs de deploy en las plataformas');
}

// Verificar si se pasaron URLs como argumentos
if (process.argv[2] && process.argv[3]) {
  const BACKEND_URL = process.argv[2];
  const FRONTEND_URL = process.argv[3];
  console.log(`Usando URLs: Backend=${BACKEND_URL}, Frontend=${FRONTEND_URL}`);
}

// Ejecutar testing
main().catch(console.error);
