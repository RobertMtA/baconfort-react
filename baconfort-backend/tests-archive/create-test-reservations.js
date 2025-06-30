// Crear múltiples reservas de prueba para verificar la tabla
const BASE_URL = 'http://localhost:5000/api';

async function createMultipleTestReservations() {
  console.log('🔄 Creando múltiples reservas de prueba...\n');
  
  try {
    // 1. Login para obtener token
    console.log('1️⃣ Iniciando sesión...');
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
    
    // 2. Crear reservas de prueba
    const testReservations = [
      {
        propertyId: 'santa-fe-3770',
        propertyName: 'Departamento Santa Fe 3770',
        checkIn: '2025-07-10',
        checkOut: '2025-07-15',
        guests: 4,
        fullName: 'María González',
        email: 'maria.gonzalez@email.com',
        phone: '+5491187654321',
        message: 'Solicito departamento con vista al jardín por favor'
      },
      {
        propertyId: 'moldes-1680',
        propertyName: 'Departamento Moldes 1680',
        checkIn: '2025-07-20',
        checkOut: '2025-07-25',
        guests: 2,
        fullName: 'Carlos Rodriguez',
        email: 'carlos.rodriguez@email.com',
        phone: '+5491198765432',
        message: 'Viaje de trabajo, necesito WiFi de alta velocidad'
      },
      {
        propertyId: 'ugarteche-2824',
        propertyName: 'Departamento Ugarteche 2824',
        checkIn: '2025-08-01',
        checkOut: '2025-08-07',
        guests: 3,
        fullName: 'Ana Fernández',
        email: 'ana.fernandez@email.com',
        phone: '+5491176543210',
        message: 'Vacaciones familiares, tenemos un niño de 5 años'
      },
      {
        propertyId: 'convencion-1994',
        propertyName: 'Departamento Convención 1994',
        checkIn: '2025-08-15',
        checkOut: '2025-08-20',
        guests: 6,
        fullName: 'Roberto Silva',
        email: 'roberto.silva@email.com',
        phone: '+5491165432109',
        message: 'Reunión de amigos, necesitamos espacio amplio'
      }
    ];
    
    console.log('2️⃣ Creando reservas de prueba...');
    
    for (let i = 0; i < testReservations.length; i++) {
      const reservation = testReservations[i];
      
      const response = await fetch(`${BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
      });
      
      if (response.ok) {
        console.log(`✅ Reserva ${i + 1} creada: ${reservation.propertyName}`);
      } else {
        const error = await response.json();
        console.log(`❌ Error creando reserva ${i + 1}:`, error.message);
      }
    }
    
    // 3. Verificar total de reservas
    console.log('\n3️⃣ Verificando total de reservas...');
    const reservationsResponse = await fetch(`${BASE_URL}/reservations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const reservations = await reservationsResponse.json();
    console.log(`📊 Total de reservas: ${reservations.length}`);
    
    console.log('\n🎉 Proceso completado! Ahora puedes revisar el panel de admin.');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

createMultipleTestReservations();
