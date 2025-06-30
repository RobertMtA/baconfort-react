const mongoose = require('mongoose');
require('dotenv').config();

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI);

// Esquema de Gallery
const gallerySchema = new mongoose.Schema({
  propertyId: { type: String, required: true, index: true },
  filename: String,
  originalName: String,
  url: String,
  isMain: Boolean,
  order: Number,
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

// Mapeo de IDs antiguos a nuevos
const idMapping = {
  'moldes1680': 'moldes-1680',
  'dorrego1548': 'dorrego-1548', 
  'convencion1994': 'convencion-1994',
  'ugarteche2824': 'ugarteche-2824'
  // santafe3770 ya tiene las imágenes en santa-fe-3770
};

async function migrateGalleryIds() {
  try {
    console.log('🔄 Iniciando migración de IDs de galería...');
    
    for (const [oldId, newId] of Object.entries(idMapping)) {
      console.log(`\n📝 Migrando ${oldId} → ${newId}`);
      
      // Buscar imágenes con el ID antiguo
      const oldImages = await Gallery.find({ propertyId: oldId });
      console.log(`   📸 Encontradas ${oldImages.length} imágenes con ID antiguo`);
      
      if (oldImages.length > 0) {
        // Verificar si ya existen imágenes con el ID nuevo
        const existingImages = await Gallery.find({ propertyId: newId });
        console.log(`   🔍 Ya existen ${existingImages.length} imágenes con ID nuevo`);
        
        if (existingImages.length === 0) {
          // Migrar todas las imágenes al nuevo ID
          const updateResult = await Gallery.updateMany(
            { propertyId: oldId },
            { $set: { propertyId: newId } }
          );
          console.log(`   ✅ Migradas ${updateResult.modifiedCount} imágenes`);
        } else {
          // Si ya existen imágenes con el nuevo ID, eliminar las del ID antiguo
          const deleteResult = await Gallery.deleteMany({ propertyId: oldId });
          console.log(`   🗑️  Eliminadas ${deleteResult.deletedCount} imágenes duplicadas del ID antiguo`);
        }
      }
    }
    
    // Eliminar también las imágenes duplicadas de santafe3770 (sin guión)
    console.log(`\n🧹 Limpiando duplicados de santafe3770...`);
    const santaFeOld = await Gallery.find({ propertyId: 'santafe3770' });
    if (santaFeOld.length > 0) {
      const deleteResult = await Gallery.deleteMany({ propertyId: 'santafe3770' });
      console.log(`   🗑️  Eliminadas ${deleteResult.deletedCount} imágenes duplicadas de santafe3770`);
    }
    
    console.log('\n📊 Estado final:');
    const finalProperties = ['moldes-1680', 'santa-fe-3770', 'dorrego-1548', 'convencion-1994', 'ugarteche-2824'];
    for (const propId of finalProperties) {
      const count = await Gallery.countDocuments({ propertyId: propId });
      console.log(`   ${propId}: ${count} imágenes`);
    }
    
    console.log('\n🎉 ¡Migración completada!');
    
  } catch (error) {
    console.error('❌ Error durante la migración:', error);
  } finally {
    mongoose.connection.close();
  }
}

migrateGalleryIds();
