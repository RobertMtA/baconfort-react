// SOLUCIÓN SIMPLE: Agregar amenities directamente a la base de datos
// Sin depender del frontend complicado

const { MongoClient } = require('mongodb');

// Configuración de MongoDB
const MONGODB_URI = 'mongodb://localhost:27017/baconfort';
const DB_NAME = 'baconfort';

async function addAmenitiesDirectly() {
  console.log('🔧 MÉTODO DIRECTO: Agregando amenities sin frontend');
  console.log('================================================');

  try {
    // Conectar a MongoDB
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Conectado a MongoDB');

    const db = client.db(DB_NAME);
    const collection = db.collection('properties');

    // 1. Buscar la propiedad moldes-1680
    const property = await collection.findOne({ id: 'moldes-1680' });
    
    if (!property) {
      console.log('❌ Propiedad no encontrada');
      return;
    }

    console.log('✅ Propiedad encontrada:', property.title);

    // 2. Definir nuevas amenities para agregar
    const newAmenities = {
      departamento: [
        { icon: 'fas fa-tv', text: 'Smart TV 65" 4K' },
        { icon: 'fas fa-wifi', text: 'WiFi Gigabit' },
        { icon: 'fas fa-snowflake', text: 'Aire Split Inverter' },
        { icon: 'fas fa-utensils', text: 'Cocina Premium' },
        { icon: 'fas fa-coffee', text: 'Cafetera Nespresso' }
      ],
      servicios: [
        { icon: 'fas fa-shield-alt', text: 'Seguridad 24/7' },
        { icon: 'fas fa-concierge-bell', text: 'Concierge' },
        { icon: 'fas fa-broom', text: 'Housekeeping' },
        { icon: 'fas fa-car', text: 'Valet Parking' }
      ],
      amenitiesEdificio: [
        { icon: 'fas fa-swimming-pool', text: 'Piscina Infinity' },
        { icon: 'fas fa-dumbbell', text: 'Gym Completo' },
        { icon: 'fas fa-spa', text: 'Spa & Wellness' },
        { icon: 'fas fa-sun', text: 'Rooftop Bar' }
      ]
    };

    // 3. Actualizar la propiedad directamente
    const result = await collection.updateOne(
      { id: 'moldes-1680' },
      { 
        $set: { 
          amenities: newAmenities,
          updatedAt: new Date()
        }
      }
    );

    if (result.modifiedCount > 0) {
      console.log('✅ Amenities actualizadas directamente en la base de datos');
      console.log('📊 Nuevas amenities:');
      console.log(`   🏠 Departamento: ${newAmenities.departamento.length} items`);
      console.log(`   🛎️ Servicios: ${newAmenities.servicios.length} items`);
      console.log(`   🏢 Edificio: ${newAmenities.amenitiesEdificio.length} items`);

      // 4. Verificar la actualización
      const updatedProperty = await collection.findOne({ id: 'moldes-1680' });
      console.log('\n🔍 Verificación:');
      console.log('   Timestamp actualización:', updatedProperty.updatedAt);
      console.log('   Total amenities:', 
        (updatedProperty.amenities.departamento?.length || 0) +
        (updatedProperty.amenities.servicios?.length || 0) +
        (updatedProperty.amenities.amenitiesEdificio?.length || 0)
      );
    } else {
      console.log('❌ No se pudo actualizar');
    }

    await client.close();
    console.log('\n🎯 PRÓXIMO PASO:');
    console.log('   • Abre: http://localhost:3001/departamentos/moldes-1680');
    console.log('   • Haz hard refresh: Ctrl+Shift+R');
    console.log('   • Las amenities deberían aparecer inmediatamente');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Ejecutar
addAmenitiesDirectly();
