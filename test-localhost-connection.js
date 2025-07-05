// test-localhost-connection.js
// Script para probar la conexión al localhost

async function testLocalhost() {
    console.log('🔄 Probando conexión al localhost...');
    
    const LOCAL_URLS = [
        'http://localhost:3000',
        'http://localhost:3001',
        'http://localhost:5000'
    ];
    
    for (const url of LOCAL_URLS) {
        console.log(`\n🧪 Probando: ${url}`);
        
        try {
            const response = await fetch(`${url}/api/test/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const result = await response.json();
                console.log('✅ Conexión exitosa!');
                console.log('📧 Resultado:', result);
                return;
            } else {
                console.log(`❌ Error HTTP: ${response.status}`);
            }
            
        } catch (error) {
            console.log(`❌ Error de conexión: ${error.message}`);
        }
    }
    
    console.log('\n🚨 No se pudo conectar a ningún servidor local');
    console.log('💡 Soluciones:');
    console.log('   1. Ejecutar: npm start en baconfort-backend/');
    console.log('   2. Usar el backend de Vercel (si está disponible)');
    console.log('   3. Contactar soporte técnico');
}

testLocalhost();
