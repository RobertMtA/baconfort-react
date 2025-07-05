// Script para parsear y mostrar los datos del backend
const response = {
  "success": true,
  "data": {
    "description": {
      "es": "Departamento de prueba actualizado",
      "en": "Updated test apartment",
      "pt": "Apartamento de teste atualizado"
    },
    "amenities": {
      "departamento": [
        {"icon": "fas fa-tv", "text": "Smart TV 55\"", "_id": "6860797630e7d55eae055abc"},
        {"icon": "fas fa-wifi", "text": "WiFi 500MB Fibra Óptica", "_id": "6860797630e7d55eae055abd"},
        {"icon": "fas fa-snowflake", "text": "Aire Acondicionado F/C", "_id": "6860797630e7d55eae055abe"},
        {"icon": "fas fa-door-closed", "text": "Balcón Francés", "_id": "6860797630e7d55eae055abf"},
        {"icon": "fas fa-utensils", "text": "Cocina Completa", "_id": "6860797630e7d55eae055ac0"}
      ],
      "servicios": [
        {"icon": "fas fa-shield-alt", "text": "Seguridad 24hs", "_id": "6860797630e7d55eae055ac1"},
        {"icon": "fas fa-tshirt", "text": "Lavarropas", "_id": "6860797630e7d55eae055ac2"},
        {"icon": "fas fa-concierge-bell", "text": "Portería", "_id": "6860797630e7d55eae055ac3"},
        {"icon": "🧹", "text": "Servicio de Limpieza", "_id": "6867f41b5173f73d45ff20b1"}
      ],
      "amenitiesEdificio": [
        {"icon": "fas fa-dumbbell", "text": "Gimnasio", "_id": "6860797630e7d55eae055ac5"},
        {"icon": "fas fa-swimming-pool", "text": "Piscina", "_id": "6860797630e7d55eae055ac6"},
        {"icon": "fas fa-sun", "text": "Terraza", "_id": "6860797630e7d55eae055ac7"},
        {"icon": "fas fa-users", "text": "SUM", "_id": "6860797630e7d55eae055ac8"}
      ]
    },
    "id": "moldes-1680",
    "title": "Belgrano Family Retreat",
    "updatedAt": "2025-07-05T04:52:22.104Z"
  }
};

console.log('📋 DATOS DEL BACKEND PARA MOLDES-1680:');
console.log('✅ Backend actualizado:', response.data.updatedAt);
console.log('\n📊 AMENITIES EN BACKEND:');
console.log('   🏠 Departamento:', response.data.amenities.departamento.length, 'items');
response.data.amenities.departamento.forEach((amenity, index) => {
  console.log(`      ${index + 1}. ${amenity.text}`);
});

console.log('\n   🛎️ Servicios:', response.data.amenities.servicios.length, 'items');
response.data.amenities.servicios.forEach((amenity, index) => {
  console.log(`      ${index + 1}. ${amenity.text}`);
});

console.log('\n   🏢 Edificio:', response.data.amenities.amenitiesEdificio.length, 'items');
response.data.amenities.amenitiesEdificio.forEach((amenity, index) => {
  console.log(`      ${index + 1}. ${amenity.text}`);
});

console.log('\n🎯 PROBLEMA IDENTIFICADO:');
console.log('   • El backend TIENE las comodidades actualizadas');
console.log('   • El frontend NO está mostrando los datos del backend');
console.log('   • Hay un problema de sincronización frontend-backend');
console.log('\n🔧 SOLUCIÓN:');
console.log('   • Verificar useProperty.js está cargando datos dinámicamente');
console.log('   • Asegurar que no hay cache bloqueando los datos');
console.log('   • Verificar que el frontend llama a la API correcta');
