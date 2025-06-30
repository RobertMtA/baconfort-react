// Script simplificado para la consola del navegador
// Agregar reseña pendiente de Roberto

// Crear reseña de Roberto
const robertoReview = {
  id: 'roberto_' + Date.now(),
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

// Obtener datos actuales
let adminData = JSON.parse(localStorage.getItem('baconfort-admin-data') || '{}');

// Asegurar estructura mínima
if (!adminData.properties) adminData.properties = {};
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

// Agregar reseña
adminData.properties.moldes1680.reviews.push(robertoReview);

// Guardar
localStorage.setItem('baconfort-admin-data', JSON.stringify(adminData));

console.log('✅ Reseña de Roberto agregada - recarga la página para verla');
