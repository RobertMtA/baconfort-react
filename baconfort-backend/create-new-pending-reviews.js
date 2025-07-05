const mongoose = require('mongoose');
require('dotenv').config();

// Definir modelo Review
const reviewSchema = new mongoose.Schema({
  propertyId: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  guestName: { type: String, required: true },
  guestEmail: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
  isRejected: { type: Boolean, default: false },
  isHighlight: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  moderationNotes: { type: String, default: null },
  moderatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  moderatedAt: { type: Date, default: null },
  stayDates: {
    checkIn: Date,
    checkOut: Date
  },
  helpful: { type: Number, default: 0 },
  reported: { type: Number, default: 0 },
  language: { type: String, enum: ['es', 'en', 'pt'], default: 'es' },
  source: { type: String, enum: ['website', 'booking', 'airbnb', 'direct'], default: 'website' }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

async function createNewPendingReviews() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB');
    
    // Generar timestamp único para evitar duplicados
    const timestamp = Date.now();
    
    // Reseñas de prueba pendientes con datos únicos
    const testReviews = [
      {
        propertyId: 'moldes-1680',
        guestName: 'Carlos Ruiz',
        guestEmail: `carlos${timestamp}@email.com`,
        rating: 4,
        comment: 'Muy buen apartamento, cerca del transporte público. La cocina tenía todo lo necesario.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-12-15'),
          checkOut: new Date('2024-12-18')
        }
      },
      {
        propertyId: 'santafe-3770',
        guestName: 'Laura Fernández',
        guestEmail: `laura${timestamp}@email.com`,
        rating: 5,
        comment: 'Increíble lugar, muy moderno y limpio. El host respondió rápidamente todas nuestras consultas.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-12-20'),
          checkOut: new Date('2024-12-22')
        }
      },
      {
        propertyId: 'dorrego-1548',
        guestName: 'Miguel Torres',
        guestEmail: `miguel${timestamp}@email.com`,
        rating: 3,
        comment: 'El lugar está bien pero el aire acondicionado no funcionaba correctamente. Por lo demás, todo bien.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-11-30'),
          checkOut: new Date('2024-12-03')
        }
      },
      {
        propertyId: 'convencion-1994',
        guestName: 'Patricia Silva',
        guestEmail: `patricia${timestamp}@email.com`,
        rating: 5,
        comment: 'Excelente ubicación y muy cómodo. Definitivamente volveríamos a quedarnos aquí.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-12-08'),
          checkOut: new Date('2024-12-12')
        }
      },
      {
        propertyId: 'ugarteche-2824',
        guestName: 'Diego Morales',
        guestEmail: `diego${timestamp}@email.com`,
        rating: 4,
        comment: 'Buena experiencia en general. El apartamento está bien equipado, solo faltaba un microondas.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-12-25'),
          checkOut: new Date('2024-12-28')
        }
      }
    ];
    
    console.log('📝 Creando nuevas reseñas pendientes...');
    
    for (const reviewData of testReviews) {
      const review = new Review(reviewData);
      await review.save();
      console.log(`✓ Creada reseña de ${reviewData.guestName} para ${reviewData.propertyId}`);
    }
    
    console.log('\n🎉 Se crearon 5 nuevas reseñas pendientes de moderación');
    console.log('Ahora puedes ir al panel de administración para gestionarlas.');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

createNewPendingReviews();
