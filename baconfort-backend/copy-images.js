const fs = require('fs').promises;
const path = require('path');

async function copyRealImages() {
  try {
    console.log('📁 Copiando imágenes reales a la galería del backend...');

    // Rutas base
    const frontendImagesPath = path.join(__dirname, '../baconfort-react/public/img');
    const backendGalleryPath = path.join(__dirname, 'uploads/gallery');

    // Asegurar que el directorio de destino existe
    await fs.mkdir(backendGalleryPath, { recursive: true });

    // Definir mapeo de imágenes por propiedad
    const imageMapping = {
      'convencion-1994': {
        main: 'img-convencion1.jpg',
        living: 'img-convencion2.jpg',
        kitchen: 'img-convencion3.jpg',
        bedroom: 'img-convencion4.jpg',
        bathroom: 'img-convencion5.jpg',
        view: 'img-convencion6.jpg'
      },
      'dorrego-1548': {
        main: 'img-dorrego1.jpg',
        living: 'img-dorrego2.jpg',
        kitchen: 'img-dorrego3.jpg',
        bedroom: 'img-dorrego4.jpg',
        bathroom: 'img-dorrego5.jpg',
        view: 'img-dorrego6.jpg'
      },
      'moldes-1680': {
        main: 'img-moldes1.jpg',
        living: 'img-moldes2.jpg',
        kitchen: 'img-moldes3.jpg',
        bedroom: 'img-moldes4.jpg',
        bathroom: 'img-moldes5.jpg',
        view: 'img-moldes6.jpg'
      },
      'santa-fe-3770': {
        main: 'img-santa-fe1.jpg',
        living: 'img-santa-fe2.jpg',
        kitchen: 'img-santa-fe3.jpg',
        bedroom: 'img-santa-fe4.jpg',
        bathroom: 'img-santa-fe5.jpg',
        view: 'img-santa-fe6.jpg'
      },
      'ugarteche-2824': {
        main: 'img-ugarteche1.jpg',
        living: 'img-ugarteche2.jpg',
        kitchen: 'img-ugarteche3.jpg',
        bedroom: 'img-ugarteche4.jpg',
        bathroom: 'img-ugarteche5.jpg',
        view: 'img-ugarteche6.jpg'
      }
    };

    let copiedCount = 0;

    for (const [propertyId, images] of Object.entries(imageMapping)) {
      console.log(`\n🏠 Procesando ${propertyId}...`);
      
      for (const [type, filename] of Object.entries(images)) {
        const sourcePath = path.join(frontendImagesPath, filename);
        const destFilename = `${propertyId}-${type}.jpg`;
        const destPath = path.join(backendGalleryPath, destFilename);

        try {
          // Verificar si el archivo fuente existe
          await fs.access(sourcePath);
          
          // Copiar el archivo
          await fs.copyFile(sourcePath, destPath);
          console.log(`  ✅ ${filename} -> ${destFilename}`);
          copiedCount++;
        } catch (error) {
          console.log(`  ❌ Error copiando ${filename}: ${error.message}`);
        }
      }
    }

    console.log(`\n✅ Proceso completado. ${copiedCount} imágenes copiadas.`);

    // Listar archivos en el directorio de destino
    const galleryFiles = await fs.readdir(backendGalleryPath);
    console.log(`\n📋 Archivos en galería (${galleryFiles.length} total):`);
    galleryFiles.forEach(file => console.log(`  - ${file}`));

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Ejecutar el script
copyRealImages();
