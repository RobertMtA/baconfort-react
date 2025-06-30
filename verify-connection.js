#!/usr/bin/env node

// Script para verificar la conexión frontend-backend de BACONFORT
// Uso: node verify-connection.js [BACKEND_URL]

const https = require('https');
const http = require('http');

// URLs por defecto (actualizar con las reales)
const BACKEND_URL = process.argv[2] || 'https://tu-backend.onrender.com';
const FRONTEND_URL = 'https://baconfort.netlify.app';

console.log('🔍 BACONFORT - Verificación de Conexión\n');
console.log(`📡 Backend:  ${BACKEND_URL}`);
console.log(`🌐 Frontend: ${FRONTEND_URL}\n`);

// Función para hacer requests HTTP/HTTPS
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https');
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', reject);
    if (options.body) {
      req.write(options.body);
    }
    req.end();
  });
}

// Tests del backend
async function testBackend() {
  console.log('🧪 TESTING BACKEND...\n');
  
  try {
    // Test 1: Health Check
    console.log('1️⃣ Health Check...');
    const health = await makeRequest(`${BACKEND_URL}/api/health`);
    if (health.status === 200) {
      console.log('   ✅ Health OK:', health.data.message || 'API funcionando');
    } else {
      console.log('   ❌ Health Error:', health.status);
      return false;
    }
    
    // Test 2: API Info
    console.log('2️⃣ API Info...');
    const info = await makeRequest(`${BACKEND_URL}/api`);
    if (info.status === 200) {
      console.log('   ✅ API Info OK');
    } else {
      console.log('   ❌ API Info Error:', info.status);
    }
    
    // Test 3: Login Demo
    console.log('3️⃣ Login Demo...');
    const loginData = JSON.stringify({
      email: 'admin@baconfort.com',
      password: 'admin123'
    });
    
    const login = await makeRequest(`${BACKEND_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: loginData
    });
    
    if (login.status === 200) {
      console.log('   ✅ Login OK - Token generado');
      return true;
    } else {
      console.log('   ❌ Login Error:', login.status, login.data);
      return false;
    }
    
  } catch (error) {
    console.log('❌ Backend Error:', error.message);
    return false;
  }
}

// Test del frontend (básico)
async function testFrontend() {
  console.log('\n🧪 TESTING FRONTEND...\n');
  
  try {
    console.log('1️⃣ Frontend Accesible...');
    const response = await makeRequest(FRONTEND_URL);
    if (response.status === 200) {
      console.log('   ✅ Frontend OK - Netlify respondiendo');
      return true;
    } else {
      console.log('   ❌ Frontend Error:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Frontend Error:', error.message);
    return false;
  }
}

// Función principal
async function main() {
  console.log('🚀 Iniciando verificación...\n');
  
  const backendOK = await testBackend();
  const frontendOK = await testFrontend();
  
  console.log('\n📊 RESULTADOS:\n');
  console.log(`Backend:  ${backendOK ? '✅ OK' : '❌ ERROR'}`);
  console.log(`Frontend: ${frontendOK ? '✅ OK' : '❌ ERROR'}`);
  
  if (backendOK && frontendOK) {
    console.log('\n🎉 ¡TODO FUNCIONANDO CORRECTAMENTE!');
    console.log('\n📋 Próximos pasos:');
    console.log('   1. Configura VITE_API_URL en Netlify con tu URL real');
    console.log('   2. Haz redeploy del frontend');
    console.log('   3. ¡Disfruta tu aplicación!');
  } else {
    console.log('\n⚠️  HAY PROBLEMAS QUE RESOLVER');
    console.log('\n📋 Revisa:');
    if (!backendOK) {
      console.log('   - Backend en Render funcionando');
      console.log('   - Variables de entorno configuradas');
    }
    if (!frontendOK) {
      console.log('   - Frontend en Netlify accesible');
      console.log('   - Build completado sin errores');
    }
  }
  
  console.log('\n💡 Uso: node verify-connection.js https://tu-backend.onrender.com');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { testBackend, testFrontend };
