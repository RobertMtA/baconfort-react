// Script para verificar que las reservas de Roberto estén disponibles vía API
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

async function testRobertoReservations() {
  try {
    console.log('🔑 Haciendo login con Roberto...');
    
    // Login para obtener token
    const loginResponse = await makeRequest('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'robertogaona1985@gmail.com',
        password: 'tu_password_aqui' // Necesitarás la contraseña real
      })
    });

    if (!loginResponse.ok) {
      console.log('❌ Error en login, probando con datos de test...');
      
      // Probar con usuario de test
      const testLoginResponse = await makeRequest('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      });

      if (testLoginResponse.ok) {
        const testData = testLoginResponse.json();
        console.log('✅ Login con usuario de prueba exitoso');
        
        // Probar endpoint de reservas con usuario de prueba
        const testReservationResponse = await makeRequest('http://localhost:5000/api/reservations', {
          headers: {
            'Authorization': `Bearer ${testData.token}`,
            'Content-Type': 'application/json'
          }
        });

        if (testReservationResponse.ok) {
          const reservations = testReservationResponse.json();
          console.log(`📅 Usuario de prueba tiene ${reservations.length} reservas`);
        }
      }
      return;
    }

    const loginData = loginResponse.json();
    console.log('✅ Login con Roberto exitoso');

    // Probar endpoint de reservas
    console.log('\n📅 Obteniendo reservas de Roberto...');
    const reservationResponse = await makeRequest('http://localhost:5000/api/reservations', {
      headers: {
        'Authorization': `Bearer ${loginData.token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📋 Status de respuesta:', reservationResponse.status);

    if (reservationResponse.ok) {
      const reservations = reservationResponse.json();
      console.log(`✅ Roberto tiene ${reservations.length} reservas:`);
      
      reservations.forEach((res, index) => {
        console.log(`${index + 1}. ${res.propertyName} - ${res.status} (${res.checkIn.split('T')[0]} a ${res.checkOut.split('T')[0]})`);
      });
    } else {
      const errorData = reservationResponse.json();
      console.log('❌ Error obteniendo reservas:', errorData);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

console.log('🧪 Verificando reservas de Roberto...');
testRobertoReservations();
