// Test: Verificar comportamiento completo de iconos en AmenitiesManager
// Fecha: 2024-01-17
// Objetivo: Confirmar que los iconos se muestran solo donde corresponde

const fs = require('fs');
const path = require('path');

function testAmenitiesIconBehavior() {
  console.log('🔍 TESTING: Verificando comportamiento completo de iconos en AmenitiesManager...\n');
  
  const filePath = path.join(__dirname, 'baconfort-react/src/components/Admin/AmenitiesManager.jsx');
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Verificar que NO hay iconos en la vista previa de comodidades
    const hasIconDisplayInPreview = content.includes('amenity-icon-display');
    
    // 2. Verificar que SÍ hay iconos en el formulario de edición
    const hasIconInEditForm = content.includes('editingAmenity.icon');
    
    // 3. Verificar que SÍ hay iconos en el formulario de agregar
    const hasIconInAddForm = content.includes('newAmenity.icon');
    
    // 4. Verificar que el texto de comodidades sigue presente
    const hasAmenityText = content.includes('amenity-text');
    
    // 5. Verificar que los botones de acción siguen presentes
    const hasEditActions = content.includes('action-btn edit-btn');
    const hasDeleteActions = content.includes('action-btn delete-btn');
    
    console.log('📝 RESULTADOS:');
    console.log('   VISTA PREVIA DE COMODIDADES:');
    console.log(`     ❌ Iconos en vista previa: ${hasIconDisplayInPreview ? 'SÍ (debe ser NO)' : 'NO ✓'}`);
    console.log(`     ✅ Texto de comodidades: ${hasAmenityText ? 'SÍ ✓' : 'NO (debe ser SÍ)'}`);
    console.log(`     ✅ Botones de editar: ${hasEditActions ? 'SÍ ✓' : 'NO (debe ser SÍ)'}`);
    console.log(`     ✅ Botones de eliminar: ${hasDeleteActions ? 'SÍ ✓' : 'NO (debe ser SÍ)'}`);
    
    console.log('\n   FORMULARIOS DE EDICIÓN:');
    console.log(`     ✅ Iconos en formulario de edición: ${hasIconInEditForm ? 'SÍ ✓' : 'NO (debe ser SÍ)'}`);
    console.log(`     ✅ Iconos en formulario de agregar: ${hasIconInAddForm ? 'SÍ ✓' : 'NO (debe ser SÍ)'}`);
    
    // Verificar específicamente que los iconos del formulario de edición funcionen
    const editFormIconLines = content.match(/editingAmenity\.icon/g);
    console.log(`     📊 Usos de iconos en edición: ${editFormIconLines ? editFormIconLines.length : 0}`);
    
    const success = !hasIconDisplayInPreview && 
                   hasIconInEditForm && 
                   hasIconInAddForm && 
                   hasAmenityText && 
                   hasEditActions && 
                   hasDeleteActions;
    
    console.log(`\n🎯 RESUMEN:`);
    console.log(`   Estado: ${success ? '✅ EXITOSO' : '❌ FALLIDO'}`);
    console.log(`   Descripción: ${success ? 'Los iconos funcionan correctamente en cada área' : 'Hay problemas con la configuración de iconos'}`);
    
    if (success) {
      console.log(`\n📋 COMPORTAMIENTO CORRECTO:`);
      console.log(`   • Vista previa: Solo texto, sin iconos ✓`);
      console.log(`   • Formulario edición: Con iconos para selección ✓`);
      console.log(`   • Formulario agregar: Con iconos para selección ✓`);
      console.log(`   • Botones de acción: Preservados ✓`);
      console.log(`   • Experiencia: Más limpia y enfocada ✓`);
    }
    
  } catch (error) {
    console.error('❌ Error al verificar el archivo:', error.message);
  }
}

// Ejecutar test
testAmenitiesIconBehavior();
