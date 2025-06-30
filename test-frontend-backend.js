#!/usr/bin/env node

// Test rápido para verificar la comunicación frontend-backend en el sistema de galería

console.log('🧪 Test de comunicación Frontend-Backend');
console.log('========================================\n');

// Simular fetch del frontend
const testGalleryAPI = async () => {
  try {
    console.log('📤 Frontend: Llamando API /gallery/moldes-1680...');
    
    const response = await fetch('http://localhost:5000/api/gallery/moldes-1680', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log('✅ Backend respondió exitosamente');
    console.log('📊 Respuesta completa:', JSON.stringify(data, null, 2));
    console.log(`🖼️  Cantidad de imágenes: ${data.images?.length || 0}`);
    
    if (data.images && data.images.length > 0) {
      console.log('\n📸 Imágenes encontradas:');
      data.images.forEach((img, index) => {
        console.log(`  ${index + 1}. ${img.title} - ${img.url}`);
      });
      
      console.log('\n🎯 RESULTADO: La API está funcionando correctamente');
      console.log('❓ Si el frontend no muestra las imágenes, el problema está en:');
      console.log('   1. useGallery.js hook');
      console.log('   2. Componente Moldes1680.jsx');
      console.log('   3. Renderizado de React');
    } else {
      console.log('⚠️  No se encontraron imágenes en la base de datos');
    }
    
  } catch (error) {
    console.error('❌ Error en la comunicación:', error.message);
  }
};

// Ejecutar test
testGalleryAPI();
