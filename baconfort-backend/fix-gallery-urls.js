const mongoose = require('mongoose');
const Gallery = require('./models/Gallery');
require('dotenv').config();

// Configuración de MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/baconfort';

async function fixGalleryUrls() {
  try {
    // Conectar a MongoDB
    console.log('🔗 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Obtener todas las imágenes de la galería
    const images = await Gallery.find({});
    console.log(`📋 Encontradas ${images.length} imágenes para revisar`);

    let updatedCount = 0;

    for (const image of images) {
      // Si la URL ya empieza con http, quitarle el dominio para normalizarla
      if (image.url.startsWith('http://localhost:5000')) {
        const relativePath = image.url.replace('http://localhost:5000', '');
        console.log(`🔧 Actualizando ${image.filename}: ${image.url} -> ${relativePath}`);
        
        await Gallery.updateOne(
          { _id: image._id },
          { url: relativePath }
        );
        updatedCount++;
      }
      // Si la URL no empieza con /, agregarle la barra
      else if (!image.url.startsWith('/')) {
        const normalizedPath = `/${image.url}`;
        console.log(`🔧 Normalizando ${image.filename}: ${image.url} -> ${normalizedPath}`);
        
        await Gallery.updateOne(
          { _id: image._id },
          { url: normalizedPath }
        );
        updatedCount++;
      } else {
        console.log(`✅ ${image.filename}: URL ya está normalizada - ${image.url}`);
      }
    }

    console.log(`\n✅ Proceso completado. ${updatedCount} URLs actualizadas de ${images.length} total.`);

    // Verificar que las URLs funcionan con getFullUrl()
    console.log('\n🧪 Verificando URLs normalizadas...');
    const verifyImages = await Gallery.find({}).limit(3);
    
    for (const img of verifyImages) {
      console.log(`📷 ${img.filename}: ${img.url} -> ${img.getFullUrl()}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

// Ejecutar el script
fixGalleryUrls();
