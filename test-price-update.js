// Script de prueba para verificar actualización de precios
const testPriceUpdate = async () => {
  console.log('🧪 INICIANDO PRUEBA DE ACTUALIZACIÓN DE PRECIOS\n');
  
  const propertyId = 'moldes-1680';
  const testPrices = {
    title: 'Belgrano Family Retreat',
    address: 'Moldes 1680, Buenos Aires',
    prices: {
      monthly: 1500,
      weekly: 450,
      daily: 80
    },
    description: {
      es: 'Departamento de prueba actualizado',
      en: 'Updated test apartment',
      pt: 'Apartamento de teste atualizado'
    }
  };
  
  console.log('📊 DATOS DE PRUEBA:');
  console.log('Property ID:', propertyId);
  console.log('Precios:', testPrices.prices);
  console.log();
  
  try {
    // 1. Verificar propiedad actual
    console.log('1️⃣ CONSULTANDO PROPIEDAD ACTUAL...');
    const getCurrentResponse = await fetch(`http://localhost:5000/api/properties/${propertyId}`);
    
    if (getCurrentResponse.ok) {
      const currentData = await getCurrentResponse.json();
      console.log('✅ Propiedad encontrada');
      console.log('📋 Precios actuales:', currentData.data?.prices);
    } else {
      console.log('❌ Propiedad no encontrada');
      return;
    }
    
    console.log();
    
    // 2. Intentar actualizar
    console.log('2️⃣ ACTUALIZANDO PRECIOS...');
    const updateResponse = await fetch(`http://localhost:5000/api/properties/${propertyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      },
      body: JSON.stringify(testPrices)
    });
    
    console.log('📡 Response status:', updateResponse.status);
    
    if (updateResponse.ok) {
      const updateResult = await updateResponse.json();
      console.log('✅ ACTUALIZACIÓN EXITOSA');
      console.log('📊 Nuevos precios:', updateResult.data?.prices);
    } else {
      const errorText = await updateResponse.text();
      console.log('❌ ERROR EN ACTUALIZACIÓN');
      console.log('💬 Error:', errorText);
      return;
    }
    
    console.log();
    
    // 3. Verificar cambios
    console.log('3️⃣ VERIFICANDO CAMBIOS...');
    const verifyResponse = await fetch(`http://localhost:5000/api/properties/${propertyId}`);
    
    if (verifyResponse.ok) {
      const verifyData = await verifyResponse.json();
      console.log('✅ Verificación exitosa');
      console.log('📊 Precios verificados:', verifyData.data?.prices);
      
      // Comparar precios
      const updatedPrices = verifyData.data?.prices;
      const success = updatedPrices?.monthly === testPrices.prices.monthly &&
                     updatedPrices?.weekly === testPrices.prices.weekly &&
                     updatedPrices?.daily === testPrices.prices.daily;
      
      if (success) {
        console.log('🎉 PRUEBA EXITOSA: Los precios se actualizaron correctamente');
      } else {
        console.log('⚠️ PROBLEMA: Los precios no coinciden');
        console.log('Esperado:', testPrices.prices);
        console.log('Obtenido:', updatedPrices);
      }
    } else {
      console.log('❌ Error verificando cambios');
    }
    
  } catch (error) {
    console.error('💥 ERROR EN PRUEBA:', error.message);
  }
  
  console.log('\n✨ PRUEBA COMPLETADA');
};

// Ejecutar prueba
testPriceUpdate().catch(console.error);
