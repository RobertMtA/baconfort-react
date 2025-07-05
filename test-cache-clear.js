// Script para limpiar cache y verificar datos
const axios = require('axios');

async function clearCacheAndTest() {
  try {
    console.log('=== LIMPIANDO CACHE Y VERIFICANDO DATOS ===');
    
    // Simular limpieza de cache como hace el navegador
    const timestamp = Date.now();
    
    const properties = [
      'moldes-1680',
      'santa-fe-3770', 
      'dorrego-1548',
      'convencion-1994',
      'ugarteche-2824'
    ];
    
    for (const propertyId of properties) {
      console.log(`\n🔄 Verificando ${propertyId}...`);
      
      const url = `http://localhost:5000/api/properties/${propertyId}?_t=${timestamp}`;
      
      try {
        const response = await axios.get(url, {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        
        if (response.data.success) {
          const property = response.data.data;
          console.log('✅ Propiedad:', property.id);
          console.log('💰 Precios actuales:', {
            daily: property.prices.daily,
            weekly: property.prices.weekly,
            monthly: property.prices.monthly,
            currency: property.prices.currency
          });
          
          const amenitiesCount = {
            departamento: property.amenities?.departamento?.length || 0,
            servicios: property.amenities?.servicios?.length || 0,
            amenitiesEdificio: property.amenities?.amenitiesEdificio?.length || 0
          };
          
          console.log('🏠 Amenities count:', amenitiesCount);
          
          // Mostrar primera amenity de cada categoría como ejemplo
          if (property.amenities?.departamento?.[0]) {
            console.log('📋 Ejemplo dep.:', property.amenities.departamento[0].text);
          }
          if (property.amenities?.servicios?.[0]) {
            console.log('🔧 Ejemplo serv.:', property.amenities.servicios[0].text);
          }
          if (property.amenities?.amenitiesEdificio?.[0]) {
            console.log('🏢 Ejemplo edif.:', property.amenities.amenitiesEdificio[0].text);
          }
          
        } else {
          console.log('❌ Error en respuesta:', response.data);
        }
      } catch (error) {
        console.log('❌ Error obteniendo propiedad:', error.message);
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

clearCacheAndTest();
