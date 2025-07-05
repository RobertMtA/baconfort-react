const mongoose = require('mongoose');
require('dotenv').config();

async function createUniqueReviews() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB');
    
    const Review = mongoose.model('Review', new mongoose.Schema({}, { strict: false }));
    
    // Generar timestamp único
    const timestamp = Date.now();
    
    // Crear reseñas para propiedades únicas que no tengan reseñas ya
    const uniqueReviews = [
      {
        propertyId: `test-property-1-${timestamp}`,
        guestName: 'Ana García Nueva',
        guestEmail: `ana${timestamp}@test.com`,
        rating: 5,
        comment: 'Excelente lugar, muy recomendado para familias. Todo muy limpio y organizado.',
        isApproved: false,
        isRejected: false,
        stayDates: {
          checkIn: new Date('2024-12-01'),
          checkOut: new Date('2024-12-05')
        },
        language: 'es',
        source: 'website'
      },
      {
        propertyId: `test-property-2-${timestamp}`,
        guestName: 'Carlos Mendoza Nuevo',
        guestEmail: `carlos${timestamp}@test.com`,
        rating: 4,
        comment: 'Muy buena ubicación y precio justo. Solo un detalle con la calefacción que se resolvió rápido.',
        isApproved: false,
        isRejected: false,
        stayDates: {
          checkIn: new Date('2024-12-10'),
          checkOut: new Date('2024-12-13')
        },
        language: 'es',
        source: 'website'
      },
      {
        propertyId: `test-property-3-${timestamp}`,
        guestName: 'María Rodriguez Nueva',
        guestEmail: `maria${timestamp}@test.com`,
        rating: 3,
        comment: 'El lugar está bien pero el wifi no funcionaba correctamente. Por lo demás todo en orden.',
        isApproved: false,
        isRejected: false,
        stayDates: {
          checkIn: new Date('2024-12-15'),
          checkOut: new Date('2024-12-18')
        },
        language: 'es',
        source: 'website'
      }
    ];
    
    console.log('📝 Creando reseñas con propiedades únicas...');
    
    for (const reviewData of uniqueReviews) {
      const review = new Review(reviewData);
      await review.save();
      console.log(`✓ Creada reseña de ${reviewData.guestName} para ${reviewData.propertyId}`);
    }
    
    console.log('\n🎉 Se crearon 3 nuevas reseñas pendientes');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

createUniqueReviews();
