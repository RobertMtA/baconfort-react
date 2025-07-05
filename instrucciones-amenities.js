// SOLUCIÓN SIMPLE: Agregar amenities usando el modelo existente
// Usar el backend que ya funciona

const path = require('path');

// Necesitamos ejecutar desde el directorio del backend
console.log('🔧 MÉTODO DIRECTO: Agregando amenities usando Mongoose');
console.log('===================================================');

console.log('\n📋 INSTRUCCIONES:');
console.log('1. Abre una nueva terminal');
console.log('2. Ejecuta estos comandos:');
console.log('');
console.log('cd baconfort-backend');
console.log('');
console.log('node -e "');
console.log('const Property = require(\'./models/Property\');');
console.log('const mongoose = require(\'mongoose\');');
console.log('');
console.log('async function updateAmenities() {');
console.log('  try {');
console.log('    await mongoose.connect(\'mongodb://localhost:27017/baconfort\');');
console.log('    console.log(\'✅ Conectado a MongoDB\');');
console.log('');
console.log('    const newAmenities = {');
console.log('      departamento: [');
console.log('        { icon: \'fas fa-tv\', text: \'Smart TV 65\\\' 4K HDR\' },');
console.log('        { icon: \'fas fa-wifi\', text: \'WiFi Fibra Óptica 1GB\' },');
console.log('        { icon: \'fas fa-snowflake\', text: \'Aire Central Premium\' },');
console.log('        { icon: \'fas fa-utensils\', text: \'Cocina Italiana Completa\' },');
console.log('        { icon: \'fas fa-coffee\', text: \'Set Café Profesional\' }');
console.log('      ],');
console.log('      servicios: [');
console.log('        { icon: \'fas fa-shield-alt\', text: \'Seguridad 24/7 Premium\' },');
console.log('        { icon: \'fas fa-concierge-bell\', text: \'Concierge Multiidioma\' },');
console.log('        { icon: \'fas fa-broom\', text: \'Housekeeping Diario\' },');
console.log('        { icon: \'fas fa-car\', text: \'Valet Parking Incluido\' }');
console.log('      ],');
console.log('      amenitiesEdificio: [');
console.log('        { icon: \'fas fa-swimming-pool\', text: \'Piscina Infinity Climatizada\' },');
console.log('        { icon: \'fas fa-dumbbell\', text: \'Gym Tecnológico 24hs\' },');
console.log('        { icon: \'fas fa-spa\', text: \'Spa & Wellness Center\' },');
console.log('        { icon: \'fas fa-sun\', text: \'Rooftop Lounge & Bar\' }');
console.log('      ]');
console.log('    };');
console.log('');
console.log('    const result = await Property.findOneAndUpdate(');
console.log('      { id: \\\'moldes-1680\\\' },');
console.log('      { ');
console.log('        amenities: newAmenities,');
console.log('        updatedAt: new Date()');
console.log('      },');
console.log('      { new: true }');
console.log('    );');
console.log('');
console.log('    if (result) {');
console.log('      console.log(\\\'✅ Amenities actualizadas exitosamente\\\');');
console.log('      console.log(\\\'📊 Total amenities:\\\', ');
console.log('        (result.amenities.departamento?.length || 0) +');
console.log('        (result.amenities.servicios?.length || 0) +');
console.log('        (result.amenities.amenitiesEdificio?.length || 0)');
console.log('      );');
console.log('      console.log(\\\'🕐 Actualizado:\\\', result.updatedAt);');
console.log('    } else {');
console.log('      console.log(\\\'❌ Propiedad no encontrada\\\');');
console.log('    }');
console.log('  } catch (error) {');
console.log('    console.error(\\\'❌ Error:\\\', error.message);');
console.log('  } finally {');
console.log('    process.exit(0);');
console.log('  }');
console.log('}');
console.log('');
console.log('updateAmenities();');
console.log('"');
console.log('');

console.log('\n🎯 DESPUÉS DE EJECUTAR:');
console.log('1. Ve a: http://localhost:3001/departamentos/moldes-1680');
console.log('2. Haz hard refresh: Ctrl+Shift+R');
console.log('3. Las amenities deberían aparecer inmediatamente');
console.log('');

console.log('🔧 ALTERNATIVA RÁPIDA:');
console.log('======================');
console.log('Si no funciona, podemos:');
console.log('1. Editar directamente el archivo de datos');
console.log('2. Usar una herramienta visual como MongoDB Compass');
console.log('3. Crear un endpoint específico para agregar amenities');
console.log('');

console.log('💡 ¿QUÉ MÉTODO PREFIERES?');
console.log('1. Comando directo (arriba)');
console.log('2. Editar archivo JSON');
console.log('3. Crear endpoint simple');
console.log('4. MongoDB Compass visual');
