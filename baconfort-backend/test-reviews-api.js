const axios = require('axios');

async function testReviewsAPI() {
  try {
    console.log('🔍 Probando endpoint de reseñas pendientes...');
    
    const response = await axios.get('http://localhost:5000/api/reviews/admin?status=pending', {
      headers: {
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Endpoint funcionando correctamente');
    console.log(`📊 Status: ${response.status}`);
    console.log(`📋 Reseñas pendientes encontradas: ${response.data.data.length}`);
    
    if (response.data.data.length > 0) {
      console.log('\n--- RESEÑAS PENDIENTES ---');
      response.data.data.forEach((review, index) => {
        console.log(`${index + 1}. ${review.guestName} - ⭐${review.rating}/5`);
        console.log(`   Propiedad: ${review.propertyId}`);
        console.log(`   Comentario: ${review.comment.substring(0, 50)}...`);
        console.log('');
      });
    } else {
      console.log('⚠️ No hay reseñas pendientes');
    }
    
  } catch (error) {
    console.error('❌ Error probando API:', error.message);
    if (error.response) {
      console.log(`Status: ${error.response.status}`);
      console.log(`Data:`, error.response.data);
    }
  }
}

testReviewsAPI();
