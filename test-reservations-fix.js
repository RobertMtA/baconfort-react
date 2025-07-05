// Script para verificar el fix de reservas en el admin panel
// Prueba la obtención de reservas y el cambio de estado
// Usa fetch nativo de Node.js 18+

const API_URL = 'https://baconfort-backend.vercel.app/api';
const ADMIN_TOKEN = 'ADMIN_DEMO_TOKEN';

async function testReservationsAdmin() {
  console.log('🔍 PRUEBA: Gestión de reservas en admin panel');
  console.log('=====================================\n');

  try {
    // 1. Probar obtención de todas las reservas
    console.log('📋 1. Probando obtención de todas las reservas...');
    const reservationsResponse = await fetch(`${API_URL}/reservations/admin/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      }
    });

    if (reservationsResponse.ok) {
      const response = await reservationsResponse.json();
      console.log('✅ Respuesta del servidor:', response);
      
      // Verificar si la respuesta tiene la estructura esperada
      const reservations = response.data || response;
      console.log(`✅ Reservas obtenidas: ${Array.isArray(reservations) ? reservations.length : 'No es array'} reservas`);
      
      if (Array.isArray(reservations) && reservations.length > 0) {
        console.log('   Primeras 3 reservas:');
        reservations.slice(0, 3).forEach((reservation, index) => {
          console.log(`   ${index + 1}. ID: ${reservation._id}, Estado: ${reservation.status}`);
        });
      } else {
        console.log('   No hay reservas o la estructura es incorrecta');
      }
      
      // 2. Probar cambio de estado si hay reservas
      if (Array.isArray(reservations) && reservations.length > 0) {
        const testReservation = reservations[0];
        const newStatus = testReservation.status === 'pending' ? 'confirmed' : 'pending';
        
        console.log(`\n🔄 2. Probando cambio de estado...`);
        console.log(`   Reserva ID: ${testReservation._id}`);
        console.log(`   Estado actual: ${testReservation.status}`);
        console.log(`   Nuevo estado: ${newStatus}`);
        
        const statusResponse = await fetch(`${API_URL}/reservations/admin/${testReservation._id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_TOKEN}`
          },
          body: JSON.stringify({ status: newStatus })
        });

        if (statusResponse.ok) {
          const updatedReservation = await statusResponse.json();
          console.log('✅ Estado actualizado exitosamente');
          console.log(`   Estado final: ${updatedReservation.status}`);
        } else {
          const errorData = await statusResponse.json();
          console.error('❌ Error al cambiar estado:', errorData);
        }
      } else {
        console.log('ℹ️ No hay reservas para probar cambio de estado');
      }
      
    } else {
      const errorData = await reservationsResponse.json();
      console.error('❌ Error al obtener reservas:', errorData);
    }

    console.log('\n🎯 RESUMEN DE LA PRUEBA:');
    console.log('- Endpoint /reservations/admin/all: ' + (reservationsResponse.ok ? '✅ Funciona' : '❌ Error'));
    console.log('- Middleware adminAuth: ' + (reservationsResponse.ok ? '✅ Acepta ADMIN_DEMO_TOKEN' : '❌ Rechaza token'));
    console.log('- Headers Authorization: ✅ Incluidos en ambas peticiones');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  }
}

// Ejecutar prueba
testReservationsAdmin();
