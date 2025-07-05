// Test: Verificar que en la vista previa solo se muestren las descripciones sin iconos
// Fecha: 2024-01-17
// Cambio: Eliminación de iconos visuales en "Vista Previa de Todas las Comodidades"

const fs = require('fs');
const path = require('path');

function testIconRemovalFromPreview() {
  console.log('🔍 TESTING: Verificando eliminación de iconos de la vista previa...\n');
  
  const filePath = path.join(__dirname, 'baconfort-react/src/components/Admin/AmenitiesManager.jsx');
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Verificar que no haya iconos en la vista previa
    const hasIconDisplay = content.includes('amenity-icon-display');
    const hasIconInContent = content.includes('<i className={amenity.icon}></i>');
    
    console.log('📝 RESULTADOS:');
    console.log(`   ❌ Vista previa con iconos: ${hasIconDisplay ? 'SÍ (debe ser NO)' : 'NO ✓'}`);
    console.log(`   ❌ Elemento de icono en contenido: ${hasIconInContent ? 'SÍ (debe ser NO)' : 'NO ✓'}`);
    
    // Verificar que sigue teniendo las acciones de editar/eliminar
    const hasEditActions = content.includes('action-btn edit-btn');
    const hasDeleteActions = content.includes('action-btn delete-btn');
    
    console.log(`   ✅ Botones de editar: ${hasEditActions ? 'SÍ ✓' : 'NO (debe ser SÍ)'}`);
    console.log(`   ✅ Botones de eliminar: ${hasDeleteActions ? 'SÍ ✓' : 'NO (debe ser SÍ)'}`);
    
    // Verificar que el texto sigue estando
    const hasAmenityText = content.includes('amenity-text');
    console.log(`   ✅ Texto de comodidad: ${hasAmenityText ? 'SÍ ✓' : 'NO (debe ser SÍ)'}`);
    
    const success = !hasIconDisplay && !hasIconInContent && hasEditActions && hasDeleteActions && hasAmenityText;
    
    console.log(`\n🎯 RESUMEN:`);
    console.log(`   Estado: ${success ? '✅ EXITOSO' : '❌ FALLIDO'}`);
    console.log(`   Descripción: ${success ? 'Los iconos se eliminaron correctamente de la vista previa' : 'Hay problemas con la eliminación de iconos'}`);
    
    if (success) {
      console.log(`\n📋 CAMBIOS APLICADOS:`);
      console.log(`   • Eliminado: <div className="amenity-icon-display">`);
      console.log(`   • Eliminado: <i className={amenity.icon}></i>`);
      console.log(`   • Mantenido: <span className="amenity-text">{amenity.text}</span>`);
      console.log(`   • Mantenido: Botones de editar y eliminar`);
    }
    
  } catch (error) {
    console.error('❌ Error al verificar el archivo:', error.message);
  }
}

// Ejecutar test
testIconRemovalFromPreview();
