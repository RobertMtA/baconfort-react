const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function checkBackendIds() {
  console.log('🔍 Verificando IDs disponibles en el backend...');
  
  try {
    const response = await fetch('http://localhost:5000/api/properties');
    const data = await response.json();
    
    console.log('📊 Propiedades encontradas en backend:');
    data.data.forEach(property => {
      console.log(`- Backend ID: "${property.id}", Title: "${property.title}"`);
    });
    
    // Verificar específicamente los IDs que está intentando usar el frontend
    const frontendToBackendMap = {
      'moldes-1680': 'moldes1680',
      'santa-fe-3770': 'santafe3770', 
      'dorrego-1548': 'dorrego1548',
      'convencion-1994': 'convencion1994',
      'ugarteche-2824': 'ugarteche2824'
    };
    
    console.log('\n🔄 Verificando mapeo frontend → backend:');
    for (const [frontendId, mappedBackendId] of Object.entries(frontendToBackendMap)) {
      const exists = data.data.some(p => p.id === mappedBackendId);
      console.log(`${frontendId} → ${mappedBackendId}: ${exists ? '✅ EXISTE' : '❌ NO EXISTE'}`);
    }
    
    console.log('\n📋 Mapeo correcto debería ser:');
    const availableIds = data.data.map(p => p.id);
    console.log('Frontend → Backend:');
    console.log(`'moldes-1680': '${availableIds.find(id => id.includes('moldes')) || 'NOT_FOUND'}',`);
    console.log(`'santa-fe-3770': '${availableIds.find(id => id.includes('santafe') || id.includes('santa')) || 'NOT_FOUND'}',`);
    console.log(`'dorrego-1548': '${availableIds.find(id => id.includes('dorrego')) || 'NOT_FOUND'}',`);
    console.log(`'convencion-1994': '${availableIds.find(id => id.includes('convencion')) || 'NOT_FOUND'}',`);
    console.log(`'ugarteche-2824': '${availableIds.find(id => id.includes('ugarteche')) || 'NOT_FOUND'}',`);
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

checkBackendIds();
