/**
 * Script para verificar las comodidades en el backend
 */

const http = require('http');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          reject(error);
        }
      });
    });
    req.on('error', reject);
  });
}

async function verifyBackendAmenities() {
  console.log('🔍 Verificando comodidades en el backend...\n');
  
  try {
    // Verificar cada propiedad
    const propertyIds = ['moldes-1680', 'santa-fe-3770', 'dorrego-1548', 'convencion-1994', 'ugarteche-2824'];
    
    for (const propertyId of propertyIds) {
      try {
        console.log(`📋 Verificando ${propertyId}...`);
        const response = await makeRequest(`http://localhost:5000/api/properties/${propertyId}`);
        
        if (response.success && response.data) {
          const property = response.data;
          const amenities = property.amenities;
          
          if (amenities) {
            console.log(`✅ ${propertyId} tiene comodidades:`);
            
            // Verificar cada categoría
            if (amenities.departamento) {
              console.log(`  • Departamento: ${amenities.departamento.length} comodidades`);
              amenities.departamento.forEach((amenity, index) => {
                console.log(`    ${index + 1}. ${amenity.text} (${amenity.icon})`);
              });
            }
            
            if (amenities.servicios) {
              console.log(`  • Servicios: ${amenities.servicios.length} comodidades`);
              amenities.servicios.forEach((amenity, index) => {
                console.log(`    ${index + 1}. ${amenity.text} (${amenity.icon})`);
              });
            }
            
            if (amenities.amenitiesEdificio) {
              console.log(`  • Amenities del Edificio: ${amenities.amenitiesEdificio.length} comodidades`);
              amenities.amenitiesEdificio.forEach((amenity, index) => {
                console.log(`    ${index + 1}. ${amenity.text} (${amenity.icon})`);
              });
            }
            
            console.log('');
          } else {
            console.log(`❌ ${propertyId} no tiene comodidades definidas`);
          }
        } else {
          console.log(`❌ No se pudo obtener datos para ${propertyId}`);
        }
      } catch (error) {
        console.log(`❌ Error al verificar ${propertyId}: ${error.message}`);
      }
    }
    
    console.log('🔧 Si no hay comodidades en el backend, necesitas:');
    console.log('1. Verificar que el backend esté funcionando');
    console.log('2. Verificar que las propiedades tengan comodidades en la base de datos');
    console.log('3. Verificar que el endpoint /api/properties/:id devuelva las comodidades');
    
  } catch (error) {
    console.log('❌ Error general:', error.message);
  }
}

verifyBackendAmenities();
