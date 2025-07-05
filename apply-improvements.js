// Script para aplicar mejoras de diseño a todos los departamentos
const fs = require('fs');
const path = require('path');

const departmentFiles = [
  'SantaFe3770.jsx',
  'Ugarteche2824.jsx', 
  'Dorrego1548.jsx',
  'Convencion1994.jsx'
];

const pagesDir = 'c:\\Users\\rober\\Desktop\\baconfort3\\baconfort-react\\src\\pages';

function updateDepartmentFile(filename) {
  const filePath = path.join(pagesDir, filename);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Agregar import para useProperty si no existe
    if (!content.includes("import { useProperty }")) {
      content = content.replace(
        /import.*useGallery.*from.*hooks\/useGallery.*/,
        `import { useGallery } from '../hooks/useGallery';\nimport { useProperty } from '../hooks/useProperty';`
      );
    }
    
    // 2. Agregar clase moldes-container al main
    content = content.replace(
      /className="departamento-page"/g,
      'className="departamento-page moldes-container"'
    );
    
    // 3. Buscar y mejorar la sección de amenities/comodidades
    // Si existe una sección estática de amenities, la marcamos para actualización manual
    if (content.includes('amenities-list') || content.includes('comodidades')) {
      console.log(`📝 ${filename}: Tiene sección de amenities - necesita actualización manual`);
    }
    
    // 4. Guardar cambios
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filename}: Clase moldes-container agregada`);
    
  } catch (error) {
    console.error(`❌ Error procesando ${filename}:`, error.message);
  }
}

console.log('🔄 Aplicando mejoras de diseño a todos los departamentos...\n');

departmentFiles.forEach(updateDepartmentFile);

console.log('\n🎉 Mejoras aplicadas! Ahora necesitas:');
console.log('1. Verificar que cada departamento use useProperty');
console.log('2. Actualizar las secciones de amenities manualmente'); 
console.log('3. Probar cada página individualmente');
