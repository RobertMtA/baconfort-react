const mongoose = require('mongoose');
const Gallery = require('./models/Gallery');
require('dotenv').config();

// Base64 de una imagen de prueba muy pequeña (1x1 pixel)
const testImageBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Conectado a MongoDB');
  return createTestImages();
})
.then(() => {
  console.log('🎉 Imágenes de prueba creadas exitosamente');
  process.exit(0);
})
.catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
});

async function createTestImages() {
  try {
    // Lista de todas las propiedades
    const properties = [
      {
        id: 'convencion-1994',
        name: 'Convención 1994',
        type: 'Estudio Premium',
        location: 'Palermo Hollywood'
      },
      {
        id: 'dorrego-1548',
        name: 'Dorrego 1548',
        type: 'Casa Completa',
        location: 'Palermo Hollywood'
      },
      {
        id: 'moldes-1680',
        name: 'Moldes 1680',
        type: 'Departamento Familiar',
        location: 'Belgrano'
      },
      {
        id: 'santa-fe-3770',
        name: 'Santa Fe 3770',
        type: 'Estudio con Amenities',
        location: 'Palermo Botánico'
      },
      {
        id: 'ugarteche-2824',
        name: 'Ugarteche 2824',
        type: 'PH con Entrada Independiente',
        location: 'Palermo'
      }
    ];

    console.log('🏠 Creando galerías para todas las propiedades...');

    for (const property of properties) {
      console.log(`\n📸 Procesando ${property.name}...`);
      
      // Limpiar imágenes existentes
      await Gallery.deleteMany({ propertyId: property.id });
      console.log(`🗑️ Imágenes anteriores eliminadas para ${property.name}`);
      
      // Crear imágenes específicas para cada propiedad
      const testImages = [
        {
          propertyId: property.id,
          filename: `${property.id}-main.png`,
          originalName: `${property.name} - Imagen Principal.png`,
          url: `/uploads/gallery/${property.id}-main.png`,
          title: `Vista Principal - ${property.name}`,
          description: `Imagen principal del ${property.type.toLowerCase()} en ${property.location}`,
          altText: `Vista principal de ${property.name}`,
          isMain: true,
          order: 0,
          fileSize: 95,
          mimeType: 'image/png',
          dimensions: { width: 1920, height: 1080 },
          uploadedBy: null
        },
        {
          propertyId: property.id,
          filename: `${property.id}-living.png`,
          originalName: `${property.name} - Living.png`,
          url: `/uploads/gallery/${property.id}-living.png`,
          title: 'Living Comedor',
          description: `Amplio living comedor con vista panorámica`,
          altText: `Living de ${property.name}`,
          isMain: false,
          order: 1,
          fileSize: 87,
          mimeType: 'image/png',
          dimensions: { width: 1920, height: 1080 },
          uploadedBy: null
        },
        {
          propertyId: property.id,
          filename: `${property.id}-kitchen.png`,
          originalName: `${property.name} - Cocina.png`,
          url: `/uploads/gallery/${property.id}-kitchen.png`,
          title: 'Cocina Equipada',
          description: `Cocina completamente equipada con electrodomésticos de primera línea`,
          altText: `Cocina de ${property.name}`,
          isMain: false,
          order: 2,
          fileSize: 91,
          mimeType: 'image/png',
          dimensions: { width: 1920, height: 1080 },
          uploadedBy: null
        },
        {
          propertyId: property.id,
          filename: `${property.id}-bedroom.png`,
          originalName: `${property.name} - Dormitorio.png`,
          url: `/uploads/gallery/${property.id}-bedroom.png`,
          title: 'Dormitorio Principal',
          description: `Dormitorio con cama queen size y abundante luz natural`,
          altText: `Dormitorio de ${property.name}`,
          isMain: false,
          order: 3,
          fileSize: 89,
          mimeType: 'image/png',
          dimensions: { width: 1920, height: 1080 },
          uploadedBy: null
        },
        {
          propertyId: property.id,
          filename: `${property.id}-bathroom.png`,
          originalName: `${property.name} - Baño.png`,
          url: `/uploads/gallery/${property.id}-bathroom.png`,
          title: 'Baño Completo',
          description: `Baño moderno con acabados de calidad`,
          altText: `Baño de ${property.name}`,
          isMain: false,
          order: 4,
          fileSize: 93,
          mimeType: 'image/png',
          dimensions: { width: 1920, height: 1080 },
          uploadedBy: null
        },
        {
          propertyId: property.id,
          filename: `${property.id}-view.png`,
          originalName: `${property.name} - Vista.png`,
          url: `/uploads/gallery/${property.id}-view.png`,
          title: 'Vista Exterior',
          description: `Vista desde el departamento hacia la ciudad`,
          altText: `Vista desde ${property.name}`,
          isMain: false,
          order: 5,
          fileSize: 96,
          mimeType: 'image/png',
          dimensions: { width: 1920, height: 1080 },
          uploadedBy: null
        }
      ];
      
      // Insertar las imágenes
      const createdImages = await Gallery.insertMany(testImages);
      console.log(`✅ ${createdImages.length} imágenes creadas para ${property.name}`);
    }
    
    // Mostrar estadísticas finales
    console.log('\n📊 RESUMEN FINAL:');
    for (const property of properties) {
      const totalImages = await Gallery.countDocuments({ propertyId: property.id });
      const mainImage = await Gallery.findOne({ propertyId: property.id, isMain: true });
      
      console.log(`🏠 ${property.name}: ${totalImages} imágenes (Principal: ${mainImage ? mainImage.title : 'Ninguna'})`);
    }
    
    const totalAllImages = await Gallery.countDocuments();
    console.log(`\n🎉 TOTAL GENERAL: ${totalAllImages} imágenes en ${properties.length} propiedades`);
    
    return properties;
  } catch (error) {
    console.error('Error creando imágenes de prueba:', error);
    throw error;
  }
}
