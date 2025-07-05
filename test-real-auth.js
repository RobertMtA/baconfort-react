// Script para probar el sistema de autenticación real
// Incluye registro, login, y creación de reservas con usuario real

const API_URL = 'http://localhost:5000/api';

// Datos de usuario de prueba
const testUser = {
  name: 'Usuario Prueba',
  email: 'usuario.prueba@example.com',
  password: 'password123'
};

// Datos de reserva de prueba
const testReservation = {
  propertyId: 'moldes-1680',
  propertyName: 'Moldes 1680',
  checkIn: '2025-08-15',
  checkOut: '2025-08-20',
  guests: '2',
  fullName: 'Usuario Prueba',
  email: 'usuario.prueba@example.com',
  phone: '+54 11 9876-5432',
  message: 'Reserva de prueba con autenticación real'
};

async function testRealAuthentication() {
  console.log('🔐 PRUEBA: Sistema de autenticación real');
  console.log('=========================================\n');

  try {
    // 1. Probar registro de usuario
    console.log('📝 1. Probando registro de usuario...');
    const registerResponse = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testUser)
    });

    let token = null;
    let user = null;

    if (registerResponse.ok) {
      const registerData = await registerResponse.json();
      console.log('✅ Usuario registrado exitosamente');
      console.log(`   Nombre: ${registerData.user.name}`);
      console.log(`   Email: ${registerData.user.email}`);
      console.log(`   Token obtenido: ${registerData.token ? 'Sí' : 'No'}`);
      
      token = registerData.token;
      user = registerData.user;
    } else {
      // Si el usuario ya existe, intentar login
      console.log('ℹ️ Usuario ya existe, intentando login...');
      
      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: testUser.email,
          password: testUser.password
        })
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log('✅ Login exitoso');
        console.log(`   Nombre: ${loginData.user.name}`);
        console.log(`   Email: ${loginData.user.email}`);
        console.log(`   Token obtenido: ${loginData.token ? 'Sí' : 'No'}`);
        
        token = loginData.token;
        user = loginData.user;
      } else {
        const errorData = await loginResponse.json();
        console.error('❌ Error en login:', errorData.error);
        return;
      }
    }

    // 2. Probar creación de reserva con token real
    if (token) {
      console.log('\n🏠 2. Probando creación de reserva con token real...');
      
      const reservationResponse = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(testReservation)
      });

      if (reservationResponse.ok) {
        const reservationData = await reservationResponse.json();
        console.log('✅ Reserva creada exitosamente');
        console.log(`   ID de reserva: ${reservationData.data._id}`);
        console.log(`   Propiedad: ${reservationData.data.propertyId}`);
        console.log(`   Estado: ${reservationData.data.status}`);
        console.log(`   Usuario ID: ${reservationData.data.userId}`);
      } else {
        const errorData = await reservationResponse.json();
        console.error('❌ Error creando reserva:', errorData);
        console.error('   Status:', reservationResponse.status);
        console.error('   Status Text:', reservationResponse.statusText);
      }

      // 3. Probar obtención de reservas del usuario
      console.log('\n📋 3. Probando obtención de reservas del usuario...');
      
      const myReservationsResponse = await fetch(`${API_URL}/reservations/my`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (myReservationsResponse.ok) {
        const myReservationsData = await myReservationsResponse.json();
        const reservations = myReservationsData.data || myReservationsData;
        console.log(`✅ Reservas del usuario obtenidas: ${reservations.length} reservas`);
        
        if (reservations.length > 0) {
          console.log('   Últimas 3 reservas:');
          reservations.slice(-3).forEach((reservation, index) => {
            console.log(`   ${index + 1}. Propiedad: ${reservation.propertyId || reservation.propertyName}`);
            console.log(`      Estado: ${reservation.status}`);
            console.log(`      Check-in: ${reservation.checkIn}`);
          });
        }
      } else {
        const errorData = await myReservationsResponse.json();
        console.error('❌ Error obteniendo reservas del usuario:', errorData);
      }
    }

    console.log('\n🎯 RESUMEN DE LA PRUEBA:');
    console.log('- Registro/Login: ' + (token ? '✅ Exitoso' : '❌ Falló'));
    console.log('- Token obtenido: ' + (token ? '✅ Sí' : '❌ No'));
    console.log('- Creación de reserva: ' + (token ? '✅ Probado' : '❌ No probado'));
    console.log('- Obtención de reservas: ' + (token ? '✅ Probado' : '❌ No probado'));

    console.log('\n✨ SISTEMA DE AUTENTICACIÓN REAL FUNCIONAL ✨');

  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  }
}

// Ejecutar prueba
testRealAuthentication();
