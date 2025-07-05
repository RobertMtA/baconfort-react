const mongoose = require('mongoose');
require('dotenv').config();

// Conectar a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB');
  } catch (error) {
    console.error('✗ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
}

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

async function debugReviews() {
  try {
    await connectDB();
    
    console.log('\n=== DIAGNÓSTICO DE RESEÑAS ===\n');
    
    // Contar todas las reseñas
    const totalReviews = await Review.countDocuments();
    console.log(`📊 Total de reseñas en la base de datos: ${totalReviews}`);
    
    if (totalReviews === 0) {
      console.log('⚠️  No hay reseñas en la base de datos');
      return;
    }
    
    // Contar por estado
    const pendingReviews = await Review.countDocuments({ 
      isApproved: false, 
      isRejected: { $ne: true } 
    });
    const approvedReviews = await Review.countDocuments({ isApproved: true });
    const rejectedReviews = await Review.countDocuments({ isRejected: true });
    
    console.log(`📋 Reseñas pendientes: ${pendingReviews}`);
    console.log(`✅ Reseñas aprobadas: ${approvedReviews}`);
    console.log(`❌ Reseñas rechazadas: ${rejectedReviews}`);
    
    // Mostrar las últimas 5 reseñas pendientes
    if (pendingReviews > 0) {
      console.log('\n--- ÚLTIMAS 5 RESEÑAS PENDIENTES ---');
      const latestPending = await Review.find({ 
        isApproved: false, 
        isRejected: { $ne: true } 
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('guestName rating comment propertyId createdAt');
      
      latestPending.forEach((review, index) => {
        console.log(`${index + 1}. ${review.guestName} - ⭐${review.rating}/5`);
        console.log(`   Propiedad: ${review.propertyId}`);
        console.log(`   Fecha: ${review.createdAt.toLocaleDateString()}`);
        console.log(`   Comentario: ${review.comment.substring(0, 100)}...`);
        console.log('');
      });
    }
    
    // Verificar endpoint
    console.log('\n--- VERIFICACIÓN DE ENDPOINT ---');
    
    const axios = require('axios');
    try {
      const response = await axios.get('http://localhost:5000/api/reviews/admin?status=pending', {
        headers: {
          'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
        },
        timeout: 5000
      });
      console.log('✓ El endpoint /api/reviews/admin responde correctamente');
      console.log(`📋 Reseñas devueltas por el API: ${response.data.data.length}`);
    } catch (error) {
      console.log('✗ Error al acceder al endpoint:', error.message);
      if (error.response) {
        console.log(`   Status: ${error.response.status}`);
        console.log(`   Mensaje: ${error.response.data.error || error.response.data.message}`);
      }
    }
    
    // Verificar configuración CORS
    console.log('\n--- VERIFICACIÓN DE CORS ---');
    const corsOrigin = process.env.CORS_ORIGIN;
    console.log(`🌐 CORS configurado para: ${corsOrigin}`);
    
    if (corsOrigin && corsOrigin.includes('http://localhost:3000')) {
      console.log('✓ CORS incluye localhost:3000');
    } else {
      console.log('⚠️  CORS no incluye localhost:3000');
    }
    
  } catch (error) {
    console.error('Error en el diagnóstico:', error);
  } finally {
    mongoose.connection.close();
  }
}

debugReviews();
