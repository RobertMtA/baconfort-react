// verificar-precios-aplicados.js
// Script para verificar que los precios actualizados se aplican correctamente

const API_URL = 'https://baconfort-backend.vercel.app/api';

const preciosEsperados = {
    'moldes-1680': { daily: 75, weekly: 330, monthly: 700 },
    'santa-fe-3770': { daily: 80, weekly: 350, monthly: 750 },
    'dorrego-1548': { daily: 70, weekly: 320, monthly: 680 },
    'convencion-1994': { daily: 90, weekly: 380, monthly: 800 },
    'ugarteche-2824': { daily: 95, weekly: 400, monthly: 850 }
};

async function verificarPreciosPublicos() {
    console.log('🔍 VERIFICANDO PRECIOS PÚBLICOS');
    console.log('===============================');
    
    let correctos = 0;
    let incorrectos = 0;
    
    for (const [propertyId, expectedPrices] of Object.entries(preciosEsperados)) {
        try {
            console.log(`\n🏠 Verificando ${propertyId}...`);
            
            const response = await fetch(`${API_URL}/properties/${propertyId}`);
            
            if (response.ok) {
                const result = await response.json();
                const actualPrices = result.data?.prices;
                
                if (actualPrices) {
                    const dailyOk = actualPrices.daily === expectedPrices.daily;
                    const weeklyOk = actualPrices.weekly === expectedPrices.weekly;
                    const monthlyOk = actualPrices.monthly === expectedPrices.monthly;
                    
                    const allOk = dailyOk && weeklyOk && monthlyOk;
                    
                    console.log(`   💵 Diario: ${actualPrices.daily} USD ${dailyOk ? '✅' : '❌'} (esperado: ${expectedPrices.daily})`);
                    console.log(`   📅 Semanal: ${actualPrices.weekly} USD ${weeklyOk ? '✅' : '❌'} (esperado: ${expectedPrices.weekly})`);
                    console.log(`   🗓️ Mensual: ${actualPrices.monthly} USD ${monthlyOk ? '✅' : '❌'} (esperado: ${expectedPrices.monthly})`);
                    console.log(`   🎯 Estado: ${allOk ? '✅ CORRECTO' : '❌ INCORRECTO'}`);
                    
                    if (allOk) {
                        correctos++;
                    } else {
                        incorrectos++;
                    }
                } else {
                    console.log('   ❌ No se encontraron precios');
                    incorrectos++;
                }
            } else {
                console.log(`   ❌ Error HTTP: ${response.status}`);
                incorrectos++;
            }
            
        } catch (error) {
            console.log(`   ❌ Error: ${error.message}`);
            incorrectos++;
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    console.log('\n📊 RESUMEN FINAL:');
    console.log('=================');
    console.log(`✅ Correctos: ${correctos}`);
    console.log(`❌ Incorrectos: ${incorrectos}`);
    console.log(`📈 Total: ${correctos + incorrectos}`);
    console.log(`🎯 Éxito: ${((correctos / (correctos + incorrectos)) * 100).toFixed(1)}%`);
    
    return { correctos, incorrectos };
}

async function probarEndpointLista() {
    console.log('\n🔍 VERIFICANDO ENDPOINT DE LISTA');
    console.log('=================================');
    
    try {
        const response = await fetch(`${API_URL}/properties`);
        
        if (response.ok) {
            const result = await response.json();
            const properties = result.data;
            
            console.log(`✅ Endpoint de lista funciona`);
            console.log(`📋 Propiedades encontradas: ${properties.length}`);
            
            for (const property of properties) {
                const expectedPrices = preciosEsperados[property.id];
                if (expectedPrices) {
                    const actualPrices = property.prices;
                    const allOk = (
                        actualPrices?.daily === expectedPrices.daily &&
                        actualPrices?.weekly === expectedPrices.weekly &&
                        actualPrices?.monthly === expectedPrices.monthly
                    );
                    
                    console.log(`🏠 ${property.id}: ${allOk ? '✅ Precios correctos' : '❌ Precios incorrectos'}`);
                }
            }
        } else {
            console.log(`❌ Error en endpoint de lista: ${response.status}`);
        }
        
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
    }
}

async function verificarFrontendConfig() {
    console.log('\n🔍 VERIFICANDO CONFIGURACIÓN FRONTEND');
    console.log('=====================================');
    
    try {
        const fs = require('fs');
        const path = require('path');
        
        const configPath = path.join(__dirname, 'baconfort-react', 'src', 'config', 'updatedPrices.js');
        
        if (fs.existsSync(configPath)) {
            console.log('✅ Archivo de configuración existe');
            
            const configContent = fs.readFileSync(configPath, 'utf8');
            
            // Verificar que contiene los precios esperados
            let preciosEncontrados = 0;
            
            for (const [propertyId, expectedPrices] of Object.entries(preciosEsperados)) {
                if (configContent.includes(`"${propertyId}"`)) {
                    if (configContent.includes(`"daily": ${expectedPrices.daily}`)) {
                        preciosEncontrados++;
                        console.log(`✅ ${propertyId}: Precios correctos en config`);
                    } else {
                        console.log(`❌ ${propertyId}: Precios incorrectos en config`);
                    }
                } else {
                    console.log(`❌ ${propertyId}: No encontrado en config`);
                }
            }
            
            console.log(`📊 Configuración: ${preciosEncontrados}/${Object.keys(preciosEsperados).length} correctos`);
            
        } else {
            console.log('❌ Archivo de configuración no existe');
        }
        
    } catch (error) {
        console.log(`❌ Error verificando frontend: ${error.message}`);
    }
}

async function ejecutarVerificacionCompleta() {
    console.log('🚀 VERIFICACIÓN COMPLETA DE PRECIOS');
    console.log('===================================');
    
    // Verificar precios públicos
    const resultado = await verificarPreciosPublicos();
    
    // Verificar endpoint de lista
    await probarEndpointLista();
    
    // Verificar configuración frontend
    await verificarFrontendConfig();
    
    console.log('\n🎉 VERIFICACIÓN COMPLETADA');
    console.log('==========================');
    
    if (resultado.correctos === Object.keys(preciosEsperados).length) {
        console.log('✅ TODOS LOS PRECIOS ESTÁN CORRECTOS');
        console.log('🎯 El sistema está listo para usar');
    } else {
        console.log('⚠️ ALGUNOS PRECIOS NECESITAN CORRECCIÓN');
        console.log('🔄 Puede ser necesario ejecutar el script nuevamente');
    }
}

// Ejecutar
if (require.main === module) {
    ejecutarVerificacionCompleta();
}

module.exports = { 
    verificarPreciosPublicos, 
    probarEndpointLista, 
    verificarFrontendConfig 
};
