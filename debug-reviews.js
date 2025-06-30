// Script de debug para verificar la funcionalidad de reseñas
console.log('🔍 DEBUG REVIEWS: Iniciando verificación...');

// Verificar localStorage
const adminData = localStorage.getItem('baconfort_admin_data');
console.log('🔍 localStorage existe:', !!adminData);

if (adminData) {
  try {
    const parsedData = JSON.parse(adminData);
    console.log('🔍 Datos parseados correctamente');
    console.log('🔍 Propiedades disponibles:', Object.keys(parsedData.properties || {}));
    
    // Verificar estructura de reviews para cada propiedad
    Object.entries(parsedData.properties || {}).forEach(([id, property]) => {
      console.log(`🔍 Propiedad ${id}:`);
      console.log(`  - Título: ${property.title}`);
      console.log(`  - Reviews existe: ${!!property.reviews}`);
      console.log(`  - Cantidad de reviews: ${(property.reviews || []).length}`);
      
      if (property.reviews && property.reviews.length > 0) {
        console.log(`  - Primera review:`, property.reviews[0]);
      }
    });
    
  } catch (error) {
    console.error('🔍 Error parseando datos:', error);
  }
} else {
  console.log('🔍 No hay datos en localStorage');
}

// Verificar si la página está lista
document.addEventListener('DOMContentLoaded', () => {
  console.log('🔍 DOM loaded');
  
  // Verificar componentes React (después de un delay para que se monten)
  setTimeout(() => {
    const reviewManagerElement = document.querySelector('.review-manager');
    console.log('🔍 ReviewManager encontrado:', !!reviewManagerElement);
    
    if (reviewManagerElement) {
      const inputs = reviewManagerElement.querySelectorAll('input, textarea, select');
      console.log('🔍 Inputs encontrados:', inputs.length);
      
      inputs.forEach((input, index) => {
        console.log(`🔍 Input ${index}:`, {
          type: input.type || input.tagName,
          disabled: input.disabled,
          readOnly: input.readOnly,
          value: input.value
        });
      });
    }
  }, 2000);
});
