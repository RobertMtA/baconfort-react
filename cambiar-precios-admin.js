// cambiar-precios-admin.js
// Script para cambiar precios de todas las propiedades

const API_URL = 'https://baconfort-backend.vercel.app/api';

// Nuevos precios para todas las propiedades
const nuevosPrecios = {
    'moldes-1680': {
        daily: 75,
        weekly: 330,
        monthly: 700,
        currency: 'USD'
    },
    'santa-fe-3770': {
        daily: 80,
        weekly: 350,
        monthly: 750,
        currency: 'USD'
    },
    'dorrego-1548': {
        daily: 70,
        weekly: 320,
        monthly: 680,
        currency: 'USD'
    },
    'convencion-1994': {
        daily: 90,
        weekly: 380,
        monthly: 800,
        currency: 'USD'
    },
    'ugarteche-2824': {
        daily: 95,
        weekly: 400,
        monthly: 850,
        currency: 'USD'
    }
};

const cambiarPrecios = async () => {
    console.log('💰 Cambiando precios de todas las propiedades...');
    console.log('==============================================');
    
    for (const [propertyId, prices] of Object.entries(nuevosPrecios)) {
        try {
            console.log(`\n🏠 Actualizando ${propertyId}...`);
            console.log(`   Diario: USD ${prices.daily}`);
            console.log(`   Semanal: USD ${prices.weekly}`);
            console.log(`   Mensual: USD ${prices.monthly}`);
            
            const response = await fetch(`${API_URL}/properties/${propertyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prices })
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log(`   ✅ ${propertyId} actualizado exitosamente`);
            } else {
                console.log(`   ❌ Error actualizando ${propertyId}: ${response.status}`);
            }
            
        } catch (error) {
            console.error(`   ❌ Error con ${propertyId}:`, error.message);
        }
        
        // Pausa entre requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n✅ Proceso de actualización completado!');
    console.log('🔄 Recarga el panel de admin para ver los cambios.');
};

// Función para cambiar precios de una propiedad específica
const cambiarPrecioPropiedad = async (propertyId, precios) => {
    console.log(`💰 Cambiando precios de ${propertyId}...`);
    
    try {
        const response = await fetch(`${API_URL}/properties/${propertyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prices: precios })
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log(`✅ Precios actualizados para ${propertyId}`);
            console.log('📊 Nuevos precios:', precios);
            return result;
        } else {
            console.log(`❌ Error: ${response.status}`);
            return null;
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        return null;
    }
};

// Función para verificar precios actuales
const verificarPrecios = async () => {
    console.log('🔍 Verificando precios actuales...');
    console.log('==================================');
    
    for (const propertyId of Object.keys(nuevosPrecios)) {
        try {
            const response = await fetch(`${API_URL}/properties/${propertyId}`);
            
            if (response.ok) {
                const result = await response.json();
                const prices = result.data?.prices;
                
                console.log(`\n🏠 ${propertyId}:`);
                console.log(`   Diario: USD ${prices?.daily || 'N/A'}`);
                console.log(`   Semanal: USD ${prices?.weekly || 'N/A'}`);
                console.log(`   Mensual: USD ${prices?.monthly || 'N/A'}`);
            } else {
                console.log(`❌ Error obteniendo ${propertyId}: ${response.status}`);
            }
            
        } catch (error) {
            console.error(`❌ Error con ${propertyId}:`, error.message);
        }
    }
};

// Ejecutar según el argumento
const accion = process.argv[2];

if (accion === 'cambiar') {
    cambiarPrecios();
} else if (accion === 'verificar') {
    verificarPrecios();
} else {
    console.log('📋 USO:');
    console.log('  node cambiar-precios-admin.js cambiar    # Cambiar todos los precios');
    console.log('  node cambiar-precios-admin.js verificar  # Ver precios actuales');
    console.log('');
    console.log('💡 O usar directamente:');
    console.log('  cambiarPrecios()      # Cambiar todos');
    console.log('  verificarPrecios()    # Ver actuales');
    console.log('');
    console.log('🚀 Ejecutando verificación por defecto...');
    verificarPrecios();
}

// Exportar funciones para uso directo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        cambiarPrecios,
        cambiarPrecioPropiedad,
        verificarPrecios,
        nuevosPrecios
    };
}
