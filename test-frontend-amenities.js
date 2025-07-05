const axios = require('axios');

async function testFrontendAmenities() {
  try {
    console.log('=== PROBANDO AMENITIES FRONTEND ===');
    
    // Simular lo que hace el hook useProperty
    const propertyId = 'moldes-1680';
    const API_BASE_URL = 'http://localhost:5000/api';
    
    console.log(`🔍 Probando propiedad: ${propertyId}`);
    
    // Agregar cache-busting como hace el hook
    const cacheBust = Date.now();
    const url = `${API_BASE_URL}/properties/${propertyId}?_t=${cacheBust}`;
    
    console.log(`🌐 URL de petición: ${url}`);
    
    const response = await axios.get(url, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    if (response.data.success) {
      const property = response.data.data;
      console.log('✅ Propiedad encontrada:', property.id);
      console.log('💰 Precios:', property.prices);
      console.log('🏠 Amenities:', {
        departamento: property.amenities?.departamento?.length || 0,
        servicios: property.amenities?.servicios?.length || 0,
        amenitiesEdificio: property.amenities?.amenitiesEdificio?.length || 0
      });
      
      // Mostrar todas las amenities
      if (property.amenities?.departamento?.length > 0) {
        console.log('\n📋 Amenities Departamento:');
        property.amenities.departamento.forEach((amenity, index) => {
          console.log(`  ${index + 1}. ${amenity.icon} ${amenity.text}`);
        });
      }
      
      if (property.amenities?.servicios?.length > 0) {
        console.log('\n🔧 Servicios:');
        property.amenities.servicios.forEach((amenity, index) => {
          console.log(`  ${index + 1}. ${amenity.icon} ${amenity.text}`);
        });
      }
      
      if (property.amenities?.amenitiesEdificio?.length > 0) {
        console.log('\n🏢 Amenities Edificio:');
        property.amenities.amenitiesEdificio.forEach((amenity, index) => {
          console.log(`  ${index + 1}. ${amenity.icon} ${amenity.text}`);
        });
      }
      
    } else {
      console.log('❌ Error en respuesta:', response.data);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testFrontendAmenities();
