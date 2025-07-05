const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://robertocabral:Rober123@clusterrenta.5vhez.mongodb.net/baconfort?retryWrites=true&w=majority';

async function checkAndTestAmenities() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB');
    
    const db = client.db('baconfort');
    const collection = db.collection('properties');
    
    // 1. Verificar estado actual
    const property = await collection.findOne({ id: 'moldes1680' });
    console.log('\n🔍 ESTADO ACTUAL:');
    console.log('Amenities en BD:', JSON.stringify(property.amenities, null, 2));
    
    // 2. Agregar un amenity de prueba
    console.log('\n🔧 AGREGANDO AMENITY DE PRUEBA...');
    const testAmenity = {
      id: Date.now().toString(),
      text: 'Test de Sincronización',
      icon: 'fas fa-test'
    };
    
    const updateResult = await collection.updateOne(
      { id: 'moldes1680' },
      { 
        $push: { 
          'amenities.servicios': testAmenity 
        },
        $set: { 
          updatedAt: new Date() 
        }
      }
    );
    
    console.log('Update result:', updateResult);
    
    // 3. Verificar que se guardó
    const updatedProperty = await collection.findOne({ id: 'moldes1680' });
    console.log('\n✅ DESPUÉS DE AGREGAR:');
    console.log('Servicios:', updatedProperty.amenities.servicios.map(s => s.text));
    
    // 4. Remover el amenity de prueba
    console.log('\n🧹 REMOVIENDO AMENITY DE PRUEBA...');
    const removeResult = await collection.updateOne(
      { id: 'moldes1680' },
      { 
        $pull: { 
          'amenities.servicios': { id: testAmenity.id } 
        },
        $set: { 
          updatedAt: new Date() 
        }
      }
    );
    
    console.log('Remove result:', removeResult);
    
    // 5. Verificar estado final
    const finalProperty = await collection.findOne({ id: 'moldes1680' });
    console.log('\n🎯 ESTADO FINAL:');
    console.log('Servicios:', finalProperty.amenities.servicios.map(s => s.text));
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
  }
}

checkAndTestAmenities();
