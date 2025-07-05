const axios = require('axios');

const departmentIds = [
  'moldes1680',
  'santafe3770', 
  'ugarteche2824',
  'dorrego1548',
  'convencion1994'
];

const departmentNames = {
  'moldes1680': 'Moldes 1680',
  'santafe3770': 'Santa Fe 3770',
  'ugarteche2824': 'Ugarteche 2824', 
  'dorrego1548': 'Dorrego 1548',
  'convencion1994': 'Convencion 1994'
};

async function verifyAmenities() {
  console.log('🔍 Verificando amenities para todos los departamentos...\n');
  
  for (const deptId of departmentIds) {
    try {
      const response = await axios.get(`http://localhost:3000/api/properties/${deptId}`);
      
      if (response.data) {
        console.log(`✅ ${departmentNames[deptId]} (${deptId}):`);
        console.log(`   - Título: ${response.data.title || 'No title'}`);
        console.log(`   - Amenities: ${response.data.amenities ? response.data.amenities.length : 0} encontrados`);
        console.log(`   - Imágenes: ${response.data.images ? response.data.images.length : 0} encontradas`);
        
        if (response.data.amenities && response.data.amenities.length > 0) {
          console.log(`   - Primeros 3 amenities: ${response.data.amenities.slice(0, 3).join(', ')}`);
        }
        console.log('');
      } else {
        console.log(`❌ ${departmentNames[deptId]} (${deptId}): No data received`);
      }
    } catch (error) {
      console.log(`❌ ${departmentNames[deptId]} (${deptId}): Error - ${error.message}`);
    }
  }
  
  console.log('🎯 Verificación completada. Todos los departamentos deberían mostrar amenities dinámicos del backend.');
}

verifyAmenities();
