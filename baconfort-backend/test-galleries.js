// Script para probar todos los endpoints de galería

const properties = [
  'convencion-1994',
  'dorrego-1548', 
  'moldes-1680',
  'santa-fe-3770',
  'ugarteche-2824'
];

async function testAllGalleries() {
  console.log('🧪 Probando endpoints de galería para todas las propiedades...\n');
  
  for (const propertyId of properties) {
    try {
      console.log(`📸 Probando galería para: ${propertyId}`);
      
      const response = await fetch(`http://localhost:5000/api/gallery/${propertyId}`);
      const data = await response.json();
      
      if (data.success) {
        console.log(`✅ ${propertyId}: ${data.images.length} imágenes encontradas`);
        
        // Mostrar imagen principal
        const mainImage = data.images.find(img => img.isMain);
        if (mainImage) {
          console.log(`   ⭐ Principal: ${mainImage.title}`);
        }
        
        // Mostrar todas las imágenes
        data.images.forEach((img, index) => {
          console.log(`   ${index + 1}. ${img.title} (${img.isMain ? 'PRINCIPAL' : 'normal'})`);
        });
      } else {
        console.log(`❌ ${propertyId}: Error - ${data.error}`);
      }
      
      console.log(''); // Línea en blanco
      
    } catch (error) {
      console.log(`❌ ${propertyId}: Error de conexión - ${error.message}\n`);
    }
  }
  
  console.log('🎉 Prueba de galerías completada!');
}

// Ejecutar la prueba
testAllGalleries();
