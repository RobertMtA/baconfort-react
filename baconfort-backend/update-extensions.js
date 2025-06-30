const mongoose = require('mongoose');
const Gallery = require('./models/Gallery');
require('dotenv').config();

// Configuración de MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/baconfort';

async function updateImageExtensions() {
  try {
    // Conectar a MongoDB
    console.log('🔗 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Obtener todas las imágenes de la galería (excluyendo las subidas manualmente)
    const images = await Gallery.find({
      filename: { $regex: /\.(png)$/ } // Solo las que terminan en .png
    });
    
    console.log(`📋 Encontradas ${images.length} imágenes con extensión .png para actualizar`);

    let updatedCount = 0;

    for (const image of images) {
      // Cambiar extensión de .png a .jpg
      const newFilename = image.filename.replace('.png', '.jpg');
      const newUrl = image.url.replace('.png', '.jpg');
      
      console.log(`🔧 Actualizando ${image.filename} -> ${newFilename}`);
      console.log(`   URL: ${image.url} -> ${newUrl}`);
      
      await Gallery.updateOne(
        { _id: image._id },
        { 
          filename: newFilename,
          url: newUrl,
          mimeType: 'image/jpeg'
        }
      );
      updatedCount++;
    }

    console.log(`\n✅ Proceso completado. ${updatedCount} extensiones actualizadas de ${images.length} total.`);

    // Verificar algunas imágenes actualizadas
    console.log('\n🧪 Verificando imágenes actualizadas...');
    const verifyImages = await Gallery.find({
      filename: { $regex: /\.(jpg)$/ }
    }).limit(5);
    
    for (const img of verifyImages) {
      console.log(`📷 ${img.filename}: ${img.getFullUrl()}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

// Ejecutar el script
updateImageExtensions();
