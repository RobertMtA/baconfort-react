// Script para verificar los precios actualizados
// Ejecutar en la consola del navegador en cualquier página

console.log('🔍 Verificando precios actualizados...');

// Obtener datos del localStorage
const data = JSON.parse(localStorage.getItem('baconfort_data') || '{}');

if (data.properties && data.properties.moldes1680) {
  const moldes = data.properties.moldes1680;
  
  console.log('📋 Datos actuales de Moldes 1680:');
  console.log('🏠 Título:', moldes.title);
  console.log('📍 Dirección:', moldes.address);
  console.log('💰 Precios:');
  console.log('  - Mensual:', moldes.prices?.monthly);
  console.log('  - Semanal:', moldes.prices?.weekly);
  console.log('  - Diario:', moldes.prices?.daily);
  
  // Verificar si los precios fueron actualizados
  const expectedPrices = {
    monthly: 'USD 1000',
    weekly: 'USD 250', 
    daily: 'USD 60'
  };
  
  console.log('\n🎯 Verificación de precios esperados:');
  console.log('✅ Mensual:', moldes.prices?.monthly === expectedPrices.monthly ? 'CORRECTO' : 'NECESITA ACTUALIZACIÓN');
  console.log('✅ Semanal:', moldes.prices?.weekly === expectedPrices.weekly ? 'CORRECTO' : 'NECESITA ACTUALIZACIÓN');
  console.log('✅ Diario:', moldes.prices?.daily === expectedPrices.daily ? 'CORRECTO' : 'NECESITA ACTUALIZACIÓN');
  
  if (moldes.prices?.monthly !== expectedPrices.monthly || 
      moldes.prices?.weekly !== expectedPrices.weekly || 
      moldes.prices?.daily !== expectedPrices.daily) {
    console.log('\n⚠️ Los precios no coinciden con los esperados.');
    console.log('💡 Asegúrate de:');
    console.log('1. Haber guardado los cambios en el admin');
    console.log('2. Recargar la página del departamento');
    console.log('3. Verificar que los datos se guardaron en localStorage');
  } else {
    console.log('\n🎉 ¡Todos los precios están actualizados correctamente!');
  }
  
} else {
  console.log('❌ No se encontraron datos de Moldes 1680');
  console.log('💡 Ve al admin y asegúrate de que los datos estén guardados');
}

console.log('\n📝 Para forzar la actualización, puedes ejecutar:');
console.log('window.location.reload();');
