// cambiar-precios-directo.js
// Script para cambiar precios directamente

const API_URL = 'https://baconfort-backend.vercel.app/api';

// Nuevos precios recomendados
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

async function cambiarPreciosDirecto() {
    console.log('🚀 CAMBIO DIRECTO DE PRECIOS');
    console.log('============================');
    
    let actualizados = 0;
    let errores = 0;
    
    for (const [propertyId, prices] of Object.entries(nuevosPrecios)) {
        console.log(`\n🏠 Actualizando ${propertyId}...`);
        console.log(`   💰 Diario: USD ${prices.daily}`);
        console.log(`   📅 Semanal: USD ${prices.weekly}`);
        console.log(`   🗓️ Mensual: USD ${prices.monthly}`);
        
        try {
            // Método 1: PUT directo
            const response = await fetch(`${API_URL}/properties/${propertyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prices })
            });
            
            if (response.ok) {
                console.log(`   ✅ ${propertyId} actualizado exitosamente`);
                actualizados++;
            } else {
                console.log(`   ❌ Error ${response.status} actualizando ${propertyId}`);
                
                // Método 2: PATCH como alternativa
                const patchResponse = await fetch(`${API_URL}/properties/${propertyId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ prices })
                });
                
                if (patchResponse.ok) {
                    console.log(`   ✅ ${propertyId} actualizado con PATCH`);
                    actualizados++;
                } else {
                    console.log(`   ❌ PATCH también falló: ${patchResponse.status}`);
                    errores++;
                }
            }
            
        } catch (error) {
            console.log(`   ❌ Error de red: ${error.message}`);
            errores++;
        }
        
        // Pausa entre requests
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\n📊 RESUMEN:');
    console.log(`✅ Actualizados: ${actualizados}`);
    console.log(`❌ Errores: ${errores}`);
    console.log(`📈 Total: ${Object.keys(nuevosPrecios).length}`);
    
    if (actualizados > 0) {
        console.log('\n🔄 Sincronizando precios en frontend...');
        try {
            const { exec } = require('child_process');
            exec('node sync-frontend-prices.js', (error, stdout, stderr) => {
                if (error) {
                    console.log('❌ Error sincronizando frontend:', error);
                } else {
                    console.log('✅ Frontend sincronizado');
                }
            });
        } catch (error) {
            console.log('❌ Error ejecutando sync:', error.message);
        }
    }
}

// Ejecutar
if (require.main === module) {
    cambiarPreciosDirecto();
}

module.exports = cambiarPreciosDirecto;
