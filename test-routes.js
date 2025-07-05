// Prueba automatizada de navegación y rutas
const testRoutes = [
  // Rutas legacy (deberían funcionar)
  'http://localhost:3001/moldes1680',
  'http://localhost:3001/santafe3770',
  'http://localhost:3001/dorrego1548',
  'http://localhost:3001/convencion1994',
  'http://localhost:3001/ugarteche2824',
  
  // Rutas nuevas (preferidas)
  'http://localhost:3001/departamentos/moldes-1680',
  'http://localhost:3001/departamentos/santa-fe-3770',
  'http://localhost:3001/departamentos/dorrego-1548',
  'http://localhost:3001/departamentos/convencion-1994',
  'http://localhost:3001/departamentos/ugarteche-2824',
  
  // Otras rutas
  'http://localhost:3001/',
  'http://localhost:3001/admin'
];

async function testRoute(url) {
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    // Verificar que no sea un error 404
    const isNotFound = text.includes('404') || text.includes('Not Found') || text.includes('Oops!');
    
    return {
      url,
      status: response.status,
      ok: response.ok,
      isNotFound,
      success: response.ok && !isNotFound
    };
  } catch (error) {
    return {
      url,
      status: 'ERROR',
      ok: false,
      isNotFound: false,
      success: false,
      error: error.message
    };
  }
}

async function runTests() {
  console.log('🚀 INICIANDO PRUEBAS DE RUTAS...\n');
  
  const results = [];
  
  for (const url of testRoutes) {
    const result = await testRoute(url);
    results.push(result);
    
    const status = result.success ? '✅ ÉXITO' : '❌ FALLO';
    const details = result.success ? 
      `Status: ${result.status}` : 
      `Status: ${result.status} ${result.isNotFound ? '(404 detectado)' : ''} ${result.error || ''}`;
    
    console.log(`${status} - ${url}`);
    console.log(`    ${details}\n`);
  }
  
  // Resumen
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log('📊 RESUMEN DE PRUEBAS:');
  console.log(`✅ Exitosas: ${successful}/${testRoutes.length}`);
  console.log(`❌ Fallidas: ${failed}/${testRoutes.length}`);
  
  if (failed > 0) {
    console.log('\n🔍 RUTAS QUE FALLARON:');
    results.filter(r => !r.success).forEach(r => {
      console.log(`  - ${r.url} (${r.status})`);
    });
  }
  
  console.log('\n✨ PRUEBAS COMPLETADAS');
}

// Ejecutar pruebas
runTests().catch(console.error);
