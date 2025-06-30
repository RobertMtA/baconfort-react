const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Esquema de Gallery (debería coincidir con el backend)
const gallerySchema = new mongoose.Schema({
  propertyId: { type: String, required: true, index: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  url: { type: String, required: true },
  isMainImage: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Gallery = mongoose.model('Gallery', gallerySchema);

// Configuración de propiedades y sus imágenes
const properties = {
  'santafe3770': {
    images: [
      'img-santa-fe1.jpg',
      'img-santa-fe2.jpg', 
      'img-santa-fe3.jpg',
      'img-santa-fe4.jpg',
      'img-santa-fe5.jpg',
      'img-santa-fe6.jpg'
    ]
  },
  'dorrego1548': {
    images: [
      'img-dorrego1.jpg',
      'img-dorrego2.jpg',
      'img-dorrego3.jpg', 
      'img-dorrego4.jpg',
      'img-dorrego5.jpg',
      'img-dorrego6.jpg'
    ]
  },
  'convencion1994': {
    images: [
      'img-convencion1.jpg',
      'img-convencion2.jpg',
      'img-convencion3.jpg',
      'img-convencion4.jpg',
      'img-convencion5.jpg',
      'img-convencion6.jpg'
    ]
  },
  'ugarteche2824': {
    images: [
      'img-ugarteche1.jpg',
      'img-ugarteche2.jpg',
      'img-ugarteche3.jpg',
      'img-ugarteche4.jpg',
      'img-ugarteche5.jpg',
      'img-ugarteche6.jpg'
    ]
  }
};

async function populateGallery() {
  try {
    console.log('🚀 Iniciando población de galerías...');
    
    for (const [propertyId, config] of Object.entries(properties)) {
      console.log(`\n📁 Procesando propiedad: ${propertyId}`);
      
      // Verificar si ya existen imágenes para esta propiedad
      const existingImages = await Gallery.find({ propertyId });
      if (existingImages.length > 0) {
        console.log(`⚠️  Ya existen ${existingImages.length} imágenes para ${propertyId}, eliminando...`);
        await Gallery.deleteMany({ propertyId });
      }
      
      // Crear registros para cada imagen
      for (let i = 0; i < config.images.length; i++) {
        const filename = config.images[i];
        const sourcePath = path.join(__dirname, '../baconfort-react/public/img', filename);
        const destPath = path.join(__dirname, 'uploads/gallery', filename);
        
        // Verificar si el archivo fuente existe
        if (!fs.existsSync(sourcePath)) {
          console.log(`❌ Archivo no encontrado: ${sourcePath}`);
          continue;
        }
        
        // Crear directorio de destino si no existe
        const destDir = path.dirname(destPath);
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        
        // Copiar archivo al directorio uploads si no existe
        if (!fs.existsSync(destPath)) {
          fs.copyFileSync(sourcePath, destPath);
          console.log(`📋 Copiado: ${filename}`);
        } else {
          console.log(`✅ Ya existe: ${filename}`);
        }
        
        // Crear registro en la base de datos
        const galleryItem = new Gallery({
          propertyId,
          filename,
          originalName: filename,
          url: `http://localhost:5000/uploads/gallery/${filename}`,
          isMainImage: i === 0, // La primera imagen es la principal
          order: i
        });
        
        await galleryItem.save();
        console.log(`📸 Registrado en DB: ${filename} (${i === 0 ? 'PRINCIPAL' : 'secundaria'})`);
      }
      
      console.log(`✅ Completado: ${propertyId} - ${config.images.length} imágenes`);
    }
    
    console.log('\n🎉 ¡Población de galerías completada!');
    
    // Mostrar resumen
    for (const propertyId of Object.keys(properties)) {
      const count = await Gallery.countDocuments({ propertyId });
      console.log(`📊 ${propertyId}: ${count} imágenes en DB`);
    }
    
  } catch (error) {
    console.error('❌ Error durante la población:', error);
  } finally {
    mongoose.connection.close();
  }
}

populateGallery();
