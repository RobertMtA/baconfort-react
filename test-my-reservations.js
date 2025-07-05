// Script para probar el endpoint /api/reservations/my con token real
const testMyReservations = async () => {
  console.log('📋 PRUEBA: Endpoint /api/reservations/my');
  console.log('==========================================');
  
  try {
    // Usar un token existente (del script anterior)
    const loginResponse = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'usuario.prueba@example.com',
        password: 'password123'
      })
    });
    
    if (!loginResponse.ok) {
      console.log('❌ Error en login');
      return;
    }
    
    const loginData = await loginResponse.json();
    const token = loginData.token;
    
    console.log('✅ Login exitoso, probando /api/reservations/my...');
    
    // Probar el endpoint que usa el frontend
    const myReservationsResponse = await fetch('http://localhost:5000/api/reservations/my', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (myReservationsResponse.ok) {
      const responseData = await myReservationsResponse.json();
      console.log('✅ Respuesta del endpoint /api/reservations/my:');
      console.log('   Success:', responseData.success);
      console.log('   Message:', responseData.message);
      console.log('   Reservas:', responseData.data ? responseData.data.length : 0);
      
      if (responseData.data && responseData.data.length > 0) {
        console.log('\n📋 Reservas del usuario:');
        responseData.data.forEach((reservation, index) => {
          console.log(`${index + 1}. ${reservation.propertyName}`);
          console.log(`   - Estado: ${reservation.status}`);
          console.log(`   - Check-in: ${reservation.checkIn}`);
        });
      } else {
        console.log('   El usuario no tiene reservas');
      }
      
      console.log('\n🎉 EL ENDPOINT /api/reservations/my FUNCIONA CORRECTAMENTE');
      
    } else {
      const errorData = await myReservationsResponse.json();
      console.log('❌ Error en /api/reservations/my:', errorData);
    }
    
    // Probar también el endpoint /api/auth/me
    console.log('\n🔍 Probando /api/auth/me...');
    
    const meResponse = await fetch('http://localhost:5000/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (meResponse.ok) {
      const meData = await meResponse.json();
      console.log('✅ Endpoint /api/auth/me funciona correctamente');
      console.log('   Usuario:', meData.user.name);
      console.log('   Email:', meData.user.email);
    } else {
      console.log('❌ Error en /api/auth/me');
    }
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
};

// Ejecutar la prueba
testMyReservations();
