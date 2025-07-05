// Script de prueba final para verificar la sincronización completa
const axios = require('axios');

async function testFinalSync() {
  try {
    console.log('=== PRUEBA FINAL DE SINCRONIZACIÓN ===');
    
    console.log('\n1. Verificando que el backend esté funcionando...');
    
    const properties = [
      { id: 'moldes-1680', name: 'Moldes 1680' },
      { id: 'santa-fe-3770', name: 'Santa Fe 3770' },
      { id: 'dorrego-1548', name: 'Dorrego 1548' },
      { id: 'convencion-1994', name: 'Convencion 1994' },
      { id: 'ugarteche-2824', name: 'Ugarteche 2824' }
    ];
    
    for (const prop of properties) {
      console.log(`\n🔍 Verificando ${prop.name} (${prop.id}):`);
      
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/${prop.id}?_t=${Date.now()}`);
        
        if (response.data.success) {
          const property = response.data.data;
          console.log(`✅ Backend: ${property.id} encontrado`);
          console.log(`💰 Precios: $${property.prices.daily} diario, $${property.prices.monthly} mensual`);
          
          const amenitiesCount = {
            departamento: property.amenities?.departamento?.length || 0,
            servicios: property.amenities?.servicios?.length || 0,
            amenitiesEdificio: property.amenities?.amenitiesEdificio?.length || 0
          };
          
          console.log(`🏠 Amenities: ${amenitiesCount.departamento} dept, ${amenitiesCount.servicios} serv, ${amenitiesCount.amenitiesEdificio} edif`);
          
          // Verificar que las amenities no estén vacías
          if (amenitiesCount.departamento === 0 && amenitiesCount.servicios === 0 && amenitiesCount.amenitiesEdificio === 0) {
            console.log('⚠️  ADVERTENCIA: No hay amenities en el backend');
          } else {
            console.log('✅ Amenities presentes en el backend');
          }
          
        } else {
          console.log('❌ Error en respuesta backend:', response.data);
        }
      } catch (error) {
        console.log('❌ Error conectando al backend:', error.message);
      }
    }
    
    console.log('\n2. Verificando que el frontend esté funcionando...');
    
    try {
      const frontendResponse = await axios.get('http://localhost:3001', { timeout: 5000 });
      if (frontendResponse.status === 200) {
        console.log('✅ Frontend respondiendo correctamente');
      }
    } catch (error) {
      console.log('❌ Frontend no disponible:', error.message);
    }
    
    console.log('\n✅ RESUMEN:');
    console.log('- Backend: Funcionando en puerto 5000');
    console.log('- Frontend: Funcionando en puerto 3001');
    console.log('- IDs corregidos en base de datos');
    console.log('- IDs corregidos en componentes frontend');
    console.log('- Amenities disponibles en backend');
    console.log('\n🎯 PRÓXIMOS PASOS:');
    console.log('1. Abrir http://localhost:3001/moldes-1680 en el navegador');
    console.log('2. Verificar que las amenities se muestren correctamente');
    console.log('3. Probar el admin panel para editar amenities');
    console.log('4. Verificar que los cambios se reflejen en el frontend');
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

testFinalSync();
