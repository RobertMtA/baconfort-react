// Script para agregar una reseña pendiente para Roberto del 27/6/2025
// Este script simula lo que haría GuestReviewForm

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simular localStorage leyendo del archivo si existe
const localStorageFile = path.join(__dirname, 'localStorage-simulation.json');

function getLocalStorageData() {
  try {
    if (fs.existsSync(localStorageFile)) {
      const fileContent = fs.readFileSync(localStorageFile, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error leyendo simulación de localStorage:', error);
  }
  return null;
}

function saveLocalStorageData(data) {
  try {
    fs.writeFileSync(localStorageFile, JSON.stringify(data, null, 2), 'utf8');
    console.log('✅ Datos guardados en simulación de localStorage');
  } catch (error) {
    console.error('❌ Error guardando simulación de localStorage:', error);
  }
}

// Datos base si no existe localStorage
const baseData = {
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
      reviews: [
        {
          id: '1',
          guestName: 'María González',
          rating: 5,
          comment: 'Excelente departamento, muy bien ubicado y con todas las comodidades.',
          date: '2025-05-15',
          verified: true,
          highlight: true,
          createdAt: '2025-05-16T10:00:00.000Z'
        }
      ]
    }
  }
};

console.log('🔍 Agregando reseña pendiente de Roberto...');

// Obtener datos actuales o usar base
let currentData = getLocalStorageData() || baseData;

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

// Agregar la reseña a moldes1680
if (!currentData.properties.moldes1680.reviews) {
  currentData.properties.moldes1680.reviews = [];
}

currentData.properties.moldes1680.reviews.push(robertoReview);

// Guardar los datos actualizados
saveLocalStorageData(currentData);

console.log('✅ Reseña de Roberto agregada exitosamente:');
console.log(`   Nombre: ${robertoReview.guestName}`);
console.log(`   Fecha: ${robertoReview.date}`);
console.log(`   Rating: ${robertoReview.rating} estrellas`);
console.log(`   Estado: ${robertoReview.status}`);
console.log(`   Verificada: ${robertoReview.verified}`);
console.log('\n📊 Resumen actual de reseñas para Moldes 1680:');

const reviews = currentData.properties.moldes1680.reviews;
const pending = reviews.filter(r => r.status === 'pending' || (!r.verified && r.isGuestSubmission));
const verified = reviews.filter(r => r.verified);

console.log(`   Total: ${reviews.length}`);
console.log(`   Pendientes: ${pending.length}`);
console.log(`   Verificadas: ${verified.length}`);

if (pending.length > 0) {
  console.log('\n⏳ Reseñas pendientes:');
  pending.forEach(review => {
    console.log(`   - ${review.guestName} (${review.rating}⭐) - ${review.date}`);
  });
}
