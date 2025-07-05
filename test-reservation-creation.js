// Script para probar la creación de reservas
console.log('🧪 PRUEBA: Creación de reservas');
console.log('==============================\n');

// Datos de prueba para la reserva
const testReservationData = {
  propertyId: 'moldes-1680',
  propertyName: 'Moldes 1680',
  checkIn: '2025-08-01',
  checkOut: '2025-08-05',
  guests: '2',
  fullName: 'Usuario de Prueba',
  email: 'test@example.com',
  phone: '+54 11 1234-5678',
  message: 'Prueba de creación de reserva desde script'
};

// Función para probar la creación de reserva
async function testCreateReservation() {
  console.log('📋 Datos de la reserva de prueba:', testReservationData);
  
  try {
    console.log('🔄 Enviando petición POST a /api/reservations...');
    
    const response = await fetch('http://localhost:5000/api/reservations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      },
      body: JSON.stringify(testReservationData)
    });
    
    console.log('📊 Status:', response.status);
    console.log('📊 Status Text:', response.statusText);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Reserva creada exitosamente:', result);
      return result;
    } else {
      const error = await response.json();
      console.error('❌ Error al crear reserva:', error);
      return null;
    }
    
  } catch (error) {
    console.error('❌ Error de red:', error);
    return null;
  }
}

// Función para verificar las reservas creadas
async function verifyReservations() {
  console.log('\n📋 Verificando reservas existentes...');
  
  try {
    const response = await fetch('http://localhost:5000/api/reservations/admin/all', {
      headers: {
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      }
    });
    
    if (response.ok) {
      const reservations = await response.json();
      console.log(`✅ Total de reservas: ${reservations.length}`);
      
      // Mostrar las últimas 3 reservas
      console.log('\n🔍 Últimas 3 reservas:');
      reservations.slice(0, 3).forEach((reservation, index) => {
        console.log(`${index + 1}. ID: ${reservation._id}`);
        console.log(`   Propiedad: ${reservation.propertyName}`);
        console.log(`   Estado: ${reservation.status}`);
        console.log(`   Check-in: ${reservation.checkIn}`);
        console.log(`   Usuario: ${reservation.fullName}`);
        console.log('');
      });
    } else {
      console.error('❌ Error al obtener reservas');
    }
    
  } catch (error) {
    console.error('❌ Error de red:', error);
  }
}

// Ejecutar pruebas
async function runTests() {
  console.log('🚀 EJECUTANDO PRUEBAS DE RESERVAS...\n');
  
  // Paso 1: Verificar reservas existentes
  await verifyReservations();
  
  // Paso 2: Crear nueva reserva
  console.log('\n🔄 CREANDO NUEVA RESERVA...');
  const newReservation = await testCreateReservation();
  
  if (newReservation) {
    console.log('\n✅ RESERVA CREADA EXITOSAMENTE');
    console.log('ID:', newReservation._id || newReservation.id);
    
    // Paso 3: Verificar que la reserva fue creada
    console.log('\n🔍 VERIFICANDO RESERVA CREADA...');
    await verifyReservations();
  } else {
    console.log('\n❌ FALLÓ LA CREACIÓN DE RESERVA');
  }
  
  console.log('\n🏁 PRUEBAS COMPLETADAS');
}

// Función disponible para ejecutar desde consola
window.testReservationCreation = {
  runTests: runTests,
  createReservation: testCreateReservation,
  verifyReservations: verifyReservations
};

// Ejecutar automáticamente
runTests();

console.log('\n💡 FUNCIONES DISPONIBLES EN CONSOLA:');
console.log('- window.testReservationCreation.runTests()');
console.log('- window.testReservationCreation.createReservation()');
console.log('- window.testReservationCreation.verifyReservations()');
