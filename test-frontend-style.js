const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Simulando datos exactos del frontend con precios como strings
const frontendData = {
  "id": "moldes-1680",
  "title": "Moldes 1680",
  "address": "Moldes 1680, Buenos Aires",
  "prices": {
    "daily": "USD 60",
    "weekly": "USD 250", 
    "monthly": "USD 700",
    "currency": "USD"
  },
  "description": {
    "es": "Exclusivo departamento de dos ambientes en edificio boutique con amenities premium en Belgrano. Diseño moderno, espacios luminosos y todas las comodidades para una estadía perfecta.",
    "en": "Exclusive two-room apartment in a boutique building with premium amenities in Belgrano. Modern design, bright spaces, and all the comforts for a perfect stay.", 
    "pt": "Apartamento exclusivo de dois ambientes em edifício boutique com amenidades premium em Belgrano. Design moderno, espaços luminosos e todas as comodidades para uma estadia perfeita."
  },
  "coverImage": "/img/img-portada-moldes-1680.jpg",
  "heroVideo": "/video/video-portada-moldes-1680.mp4",
  "galleryImages": [
    "/img/img-moldes1.jpg",
    "/img/img-moldes2.jpg",
    "/img/img-moldes3.jpg",
    "/img/img-moldes4.jpg",
    "/img/img-moldes5.jpg",
    "/img/img-moldes6.jpg"
  ]
};

// Función para convertir precios
function transformDataForBackend(data) {
  const backendData = { ...data };
  
  // Convertir precios de strings a números
  if (backendData.prices) {
    const convertPrice = (price) => {
      if (typeof price === 'string') {
        // Extraer solo números del string (ej: "USD 60" -> 60)
        const numMatch = price.match(/\d+/);
        return numMatch ? parseInt(numMatch[0]) : 0;
      }
      return typeof price === 'number' ? price : 0;
    };
    
    backendData.prices = {
      ...backendData.prices,
      daily: convertPrice(backendData.prices.daily),
      weekly: convertPrice(backendData.prices.weekly),
      monthly: convertPrice(backendData.prices.monthly)
    };
  }
  
  return backendData;
}

async function testFrontendStyleUpdate() {
  console.log('🧪 Testing frontend-style update...');
  console.log('📊 Original frontend data:', JSON.stringify(frontendData.prices, null, 2));
  
  const transformedData = transformDataForBackend(frontendData);
  console.log('📊 Transformed backend data:', JSON.stringify(transformedData.prices, null, 2));
  
  try {
    const response = await fetch('http://localhost:5000/api/properties/moldes1680', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      },
      body: JSON.stringify(transformedData)
    });
    
    console.log('📡 Response status:', response.status);
    
    const responseText = await response.text();
    console.log('📡 Response body:', responseText);
    
    if (response.ok) {
      console.log('✅ Frontend-style update successful!');
      try {
        const jsonResponse = JSON.parse(responseText);
        console.log('📊 Updated prices:', jsonResponse.data.prices);
      } catch (e) {
        console.log('⚠️ Response is not valid JSON');
      }
    } else {
      console.log('❌ Frontend-style update failed');
    }
    
  } catch (error) {
    console.error('💥 Error during test:', error.message);
  }
}

testFrontendStyleUpdate();
