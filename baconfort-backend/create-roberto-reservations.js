const mongoose = require('mongoose');
const User = require('./models/User');
const Reservation = require('./models/Reservation');
require('dotenv').config();

async function createReservationsForRoberto() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/baconfort');
    console.log('📊 Conectado a MongoDB');

    // Buscar el usuario Roberto
    const robertoUser = await User.findOne({ email: 'robertogaona1985@gmail.com' });
    
    if (!robertoUser) {
      console.log('❌ Usuario Roberto no encontrado');
      process.exit(1);
    }

    console.log('👤 Usuario Roberto encontrado:', robertoUser.name);

    // Verificar reservas existentes
    const existingReservations = await Reservation.find({ userId: robertoUser._id });
    console.log(`📅 Reservas existentes para Roberto: ${existingReservations.length}`);

    // Siempre agregar más reservas para demostración
    const robertoReservations = [
        {
          userId: robertoUser._id,
          userName: robertoUser.name,
          userEmail: robertoUser.email,
          propertyId: 'moldes1680',
          propertyName: 'Moldes 1680 - Palermo',
          checkIn: new Date('2025-07-10'),
          checkOut: new Date('2025-07-15'),
          guests: '2',
          fullName: 'Roberto Gaona',
          email: 'robertogaona1985@gmail.com',
          phone: '+54 11 5678-9012',
          message: 'Reserva para fin de semana largo en Palermo. Solicito habitación con vista a la calle.',
          status: 'confirmed'
        },
        {
          userId: robertoUser._id,
          userName: robertoUser.name,
          userEmail: robertoUser.email,
          propertyId: 'santafe3770',
          propertyName: 'Santa Fe 3770 - Barrio Norte',
          checkIn: new Date('2025-05-15'),
          checkOut: new Date('2025-05-20'),
          guests: '1',
          fullName: 'Roberto Gaona',
          email: 'robertogaona1985@gmail.com',
          phone: '+54 11 5678-9012',
          message: 'Viaje de negocios. Necesito WiFi de alta velocidad y escritorio para trabajar.',
          status: 'completed'
        },
        {
          userId: robertoUser._id,
          userName: robertoUser.name,
          userEmail: robertoUser.email,
          propertyId: 'dorrego1548',
          propertyName: 'Dorrego 1548 - Villa Crespo',
          checkIn: new Date('2025-08-20'),
          checkOut: new Date('2025-08-25'),
          guests: '4',
          fullName: 'Roberto Gaona',
          email: 'robertogaona1985@gmail.com',
          phone: '+54 11 5678-9012',
          message: 'Vacaciones familiares. Viajamos con dos niños pequeños.',
          status: 'pending'
        },
        {
          userId: robertoUser._id,
          userName: robertoUser.name,
          userEmail: robertoUser.email,
          propertyId: 'convencion1994',
          propertyName: 'Convención 1994 - Caballito',
          checkIn: new Date('2025-04-01'),
          checkOut: new Date('2025-04-03'),
          guests: '2',
          fullName: 'Roberto Gaona',
          email: 'robertogaona1985@gmail.com',
          phone: '+54 11 5678-9012',
          message: 'Fin de semana romántico con mi pareja.',
          status: 'cancelled'
        },
        {
          userId: robertoUser._id,
          userName: robertoUser.name,
          userEmail: robertoUser.email,
          propertyId: 'ugarteche2824',
          propertyName: 'Ugarteche 2824 - Recoleta',
          checkIn: new Date('2025-09-15'),
          checkOut: new Date('2025-09-18'),
          guests: '3',
          fullName: 'Roberto Gaona',
          email: 'robertogaona1985@gmail.com',
          phone: '+54 11 5678-9012',
          message: 'Reunión familiar. Esperamos la habitación esté lista temprano.',
          status: 'pending'
        }
      ];

      for (const reservationData of robertoReservations) {
        const reservation = new Reservation(reservationData);
        await reservation.save();
        console.log(`✅ Reserva creada para Roberto: ${reservation.propertyName} - ${reservation.status}`);
      }

    // Mostrar resumen
    const robertoReservationsCount = await Reservation.find({ userId: robertoUser._id });

    console.log('\n📊 RESUMEN DE RESERVAS DE ROBERTO:');
    console.log(`🔑 Usuario: ${robertoUser.name} (${robertoUser.email})`);
    console.log(`📋 Total de reservas: ${robertoReservationsCount.length}`);
    
    console.log('\n📝 LISTA DE RESERVAS:');
    robertoReservationsCount.forEach((res, index) => {
      const checkInDate = res.checkIn.toISOString().split('T')[0];
      const checkOutDate = res.checkOut.toISOString().split('T')[0];
      console.log(`${index + 1}. ${res.propertyName} - ${res.status} (${checkInDate} a ${checkOutDate})`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
    process.exit(0);
  }
}

createReservationsForRoberto();
