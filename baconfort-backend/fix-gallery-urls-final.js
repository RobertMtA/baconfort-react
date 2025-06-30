const mongoose = require('mongoose');
require('dotenv').config();

// Modelo Gallery
const gallerySchema = new mongoose.Schema({
  propertyId: { type: String, required: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  url: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  altText: String,
  isMain: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  fileSize: Number,
  mimeType: String,
  dimensions: {
    width: Number,
    height: Number
  },
  uploadedBy: String,
  uploadedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Gallery = mongoose.model('Gallery', gallerySchema);

async function fixGalleryUrls() {
  try {
    console.log('🔧 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/baconfort');
    console.log('✅ Conectado a MongoDB');

    // Obtener todas las imágenes
    const images = await Gallery.find({});
    console.log(`📸 Encontradas ${images.length} imágenes en la base de datos`);

    let updated = 0;
    for (const image of images) {
      const currentUrl = image.url;
      let newUrl = currentUrl;

      // Si la URL no tiene el dominio completo, agregarlo
      if (currentUrl.startsWith('/uploads/gallery/')) {
        newUrl = `http://localhost:5000${currentUrl}`;
      } else if (currentUrl.startsWith('uploads/gallery/')) {
        newUrl = `http://localhost:5000/${currentUrl}`;
      } else if (!currentUrl.startsWith('http://')) {
        // Si no tiene protocolo, asumimos que es relativa
        if (currentUrl.includes('uploads/gallery/')) {
          const filename = currentUrl.split('/').pop();
          newUrl = `http://localhost:5000/uploads/gallery/${filename}`;
        } else {
          newUrl = `http://localhost:5000/uploads/gallery/${image.filename}`;
        }
      }

      if (newUrl !== currentUrl) {
        console.log(`🔄 Actualizando: ${currentUrl} -> ${newUrl}`);
        await Gallery.findByIdAndUpdate(image._id, { 
          url: newUrl,
          updatedAt: new Date()
        });
        updated++;
      } else {
        console.log(`✅ Ya correcto: ${currentUrl}`);
      }
    }

    console.log(`🎉 Actualizadas ${updated} URLs de ${images.length} imágenes`);

    // Verificar las URLs actualizadas
    console.log('\n📋 URLs actualizadas:');
    const updatedImages = await Gallery.find({}).sort({ propertyId: 1, order: 1 });
    for (const image of updatedImages) {
      console.log(`- ${image.propertyId}: ${image.url}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

fixGalleryUrls();
