const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Datos de prueba simulando lo que envía el frontend
const testData = {
  title: 'Test Property Update',
  address: 'Test Address',
  prices: {
    monthly: 1500,
    weekly: 400,
    daily: 80
  },
  description: {
    es: 'Descripción en español',
    en: 'Description in English', 
    pt: 'Descrição em português'
  },
  coverImage: '/img/test-cover.jpg',
  heroVideo: '',
  galleryImages: ['/img/gallery1.jpg', '/img/gallery2.jpg']
};

async function testPropertyUpdate() {
  console.log('🧪 Testing property update...');
  console.log('📊 Test data:', JSON.stringify(testData, null, 2));
  
  try {
    const response = await fetch('http://localhost:5000/api/properties/moldes1680', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      },
      body: JSON.stringify(testData)
    });
    
    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📡 Response body:', responseText);
    
    if (response.ok) {
      console.log('✅ Update successful!');
      try {
        const jsonResponse = JSON.parse(responseText);
        console.log('📊 Parsed response:', jsonResponse);
      } catch (e) {
        console.log('⚠️ Response is not valid JSON');
      }
    } else {
      console.log('❌ Update failed');
    }
    
  } catch (error) {
    console.error('💥 Error during test:', error.message);
    console.error('💥 Full error:', error);
  }
}

testPropertyUpdate();
