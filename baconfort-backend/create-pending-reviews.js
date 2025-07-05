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

async function createTestReviews() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB');
    
    // Reseñas de prueba pendientes
    const testReviews = [
      {
        propertyId: 'moldes-1680',
        guestName: 'María González',
        guestEmail: 'maria@email.com',
        rating: 5,
        comment: 'Excelente experiencia, el departamento estaba muy limpio y cómodo. La ubicación es perfecta.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-12-01'),
          checkOut: new Date('2024-12-05')
        }
      },
      {
        propertyId: 'santafe-3770',
        guestName: 'Juan Carlos Pérez',
        guestEmail: 'juan@email.com',
        rating: 4,
        comment: 'Muy buena atención y el lugar muy bien equipado. Solo faltaba un poco más de luz en el dormitorio.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-11-15'),
          checkOut: new Date('2024-11-20')
        }
      },
      {
        propertyId: 'dorrego-1548',
        guestName: 'Ana López',
        guestEmail: 'ana@email.com',
        rating: 5,
        comment: 'Hermoso apartamento, muy bien decorado y con todas las comodidades. Volveríamos sin dudarlo.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-12-10'),
          checkOut: new Date('2024-12-15')
        }
      },
      {
        propertyId: 'convencion-1994',
        guestName: 'Roberto Silva',
        guestEmail: 'roberto@email.com',
        rating: 3,
        comment: 'El lugar está bien pero el wifi era muy lento y había algo de ruido por las noches.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-11-25'),
          checkOut: new Date('2024-11-28')
        }
      },
      {
        propertyId: 'ugarteche-2824',
        guestName: 'Sofia Martínez',
        guestEmail: 'sofia@email.com',
        rating: 5,
        comment: 'Perfecto para nuestra estadía en Buenos Aires. Muy seguro y cerca de todo lo que necesitábamos.',
        isApproved: false,
        stayDates: {
          checkIn: new Date('2024-12-20'),
          checkOut: new Date('2024-12-25')
        }
      }
    ];
    
    console.log('📝 Creando reseñas de prueba pendientes...');
    
    for (const reviewData of testReviews) {
      const review = new Review(reviewData);
      await review.save();
      console.log(`✓ Creada reseña de ${reviewData.guestName} para ${reviewData.propertyId}`);
    }
    
    console.log('\n🎉 Se crearon 5 reseñas pendientes de moderación');
    console.log('Ahora puedes ir al panel de administración para gestionarlas.');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

createTestReviews();
