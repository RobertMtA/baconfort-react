// Script para ejecutar en la consola del navegador
// Para agregar reseña pendiente de Roberto del 27/6/2025

console.log('🔍 Agregando reseña pendiente de Roberto...');

// Obtener datos actuales del localStorage
let data = localStorage.getItem('baconfort-admin-data');
let adminData;

if (data) {
  adminData = JSON.parse(data);
  console.log('📋 Datos existentes encontrados en localStorage');
} else {
  console.log('⚠️ No se encontraron datos en localStorage, creando estructura base...');
  // Si no hay datos, crear estructura mínima
  adminData = {
    properties: {
      moldes1680: {
        id: 'moldes1680',
        title: 'Moldes 1680',
        address: 'Moldes 1680, Buenos Aires',
        prices: {
          monthly: 'USD 1100',
          weekly: 'USD 350',
          daily: 'USD 65'
        },
        reviews: []
      }
    }
  };
}

// Crear la reseña de Roberto como pendiente
const robertoReview = {
  id: Date.now().toString(),
  guestName: 'Roberto',
  rating: 4,
  comment: 'Muy buen departamento, limpio y cómodo. La ubicación es excelente y el edificio tiene buenas amenidades. Recomendado para estadías cortas.',
  date: '2025-06-27',
  verified: false,
  highlight: false,
  status: 'pending',
  isGuestSubmission: true,
  createdAt: new Date().toISOString()
};

// Asegurarse de que moldes1680 existe y tiene array de reviews
if (!adminData.properties.moldes1680) {
  adminData.properties.moldes1680 = {
    id: 'moldes1680',
    title: 'Moldes 1680',
    reviews: []
  };
}

if (!adminData.properties.moldes1680.reviews) {
  adminData.properties.moldes1680.reviews = [];
}

// Verificar si Roberto ya tiene una reseña pendiente
const existingRoberto = adminData.properties.moldes1680.reviews.find(
  r => r.guestName === 'Roberto' && r.status === 'pending'
);

if (existingRoberto) {
  console.log('⚠️ Roberto ya tiene una reseña pendiente, actualizando...');
  // Actualizar la reseña existente
  const index = adminData.properties.moldes1680.reviews.findIndex(
    r => r.id === existingRoberto.id
  );
  adminData.properties.moldes1680.reviews[index] = robertoReview;
} else {
  // Agregar nueva reseña
  adminData.properties.moldes1680.reviews.push(robertoReview);
}

// Guardar de vuelta en localStorage
localStorage.setItem('baconfort-admin-data', JSON.stringify(adminData));

console.log('✅ Reseña de Roberto agregada/actualizada exitosamente:');
console.log(`   Nombre: ${robertoReview.guestName}`);
console.log(`   Fecha: ${robertoReview.date}`);
console.log(`   Rating: ${robertoReview.rating} estrellas`);
console.log(`   Estado: ${robertoReview.status}`);
console.log(`   Verificada: ${robertoReview.verified}`);

// Mostrar estadísticas
const reviews = adminData.properties.moldes1680.reviews;
const pending = reviews.filter(r => r.status === 'pending' || (!r.verified && r.isGuestSubmission));
const verified = reviews.filter(r => r.verified);

console.log('\n📊 Resumen actual de reseñas para Moldes 1680:');
console.log(`   Total: ${reviews.length}`);
console.log(`   Pendientes: ${pending.length}`);
console.log(`   Verificadas: ${verified.length}`);

if (pending.length > 0) {
  console.log('\n⏳ Reseñas pendientes:');
  pending.forEach(review => {
    console.log(`   - ${review.guestName} (${review.rating}⭐) - ${review.date}`);
  });
}

console.log('\n🔄 Ahora recarga la página o navega al admin para ver la reseña pendiente');
