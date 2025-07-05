const axios = require('axios');

async function testRemoveCochera() {
  try {
    console.log('🔄 Eliminando Cochera Opcional...');
    
    // Primero obtener los amenities actuales
    const getResponse = await axios.get('http://localhost:5000/api/properties/moldes1680');
    const currentAmenities = getResponse.data.data.amenities;
    
    console.log('📋 Amenities actuales:');
    console.log('Departamento:', currentAmenities.departamento.length);
    console.log('Servicios:', currentAmenities.servicios.length);
    console.log('Servicios actuales:', currentAmenities.servicios.map(s => s.text));
    
    // Eliminar "Cochera Opcional" de servicios
    const updatedServicios = currentAmenities.servicios.filter(s => s.text !== 'Cochera Opcional');
    
    console.log('🗑️ Servicios después de eliminar Cochera Opcional:', updatedServicios.map(s => s.text));
    
    // Actualizar usando PUT
    const putResponse = await axios.put('http://localhost:5000/api/properties/moldes1680', {
      amenities: {
        departamento: currentAmenities.departamento,
        servicios: updatedServicios,
        amenitiesEdificio: currentAmenities.amenitiesEdificio
      }
    }, {
      headers: {
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Respuesta PUT:', putResponse.data);
    
    // Verificar que se eliminó
    const verifyResponse = await axios.get('http://localhost:5000/api/properties/moldes1680');
    const newAmenities = verifyResponse.data.data.amenities;
    
    console.log('✅ Verificación:');
    console.log('Servicios después de la actualización:', newAmenities.servicios.map(s => s.text));
    
    const cocheraExists = newAmenities.servicios.some(s => s.text === 'Cochera Opcional');
    console.log('¿Cochera Opcional existe?', cocheraExists);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testRemoveCochera();
