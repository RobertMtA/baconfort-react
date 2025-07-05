// crear-admin-y-actualizar-precios.js
// Script para crear admin y actualizar precios

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

async function crearAdminYActualizarPrecios() {
    console.log('🚀 CREAR ADMIN Y ACTUALIZAR PRECIOS');
    console.log('===================================');
    
    // Paso 1: Crear admin con un email único
    const timestamp = Date.now();
    const adminEmail = `admin${timestamp}@baconfort.com`;
    const adminPassword = 'roccosa226';
    
    console.log('👤 Paso 1: Creando admin...');
    console.log(`📧 Email: ${adminEmail}`);
    
    try {
        const registerResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Admin BACONFORT',
                email: adminEmail,
                password: adminPassword
            })
        });
        
        const registerResult = await registerResponse.json();
        
        if (!registerResponse.ok) {
            console.log('❌ Error creando admin:', registerResult.error);
            return;
        }
        
        console.log('✅ Admin creado exitosamente');
        const token = registerResult.token;
        console.log('🎫 Token obtenido');
        
        // Paso 2: Actualizar precios con el token
        console.log('\n💰 Paso 2: Actualizando precios...');
        
        let actualizados = 0;
        let errores = 0;
        
        for (const [propertyId, prices] of Object.entries(nuevosPrecios)) {
            console.log(`\n🏠 Actualizando ${propertyId}...`);
            console.log(`   💵 Diario: USD ${prices.daily}`);
            console.log(`   📅 Semanal: USD ${prices.weekly}`);
            console.log(`   🗓️ Mensual: USD ${prices.monthly}`);
            
            try {
                // Usar el endpoint específico para precios
                const response = await fetch(`${API_URL}/properties/${propertyId}/prices`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ prices })
                });
                
                const result = await response.json();
                
                if (response.ok) {
                    console.log(`   ✅ ${propertyId} actualizado exitosamente`);
                    actualizados++;
                } else {
                    console.log(`   ❌ Error ${response.status}: ${result.error}`);
                    errores++;
                }
                
            } catch (error) {
                console.log(`   ❌ Error de red: ${error.message}`);
                errores++;
            }
            
            // Pausa entre requests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log('\n📊 RESUMEN FINAL:');
        console.log(`✅ Precios actualizados: ${actualizados}`);
        console.log(`❌ Errores: ${errores}`);
        console.log(`📈 Total propiedades: ${Object.keys(nuevosPrecios).length}`);
        
        // Paso 3: Verificar cambios
        if (actualizados > 0) {
            console.log('\n🔄 Verificando cambios...');
            await verificarCambios();
            
            // Sincronizar frontend
            console.log('\n🎯 Sincronizando frontend...');
            try {
                const { exec } = require('child_process');
                exec('node sync-frontend-prices.js', (error, stdout, stderr) => {
                    if (error) {
                        console.log('❌ Error sincronizando frontend:', error);
                    } else {
                        console.log('✅ Frontend sincronizado exitosamente');
                    }
                });
            } catch (error) {
                console.log('❌ Error ejecutando sync:', error.message);
            }
        }
        
        // Guardar credenciales del admin
        const fs = require('fs');
        const adminData = {
            email: adminEmail,
            password: adminPassword,
            token: token,
            timestamp: new Date().toISOString()
        };
        
        fs.writeFileSync('admin-credentials.json', JSON.stringify(adminData, null, 2));
        console.log('\n💾 Credenciales guardadas en admin-credentials.json');
        
    } catch (error) {
        console.log('❌ Error general:', error.message);
    }
}

async function verificarCambios() {
    console.log('🔍 Verificando precios actualizados...');
    
    for (const [propertyId, expectedPrices] of Object.entries(nuevosPrecios)) {
        try {
            const response = await fetch(`${API_URL}/properties/${propertyId}`);
            
            if (response.ok) {
                const result = await response.json();
                const actualPrices = result.data?.prices;
                
                console.log(`🏠 ${propertyId}:`);
                console.log(`   Esperado: ${expectedPrices.daily}/${expectedPrices.weekly}/${expectedPrices.monthly} USD`);
                console.log(`   Actual:   ${actualPrices?.daily || 'N/A'}/${actualPrices?.weekly || 'N/A'}/${actualPrices?.monthly || 'N/A'} USD`);
                
                const updated = (
                    actualPrices?.daily === expectedPrices.daily &&
                    actualPrices?.weekly === expectedPrices.weekly &&
                    actualPrices?.monthly === expectedPrices.monthly
                );
                
                console.log(`   Estado: ${updated ? '✅ ACTUALIZADO' : '❌ PENDIENTE'}`);
            }
            
        } catch (error) {
            console.log(`❌ Error verificando ${propertyId}: ${error.message}`);
        }
    }
}

// Ejecutar
if (require.main === module) {
    crearAdminYActualizarPrecios();
}

module.exports = crearAdminYActualizarPrecios;
