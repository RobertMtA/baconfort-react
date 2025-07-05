// Script para verificar que todas las rutas de imágenes estén correctas
const fs = require('fs');

const departments = [
  { file: 'Moldes1680.jsx', name: 'Moldes 1680' },
  { file: 'SantaFe3770.jsx', name: 'Santa Fe 3770' },
  { file: 'Ugarteche2824.jsx', name: 'Ugarteche 2824' },
  { file: 'Dorrego1548.jsx', name: 'Dorrego 1548' },
  { file: 'Convencion1994.jsx', name: 'Convencion 1994' }
];

console.log('🔍 Verificando rutas de imágenes en todos los departamentos...\n');

departments.forEach(dept => {
  const filePath = `c:\\Users\\rober\\Desktop\\baconfort3\\baconfort-react\\src\\pages\\${dept.file}`;
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar que NO usa rutas incorrectas
    const hasIncorrectPaths = content.includes('images/img-') || content.includes('img/img-moldes1.jpg') || content.includes('img/img-santa-fe');
    
    // Verificar que usa rutas correctas
    const hasCorrectPaths = content.includes('/img/img-') || content.includes('img/img-moldes1.jpg');
    
    // Extraer ejemplos de rutas
    const imageMatches = content.match(/['"`][^'"`]*img-[^'"`]*\.jpg['"`]/g) || [];
    const firstThreeImages = imageMatches.slice(0, 3);
    
    console.log(`📄 ${dept.name} (${dept.file}):`);
    console.log(`   ✅ Rutas correctas: ${hasCorrectPaths}`);
    console.log(`   ❌ Rutas incorrectas: ${hasIncorrectPaths}`);
    console.log(`   📋 Ejemplos de rutas: ${firstThreeImages.join(', ')}`);
    
    if (hasCorrectPaths && !hasIncorrectPaths) {
      console.log(`   🎯 STATUS: RUTAS CORRECTAS`);
    } else {
      console.log(`   ❌ STATUS: REVISAR RUTAS`);
    }
    console.log('');
    
  } catch (error) {
    console.log(`❌ Error leyendo ${dept.file}: ${error.message}`);
  }
});

console.log('🎯 Verificación de rutas completada.');
