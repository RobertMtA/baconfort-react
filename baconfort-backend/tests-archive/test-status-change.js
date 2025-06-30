// Test para verificar la nueva funcionalidad de cambio de estado
const BASE_URL = 'http://localhost:5000/api';

async function testStatusChange() {
  console.log('🔄 Probando cambio de estado de reservas...\n');
  
  try {
    // 1. Login
    console.log('1️⃣ Iniciando sesión como admin...');
    const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@baconfort.com',
        password: 'admin123'
      })
    });
    
    const loginResult = await loginResponse.json();
    const token = loginResult.token;
    console.log('✅ Login exitoso');
    
    // 2. Obtener todas las reservas
    console.log('\n2️⃣ Obteniendo todas las reservas...');
    const reservationsResponse = await fetch(`${BASE_URL}/reservations/admin/all`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const reservations = await reservationsResponse.json();
    console.log(`📊 Total reservas: ${reservations.length}`);
    
    if (reservations.length > 0) {
      const firstReservation = reservations[0];
      console.log(`🎯 Probando con reserva: ${firstReservation._id}`);
      console.log(`📋 Estado actual: ${firstReservation.status}`);
      
      // 3. Cambiar estado a 'confirmed'
      console.log('\n3️⃣ Cambiando estado a "confirmed"...');
      const changeResponse = await fetch(`${BASE_URL}/reservations/admin/${firstReservation._id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'confirmed' })
      });
      
      if (changeResponse.ok) {
        const result = await changeResponse.json();
        console.log('✅ Estado cambiado exitosamente:', result.reservation.status);
      } else {
        const error = await changeResponse.json();
        console.log('❌ Error cambiando estado:', error.message);
      }
    }
    
    console.log('\n🎉 Test de cambio de estado completado!');
    
  } catch (error) {
    console.error('\n❌ Error en test:', error.message);
  }
}

testStatusChange();
