// Usar fetch nativo de Node.js (disponible desde Node 18+)
const BASE_URL = 'http://localhost:5000/api';

async function testFrontendAPI() {
  console.log('🔄 Probando API desde el frontend...\n');
  
  try {
    // 1. Probar health check
    console.log('1️⃣ Probando health check...');
    const healthResponse = await fetch(`${BASE_URL}/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check OK:', healthData.status);
    
    // 2. Probar login con usuario de prueba
    console.log('\n2️⃣ Probando login...');
    const loginData = {
      email: 'admin@baconfort.com',
      password: 'admin123'
    };
    
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    
    const loginResult = await loginResponse.json();
    console.log('✅ Login exitoso, usuario:', loginResult.user.name);
    
    const token = loginResult.token;
    console.log('🔑 Token obtenido:', token.substring(0, 20) + '...');
    
    // 3. Probar obtener reservas (debería retornar array vacío)
    console.log('\n3️⃣ Probando obtener reservas...');
    const reservationsResponse = await fetch(`${BASE_URL}/reservations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const reservationsData = await reservationsResponse.json();
    console.log('✅ Reservas obtenidas:', reservationsData);
    console.log('📊 Cantidad de reservas:', reservationsData.length);
    
    // 4. Probar crear una reserva
    console.log('\n4️⃣ Probando crear reserva...');
    const reservationData = {
      propertyId: 'dorrego-1548',
      propertyName: 'Departamento Dorrego 1548',
      checkIn: '2025-07-01',
      checkOut: '2025-07-05',
      guests: 2,
      fullName: 'Usuario Prueba',
      email: 'admin@baconfort.com',
      phone: '+5491123456789',
      message: 'Reserva de prueba desde test'
    };
    
    const createResponse = await fetch(`${BASE_URL}/reservations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reservationData)
    });
    
    const createResult = await createResponse.json();
    console.log('✅ Reserva creada:', createResult.message);
    const reservationId = createResult.reservation.id;
    console.log('🆔 ID de reserva:', reservationId);
    
    // 5. Probar obtener reservas nuevamente (debería tener 1)
    console.log('\n5️⃣ Verificando reservas después de crear...');
    const updatedReservationsResponse = await fetch(`${BASE_URL}/reservations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const updatedReservationsData = await updatedReservationsResponse.json();
    console.log('✅ Reservas actualizadas:', updatedReservationsData.length);
    
    // 6. Limpiar - cancelar la reserva de prueba
    console.log('\n6️⃣ Limpiando - cancelando reserva de prueba...');
    await fetch(`${BASE_URL}/reservations/${reservationId}/cancel`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Reserva cancelada');
    
    console.log('\n🎉 Todos los tests de API completados exitosamente!');
    
  } catch (error) {
    console.error('\n❌ Error en test:', error.message);
    console.error('📍 Stack:', error.stack);
    process.exit(1);
  }
}

// Ejecutar tests
testFrontendAPI();
