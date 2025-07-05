const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function checkProperties() {
  console.log('🔍 Checking available properties...');
  
  try {
    const response = await fetch('http://localhost:5000/api/properties');
    const data = await response.json();
    
    console.log('📊 Properties found:', data.data.length);
    
    data.data.forEach(property => {
      console.log(`- ID: ${property.id}, Title: ${property.title}`);
    });
    
    // Verificar propiedad específica
    console.log('\n🎯 Checking moldes1680 specifically...');
    const moldesResponse = await fetch('http://localhost:5000/api/properties/moldes1680');
    const moldesData = await moldesResponse.json();
    
    if (moldesResponse.ok) {
      console.log('✅ moldes1680 found:', moldesData.data.title);
      console.log('💰 Current prices:', moldesData.data.prices);
    } else {
      console.log('❌ moldes1680 not found:', moldesData.error);
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

checkProperties();
