// Test simple de verificación de endpoints
const https = require('https');
const http = require('http');

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const req = client.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, data: parsed, status: res.statusCode });
        } catch (error) {
          resolve({ ok: false, data: data, status: res.statusCode });
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

async function testAPI() {
  console.log('🧪 Verificando endpoints de reservas...\n');
  
  try {
    // Test 1: Login usuario demo
    console.log('1️⃣ Probando login usuario demo...');
    const loginResponse = await makeRequest('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'guest@baconfort.com',
        password: 'guest123'
      })
    });
    
    if (loginResponse.ok) {
      console.log('✅ Login usuario demo: EXITOSO');
      console.log(`👤 Usuario: ${loginResponse.data.user.name}`);
      
      const userToken = loginResponse.data.token;
      
      // Test 2: Obtener reservas del usuario (debería estar vacío)
      console.log('\n2️⃣ Probando obtener mis reservas...');
      const myReservationsResponse = await makeRequest('http://localhost:5000/api/reservations', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (myReservationsResponse.ok) {
        console.log('✅ Obtener mis reservas: EXITOSO');
        console.log(`📊 Reservas encontradas: ${myReservationsResponse.data.length}`);
      } else {
        console.log(`❌ Obtener mis reservas: FALLÓ (${myReservationsResponse.status})`);
        console.log('Error:', myReservationsResponse.data);
      }
      
    } else {
      console.log(`❌ Login usuario demo: FALLÓ (${loginResponse.status})`);
      console.log('Error:', loginResponse.data);
    }
    
    // Test 3: Login admin
    console.log('\n3️⃣ Probando login admin...');
    const adminLoginResponse = await makeRequest('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@baconfort.com',
        password: 'roccosa226'
      })
    });
    
    if (adminLoginResponse.ok) {
      console.log('✅ Login admin: EXITOSO');
      console.log(`👑 Admin: ${adminLoginResponse.data.user.name}`);
      
      const adminToken = adminLoginResponse.data.token;
      
      // Test 4: Admin obtiene todas las reservas
      console.log('\n4️⃣ Probando admin obtener todas las reservas...');
      const allReservationsResponse = await makeRequest('http://localhost:5000/api/reservations/admin/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (allReservationsResponse.ok) {
        console.log('✅ Admin obtener todas las reservas: EXITOSO');
        console.log(`📊 Total reservas en sistema: ${allReservationsResponse.data.length}`);
      } else {
        console.log(`❌ Admin obtener todas las reservas: FALLÓ (${allReservationsResponse.status})`);
        console.log('Error:', allReservationsResponse.data);
      }
      
    } else {
      console.log(`❌ Login admin: FALLÓ (${adminLoginResponse.status})`);
      console.log('Error:', adminLoginResponse.data);
    }
    
    console.log('\n🎯 Verificación de endpoints completada');
    
  } catch (error) {
    console.error('❌ Error en verificación:', error.message);
  }
}

testAPI();
