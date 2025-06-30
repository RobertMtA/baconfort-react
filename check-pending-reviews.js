// Script para verificar reseñas pendientes en localStorage
console.log('🔍 Verificando reseñas pendientes...');

const data = localStorage.getItem('baconfort-admin-data');
if (data) {
  try {
    const parsedData = JSON.parse(data);
    console.log('📋 Datos encontrados en localStorage');
    
    Object.keys(parsedData.properties).forEach(propertyId => {
      const property = parsedData.properties[propertyId];
      const reviews = property.reviews || [];
      
      console.log(`\n🏠 Propiedad: ${property.title} (${propertyId})`);
      console.log(`📊 Total reseñas: ${reviews.length}`);
      
      const pendingReviews = reviews.filter(review => 
        review.status === 'pending' || (!review.verified && review.isGuestSubmission)
      );
      
      const verifiedReviews = reviews.filter(review => review.verified);
      const rejectedReviews = reviews.filter(review => review.status === 'rejected');
      
      console.log(`⏳ Pendientes: ${pendingReviews.length}`);
      console.log(`✅ Verificadas: ${verifiedReviews.length}`);
      console.log(`❌ Rechazadas: ${rejectedReviews.length}`);
      
      if (pendingReviews.length > 0) {
        console.log('\n🔍 Reseñas pendientes:');
        pendingReviews.forEach(review => {
          console.log(`  - ${review.guestName} (${review.rating}⭐) - ${new Date(review.date).toLocaleDateString()}`);
          console.log(`    Estado: ${review.status || 'sin estado'}, Verificada: ${review.verified}, Guest: ${review.isGuestSubmission}`);
          console.log(`    Comentario: "${review.comment.substring(0, 50)}..."`);
        });
      }
    });
    
  } catch (error) {
    console.error('❌ Error parseando localStorage:', error);
  }
} else {
  console.log('❌ No se encontraron datos en localStorage');
}
