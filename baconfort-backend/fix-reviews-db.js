const mongoose = require('mongoose');
require('dotenv').config();

async function fixReviewsDatabase() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('reviews');

    // Listar todos los índices
    console.log('📋 Índices actuales:');
    const indexes = await collection.indexes();
    indexes.forEach((index, i) => {
      console.log(`   ${i + 1}. ${index.name}:`, index.key);
    });

    // Eliminar el índice problemático
    try {
      console.log('🗑️ Eliminando índice problemático propertyId_1_user_1...');
      await collection.dropIndex('propertyId_1_user_1');
      console.log('✅ Índice eliminado exitosamente');
    } catch (error) {
      console.log('⚠️ Índice no existe o ya fue eliminado:', error.message);
    }

    // Limpiar reviews duplicadas existentes
    console.log('🧹 Limpiando reviews duplicadas...');
    const duplicates = await collection.aggregate([
      {
        $group: {
          _id: { propertyId: '$propertyId', guestEmail: '$guestEmail' },
          count: { $sum: 1 },
          docs: { $push: '$_id' }
        }
      },
      {
        $match: { count: { $gt: 1 } }
      }
    ]).toArray();

    if (duplicates.length > 0) {
      console.log(`📄 Encontradas ${duplicates.length} reviews duplicadas`);
      
      for (const duplicate of duplicates) {
        // Mantener solo el primero, eliminar el resto
        const toDelete = duplicate.docs.slice(1);
        await collection.deleteMany({ _id: { $in: toDelete } });
        console.log(`   ✅ Eliminadas ${toDelete.length} reviews duplicadas para ${duplicate._id.propertyId}`);
      }
    } else {
      console.log('✅ No se encontraron reviews duplicadas');
    }

    // Crear el nuevo índice
    console.log('🔨 Creando nuevo índice propertyId_1_guestEmail_1...');
    await collection.createIndex(
      { propertyId: 1, guestEmail: 1 },
      { unique: true, name: 'propertyId_1_guestEmail_1' }
    );
    console.log('✅ Nuevo índice creado exitosamente');

    // Verificar índices finales
    console.log('📋 Índices finales:');
    const finalIndexes = await collection.indexes();
    finalIndexes.forEach((index, i) => {
      console.log(`   ${i + 1}. ${index.name}:`, index.key);
    });

    console.log('');
    console.log('🎉 Base de datos de reviews corregida exitosamente!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

fixReviewsDatabase();
