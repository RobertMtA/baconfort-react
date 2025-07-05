/**
 * Script para verificar la funcionalidad de vista previa de iconos
 */

const fs = require('fs');
const path = require('path');

function testIconPreview() {
  console.log('🔍 Verificando funcionalidad de vista previa de iconos...\n');
  
  // Verificar archivo JSX
  const jsxPath = path.join(__dirname, 'baconfort-react/src/components/Admin/AmenitiesManager.jsx');
  const cssPath = path.join(__dirname, 'baconfort-react/src/components/Admin/AmenitiesManager.css');
  
  if (!fs.existsSync(jsxPath)) {
    console.log('❌ Archivo AmenitiesManager.jsx no encontrado');
    return;
  }
  
  if (!fs.existsSync(cssPath)) {
    console.log('❌ Archivo AmenitiesManager.css no encontrado');
    return;
  }
  
  const jsxContent = fs.readFileSync(jsxPath, 'utf8');
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  console.log('📋 Verificando funcionalidades de vista previa de iconos:');
  
  const jsxChecks = [
    {
      name: 'Vista previa del icono en formulario principal',
      check: jsxContent.includes('icon-preview') && jsxContent.includes('icon-preview-display')
    },
    {
      name: 'Vista previa del icono en edición',
      check: jsxContent.includes('icon-preview-edit')
    },
    {
      name: 'Mostrar nombre del icono seleccionado',
      check: jsxContent.includes('iconOptions.find(opt => opt.icon === newAmenity.icon)?.name')
    },
    {
      name: 'Mostrar clase CSS del icono',
      check: jsxContent.includes('icon-preview-class') && jsxContent.includes('{newAmenity.icon}')
    },
    {
      name: 'Vista previa en modal de edición',
      check: jsxContent.includes('editingAmenity.icon') && jsxContent.includes('icon-preview-edit')
    }
  ];
  
  const cssChecks = [
    {
      name: 'Estilos para vista previa principal',
      check: cssContent.includes('.icon-preview {')
    },
    {
      name: 'Estilos para display del icono',
      check: cssContent.includes('.icon-preview-display {')
    },
    {
      name: 'Estilos para información del icono',
      check: cssContent.includes('.icon-preview-info {')
    },
    {
      name: 'Estilos para nombre del icono',
      check: cssContent.includes('.icon-preview-name {')
    },
    {
      name: 'Estilos para clase CSS del icono',
      check: cssContent.includes('.icon-preview-class {')
    },
    {
      name: 'Estilos para vista previa en edición',
      check: cssContent.includes('.icon-preview-edit {')
    },
    {
      name: 'Responsive design para vista previa',
      check: cssContent.includes('@media (max-width: 768px)') && cssContent.includes('.icon-preview {')
    }
  ];
  
  console.log('\n⚛️ Verificando funcionalidad JSX:');
  let jsxSuccessCount = 0;
  jsxChecks.forEach(check => {
    if (check.check) {
      console.log(`✅ ${check.name}`);
      jsxSuccessCount++;
    } else {
      console.log(`❌ ${check.name}`);
    }
  });
  
  console.log('\n🎨 Verificando estilos CSS:');
  let cssSuccessCount = 0;
  cssChecks.forEach(check => {
    if (check.check) {
      console.log(`✅ ${check.name}`);
      cssSuccessCount++;
    } else {
      console.log(`❌ ${check.name}`);
    }
  });
  
  console.log(`\n📊 Resultado JSX: ${jsxSuccessCount}/${jsxChecks.length}`);
  console.log(`📊 Resultado CSS: ${cssSuccessCount}/${cssChecks.length}`);
  
  if (jsxSuccessCount === jsxChecks.length && cssSuccessCount === cssChecks.length) {
    console.log('\n🎉 ¡Vista previa de iconos implementada correctamente!');
    console.log('\n🎯 CARACTERÍSTICAS IMPLEMENTADAS:');
    console.log('• Vista previa visual del icono seleccionado');
    console.log('• Nombre descriptivo del icono');
    console.log('• Clase CSS del icono (para referencia)');
    console.log('• Vista previa en formulario principal');
    console.log('• Vista previa en modal de edición');
    console.log('• Diseño responsive');
    console.log('• Estilos modernos y consistentes');
    
    console.log('\n🔧 CÓMO FUNCIONA:');
    console.log('1. Al seleccionar un icono del dropdown');
    console.log('2. Se muestra una vista previa debajo del selector');
    console.log('3. Incluye el icono visual, nombre y clase CSS');
    console.log('4. Funciona tanto en el formulario principal como en edición');
    console.log('5. Se actualiza automáticamente al cambiar la selección');
    
    console.log('\n🚀 PARA PROBAR:');
    console.log('1. Ir a Gestión de Comodidades');
    console.log('2. Seleccionar una propiedad');
    console.log('3. Cambiar el icono en el dropdown');
    console.log('4. Observar la vista previa debajo');
    console.log('5. Probar también en el modo edición');
    
  } else {
    console.log('\n⚠️ Algunas funcionalidades no se implementaron correctamente');
  }
}

testIconPreview();
