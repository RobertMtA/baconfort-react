// verificar-produccion.js
// Script para verificar que todo funcione en producción

const FRONTEND_URL = 'https://baconfort-react.vercel.app';
const BACKEND_URL = 'https://baconfort-backend.vercel.app/api';

async function verificarProduccion() {
    console.log('🌐 VERIFICANDO PRODUCCIÓN');
    console.log('=========================');
    
    const resultados = {
        backend: false,
        frontend: false,
        precios: false,
        admin: false
    };
    
    // 1. Verificar backend
    console.log('\n🔧 Verificando backend...');
    try {
        const healthResponse = await fetch(`${BACKEND_URL}/health`);
        if (healthResponse.ok) {
            console.log('✅ Backend respondiendo correctamente');
            resultados.backend = true;
        } else {
            console.log('❌ Backend con problemas:', healthResponse.status);
        }
    } catch (error) {
        console.log('❌ Error conectando backend:', error.message);
    }
    
    // 2. Verificar frontend
    console.log('\n🎨 Verificando frontend...');
    try {
        const frontendResponse = await fetch(FRONTEND_URL);
        if (frontendResponse.ok) {
            console.log('✅ Frontend accesible');
            resultados.frontend = true;
        } else {
            console.log('❌ Frontend con problemas:', frontendResponse.status);
        }
    } catch (error) {
        console.log('❌ Error accediendo frontend:', error.message);
    }
    
    // 3. Verificar precios actualizados
    console.log('\n💰 Verificando precios...');
    const preciosEsperados = {
        'moldes-1680': 75,
        'santa-fe-3770': 80,
        'dorrego-1548': 70,
        'convencion-1994': 90,
        'ugarteche-2824': 95
    };
    
    let preciosCorrectos = 0;
    
    for (const [propertyId, expectedPrice] of Object.entries(preciosEsperados)) {
        try {
            const response = await fetch(`${BACKEND_URL}/properties/${propertyId}`);
            if (response.ok) {
                const data = await response.json();
                const actualPrice = data.data?.prices?.daily;
                
                if (actualPrice === expectedPrice) {
                    console.log(`✅ ${propertyId}: USD ${actualPrice} (correcto)`);
                    preciosCorrectos++;
                } else {
                    console.log(`❌ ${propertyId}: USD ${actualPrice} (esperado: ${expectedPrice})`);
                }
            } else {
                console.log(`❌ ${propertyId}: Error ${response.status}`);
            }
        } catch (error) {
            console.log(`❌ ${propertyId}: Error ${error.message}`);
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    resultados.precios = preciosCorrectos === Object.keys(preciosEsperados).length;
    
    // 4. Verificar token admin
    console.log('\n🔐 Verificando token admin...');
    try {
        const adminResponse = await fetch(`${BACKEND_URL}/properties/moldes-1680/prices`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ADMIN_DEMO_TOKEN'
            },
            body: JSON.stringify({
                prices: {
                    daily: 75,
                    weekly: 330,
                    monthly: 700,
                    currency: 'USD'
                }
            })
        });
        
        if (adminResponse.ok) {
            console.log('✅ Token admin funcional');
            resultados.admin = true;
        } else {
            console.log('❌ Token admin con problemas:', adminResponse.status);
        }
    } catch (error) {
        console.log('❌ Error probando token admin:', error.message);
    }
    
    // Resumen final
    console.log('\n📊 RESUMEN DE VERIFICACIÓN');
    console.log('==========================');
    console.log(`🔧 Backend: ${resultados.backend ? '✅ OK' : '❌ FALLO'}`);
    console.log(`🎨 Frontend: ${resultados.frontend ? '✅ OK' : '❌ FALLO'}`);
    console.log(`💰 Precios: ${resultados.precios ? '✅ OK' : '❌ FALLO'} (${preciosCorrectos}/${Object.keys(preciosEsperados).length})`);
    console.log(`🔐 Admin: ${resultados.admin ? '✅ OK' : '❌ FALLO'}`);
    
    const todoOk = Object.values(resultados).every(r => r);
    
    console.log('\n🎯 ESTADO GENERAL:', todoOk ? '✅ TODO FUNCIONAL' : '❌ NECESITA ATENCIÓN');
    
    if (todoOk) {
        console.log('\n🎉 ¡PRODUCCIÓN COMPLETAMENTE FUNCIONAL!');
        console.log('=======================================');
        console.log('✅ Puedes usar el sistema con confianza');
        console.log('🌐 Frontend: ' + FRONTEND_URL);
        console.log('🔐 Admin: ' + FRONTEND_URL + '/admin');
        console.log('📧 Credenciales: admin@baconfort.com / roccosa226');
    } else {
        console.log('\n⚠️ ALGUNOS COMPONENTES NECESITAN ATENCIÓN');
        console.log('=========================================');
        console.log('🔍 Revisa los errores arriba');
        console.log('🔄 Puede ser necesario ejecutar scripts de corrección');
    }
    
    return resultados;
}

async function generarReporteProduccion() {
    console.log('📋 GENERANDO REPORTE DE PRODUCCIÓN');
    console.log('===================================');
    
    const resultados = await verificarProduccion();
    
    const reporte = {
        timestamp: new Date().toISOString(),
        urls: {
            frontend: FRONTEND_URL,
            backend: BACKEND_URL,
            admin: FRONTEND_URL + '/admin'
        },
        verificaciones: resultados,
        estado: Object.values(resultados).every(r => r) ? 'FUNCIONAL' : 'NECESITA_ATENCION',
        instrucciones: {
            acceso_admin: 'Usar setup en consola del navegador',
            credenciales: 'admin@baconfort.com / roccosa226',
            token_backend: 'ADMIN_DEMO_TOKEN'
        }
    };
    
    const fs = require('fs');
    fs.writeFileSync('reporte-produccion.json', JSON.stringify(reporte, null, 2));
    
    console.log('\n💾 Reporte guardado en: reporte-produccion.json');
    
    return reporte;
}

// Ejecutar verificación
if (require.main === module) {
    generarReporteProduccion();
}

module.exports = { verificarProduccion, generarReporteProduccion };
