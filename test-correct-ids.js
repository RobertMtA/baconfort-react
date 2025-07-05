// Script para probar la actualización de precios con IDs correctos
const testCorrectPriceUpdate = async () => {
  console.log('🧪 PROBANDO ACTUALIZACIÓN CON IDS CORRECTOS\n');
  
  const propertyId = 'moldes-1680'; // ID real en la BD
  const newPrices = {
    title: 'Belgrano Family Retreat',
    address: 'Moldes 1680, Buenos Aires',
    prices: {
      monthly: 1400,
      weekly: 430,
      daily: 85
    }
  };
  
  console.log('📊 DATOS DE PRUEBA:');
  console.log('Property ID:', propertyId);
  console.log('Nuevos precios:', newPrices.prices);
  console.log();
  
  try {
    // 1. Verificar que la propiedad existe
    console.log('1️⃣ VERIFICANDO QUE LA PROPIEDAD EXISTE...');
    const checkResponse = await fetch(`http://localhost:5000/api/properties/${propertyId}`);
    
    if (checkResponse.ok) {
      const currentData = await checkResponse.json();
      console.log('✅ Propiedad encontrada');
      console.log('📋 Precios actuales:', currentData.data?.prices);
    } else {
      console.log('❌ Propiedad NO encontrada - Status:', checkResponse.status);
      return;
    }
    
    console.log();
    
    // 2. Actualizar precios
    console.log('2️⃣ ACTUALIZANDO PRECIOS...');
    const updateResponse = await fetch(`http://localhost:5000/api/properties/${propertyId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      },
      body: JSON.stringify(newPrices)
    });
    
    console.log('📡 Status de respuesta:', updateResponse.status);
    
    if (updateResponse.ok) {
      const result = await updateResponse.json();
      console.log('✅ ACTUALIZACIÓN EXITOSA');
      console.log('📊 Precios actualizados:', result.data?.prices);
    } else {
      const errorText = await updateResponse.text();
      console.log('❌ ERROR EN ACTUALIZACIÓN');
      console.log('📝 Detalles:', errorText);
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
      
      // Comprobar que los precios coinciden
      const updatedPrices = verifyData.data?.prices;
      const success = updatedPrices?.monthly === newPrices.prices.monthly &&
                     updatedPrices?.weekly === newPrices.prices.weekly &&
                     updatedPrices?.daily === newPrices.prices.daily;
      
      if (success) {
        console.log('🎉 ÉXITO TOTAL: Los precios se guardaron correctamente');
      } else {
        console.log('⚠️ PROBLEMA: Los precios no coinciden');
        console.log('Esperado:', newPrices.prices);
        console.log('Actual:', updatedPrices);
      }
    } else {
      console.log('❌ Error en verificación');
    }
    
  } catch (error) {
    console.error('💥 ERROR:', error.message);
  }
  
  console.log('\n✨ PRUEBA COMPLETADA');
};

// Ejecutar prueba
testCorrectPriceUpdate().catch(console.error);
