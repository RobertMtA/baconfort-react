// Script para corregir reseñas existentes
// Ejecutar en la consola del navegador en http://localhost:3001

console.log('🔧 Corrigiendo reseñas existentes...');

// Obtener datos del localStorage
const data = JSON.parse(localStorage.getItem('baconfort_data') || '{}');

if (data.properties && data.properties.moldes1680 && data.properties.moldes1680.reviews) {
  const moldesReviews = data.properties.moldes1680.reviews;
  
  console.log('📋 Reseñas actuales en Moldes 1680:', moldesReviews);
  
  // Marcar reseñas de huéspedes como pendientes si no tienen el campo status
  let hasChanges = false;
  
  moldesReviews.forEach(review => {
    // Si la reseña no tiene status y parece ser de huésped, marcarla como pendiente
    if (!review.status && review.isGuestSubmission) {
      review.status = 'pending';
      review.verified = false;
      hasChanges = true;
      console.log('✅ Reseña marcada como pendiente:', review.guestName);
    }
    // Si es una reseña verificada sin status, darle status aprobado
    else if (!review.status && review.verified) {
      review.status = 'approved';
      hasChanges = true;
      console.log('✅ Reseña marcada como aprobada:', review.guestName);
    }
  });
  
  if (hasChanges) {
    // Guardar cambios
    localStorage.setItem('baconfort_data', JSON.stringify(data));
    console.log('💾 Cambios guardados. Recarga la página para ver los cambios.');
    
    // Mostrar instrucciones
    console.log('\n📋 INSTRUCCIONES:');
    console.log('1. Recarga esta página (F5)');
    console.log('2. Ve a http://localhost:3001/admin');
    console.log('3. Inicia sesión con: usuario=admin, contraseña=baconfort2024');
    console.log('4. Ve a "Gestión de Reseñas y Puntuaciones"');
    console.log('5. Selecciona "Moldes 1680"');
    console.log('6. Verás la sección "Reseñas Pendientes de Moderación"');
    console.log('7. Haz clic en "Aprobar" para publicar la reseña');
    
  } else {
    console.log('ℹ️ No hay cambios necesarios.');
  }
} else {
  console.log('⚠️ No se encontraron reseñas en Moldes 1680');
}
