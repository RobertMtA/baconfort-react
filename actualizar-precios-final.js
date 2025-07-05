// actualizar-precios-final.js
// Script final para actualizar todos los precios

const API_URL = 'https://baconfort-backend.vercel.app/api';
const ADMIN_TOKEN = 'ADMIN_DEMO_TOKEN';

// Nuevos precios definitivos
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

async function actualizarTodosLosPrecios() {
    console.log('🚀 ACTUALIZACIÓN FINAL DE PRECIOS');
    console.log('=================================');
    console.log(`🔐 Usando token: ${ADMIN_TOKEN}`);
    console.log(`📊 Propiedades a actualizar: ${Object.keys(nuevosPrecios).length}`);
    
    let actualizados = 0;
    let errores = 0;
    const resultados = [];
    
    for (const [propertyId, prices] of Object.entries(nuevosPrecios)) {
        console.log(`\n🏠 Actualizando ${propertyId}...`);
        console.log(`   💵 Diario: USD ${prices.daily}`);
        console.log(`   📅 Semanal: USD ${prices.weekly}`);
        console.log(`   🗓️ Mensual: USD ${prices.monthly}`);
        
        try {
            const response = await fetch(`${API_URL}/properties/${propertyId}/prices`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ADMIN_TOKEN}`
                },
                body: JSON.stringify({ prices })
            });
            
            const result = await response.json();
            
            if (response.ok) {
                console.log(`   ✅ ${propertyId} actualizado exitosamente`);
                actualizados++;
                resultados.push({
                    propertyId,
                    status: 'success',
                    prices: prices
                });
            } else {
                console.log(`   ❌ Error ${response.status}: ${result.error || 'Error desconocido'}`);
                errores++;
                resultados.push({
                    propertyId,
                    status: 'error',
                    error: result.error,
                    statusCode: response.status
                });
            }
            
        } catch (error) {
            console.log(`   ❌ Error de red: ${error.message}`);
            errores++;
            resultados.push({
                propertyId,
                status: 'network_error',
                error: error.message
            });
        }
        
        // Pausa entre requests
        await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    console.log('\n📊 RESUMEN FINAL:');
    console.log('=================');
    console.log(`✅ Actualizados exitosamente: ${actualizados}`);
    console.log(`❌ Errores: ${errores}`);
    console.log(`📈 Total procesados: ${Object.keys(nuevosPrecios).length}`);
    console.log(`📋 Tasa de éxito: ${((actualizados / Object.keys(nuevosPrecios).length) * 100).toFixed(1)}%`);
    
    // Guardar resultados
    const fs = require('fs');
    const reporte = {
        timestamp: new Date().toISOString(),
        totalPropiedades: Object.keys(nuevosPrecios).length,
        actualizados,
        errores,
        tasaExito: ((actualizados / Object.keys(nuevosPrecios).length) * 100).toFixed(1),
        resultados
    };
    
    fs.writeFileSync('reporte-actualizacion-precios.json', JSON.stringify(reporte, null, 2));
    console.log('\n💾 Reporte guardado en reporte-actualizacion-precios.json');
    
    return reporte;
}

async function verificarActualizaciones() {
    console.log('\n🔍 VERIFICANDO ACTUALIZACIONES');
    console.log('==============================');
    
    const verificaciones = [];
    
    for (const [propertyId, expectedPrices] of Object.entries(nuevosPrecios)) {
        try {
            const response = await fetch(`${API_URL}/properties/${propertyId}`);
            
            if (response.ok) {
                const result = await response.json();
                const actualPrices = result.data?.prices;
                
                const verificado = (
                    actualPrices?.daily === expectedPrices.daily &&
                    actualPrices?.weekly === expectedPrices.weekly &&
                    actualPrices?.monthly === expectedPrices.monthly
                );
                
                console.log(`🏠 ${propertyId}:`);
                console.log(`   Esperado: ${expectedPrices.daily}/${expectedPrices.weekly}/${expectedPrices.monthly} USD`);
                console.log(`   Actual:   ${actualPrices?.daily || 'N/A'}/${actualPrices?.weekly || 'N/A'}/${actualPrices?.monthly || 'N/A'} USD`);
                console.log(`   Estado:   ${verificado ? '✅ CORRECTO' : '❌ INCORRECTO'}`);
                
                verificaciones.push({
                    propertyId,
                    verificado,
                    expectedPrices,
                    actualPrices
                });
            } else {
                console.log(`❌ Error verificando ${propertyId}: ${response.status}`);
                verificaciones.push({
                    propertyId,
                    verificado: false,
                    error: `HTTP ${response.status}`
                });
            }
            
        } catch (error) {
            console.log(`❌ Error verificando ${propertyId}: ${error.message}`);
            verificaciones.push({
                propertyId,
                verificado: false,
                error: error.message
            });
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    const correctos = verificaciones.filter(v => v.verificado).length;
    const incorrectos = verificaciones.filter(v => !v.verificado).length;
    
    console.log('\n📊 RESUMEN DE VERIFICACIÓN:');
    console.log('===========================');
    console.log(`✅ Correctos: ${correctos}`);
    console.log(`❌ Incorrectos: ${incorrectos}`);
    console.log(`📈 Total: ${verificaciones.length}`);
    
    return verificaciones;
}

async function sincronizarFrontend() {
    console.log('\n🔄 SINCRONIZANDO FRONTEND');
    console.log('=========================');
    
    try {
        const { exec } = require('child_process');
        
        return new Promise((resolve, reject) => {
            exec('node sync-frontend-prices.js', (error, stdout, stderr) => {
                if (error) {
                    console.log('❌ Error sincronizando frontend:', error);
                    reject(error);
                } else {
                    console.log('✅ Frontend sincronizado exitosamente');
                    console.log(stdout);
                    resolve(stdout);
                }
            });
        });
        
    } catch (error) {
        console.log('❌ Error ejecutando sync:', error.message);
        throw error;
    }
}

async function ejecutarProcesoCompleto() {
    console.log('🚀 PROCESO COMPLETO DE ACTUALIZACIÓN');
    console.log('====================================');
    
    try {
        // Paso 1: Actualizar precios
        console.log('\n📋 PASO 1: ACTUALIZAR PRECIOS');
        const reporte = await actualizarTodosLosPrecios();
        
        if (reporte.actualizados === 0) {
            console.log('❌ No se actualizó ninguna propiedad. Abortando.');
            return;
        }
        
        // Paso 2: Verificar actualizaciones
        console.log('\n📋 PASO 2: VERIFICAR ACTUALIZACIONES');
        const verificaciones = await verificarActualizaciones();
        
        // Paso 3: Sincronizar frontend
        console.log('\n📋 PASO 3: SINCRONIZAR FRONTEND');
        try {
            await sincronizarFrontend();
        } catch (error) {
            console.log('⚠️ Error en sincronización, pero continuando...');
        }
        
        // Resumen final
        console.log('\n🎉 PROCESO COMPLETADO EXITOSAMENTE');
        console.log('==================================');
        console.log(`✅ Precios actualizados: ${reporte.actualizados}/${reporte.totalPropiedades}`);
        console.log(`🔍 Verificaciones correctas: ${verificaciones.filter(v => v.verificado).length}/${verificaciones.length}`);
        console.log(`💾 Reportes guardados en archivos JSON`);
        
    } catch (error) {
        console.log('❌ Error en proceso completo:', error.message);
    }
}

// Ejecutar
if (require.main === module) {
    ejecutarProcesoCompleto();
}

module.exports = { 
    actualizarTodosLosPrecios, 
    verificarActualizaciones, 
    sincronizarFrontend 
};
