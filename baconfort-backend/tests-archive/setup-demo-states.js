// Script para crear variedad en los estados de las reservas
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
.then(async () => {
  console.log('✅ Conectado a MongoDB');
  
  const Reservation = require('./models/Reservation');
  
  // Obtener todas las reservas
  const reservations = await Reservation.find().sort({ createdAt: 1 });
  console.log(`📊 Encontradas ${reservations.length} reservas`);
  
  if (reservations.length >= 4) {
    // Crear variedad de estados para demostración
    const updates = [
      { id: reservations[0]._id, status: 'pending' },
      { id: reservations[1]._id, status: 'pending' }, 
      { id: reservations[2]._id, status: 'confirmed' },
      { id: reservations[3]._id, status: 'confirmed' },
      { id: reservations[4]._id, status: 'cancelled' },
      { id: reservations[5]._id, status: 'completed' },
    ];
    
    for (const update of updates) {
      if (update.id) {
        await Reservation.findByIdAndUpdate(update.id, { 
          status: update.status,
          updatedAt: new Date()
        });
        console.log(`✅ Reserva ${update.id} → ${update.status}`);
      }
    }
    
    console.log('\n📊 Estados finales:');
    console.log('- 2 reservas pendientes (pueden confirmarse o cancelarse)');
    console.log('- 2 reservas confirmadas (pueden completarse)'); 
    console.log('- 1 reserva cancelada');
    console.log('- 1 reserva completada');
    console.log('\n🎯 Ahora puedes probar los botones de acción en el panel admin!');
  }
  
  process.exit(0);
})
.catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});
