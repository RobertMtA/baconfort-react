// crear-admin-rol-correcto.js
// Script para crear admin con rol correcto

const API_URL = 'https://baconfort-backend.vercel.app/api';

async function crearAdminConRol() {
    console.log('🔐 CREAR ADMIN CON ROL CORRECTO');
    console.log('===============================');
    
    // Generar email único para admin
    const timestamp = Date.now();
    const adminEmail = `admin${timestamp}@baconfort.com`;
    const adminPassword = 'roccosa226';
    
    console.log('👤 Creando admin...');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${adminPassword}`);
    
    try {
        // Intentar crear admin con el rol especificado
        const registerResponse = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Admin BACONFORT',
                email: adminEmail,
                password: adminPassword,
                role: 'admin'  // Especificar rol admin
            })
        });
        
        const registerResult = await registerResponse.json();
        
        if (!registerResponse.ok) {
            console.log('❌ Error creando admin:', registerResult.error);
            return null;
        }
        
        console.log('✅ Admin creado exitosamente');
        console.log('👤 Usuario:', registerResult.user);
        console.log('🎫 Token:', registerResult.token ? 'SÍ' : 'NO');
        
        // Guardar credenciales
        const fs = require('fs');
        const adminData = {
            email: adminEmail,
            password: adminPassword,
            token: registerResult.token,
            user: registerResult.user,
            timestamp: new Date().toISOString()
        };
        
        fs.writeFileSync('admin-credentials.json', JSON.stringify(adminData, null, 2));
        console.log('💾 Credenciales guardadas en admin-credentials.json');
        
        return {
            token: registerResult.token,
            user: registerResult.user,
            email: adminEmail,
            password: adminPassword
        };
        
    } catch (error) {
        console.log('❌ Error:', error.message);
        return null;
    }
}

async function actualizarPreciosConAdmin(adminData) {
    console.log('\n💰 ACTUALIZAR PRECIOS CON ADMIN');
    console.log('================================');
    
    if (!adminData || !adminData.token) {
        console.log('❌ No hay datos de admin válidos');
        return;
    }
    
    // Nuevos precios
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
                    'Authorization': `Bearer ${adminData.token}`
                },
                body: JSON.stringify({ prices })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                console.log(`   ✅ ${propertyId} actualizado exitosamente`);
                actualizados++;
            } else {
                console.log(`   ❌ Error ${response.status}: ${result.error}`);
                
                // Intentar con el endpoint general también
                const response2 = await fetch(`${API_URL}/properties/${propertyId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${adminData.token}`
                    },
                    body: JSON.stringify({ prices })
                });
                
                const result2 = await response2.json();
                
                if (response2.ok) {
                    console.log(`   ✅ ${propertyId} actualizado con endpoint general`);
                    actualizados++;
                } else {
                    console.log(`   ❌ También falló endpoint general: ${response2.status}`);
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
    
    return actualizados;
}

async function ejecutarCompleto() {
    console.log('🚀 PROCESO COMPLETO DE ADMIN Y PRECIOS');
    console.log('======================================');
    
    // Paso 1: Crear admin
    const adminData = await crearAdminConRol();
    
    if (!adminData) {
        console.log('❌ No se pudo crear admin');
        return;
    }
    
    // Paso 2: Actualizar precios
    const actualizados = await actualizarPreciosConAdmin(adminData);
    
    // Paso 3: Verificar y sincronizar
    if (actualizados > 0) {
        console.log('\n🔄 Sincronizando frontend...');
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
    
    console.log('\n🎉 PROCESO COMPLETADO!');
    console.log('======================');
    console.log(`🔐 Admin: ${adminData.email}`);
    console.log(`🔑 Password: ${adminData.password}`);
    console.log(`💾 Credenciales guardadas en admin-credentials.json`);
}

// Ejecutar
if (require.main === module) {
    ejecutarCompleto();
}

module.exports = { crearAdminConRol, actualizarPreciosConAdmin };
