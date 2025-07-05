// Script para crear un test de cada departamento y verificar que funcionan correctamente
const fs = require('fs');
const path = require('path');

const departmentPages = [
  'Moldes1680.jsx',
  'SantaFe3770.jsx', 
  'Ugarteche2824.jsx',
  'Dorrego1548.jsx',
  'Convencion1994.jsx'
];

const frontendPath = 'c:\\Users\\rober\\Desktop\\baconfort3\\baconfort-react\\src\\pages';

console.log('🔍 Verificando archivos de departamentos...\n');

departmentPages.forEach(page => {
  const filePath = path.join(frontendPath, page);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar que no hay class= en lugar de className
    const classErrors = (content.match(/class=/g) || []).length;
    
    // Verificar que usa useProperty
    const hasUseProperty = content.includes('useProperty');
    
    // Verificar que tiene fallback
    const hasFallback = content.includes('fallback');
    
    // Verificar que tiene botón de actualizar
    const hasUpdateButton = content.includes('Actualizar');
    
    console.log(`📄 ${page}:`);
    console.log(`   - ❌ Errores class=: ${classErrors}`);
    console.log(`   - ✅ Usa useProperty: ${hasUseProperty}`);
    console.log(`   - ✅ Tiene fallback: ${hasFallback}`);
    console.log(`   - ✅ Botón actualizar: ${hasUpdateButton}`);
    console.log('');
  } else {
    console.log(`❌ ${page}: Archivo no encontrado`);
  }
});

console.log('🎯 Verificación completada. Todos los departamentos deberían estar sin warnings.');
