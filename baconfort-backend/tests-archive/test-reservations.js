const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Reservation = require('./models/Reservation');
require('dotenv').config();

async function testReservations() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB Atlas');
    
    // Verificar si el modelo Reservation funciona
    console.log('\n📊 Probando modelo Reservation...');
    const reservationCount = await Reservation.countDocuments();
    console.log(`📄 Reservas existentes: ${reservationCount}`);
    
    // Crear una reserva de prueba
    console.log('\n🔨 Creando reserva de prueba...');
    const testReservation = new Reservation({
      userId: new mongoose.Types.ObjectId(),
      userEmail: 'test@test.com',
      userName: 'Usuario Test',
      propertyId: 'test-property',
      propertyName: 'Propiedad Test',
      checkIn: new Date('2025-07-01'),
      checkOut: new Date('2025-07-03'),
      guests: '2',
      fullName: 'Test User',
      email: 'test@test.com',
      phone: '123456789',
      message: 'Reserva de prueba',
      status: 'pending'
    });
    
    await testReservation.save();
    console.log('✅ Reserva de prueba creada:', testReservation._id);
    
    // Obtener todas las reservas
    console.log('\n📋 Obteniendo todas las reservas...');
    const allReservations = await Reservation.find();
    console.log(`📊 Total reservas encontradas: ${allReservations.length}`);
    
    allReservations.forEach((res, index) => {
      console.log(`${index + 1}. ${res.propertyName} - ${res.userName} (${res.status})`);
    });
    
    // Limpiar la reserva de prueba
    await Reservation.findByIdAndDelete(testReservation._id);
    console.log('🧹 Reserva de prueba eliminada');
    
    mongoose.connection.close();
    console.log('\n✅ Test completado exitosamente');
    
  } catch (error) {
    console.error('❌ Error en test:', error);
    mongoose.connection.close();
    process.exit(1);
  }
}

testReservations();
