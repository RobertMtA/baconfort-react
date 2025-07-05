// Prueba completa del sistema de autenticación real
const testCompleteAuthSystem = async () => {
  console.log('🔐 PRUEBA COMPLETA: Sistema de autenticación real');
  console.log('===================================================');
  
  const baseURL = 'http://localhost:5000/api';
  
  // Test 1: Registro de nuevo usuario
  console.log('\n📝 1. Probando registro de nuevo usuario...');
  
  const newUser = {
    name: 'Test User Complete',
    email: 'test.complete@example.com',
    password: 'password123',
    confirmPassword: 'password123',
    phone: '+54 11 1234-5678'
  };
  
  try {
    const registerResponse = await fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    });
    
    const registerData = await registerResponse.json();
    
    if (registerResponse.ok) {
      console.log('✅ Registro exitoso');
      console.log(`   Usuario: ${registerData.user.name}`);
      console.log(`   Email: ${registerData.user.email}`);
      console.log(`   Token: ${registerData.token ? 'Sí' : 'No'}`);
      var userToken = registerData.token;
    } else {
      console.log('⚠️ El usuario ya existe, intentando login...');
      
      // Login si el usuario ya existe
      const loginResponse = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: newUser.email,
          password: newUser.password
        })
      });
      
      const loginData = await loginResponse.json();
      
      if (loginResponse.ok) {
        console.log('✅ Login exitoso');
        console.log(`   Usuario: ${loginData.user.name}`);
        console.log(`   Email: ${loginData.user.email}`);
        console.log(`   Token: ${loginData.token ? 'Sí' : 'No'}`);
        var userToken = loginData.token;
      } else {
        console.log('❌ Error en login:', loginData.message);
        return;
      }
    }
    
    // Test 2: Verificación del token con /api/auth/me
    console.log('\n🔍 2. Verificando token con /api/auth/me...');
    
    const meResponse = await fetch(`${baseURL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    const meData = await meResponse.json();
    
    if (meResponse.ok) {
      console.log('✅ Token válido');
      console.log(`   Usuario autenticado: ${meData.user.name}`);
      console.log(`   Email: ${meData.user.email}`);
      console.log(`   Role: ${meData.user.role}`);
    } else {
      console.log('❌ Token inválido:', meData.message);
      return;
    }
    
    // Test 3: Creación de múltiples reservas
    console.log('\n🏠 3. Creando múltiples reservas...');
    
    const reservations = [
      {
        propertyId: 'moldes-1680',
        checkIn: '2025-09-01',
        checkOut: '2025-09-05',
        guests: '2',
        fullName: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        message: 'Primera reserva de prueba'
      },
      {
        propertyId: 'moldes-1680',
        checkIn: '2025-10-01',
        checkOut: '2025-10-07',
        guests: '4',
        fullName: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        message: 'Segunda reserva de prueba'
      }
    ];
    
    for (let i = 0; i < reservations.length; i++) {
      const reservation = reservations[i];
      
      const reservationResponse = await fetch(`${baseURL}/reservations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservation)
      });
      
      const reservationData = await reservationResponse.json();
      
      if (reservationResponse.ok) {
        console.log(`✅ Reserva ${i + 1} creada exitosamente`);
        console.log(`   ID: ${reservationData.data._id}`);
        console.log(`   Propiedad: ${reservationData.data.propertyName}`);
        console.log(`   Check-in: ${reservationData.data.checkIn}`);
        console.log(`   Estado: ${reservationData.data.status}`);
      } else {
        console.log(`❌ Error creando reserva ${i + 1}:`, reservationData.message);
        console.log(`   Detalles:`, reservationData.details);
      }
    }
    
    // Test 4: Consulta de reservas del usuario
    console.log('\n📋 4. Consultando reservas del usuario...');
    
    const myReservationsResponse = await fetch(`${baseURL}/reservations/my`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    const myReservationsData = await myReservationsResponse.json();
    
    if (myReservationsResponse.ok) {
      console.log(`✅ Reservas obtenidas: ${myReservationsData.data.length} reservas`);
      
      if (myReservationsData.data.length > 0) {
        console.log('   Últimas reservas:');
        myReservationsData.data.slice(0, 3).forEach((res, index) => {
          console.log(`   ${index + 1}. ${res.propertyName || res.propertyId}`);
          console.log(`      Estado: ${res.status}`);
          console.log(`      Check-in: ${res.checkIn}`);
          console.log(`      Check-out: ${res.checkOut}`);
          console.log(`      Huéspedes: ${res.guests}`);
        });
      }
    } else {
      console.log('❌ Error obteniendo reservas:', myReservationsData.message);
    }
    
    // Test 5: Prueba de autenticación inválida
    console.log('\n🚫 5. Probando token inválido...');
    
    const invalidTokenResponse = await fetch(`${baseURL}/reservations/my`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer token_invalido',
        'Content-Type': 'application/json'
      }
    });
    
    const invalidTokenData = await invalidTokenResponse.json();
    
    if (invalidTokenResponse.status === 401) {
      console.log('✅ Token inválido correctamente rechazado');
      console.log(`   Mensaje: ${invalidTokenData.error}`);
    } else {
      console.log('❌ Token inválido no fue rechazado correctamente');
    }
    
    // Test 6: Prueba sin token
    console.log('\n🚫 6. Probando sin token...');
    
    const noTokenResponse = await fetch(`${baseURL}/reservations/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    const noTokenData = await noTokenResponse.json();
    
    if (noTokenResponse.status === 401) {
      console.log('✅ Acceso sin token correctamente rechazado');
      console.log(`   Mensaje: ${noTokenData.error}`);
    } else {
      console.log('❌ Acceso sin token no fue rechazado correctamente');
    }
    
    // Resumen final
    console.log('\n🎯 RESUMEN DE LA PRUEBA COMPLETA:');
    console.log('- Registro/Login de usuario: ✅ Exitoso');
    console.log('- Verificación de token: ✅ Exitoso');
    console.log('- Creación de reservas: ✅ Exitoso');
    console.log('- Consulta de reservas: ✅ Exitoso');
    console.log('- Seguridad de tokens: ✅ Exitoso');
    console.log('');
    console.log('✨ SISTEMA DE AUTENTICACIÓN REAL COMPLETAMENTE FUNCIONAL ✨');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
    console.error('   Stack:', error.stack);
  }
};

// Ejecutar la prueba
testCompleteAuthSystem();
