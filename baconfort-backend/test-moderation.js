const mongoose = require('mongoose');
require('dotenv').config();

async function testModeration() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Conectado a MongoDB');
    
    const Review = mongoose.model('Review', new mongoose.Schema({}, { strict: false }));
    
    // Obtener una reseña pendiente para probar
    const pendingReview = await Review.findOne({ isApproved: false, isRejected: { $ne: true } });
    
    if (pendingReview) {
      console.log(`📋 Reseña encontrada: ${pendingReview._id}`);
      console.log(`👤 Huésped: ${pendingReview.guestName}`);
      console.log(`⭐ Rating: ${pendingReview.rating}/5`);
      console.log(`🏠 Propiedad: ${pendingReview.propertyId}`);
      
      // Probar el endpoint con axios
      const axios = require('axios');
      
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/reviews/${pendingReview._id}/moderate`,
          {
            action: 'approve',
            moderatorNotes: 'Aprobada desde script de prueba'
          },
          {
            headers: {
              'Authorization': 'Bearer ADMIN_DEMO_TOKEN',
              'Content-Type': 'application/json'
            }
          }
        );
        
        console.log('✅ Moderación exitosa via API');
        console.log('📊 Respuesta:', response.data);
        
      } catch (apiError) {
        console.log('❌ Error en API:', apiError.message);
        if (apiError.response) {
          console.log('Status:', apiError.response.status);
          console.log('Data:', apiError.response.data);
        }
      }
      
    } else {
      console.log('⚠️ No se encontraron reseñas pendientes');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

testModeration();
