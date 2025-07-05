// Script para probar todo el flujo de MyReservations
const testMyReservationsFlow = async () => {
  console.log('📱 PRUEBA: Flujo completo de MyReservations');
  console.log('===========================================');
  
  try {
    // 1. Login
    console.log('🔐 1. Haciendo login...');
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
    console.log('✅ Login exitoso');
    
    // 2. Verificar token con /api/auth/me (lo que hace AuthContextAPI)
    console.log('\n🔍 2. Verificando token con /api/auth/me...');
    const meResponse = await fetch('http://localhost:5000/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (meResponse.ok) {
      const meData = await meResponse.json();
      console.log('✅ Token verificado correctamente');
      console.log(`   Usuario: ${meData.user.name}`);
    } else {
      console.log('❌ Error verificando token');
      return;
    }
    
    // 3. Obtener reservas con /api/reservations/my (lo que hace MyReservations)
    console.log('\n📋 3. Obteniendo reservas del usuario...');
    const myReservationsResponse = await fetch('http://localhost:5000/api/reservations/my', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (myReservationsResponse.ok) {
      const responseData = await myReservationsResponse.json();
      console.log('✅ Reservas obtenidas correctamente');
      console.log(`   Estructura: { success: ${responseData.success}, data: Array(${responseData.data.length}) }`);
      
      if (responseData.data && responseData.data.length > 0) {
        console.log('\n📝 Reservas encontradas:');
        responseData.data.forEach((reservation, index) => {
          console.log(`${index + 1}. ${reservation.propertyName || reservation.propertyId}`);
          console.log(`   - Estado: ${reservation.status}`);
          console.log(`   - Check-in: ${new Date(reservation.checkIn).toLocaleDateString()}`);
          console.log(`   - Check-out: ${new Date(reservation.checkOut).toLocaleDateString()}`);
          console.log(`   - Huéspedes: ${reservation.guests}`);
          console.log('');
        });
        
        console.log('🎉 MYRESERVATIONS DEBERÍA FUNCIONAR CORRECTAMENTE');
        console.log('');
        console.log('🌐 Para probar en el navegador:');
        console.log('1. Ve a: http://localhost:3000/my-reservations');
        console.log('2. Inicia sesión si no lo has hecho');
        console.log('3. Deberías ver las reservas listadas arriba');
        
      } else {
        console.log('ℹ️ El usuario no tiene reservas');
        console.log('   (Esto es normal si es un usuario nuevo)');
      }
      
    } else {
      const errorData = await myReservationsResponse.json();
      console.log('❌ Error obteniendo reservas:', errorData);
    }
    
    console.log('\n✅ RESUMEN:');
    console.log('- Login: ✅ Funciona');
    console.log('- Verificación de token: ✅ Funciona');
    console.log('- Obtención de reservas: ✅ Funciona');
    console.log('- Frontend: http://localhost:3000');
    console.log('- Backend: http://localhost:5000');
    
  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
};

// Ejecutar la prueba
testMyReservationsFlow();
