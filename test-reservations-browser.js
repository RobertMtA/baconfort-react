// Script para probar las reservas desde la consola del navegador
// Abrir http://localhost:3000/admin y ejecutar este código en la consola

console.log('🔍 PRUEBA DE RESERVAS EN ADMIN DESDE CONSOLA');
console.log('============================================');

// Configuración
const API_URL = 'http://localhost:5000/api';
const ADMIN_TOKEN = 'ADMIN_DEMO_TOKEN';

// Función para probar obtención de reservas
async function testGetReservations() {
  console.log('📋 Probando obtención de reservas...');
  
  try {
    const response = await fetch(`${API_URL}/reservations/admin/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      }
    });
    
    if (response.ok) {
      const reservations = await response.json();
      console.log(`✅ Reservas obtenidas: ${reservations.length} reservas`);
      return reservations;
    } else {
      const error = await response.json();
      console.error('❌ Error obteniendo reservas:', error);
      return null;
    }
  } catch (error) {
    console.error('❌ Error de red:', error);
    return null;
  }
}

// Función para probar cambio de estado
async function testChangeStatus(reservationId, newStatus) {
  console.log(`🔄 Probando cambio de estado para reserva ${reservationId}...`);
  
  try {
    const response = await fetch(`${API_URL}/reservations/admin/${reservationId}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log(`✅ Estado cambiado exitosamente a: ${result.data.status}`);
      return result;
    } else {
      const error = await response.json();
      console.error('❌ Error cambiando estado:', error);
      return null;
    }
  } catch (error) {
    console.error('❌ Error de red:', error);
    return null;
  }
}

// Función para ejecutar prueba completa
async function runFullTest() {
  console.log('\n🚀 EJECUTANDO PRUEBA COMPLETA...\n');
  
  // Paso 1: Obtener reservas
  const reservations = await testGetReservations();
  
  if (reservations && reservations.length > 0) {
    // Paso 2: Cambiar estado de la primera reserva
    const firstReservation = reservations[0];
    const currentStatus = firstReservation.status;
    const newStatus = currentStatus === 'pending' ? 'confirmed' : 'pending';
    
    console.log(`\n📝 Reserva de prueba:`);
    console.log(`   ID: ${firstReservation._id}`);
    console.log(`   Estado actual: ${currentStatus}`);
    console.log(`   Nuevo estado: ${newStatus}`);
    
    await testChangeStatus(firstReservation._id, newStatus);
  }
  
  console.log('\n🏁 PRUEBA COMPLETA TERMINADA');
}

// Ejecutar prueba automáticamente
runFullTest();

// También hacer disponibles las funciones individuales
window.testReservations = {
  getReservations: testGetReservations,
  changeStatus: testChangeStatus,
  runFullTest: runFullTest
};

console.log('\n💡 FUNCIONES DISPONIBLES:');
console.log('- window.testReservations.getReservations()');
console.log('- window.testReservations.changeStatus(id, status)');
console.log('- window.testReservations.runFullTest()');
