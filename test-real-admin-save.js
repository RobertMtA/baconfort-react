const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testRealAdminSave() {
  console.log('🧪 Testing real admin save simulation...');
  
  // Simular exactamente lo que hace el frontend
  const propertyId = 'moldes-1680';
  
  const idMap = {
    'moldes-1680': 'moldes-1680',
    'santa-fe-3770': 'santafe3770', 
    'dorrego-1548': 'dorrego1548',
    'convencion-1994': 'convencion1994',
    'ugarteche-2824': 'ugarteche2824'
  };
  
  const backendId = idMap[propertyId] || propertyId;
  console.log('🔄 Mapeando ID:', propertyId, '→', backendId);
  
  // Datos como los envía el frontend
  const formData = {
    id: "moldes-1680",
    title: "Moldes 1680 - EDITADO DESDE ADMIN",
    address: "Moldes 1680, Buenos Aires",
    prices: {
      daily: "USD 70",  // Cambio el precio para probar
      weekly: "USD 280",
      monthly: "USD 800",
      currency: "USD"
    },
    description: {
      es: "Exclusivo departamento de dos ambientes en edificio boutique con amenities premium en Belgrano. Diseño moderno, espacios luminosos y todas las comodidades para una estadía perfecta. EDITADO DESDE ADMIN.",
      en: "Exclusive two-room apartment in a boutique building with premium amenities in Belgrano. Modern design, bright spaces, and all the comforts for a perfect stay. EDITED FROM ADMIN.",
      pt: "Apartamento exclusivo de dois ambientes em edifício boutique com amenidades premium em Belgrano. Design moderno, espaços luminosos e todas as comodidades para uma estadia perfeita. EDITADO DO ADMIN."
    },
    coverImage: "/img/img-portada-moldes-1680.jpg",
    heroVideo: "/video/video-portada-moldes-1680.mp4",
    galleryImages: [
      "/img/img-moldes1.jpg",
      "/img/img-moldes2.jpg",
      "/img/img-moldes3.jpg"
    ]
  };
  
  // Transformar datos como hace el frontend
  const backendData = { ...formData };
  
  if (backendData.prices) {
    const convertPrice = (price) => {
      if (typeof price === 'string') {
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
  
  console.log('📊 Datos transformados:', {
    id: backendData.id,
    title: backendData.title,
    prices: backendData.prices
  });
  
  try {
    const response = await fetch(`http://localhost:5000/api/properties/${backendId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      },
      body: JSON.stringify(backendData)
    });
    
    console.log('📡 Response status:', response.status);
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Admin save successful!');
      console.log('📊 Updated property:', {
        id: result.data.id,
        title: result.data.title,
        prices: result.data.prices
      });
      
      // Verificar que los cambios se aplicaron
      console.log('\n🔍 Verificando cambios...');
      const checkResponse = await fetch(`http://localhost:5000/api/properties/${backendId}`);
      if (checkResponse.ok) {
        const checkData = await checkResponse.json();
        console.log('✅ Changes verified:', {
          title: checkData.data.title,
          prices: checkData.data.prices
        });
      }
      
    } else {
      const errorText = await response.text();
      console.error('❌ Admin save failed:', errorText);
    }
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

testRealAdminSave();
