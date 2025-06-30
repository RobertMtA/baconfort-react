// Script para actualizar estados de reservas para pruebas visuales
const mongoose = require('mongoose');
require('dotenv').config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('✅ Conectado a MongoDB');
  
  const Reservation = require('./models/Reservation');
  
  // Obtener todas las reservas
  const reservations = await Reservation.find().sort({ createdAt: 1 });
  console.log(`📊 Encontradas ${reservations.length} reservas`);
  
  if (reservations.length >= 4) {
    // Actualizar estados para variedad visual
    await Reservation.findByIdAndUpdate(reservations[0]._id, { status: 'confirmed' });
    await Reservation.findByIdAndUpdate(reservations[1]._id, { status: 'cancelled' });
    await Reservation.findByIdAndUpdate(reservations[2]._id, { status: 'completed' });
    // Las demás quedan como 'pending'
    
    console.log('✅ Estados actualizados:');
    console.log('- Reserva 1: confirmed');
    console.log('- Reserva 2: cancelled');
    console.log('- Reserva 3: completed');
    console.log('- Resto: pending');
  }
  
  process.exit(0);
})
.catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
