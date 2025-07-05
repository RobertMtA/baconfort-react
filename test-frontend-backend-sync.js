// Test: Verificar comunicación frontend-backend para moldes-1680
// Fecha: 2024-01-17
// Objetivo: Diagnosticar por qué el frontend no muestra datos actualizados

async function testFrontendBackendSync() {
  console.log('🔍 TESTING: Verificando comunicación frontend-backend para moldes-1680...\n');
  
  try {
    // 1. Verificar que el backend está corriendo
    console.log('1️⃣ Verificando backend...');
    const backendTest = await fetch('http://localhost:5000/api/properties/moldes-1680', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    const backendData = await backendTest.json();
    console.log('✅ Backend respondió correctamente');
    console.log('📊 Amenities en backend:', {
      departamento: backendData.data.amenities.departamento.length,
      servicios: backendData.data.amenities.servicios.length,
      amenitiesEdificio: backendData.data.amenities.amenitiesEdificio.length
    });
    
    // 2. Verificar que el frontend está llamando a la API correcta
    console.log('\n2️⃣ Verificando configuración de API...');
    const apiUrl = 'http://localhost:5000/api';
    console.log('🔧 API URL:', apiUrl);
    
    // 3. Simular la llamada que hace el frontend
    console.log('\n3️⃣ Simulando llamada del frontend...');
    const frontendCall = await fetch(`${apiUrl}/properties/moldes-1680?_t=${Date.now()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    const frontendData = await frontendCall.json();
    console.log('✅ Llamada frontend exitosa');
    
    // 4. Comparar datos
    console.log('\n4️⃣ Comparando datos...');
    const backendAmenities = backendData.data.amenities;
    const frontendAmenities = frontendData.data.amenities;
    
    console.log('📋 Comparación de amenities:');
    console.log(`   Backend departamento: ${backendAmenities.departamento.length} items`);
    console.log(`   Frontend departamento: ${frontendAmenities.departamento.length} items`);
    console.log(`   ✅ Coinciden: ${backendAmenities.departamento.length === frontendAmenities.departamento.length}`);
    
    // 5. Verificar timestamp de actualización
    console.log('\n5️⃣ Verificando timestamps...');
    console.log('🕐 Backend updatedAt:', backendData.data.updatedAt);
    console.log('🕐 Frontend updatedAt:', frontendData.data.updatedAt);
    
    console.log('\n🎯 DIAGNÓSTICO:');
    if (backendData.data.updatedAt === frontendData.data.updatedAt) {
      console.log('✅ Los datos están sincronizados');
      console.log('🔍 El problema puede estar en:');
      console.log('   • Cache del navegador');
      console.log('   • Datos fallback siendo usados');
      console.log('   • Hook useProperty no actualizando correctamente');
    } else {
      console.log('❌ Los datos NO están sincronizados');
      console.log('🔧 Verificar la base de datos y las conexiones');
    }
    
  } catch (error) {
    console.error('❌ Error en el test:', error.message);
    console.log('\n🔧 POSIBLES CAUSAS:');
    console.log('   • Backend no está corriendo');
    console.log('   • Problema de CORS');
    console.log('   • Puerto incorrecto');
    console.log('   • Configuración de red');
  }
}

// Ejecutar test
testFrontendBackendSync();
