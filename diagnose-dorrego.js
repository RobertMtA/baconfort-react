// Script para diagnosticar el problema con Dorrego1548
async function testDorrego1548() {
  console.log('🔍 Diagnosticando Dorrego1548...\n');

  try {
    // Test 1: Verificar respuesta directa del backend
    console.log('Test 1: Probando backend directamente...');
    const backendResponse = await fetch('http://localhost:5000/api/properties/dorrego1548', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      }
    });
    
    if (backendResponse.ok) {
      const data = await backendResponse.json();
      console.log('✅ Backend responde correctamente');
      console.log(`   - Amenities departamento: ${data.data.amenities.departamento.length}`);
      console.log(`   - Amenities servicios: ${data.data.amenities.servicios.length}`);
      console.log(`   - Amenities edificio: ${data.data.amenities.amenitiesEdificio.length}`);
    } else {
      console.log('❌ Backend no responde');
    }

    // Test 2: Verificar API del frontend
    console.log('\nTest 2: Probando API del frontend...');
    const frontendResponse = await fetch('http://localhost:3000/api/properties/dorrego1548');
    console.log(`Frontend API status: ${frontendResponse ? frontendResponse.status : 'No disponible'}`);

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testDorrego1548();
