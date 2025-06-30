// Script para limpiar todas las reservas de prueba
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('✅ Conectado a MongoDB');
  
  const Reservation = require('./models/Reservation');
  
  // Obtener todas las reservas actuales
  const allReservations = await Reservation.find();
  console.log(`📊 Reservas encontradas: ${allReservations.length}`);
  
  if (allReservations.length > 0) {
    console.log('\n📋 Reservas existentes:');
    allReservations.forEach((reservation, index) => {
      console.log(`${index + 1}. ${reservation.propertyName} - ${reservation.fullName} (${reservation.status})`);
    });
    
    // Eliminar TODAS las reservas de prueba
    const result = await Reservation.deleteMany({});
    console.log(`\n🧹 Eliminadas ${result.deletedCount} reservas de prueba`);
    
    console.log('\n✅ Base de datos limpia - Solo quedarán las reservas reales futuras');
  } else {
    console.log('\n📭 No hay reservas para eliminar');
  }
  
  process.exit(0);
})
.catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
