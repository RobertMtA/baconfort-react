// Script de debug para verificar datos en localStorage
console.log('🔍 DEBUG: Verificando datos en localStorage...');

const savedData = localStorage.getItem('baconfort_data');
if (savedData) {
  try {
    const data = JSON.parse(savedData);
    console.log('✅ Datos encontrados en localStorage');
    console.log('🏢 Propiedades disponibles:', Object.keys(data.properties));
    
    // Verificar amenities de cada propiedad
    Object.entries(data.properties).forEach(([id, property]) => {
      console.log(`🏠 ${id}:`, {
        title: property.title,
        amenities: property.amenities ? Object.keys(property.amenities) : 'No amenities'
      });
    });
    
    // Verificar amenities específicas de Moldes1680
    if (data.properties.moldes1680?.amenities) {
      console.log('🎯 Amenities de Moldes1680:', data.properties.moldes1680.amenities);
    }
    
  } catch (error) {
    console.error('❌ Error parsing localStorage data:', error);
  }
} else {
  console.log('❌ No hay datos en localStorage');
}

// Función para resetear datos
window.debugResetData = () => {
  localStorage.removeItem('baconfort_data');
  console.log('🔄 Datos resetados');
  location.reload();
};

console.log('💡 Ejecuta debugResetData() para resetear datos');
