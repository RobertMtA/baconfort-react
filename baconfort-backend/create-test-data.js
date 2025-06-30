const mongoose = require('mongoose');
const User = require('./models/User');
const Reservation = require('./models/Reservation');
require('dotenv').config();

async function createTestData() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/baconfort');
    console.log('📊 Conectado a MongoDB');

    // Verificar si ya existe un usuario de prueba
    let testUser = await User.findOne({ email: 'test@example.com' });
    
    if (!testUser) {
      // Crear usuario de prueba
      testUser = new User({
        name: 'Usuario Prueba',
        email: 'test@example.com',
        password: 'password123'
      });
      await testUser.save();
      console.log('👤 Usuario de prueba creado');
    } else {
      console.log('👤 Usuario de prueba ya existe');
    }

    // Verificar reservas existentes
    const existingReservations = await Reservation.find({ userId: testUser._id });
    console.log(`📅 Reservas existentes para el usuario: ${existingReservations.length}`);

    if (existingReservations.length === 0) {
      // Crear reservas de prueba
      const testReservations = [
        {
          userId: testUser._id,
          userName: testUser.name,
          userEmail: testUser.email,
          propertyId: 'moldes1680',
          propertyName: 'Moldes 1680',
          checkIn: new Date('2025-07-15'),
          checkOut: new Date('2025-07-20'),
          guests: '2',
          fullName: 'Usuario Prueba',
          email: 'test@example.com',
          phone: '+54 11 1234-5678',
          message: 'Reserva de prueba - activa',
          status: 'confirmed'
        },
        {
          userId: testUser._id,
          userName: testUser.name,
          userEmail: testUser.email,
          propertyId: 'santafe3770',
          propertyName: 'Santa Fe 3770',
          checkIn: new Date('2025-06-01'),
          checkOut: new Date('2025-06-05'),
          guests: '4',
          fullName: 'Usuario Prueba',
          email: 'test@example.com',
          phone: '+54 11 1234-5678',
          message: 'Reserva de prueba - completada',
          status: 'completed'
        },
        {
          userId: testUser._id,
          userName: testUser.name,
          userEmail: testUser.email,
          propertyId: 'dorrego1548',
          propertyName: 'Dorrego 1548',
          checkIn: new Date('2025-08-10'),
          checkOut: new Date('2025-08-15'),
          guests: '3',
          fullName: 'Usuario Prueba',
          email: 'test@example.com',
          phone: '+54 11 1234-5678',
          message: 'Reserva de prueba - pendiente',
          status: 'pending'
        }
      ];

      for (const reservationData of testReservations) {
        const reservation = new Reservation(reservationData);
        await reservation.save();
        console.log(`✅ Reserva creada: ${reservation.propertyName} - ${reservation.status}`);
      }
    }

    // Mostrar resumen
    const totalUsers = await User.countDocuments();
    const totalReservations = await Reservation.countDocuments();
    const userReservations = await Reservation.find({ userId: testUser._id });

    console.log('\n📊 RESUMEN DE DATOS:');
    console.log(`👥 Total usuarios: ${totalUsers}`);
    console.log(`📅 Total reservas: ${totalReservations}`);
    console.log(`🔑 Usuario de prueba ID: ${testUser._id}`);
    console.log(`📋 Reservas del usuario de prueba: ${userReservations.length}`);
    
    console.log('\n📝 RESERVAS DEL USUARIO DE PRUEBA:');
    userReservations.forEach((res, index) => {
      console.log(`${index + 1}. ${res.propertyName} - ${res.status} (${res.checkIn.toISOString().split('T')[0]} a ${res.checkOut.toISOString().split('T')[0]})`);
    });

    console.log('\n🔗 DATOS PARA LOGIN:');
    console.log('Email: test@example.com');
    console.log('Password: password123');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
    process.exit(0);
  }
}

createTestData();
