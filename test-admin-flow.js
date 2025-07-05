// Script para probar el flujo completo de edición de precios
const testAdminPriceFlow = async () => {
  console.log('🔧 PROBANDO FLUJO COMPLETO DE EDICIÓN DE PRECIOS\n');
  
  const propertyId = 'moldes-1680';
  const backendId = 'moldes1680'; // ID que usa el backend
  
  // 1. Verificar estado inicial
  console.log('1️⃣ CONSULTANDO ESTADO INICIAL...');
  try {
    const initialResponse = await fetch(`http://localhost:5000/api/properties/${backendId}`);
    if (initialResponse.ok) {
      const initialData = await initialResponse.json();
      console.log('✅ Estado inicial obtenido');
      console.log('📊 Precios iniciales:', initialData.data?.prices);
    } else {
      console.log('❌ No se pudo obtener estado inicial');
      return;
    }
  } catch (error) {
    console.log('❌ Error consultando estado inicial:', error.message);
    return;
  }
  
  console.log();
  
  // 2. Simular actualización desde admin
  console.log('2️⃣ SIMULANDO ACTUALIZACIÓN DESDE ADMIN...');
  const testUpdate = {
    title: 'Belgrano Family Retreat',
    address: 'Moldes 1680, Buenos Aires',
    prices: {
      monthly: 1350,
      weekly: 420,
      daily: 75
    },
    description: {
      es: 'Departamento actualizado desde admin',
      en: 'Apartment updated from admin',
      pt: 'Apartamento atualizado do admin'
    }
  };
  
  try {
    const updateResponse = await fetch(`http://localhost:5000/api/properties/${backendId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
      },
      body: JSON.stringify(testUpdate)
    });
    
    console.log('📡 Status de actualización:', updateResponse.status);
    
    if (updateResponse.ok) {
      const result = await updateResponse.json();
      console.log('✅ ACTUALIZACIÓN EXITOSA');
      console.log('📊 Precios actualizados:', result.data?.prices);
    } else {
      const errorText = await updateResponse.text();
      console.log('❌ Error en actualización:', errorText);
      return;
    }
  } catch (error) {
    console.log('❌ Error durante actualización:', error.message);
    return;
  }
  
  console.log();
  
  // 3. Verificar persistencia
  console.log('3️⃣ VERIFICANDO PERSISTENCIA...');
  setTimeout(async () => {
    try {
      const verifyResponse = await fetch(`http://localhost:5000/api/properties/${backendId}`);
      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        console.log('✅ Datos verificados');
        console.log('📊 Precios finales:', verifyData.data?.prices);
        
        // Verificar si coinciden
        const finalPrices = verifyData.data?.prices;
        const match = finalPrices?.monthly === testUpdate.prices.monthly &&
                     finalPrices?.weekly === testUpdate.prices.weekly &&
                     finalPrices?.daily === testUpdate.prices.daily;
        
        if (match) {
          console.log('🎉 ÉXITO TOTAL: Los precios se guardaron correctamente');
        } else {
          console.log('⚠️ PROBLEMA: Los precios no coinciden');
          console.log('Esperado:', testUpdate.prices);
          console.log('Actual:', finalPrices);
        }
      } else {
        console.log('❌ Error verificando persistencia');
      }
    } catch (error) {
      console.log('❌ Error en verificación:', error.message);
    }
    
    console.log('\n✨ PRUEBA COMPLETADA');
  }, 1000);
};

// Ejecutar la prueba
testAdminPriceFlow().catch(console.error);
