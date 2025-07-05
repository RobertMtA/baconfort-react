// Script para verificar qué propiedades existen en el backend
const checkBackendProperties = async () => {
  console.log('🔍 VERIFICANDO PROPIEDADES EN EL BACKEND\n');
  
  try {
    // 1. Listar todas las propiedades
    console.log('1️⃣ CONSULTANDO TODAS LAS PROPIEDADES...');
    const allResponse = await fetch('http://localhost:5000/api/properties');
    
    if (allResponse.ok) {
      const allData = await allResponse.json();
      console.log('✅ Propiedades encontradas:', allData.data?.length || 0);
      
      if (allData.data && allData.data.length > 0) {
        console.log('\n📋 LISTA DE PROPIEDADES:');
        allData.data.forEach((prop, index) => {
          console.log(`${index + 1}. ID: "${prop.id}" | Título: "${prop.title}"`);
        });
      } else {
        console.log('⚠️ No hay propiedades en la base de datos');
      }
    } else {
      console.log('❌ Error consultando propiedades:', allResponse.status);
      return;
    }
    
    console.log('\n');
    
    // 2. Probar IDs específicos que está usando el frontend
    const testIds = ['moldes1680', 'moldes-1680', 'santafe3770', 'santa-fe-3770'];
    
    console.log('2️⃣ PROBANDO IDS ESPECÍFICOS...');
    for (const id of testIds) {
      try {
        const response = await fetch(`http://localhost:5000/api/properties/${id}`);
        const status = response.ok ? '✅ EXISTE' : '❌ NO EXISTE';
        const statusCode = response.status;
        console.log(`${status} - ID: "${id}" (${statusCode})`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`    Título: "${data.data?.title}"`);
        }
      } catch (error) {
        console.log(`❌ ERROR - ID: "${id}" - ${error.message}`);
      }
    }
    
  } catch (error) {
    console.error('💥 ERROR GENERAL:', error.message);
  }
  
  console.log('\n✨ VERIFICACIÓN COMPLETADA');
};

// Ejecutar verificación
checkBackendProperties().catch(console.error);
