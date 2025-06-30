const https = require('https');
const http = require('http');

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const httpModule = isHttps ? https : http;
    
    const reqOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: options.headers || {}
    };

    const req = httpModule.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => JSON.parse(data)
          });
        } catch (e) {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            text: () => data
          });
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

async function testReservationEndpoint() {
  try {
    console.log('🔑 Haciendo login...');
    
    // Login para obtener token
    const loginResponse = await makeRequest('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      throw new Error(`Error en login: ${loginResponse.status}`);
    }

    const loginData = loginResponse.json();
    console.log('✅ Login exitoso');
    console.log('🔑 Token obtenido:', loginData.token.substring(0, 20) + '...');

    // Probar endpoint de reservas
    console.log('\n📅 Probando endpoint de reservas...');
    const reservationResponse = await makeRequest('http://localhost:5000/api/reservations', {
      headers: {
        'Authorization': `Bearer ${loginData.token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📋 Status de respuesta:', reservationResponse.status);

    if (reservationResponse.ok) {
      const reservations = reservationResponse.json();
      console.log('✅ Reservas obtenidas:', reservations.length);
      
      reservations.forEach((res, index) => {
        console.log(`${index + 1}. ${res.propertyName} - ${res.status} (${res.checkIn.split('T')[0]} a ${res.checkOut.split('T')[0]})`);
      });
    } else {
      const errorData = reservationResponse.json();
      console.log('❌ Error:', errorData);
    }

    // Probar endpoint /me
    console.log('\n👤 Probando endpoint /me...');
    const meResponse = await makeRequest('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${loginData.token}`
      }
    });

    if (meResponse.ok) {
      const userData = meResponse.json();
      console.log('✅ Datos del usuario:', userData);
    } else {
      console.log('❌ Error en /me:', meResponse.status);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testReservationEndpoint();
