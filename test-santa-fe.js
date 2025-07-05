const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testSantaFe3770() {
  console.log('🧪 Testing Santa Fe 3770 mapping...');
  
  try {
    // Verificar que existe en backend
    const response = await fetch('http://localhost:5000/api/properties/santa-fe-3770');
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Santa Fe 3770 found in backend:');
      console.log(`- ID: ${data.data.id}`);
      console.log(`- Title: ${data.data.title}`);
      console.log(`- Prices:`, data.data.prices);
    } else {
      console.log('❌ Santa Fe 3770 not found in backend:', data.error);
    }
    
    // Probar update
    console.log('\n🔄 Testing update...');
    const updateData = {
      id: "santa-fe-3770",
      title: "Santa Fe 3770 - TEST UPDATE",
      prices: {
        daily: 80,
        weekly: 300,
        monthly: 900
      }
    };
    
    const updateResponse = await fetch('http://localhost:5000/api/properties/santa-fe-3770', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      },
      body: JSON.stringify(updateData)
    });
    
    if (updateResponse.ok) {
      const updateResult = await updateResponse.json();
      console.log('✅ Update successful:', updateResult.data.title);
    } else {
      const errorText = await updateResponse.text();
      console.log('❌ Update failed:', errorText);
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

testSantaFe3770();
