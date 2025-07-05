const axios = require('axios');

const BACKEND_URL = 'http://localhost:5000';
const ADMIN_TOKEN = 'ADMIN_DEMO_TOKEN';

async function cleanupTestAmenity() {
    console.log('🧹 Limpiando amenity de prueba...\n');
    
    try {
        // Obtener datos actuales
        const response = await axios.get(`${BACKEND_URL}/api/properties/moldes1680`);
        const property = response.data.data;
        
        console.log('📋 Servicios actuales:', property.amenities.servicios.length);
        property.amenities.servicios.forEach((s, i) => {
            console.log(`  ${i+1}. ${s.text}`);
        });
        
        // Filtrar amenities de prueba
        const cleanedAmenities = {
            ...property.amenities,
            servicios: property.amenities.servicios.filter(s => 
                !s.text.includes('Test Service') && !s.text.includes('Test Amenity')
            )
        };
        
        console.log('\n🧹 Servicios después de limpiar:', cleanedAmenities.servicios.length);
        cleanedAmenities.servicios.forEach((s, i) => {
            console.log(`  ${i+1}. ${s.text}`);
        });
        
        // Actualizar
        await axios.put(`${BACKEND_URL}/api/properties/moldes1680`, {
            amenities: cleanedAmenities
        }, {
            headers: {
                'Authorization': `Bearer ${ADMIN_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('\n✅ Amenities de prueba eliminados exitosamente');
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

cleanupTestAmenity();
