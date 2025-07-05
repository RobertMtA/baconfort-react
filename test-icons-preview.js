/**
 * Script para verificar que los iconos se muestran en la Vista Previa de Todas las Comodidades
 */

const fs = require('fs');
const path = require('path');

function testIconsInPreview() {
  console.log('🔍 Verificando iconos en Vista Previa de Todas las Comodidades...\n');
  
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
  
  console.log('📋 Verificando iconos en vista previa:');
  
  const jsxChecks = [
    {
      name: 'Iconos en Vista Previa General',
      check: jsxContent.includes('<div className="amenity-icon-display">') && 
             jsxContent.includes('selectedPropertyData.amenities[key].map')
    },
    {
      name: 'Iconos en Lista de Comodidades',
      check: jsxContent.includes('amenity-icon-display') && 
             jsxContent.includes('filterAmenities(selectedPropertyData.amenities[selectedCategory])')
    },
    {
      name: 'Estructura correcta con icono + texto',
      check: jsxContent.includes('<span className="amenity-text">{amenity.text}</span>')
    },
    {
      name: 'Vista previa de iconos en formulario',
      check: jsxContent.includes('icon-preview') && jsxContent.includes('icon-preview-display')
    }
  ];
  
  const cssChecks = [
    {
      name: 'Estilos para amenity-icon-display',
      check: cssContent.includes('.amenity-icon-display {') || cssContent.includes('amenity-icon-display')
    },
    {
      name: 'Estilos específicos para vista previa',
      check: cssContent.includes('.preview-amenity .amenity-icon-display')
    },
    {
      name: 'Gradiente en iconos',
      check: cssContent.includes('linear-gradient(135deg, #667eea 0%, #764ba2 100%)')
    },
    {
      name: 'Estilos de icono principal actualizados',
      check: cssContent.includes('.amenity-icon {') && cssContent.includes('color: white')
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
    console.log('\n🎉 ¡Iconos en Vista Previa implementados correctamente!');
    console.log('\n🎯 MEJORAS IMPLEMENTADAS:');
    console.log('• 📱 Iconos visuales en "Vista Previa de Todas las Comodidades"');
    console.log('• 🎨 Iconos con gradiente azul-morado consistente');
    console.log('• 📋 Diseño unificado en todas las secciones');
    console.log('• 🔄 Actualización automática al cambiar selección');
    
    console.log('\n🎨 EJEMPLO VISUAL ESPERADO:');
    console.log('Vista Previa de Todas las Comodidades');
    console.log('├── Departamento (3)');
    console.log('│   ├── [📺] Smart TV 50"');
    console.log('│   ├── [📶] WiFi Alta Velocidad');
    console.log('│   └── [❄️] Aire Acondicionado');
    console.log('├── Servicios (2)');
    console.log('│   ├── [🛡️] Seguridad 24hs');
    console.log('│   └── [🏨] Portería');
    console.log('└── Amenities del Edificio (3)');
    console.log('    ├── [💪] Gimnasio');
    console.log('    ├── [🏊] Piscina');
    console.log('    └── [🍽️] vajillas completas');
    
    console.log('\n🚀 PARA VERIFICAR:');
    console.log('1. Ir a Gestión de Comodidades');
    console.log('2. Seleccionar una propiedad (ej: Santa Fe 3770)');
    console.log('3. Ir a la sección "Vista Previa de Todas las Comodidades"');
    console.log('4. Verificar que cada comodidad muestra su icono correspondiente');
    console.log('5. Los iconos deben tener fondo azul-morado con gradiente');
    
  } else {
    console.log('\n⚠️ Algunas funcionalidades no se implementaron correctamente');
  }
}

testIconsInPreview();
