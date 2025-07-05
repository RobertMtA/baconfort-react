// Script para probar el backend desplegado en Vercel
const axios = require('axios');

const API_BASE = 'https://baconfort-backend.vercel.app';

async function testVercelBackend() {
    console.log('🧪 Probando backend en Vercel...\n');
    
    const tests = [
        {
            name: 'Health Check',
            method: 'GET',
            url: `${API_BASE}/api/health`,
            expectStatus: 200
        },
        {
            name: 'API Info',
            method: 'GET',
            url: `${API_BASE}/api`,
            expectStatus: 200
        },
        {
            name: 'Test Endpoint',
            method: 'GET',
            url: `${API_BASE}/api/test`,
            expectStatus: 200
        },
        {
            name: 'Auth Login (sin credenciales)',
            method: 'POST',
            url: `${API_BASE}/api/auth/login`,
            data: {},
            expectStatus: 400
        },
        {
            name: 'Properties',
            method: 'GET',
            url: `${API_BASE}/api/properties`,
            expectStatus: 200
        },
        {
            name: 'Reservations (sin auth)',
            method: 'GET',
            url: `${API_BASE}/api/reservations`,
            expectStatus: 401
        }
    ];
    
    let passedTests = 0;
    let totalTests = tests.length;
    
    for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        console.log(`${i + 1}. ${test.name}...`);
        
        try {
            const config = {
                method: test.method,
                url: test.url,
                timeout: 10000
            };
            
            if (test.data) {
                config.data = test.data;
            }
            
            const response = await axios(config);
            
            if (response.status === test.expectStatus) {
                console.log(`   ✅ Éxito (${response.status})`);
                if (response.data) {
                    console.log(`   📄 Respuesta:`, JSON.stringify(response.data, null, 2));
                }
                passedTests++;
            } else {
                console.log(`   ❌ Error: esperaba ${test.expectStatus}, recibió ${response.status}`);
            }
            
        } catch (error) {
            if (error.response && error.response.status === test.expectStatus) {
                console.log(`   ✅ Éxito (${error.response.status} - esperado)`);
                passedTests++;
            } else {
                console.log(`   ❌ Error: ${error.message}`);
                if (error.response) {
                    console.log(`   📄 Status: ${error.response.status}`);
                    console.log(`   📄 Data:`, error.response.data);
                }
            }
        }
        
        console.log('');
    }
    
    console.log(`\n📊 Resultados: ${passedTests}/${totalTests} tests pasaron`);
    
    if (passedTests === totalTests) {
        console.log('🎉 ¡Todos los tests pasaron! El backend en Vercel está funcionando correctamente.');
    } else {
        console.log('⚠️  Algunos tests fallaron. Revisa la configuración del backend.');
    }
    
    console.log('\n🔗 URLs importantes:');
    console.log(`   Health Check: ${API_BASE}/api/health`);
    console.log(`   API Info: ${API_BASE}/api`);
    console.log(`   Properties: ${API_BASE}/api/properties`);
    console.log(`   Login: ${API_BASE}/api/auth/login`);
    console.log(`   Register: ${API_BASE}/api/auth/register`);
}

// Ejecutar solo si el archivo es llamado directamente
if (require.main === module) {
    testVercelBackend().catch(console.error);
}

module.exports = { testVercelBackend };
