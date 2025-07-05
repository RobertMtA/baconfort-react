const axios = require('axios');

async function testAddAmenity() {
  try {
    console.log('🔄 Agregando nuevo amenity...');
    
    // Primero obtener los amenities actuales
    const getResponse = await axios.get('http://localhost:5000/api/properties/moldes1680');
    const currentAmenities = getResponse.data.data.amenities;
    
    console.log('📋 Amenities actuales:');
    console.log('Departamento:', currentAmenities.departamento.length);
    console.log('Servicios:', currentAmenities.servicios.length);
    console.log('Servicios actuales:', currentAmenities.servicios.map(s => s.text));
    
    // Agregar nuevo amenity "Servicio de Limpieza"
    const newServicios = [...currentAmenities.servicios, {
      icon: '🧹',
      text: 'Servicio de Limpieza'
    }];
    
    console.log('➕ Servicios después de agregar:', newServicios.map(s => s.text));
    
    // Actualizar usando PUT
    const putResponse = await axios.put('http://localhost:5000/api/properties/moldes1680', {
      amenities: {
        departamento: currentAmenities.departamento,
        servicios: newServicios,
        amenitiesEdificio: currentAmenities.amenitiesEdificio
      }
    }, {
      headers: {
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Respuesta PUT:', putResponse.data.success);
    
    // Verificar que se agregó
    const verifyResponse = await axios.get('http://localhost:5000/api/properties/moldes1680');
    const newAmenities = verifyResponse.data.data.amenities;
    
    console.log('✅ Verificación:');
    console.log('Servicios después de la actualización:', newAmenities.servicios.map(s => s.text));
    
    const limpiezaExists = newAmenities.servicios.some(s => s.text === 'Servicio de Limpieza');
    console.log('¿Servicio de Limpieza existe?', limpiezaExists);
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

testAddAmenity();
