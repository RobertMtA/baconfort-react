// Script para verificar que todos los departamentos tengan la misma estructura de amenities
const fs = require('fs');
const path = require('path');

const departamentos = [
  'Moldes1680.jsx',
  'SantaFe3770.jsx', 
  'Ugarteche2824.jsx',
  'Dorrego1548.jsx',
  'Convencion1994.jsx'
];

const reactPath = path.join(__dirname, 'baconfort-react', 'src', 'pages');

console.log('🔍 Verificando estructura de amenities en todos los departamentos...\n');

departamentos.forEach(departamento => {
  const filePath = path.join(reactPath, departamento);
  
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`📋 ${departamento}:`);
    
    // Verificar elementos clave
    const checks = [
      { name: 'useProperty hook', regex: /import.*useProperty.*from.*hooks\/useProperty/ },
      { name: 'moldes-container class', regex: /className="[^"]*moldes-container[^"]*"/ },
      { name: 'Comodidades Destacadas', regex: /Comodidades Destacadas/ },
      { name: 'Estructura de 3 columnas', regex: /col-md-4.*Departamento.*col-md-4.*Servicios.*col-md-4.*Amenities del Edificio/s },
      { name: 'Botón actualizar', regex: /fa-sync-alt.*Actualizar/ },
      { name: 'Modo offline', regex: /Modo offline/ },
      { name: 'Fallback amenities', regex: /property\?\.\amenities.*\?.*\(.*\).*:.*\(/ },
      { name: 'isUsingFallback', regex: /isUsingFallback/ }
    ];
    
    checks.forEach(check => {
      const found = check.regex.test(content);
      console.log(`  ${found ? '✅' : '❌'} ${check.name}`);
    });
    
    console.log('');
  } else {
    console.log(`❌ ${departamento}: Archivo no encontrado`);
  }
});

console.log('✨ Verificación completada!');
