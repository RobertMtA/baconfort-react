const fetch = require('node-fetch');

const API_BASE = 'http://localhost:5000/api';

async function testReservationFlow() {
  console.log('🧪 Iniciando test del flujo de reservas...\n');
  
  try {
    // 1. Login con usuario demo
    console.log('1️⃣ Haciendo login con usuario demo...');
    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'guest@baconfort.com',
        password: 'guest123'
      })
    });

    const loginData = await loginResponse.json();
    
    if (!loginResponse.ok) {
      throw new Error(`Login fallido: ${loginData.message}`);
    }
    
    console.log('✅ Login exitoso');
    console.log(`👤 Usuario: ${loginData.user.name}`);
    console.log(`📧 Email: ${loginData.user.email}\n`);
    
    const token = loginData.token;
    
    // 2. Crear una reserva
    console.log('2️⃣ Creando una reserva de prueba...');
    const reservationData = {
      propertyId: 'moldes-1680',
      propertyName: 'Moldes 1680 - Test',
      checkIn: '2025-07-15',
      checkOut: '2025-07-18',
      guests: '2',
      fullName: 'Usuario Demo Test',
      email: 'guest@baconfort.com',
      phone: '+54 9 11 1234-5678',
      message: 'Esta es una reserva de prueba del sistema automatizado.'
    };
    
    const createResponse = await fetch(`${API_BASE}/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(reservationData)
    });

    const createData = await createResponse.json();
    
    if (!createResponse.ok) {
      throw new Error(`Error creando reserva: ${createData.message}`);
    }
    
    console.log('✅ Reserva creada exitosamente');
    console.log(`🏠 Propiedad: ${createData.reservation.propertyName}`);
    console.log(`📅 Check-in: ${createData.reservation.checkIn}`);
    console.log(`📅 Check-out: ${createData.reservation.checkOut}`);
    console.log(`👥 Huéspedes: ${createData.reservation.guests}\n`);
    
    const reservationId = createData.reservation.id;
    
    // 3. Obtener mis reservas
    console.log('3️⃣ Obteniendo lista de mis reservas...');
    const getResponse = await fetch(`${API_BASE}/reservations`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const getReservations = await getResponse.json();
    
    if (!getResponse.ok) {
      throw new Error(`Error obteniendo reservas: ${getReservations.message}`);
    }
    
    console.log(`✅ Reservas obtenidas: ${getReservations.length}`);
    getReservations.forEach((res, index) => {
      console.log(`${index + 1}. ${res.propertyName} - ${res.status} (${new Date(res.checkIn).toLocaleDateString()})`);
    });
    console.log('');
    
    // 4. Test con admin
    console.log('4️⃣ Probando acceso de admin...');
    const adminLoginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'admin@baconfort.com',
        password: 'roccosa226'
      })
    });

    const adminLoginData = await adminLoginResponse.json();
    
    if (!adminLoginResponse.ok) {
      throw new Error(`Admin login fallido: ${adminLoginData.message}`);
    }
    
    console.log('✅ Admin login exitoso');
    
    const adminToken = adminLoginData.token;
    
    // 5. Admin obtiene todas las reservas
    console.log('5️⃣ Admin obteniendo todas las reservas...');
    const adminGetResponse = await fetch(`${API_BASE}/reservations/admin/all`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });

    const adminReservations = await adminGetResponse.json();
    
    if (!adminGetResponse.ok) {
      throw new Error(`Error admin obteniendo reservas: ${adminReservations.message}`);
    }
    
    console.log(`✅ Admin ve todas las reservas: ${adminReservations.length}`);
    adminReservations.forEach((res, index) => {
      console.log(`${index + 1}. ${res.propertyName} - ${res.userName} - ${res.status}`);
    });
    console.log('');
    
    // 6. Cancelar la reserva de prueba
    console.log('6️⃣ Cancelando reserva de prueba...');
    const cancelResponse = await fetch(`${API_BASE}/reservations/${reservationId}/cancel`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const cancelData = await cancelResponse.json();
    
    if (!cancelResponse.ok) {
      throw new Error(`Error cancelando reserva: ${cancelData.message}`);
    }
    
    console.log('✅ Reserva cancelada exitosamente');
    console.log(`📝 Estado: ${cancelData.reservation.status}\n`);
    
    console.log('🎉 ¡Test completado exitosamente!');
    console.log('✅ Todos los endpoints funcionan correctamente');
    console.log('✅ La autenticación funciona');
    console.log('✅ Los permisos están correctos');
    console.log('✅ La base de datos guarda las reservas');
    
  } catch (error) {
    console.error('❌ Test fallido:', error.message);
    process.exit(1);
  }
}

testReservationFlow();
